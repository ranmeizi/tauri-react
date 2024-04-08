// 由订阅的 rx object 映射成 组件 state rx -> state
// import { } from 'rxdb'
import { useEffect, useState } from "react";
import { RxDocument } from "rxdb";
import { BehaviorSubject } from "rxjs";

// readonly
export function useRxState<T>(
  implSubscribable?: BehaviorSubject<RxDocument<T>> // 一个 实现了BehaviorSubject<RxDocument<T>> 的对象
) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    if (!implSubscribable) {
      return undefined;
    }
    const subscription = implSubscribable.subscribe((v) => {
      setState(v);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [implSubscribable]);

  return state;
}
