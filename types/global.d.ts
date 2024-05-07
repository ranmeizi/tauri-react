// 流程函数类型
type AsyncProcessFn = (next?: () => void) => Promise<void>;

// interface Window {
//   H5_ENV: string;
//   h5_bridge: AbsHybrid;
// }
