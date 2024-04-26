import { debounce } from "@/utils/delay";
import TA from "./index";
import * as PageHistory from "./tool/LinkNode";
import { useEffect, useCallback, useRef } from "react";
import { Stack } from "./tool/LinkNode";
import { TauriEvent, listen } from "@tauri-apps/api/event";

type ExpandProps = {
  page?: React.Ref<any>;
  pageId: string;
  extension?: Record<string, any>;
};

const wrapTrackingPage: HOC_Expand<ExpandProps> = (Component: any) => {
  return function ({ page, pageId, ...props }: any) {
    // const pageId = props.pageId;

    const tauriPageListen = useRef<any[]>();

    useEffect(() => {
      onLoad();
      function onVisibilityChange(e: any) {
        if (Stack.curr?.val === pageId) {
          console.log("visibilitychange", document.visibilityState);
          if (document.visibilityState === "hidden") {
            didHide();
          } else {
            didShow();
          }
        }
      }

      window.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        window.removeEventListener("visibilitychange", onVisibilityChange);
        unLoad();
        tauriPageListen.current?.forEach((removeFn) => removeFn());
      };
    }, []);

    // async function tauriWindowListen() {
    //   tauriPageListen.current = [
    //     await listen(TauriEvent.WINDOW_BLUR, function () {
    //       console.log("blur");
    //       didHide();
    //     }),
    //     await listen(TauriEvent.WINDOW_FOCUS, function () {
    //       console.log("focus");
    //       didShow();
    //     }),
    //     await listen(TauriEvent.WINDOW_DESTROYED, function () {
    //       console.log("destroyed");
    //       TA.duration.groups["pageStay"].end(props.extension);
    //       PageHistory.pop();
    //     }),
    //   ];
    // }

    const onLoad = useCallback(
      debounce(function () {
        didShow();
        // 页面加载时
        PageHistory.push(pageId);
      }, 30),
      [pageId]
    );

    const unLoad = useCallback(
      debounce(function () {
        TA.duration.groups["pageStay"].end(props.extension);
        PageHistory.pop();
      }, 30),
      [props.extension]
    );

    const didHide = useCallback(
      debounce(function () {
        TA.duration.groups["pageStay"].end(props.extension);
      }, 30),
      [props.extension]
    );

    const didShow = useCallback(
      debounce(function () {
        TA.track({
          event: "load",
          pageid: pageId,
          ...(props.extension || {}),
        });

        TA.duration.groups["pageStay"].start({
          event: "show",
          pageid: pageId,
        });
      }, 30),
      [pageId, props.extension]
    );

    return <Component ref={page} {...props} />;
  };
};

(window as any).getCurr = function () {
  console.log(PageHistory.Stack.curr);
};

export default wrapTrackingPage;
