// 流程函数类型
type AsyncProcessFn = (next?: () => void) => Promise<void>;
