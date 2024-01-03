// 由订阅的 rx object 映射成 组件 state rx -> state
// import { } from 'rxdb'
import { useEffect, useState } from "react";
import { RxDocument } from "rxdb";
import { BehaviorSubject } from "rxjs";

// readonly
export function useRxState<T>(
  implSubscribable?: BehaviorSubject<RxDocument<T>>
) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    if (!implSubscribable) {
      return undefined;
    }
    const subscription = implSubscribable.subscribe((v) => {
      setState(v && v.get("value"));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [implSubscribable]);

  return state;
}
