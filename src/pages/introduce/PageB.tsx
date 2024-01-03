import { Link, useLoaderData, defer, Await } from "react-router-dom";
import React from "react";
import Loading1 from "@/components/Loading/Loading1";
import Page from "@/components/Page";
import { MotionSlide } from "@/components/EasyMotions";

export async function loader() {
  return defer({
    request1: await requestData1(),
    request2: requestData2(),
  });
}

function requestData1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("request1");
    }, 1000);
  });
}

function requestData2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("request2");
    }, 5000);
  });
}

type RouterData = {
  request1: string;
  request2: string;
};

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "page2";

export default function PageB() {
  const { request1, request2 } = useLoaderData() || ({} as any);

  return (
    <Page pageId={PAGE_ID}>
      <MotionSlide type="right" duration={0.15}>
        B<Link to="/w/a">to a</Link>
        <div>request1 = {request1}</div>
        <React.Suspense fallback={<Loading1 />}>
          <Await
            // and is the promise we pass to Await
            resolve={request2}
          >
            {(value) => {
              return <div>request2 = {value}</div>;
            }}
          </Await>
        </React.Suspense>
      </MotionSlide>
    </Page>
  );
}
