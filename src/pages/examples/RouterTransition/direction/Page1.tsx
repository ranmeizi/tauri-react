import { MotionSlide } from "@/components/EasyMotions";
import Page from "@/components/Page";
import { Divider, Stack, SxProps, Theme } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRxState } from "@/db/hook/useRxState";
import * as C from "@/CONSTANTS";
import * as DaoAppConfig from "@/db/dao/AppConfig";
import Selector from "./Radio";
import { context } from "@/contexts/AppConfig";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".page1-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    background: "red",
  },
  ".title": {
    marginTop: "16vh",
    fontSize: "32px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  ".content": {
    marginTop: "16vh",
    width: "70%",
    color: "#666",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "";

export default function () {
  const navigate = useNavigate();

  const { route_transition_direction: direction } = useContext(context);

  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <MotionSlide type={direction} upperTransition style={{ height: "100%" }}>
        <div className="page1-root">
          <div className="title">Page 1</div>
          <div>
            <Selector />
          </div>
          <Stack direction="row" gap={2} sx={{ marginTop: "16vh" }}>
            <Link to="/w/example/router-transition/direction/page2">
              Page 2
            </Link>
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
