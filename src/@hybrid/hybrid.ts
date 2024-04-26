// 抽象类
export abstract class AbsHybrid {
  public abstract openWindow(): void;
}

type envs = "browser" | "tauri";

// 各端的判断方法
async function distinguish(): Promise<envs> {
  if (distinguishTauri()) {
    return "tauri";
  }
  return "browser";
}

export default async function mountHybrid(next: AsyncProcessFn) {
  // 检查环境
  const env = await distinguish();
  window.H5_ENV = env;

  let Hybrid;
  switch (env) {
    case "tauri":
      document.body.className = "hybrid-tauri";
      Hybrid = (await import("./tauri")).default;
      break;
    default:
      document.body.className = "hybrid-browser";
      Hybrid = (await import("./browser")).default;
      break;
  }

  const bridge = new Hybrid();

  // 使用proxy 再没有对应函数时，返回Promise.reject()
  // window.rvtBridge = new Proxy<AbsHybrid>(bridge, {
  //   get: function (target, property, receiver) {
  //     // @ts-ignore
  //     const value = target[property];
  //     return value
  //       ? value
  //       : () =>
  //         Promise.reject(
  //           new ReferenceError(
  //             `hybrid no such of function: 【${env}】 rvtBridge.${String(
  //               property
  //             )}`
  //           )
  //         );
  //   },
  // });
  window.rvtBridge = bridge;

  next && next();
}

function distinguishTauri() {
  return !!window.__TAURI__;
}
