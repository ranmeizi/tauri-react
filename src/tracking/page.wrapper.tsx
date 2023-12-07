import { throttle } from '@/utils/delay';
import TA from './index';
import * as PageHistory from './tool/LinkNode';
import { useEffect } from 'react';

type ExpandProps = {
  page?: React.Ref<any>;
  pageId: string;
  extension?: Record<string, any>;
};

const wrapTrackingPage: HOC_Expand<ExpandProps> = (Component: any) => {
  return function ({ page, ...props }: any) {
    const pageId = props.pageId;
    const tabView = props.tabView;

    useEffect(() => {
      onLoad()
      return () => {
        unLoad()
      }
    }, [])

    function onLoad() {
      // 页面加载时
      if (tabView) {
        tabIn(pageId);
      } else {
        PageHistory.push(pageId);
      }
    }

    function unLoad() {
      TA.duration.groups['pageStay'].end(props.extension);
      PageHistory.pop();
    }

    function didHide() {
      TA.duration.groups['pageStay'].end(props.extension);
    }

    function didShow() {
      console.log('page show');
      if (tabView) {
        tabIn(pageId);
      }

      TA.track({
        event: 'load',
        pageid: pageId,
        ...(props.extension || {}),
      });

      TA.duration.groups['pageStay'].start({
        event: 'show',
        pageid: pageId,
      });
    }

    return <Component ref={page} {...props} />;
  };
};

const tabIn = throttle((pageId: string) => {
  if (PageHistory.Stack.curr) {
    PageHistory.replace(pageId);
  } else {
    PageHistory.push(pageId);
  }
}, 20);

(window as any).wx.getCurr = function () {
  console.log(PageHistory.Stack.curr);
};

export default wrapTrackingPage;
