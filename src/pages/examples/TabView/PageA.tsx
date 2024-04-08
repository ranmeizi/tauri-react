import TabPage from "@/components/TagView/TagPage";
import Page from "@/components/Page";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import TabView from "@/components/TagView";
import { Link, useNavigate } from "react-router-dom";
import { MotionSlide } from "@/components/EasyMotions";
import { useTags } from "@/db/dao/AppTags";

const styleSheet: SxProps<Theme> = (theme) => ({
  padding: "40px",
  ".title": {
    fontSize: "32px",
    fontWeight: "bold",
  },
  ".content": {
    color: "#ccc",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "example-tab-view-pagea";

export default function ExampleTabPageA() {
  return (
    <TabPage pageId={PAGE_ID} sx={styleSheet} className="page-a">
      <div className="title">PageA</div>
      <div className="content">内容和cssinjs</div>
      <div>
        <Link to="/w/t/page-b" replace>
          Page B
        </Link>
      </div>
    </TabPage>
  );
}
