import { MotionSlide } from "@/components/EasyMotions";
import Page from "@/components/Page";
import { Divider, Stack, SxProps, Theme } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".page1-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  ".title": {
    marginTop: "10vh",
    fontSize: "32px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  ".content": {
    marginTop: "10vh",
    width: "70%",
    color: "#666",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "";

export default function () {
  const navigate = useNavigate();
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <MotionSlide type="right" upperTransition style={{ height: "100%" }}>
        <div className="page1-root">
          <div className="title">Page 1</div>
          <MotionSlide type="right" className="content">
            说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀说词儿呀
          </MotionSlide>
          <Stack direction="row" gap={2} sx={{ marginTop: "10vh" }}>
            <Link to="/w/example/router-transition/mobile/page2">Page 2</Link>
            <Divider orientation="vertical" flexItem />
            <Link to="#" onClick={() => navigate(-1)}>
              Back
            </Link>
          </Stack>
        </div>
      </MotionSlide>
    </Page>
  );
}
