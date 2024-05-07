import { invoke } from "@tauri-apps/api";
import { AbsHybrid } from "../hybrid";
import * as C from "@/CONSTANTS";

export default class extends AbsHybrid {
  public openWindow(
    url: string,
    target?: string, // 不用
    features?: string
  ): Promise<any> {
    return invoke(C.TAURI_CMD_OPEN_WINDOW, {
      url: location.origin + url,
      ...this.utils.features.decode(features),
    });
  }
  public openBrowser(url: string): Promise<any> {
    return invoke(C.TAURI_CMD_OPEN_BROWSER, { url });
  }
}
