// 由订阅的 rx object 映射成 组件 state rx -> state
// import { } from 'rxdb'
import { useEffect, useMemo, useState } from "react";
import { Observable } from "rxjs";

// readonly
export function useRxState<T>(implSubscribable: Observable<T>) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const subscription = implSubscribable.subscribe((v) => {
      setState(v.get("value"));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [implSubscribable]);

  return state;
}
