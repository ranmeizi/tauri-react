declare global {
  interface Window {
    H5_ENV: envs;
    h5_bridge: AbsHybrid;
  }
}

// 抽象类
export abstract class AbsHybrid {
  /**
   * 打开新窗口
   */
  public abstract openWindow(
    url: string,
    target?: string,
    features?: string
  ): any;

  /**
   * 打开浏览器
   */
  public abstract openBrowser(url: string): any;

  /**
   * 工具
   */
  public utils = {
    features: {
      encode(data: Record<string, string | number> = {}): string {
        let items = [];
        for (let [key, value] of Object.entries(data)) {
          items.push(`${key}=${value}`);
        }
        return items.join(",");
      },
      decode(featuresString: string = ""): Record<string, string | number> {
        let items = featuresString.split(",");
        const data: Record<string, string | number> = {};
        for (let s of items) {
          let res = s.split("=");
          if (res?.[0]) {
            data[res[0]] = Number(res[1]) || res[1];
          }
        }
        return data;
      },
    },
  };
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

  window.h5_bridge = bridge;

  next && next();
}

function distinguishTauri() {
  return !!window.__TAURI__;
}
