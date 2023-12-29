import { db } from "@/db";
import { BehaviorSubject, Observable } from "rxjs";
import { RxDocument } from "rxdb";

type AllAppConfigKeys = "cust_theme_primary" | "theme_mode";

let state: Record<
  AllAppConfigKeys,
  BehaviorSubject<RxDocument<any>> | undefined
> = {
  // 主题色
  cust_theme_primary: undefined,
  // mode
  theme_mode: undefined,
};

export const Observers = {
  // 获取 mode
  get_config(key: AllAppConfigKeys) {
    if (!state[key]) {
      state[key] = db.collections["appConfig"].findOne({
        selector: {
          key,
        },
      }).$;
    }

    return state[key];
  },
};

export const Mutation = {
  // 设置主题色
  set_config(key: AllAppConfigKeys, value: string) {
    db.collections["appConfig"].upsert({
      key: key,
      value: value,
    });
  },
};
