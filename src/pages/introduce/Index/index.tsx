import Page from "@/components/Page";
import { SxProps, Theme } from "@mui/material";
import React from "react";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".title": {
    fontSize: "32px",
    fontWeight: "bold",
  },
  ".content": {
    color: "#ccc",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "introduce-index";

export default function () {
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <div className="title">功能页</div>
      <div className="content">内容和cssinjs</div>
    </Page>
  );
}
