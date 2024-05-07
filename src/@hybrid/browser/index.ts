import { AbsHybrid } from "../hybrid";

export default class extends AbsHybrid {
  public openWindow(url: string, target?: string, features?: string): any {
    // 使用 window.open
    window.open(location.origin + url, target, features);
  }
  public openBrowser(url: string): any {
    // 使用 window.open 打开新窗口
    window.open(location.origin + url, "_blank");
  }
}
