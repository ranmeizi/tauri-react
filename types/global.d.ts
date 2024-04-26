// 流程函数类型
type AsyncProcessFn = (next?: () => void) => Promise<void>;

interface Window {
  H5_ENV: string;
  h5_bridge: AbsHybrid;
}

abstract class AbsHybrid {
  /* 打开窗口  */
  abstract openWindow(): viod;
}
