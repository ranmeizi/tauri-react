import { db } from "@/db";
import { BehaviorSubject } from "rxjs";
import { RxDocument } from "rxdb";
import { useRxState } from "../hook/useRxState";
import { useMemo } from "react";

let state: Record<
  string,
  BehaviorSubject<RxDocument<AppTagsStatic>> | undefined
> = {};

export const Observers = {
  // 获取 mode
  get_tags(namespace: string) {
    if (!state[namespace]) {
      state[namespace] = db.collections["appTags"].findOne({
        selector: {
          namespace,
        },
      }).$;
    }

    return state[namespace];
  },
};

/** 修改 tags */
function modifyFn<T extends AppTagsStatic>(namespace: string, fn: (d: T) => T) {
  return db.collections["appTags"]
    .findOne({
      selector: { namespace },
    })
    .exec()
    .then((doc) => {
      doc.modify(fn);
    });
}

/** 排序函数 */
function sortFn<T extends AppTag>(a: T, b: T) {
  return a.order - b.order;
}

export const Mutation = {
  initialize(namespace: string) {
    db.collections["appTags"]
      .findOne({
        selector: { namespace },
      })
      .exec()
      .then(
        (doc) =>
          !doc &&
          db.collections["appTags"].insert({
            namespace,
            current: 0,
            tags: [],
          })
      );
  },

  // 打开一个 页签
  add(namespace: string, tag: AppTag) {
    modifyFn(namespace, (data: AppTagsStatic) => {
      let order = data.tags.length;
      let tagIndex = data.tags.findIndex((item) => item.key === tag.key);
      if (tagIndex >= 0) {
        // 修改current
        data.current = tagIndex;
      } else {
        data.current = data.tags.length;
        data.tags.push({
          ...tag,
          order,
        });
      }

      return data;
    });
  },

  // 关闭一个 页签
  close(namespace: string, key: string) {
    modifyFn(namespace, (data) => {
      let tags = data.tags
        .filter((item) => item.key !== key)
        .sort(sortFn)
        .map((_, index) => ({
          ..._,
          order: index,
        }));

      let current =
        data.current >= tags.length ? tags.length - 1 : data.current; // 看看 current 需不需要移动

      return {
        ...data,
        current,
        tags,
      };
    });
  },

  // 全部关闭 页签
  closeAll(namespace: string) {
    modifyFn(namespace, (data) => {
      return {
        ...data,
        tags: [],
      };
    });
  },

  // 关闭右侧
  closeRight(namespace: string, key: string) {
    modifyFn(namespace, (data) => {
      let targetIndex = 0;
      let tags = data.tags
        .sort(sortFn)
        .map((tag, index) => {
          if (tag.key === key) {
            targetIndex = index;
          }
          return { ...tag, order: index };
        })
        .filter((_, index) => index <= targetIndex); // 过滤右边
      let current =
        data.current >= tags.length ? tags.length - 1 : data.current; // 看看 current 需不需要移动
      return {
        ...data,
        current,
        tags,
      };
    });
  },

  // 关闭其他
  closeOther(namespace: string, key: string) {
    modifyFn(namespace, (data) => {
      let tags = data.tags
        .filter((tag) => tag.key === key)
        .map((tag) => ({ ...tag, order: 0 }));
      return {
        ...data,
        current: 0,
        tags,
      };
    });
  },

  // 交换页签
  swapTag(namespace: string, sIndex: number, eIndex: number) {
    modifyFn(namespace, (data) => {
      const tags = data.tags.sort(sortFn);
      let temp = tags[eIndex].order;
      tags[eIndex].order = tags[sIndex].order;
      tags[sIndex].order = temp;

      // 修改current

      return {
        ...data,
        current: eIndex,
        tags,
      };
    });
  },
};

/**
 * 获得排序后的 tags
 *
 * namespace 数据隔离
 */
export function useTags(namespace: string) {
  const tagConfig = useRxState(Observers.get_tags(namespace));

  const tags = useMemo(() => {
    if (!tagConfig) {
      return {};
    }
    return {
      current: tagConfig.current,
      namespace: tagConfig.namespace,
      tags: tagConfig.tags.sort((a, b) => a.order - b.order),
    };
  }, [tagConfig]);

  const apis = useMemo(() => {
    return {
      initialize: (namespace: string) => Mutation.initialize(namespace),
      add: (tag: AppTag) => Mutation.add(namespace, tag),
      close: (key: string) => Mutation.close(namespace, key),
      closeAll: () => Mutation.closeAll(namespace),
      closeRight: (key: string) => Mutation.closeRight(namespace, key),
      closeOther: (key: string) => Mutation.closeOther(namespace, key),
      swapTag: (sIndex: number, eIndex: number) =>
        Mutation.swapTag(namespace, sIndex, eIndex),
    };
  }, [namespace]);

  return {
    ...tags,
    ...apis,
  } as const;
}
