import { debounce } from "@/utils/delay";
import TA from "./index";
import * as PageHistory from "./tool/LinkNode";
import { useEffect, useCallback } from "react";
import { Stack } from "./tool/LinkNode";

type ExpandProps = {
  page?: React.Ref<any>;
  pageId: string;
  extension?: Record<string, any>;
};

const wrapTrackingPage: HOC_Expand<ExpandProps> = (Component: any) => {
  return function ({ page, pageId, ...props }: any) {
    // const pageId = props.pageId;

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
      };
    }, []);

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
        console.log("unLoad");
        TA.duration.groups["pageStay"].end(props.extension);
        PageHistory.pop();
      }, 30),
      [props.extension]
    );

    const didHide = useCallback(
      debounce(function () {
        console.log("didHide");
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
