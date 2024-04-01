import TabPage from "@/components/TabView/TabPage";
import Page from "@/components/Page";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import TabView from "@/components/TabView";
import { Link, useNavigate } from "react-router-dom";

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
    <TabView header={<Header />}>
      <TabPage pageId={PAGE_ID} sx={styleSheet}>
        <div className="title">PageB</div>
        <div className="content">内容和cssinjs</div>
      </TabPage>
    </TabView>
  );
}

function Header() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "300px" }}>
      <Box sx={{ marginLeft: "24px", marginRight: "36px" }}>TabView 示例</Box>
      <Link to="#" onClick={() => navigate(-1)}>
        返回上一页
      </Link>
    </Box>
  );
}
