import Page from "@/components/Page";
import { Switch, SxProps, Theme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useState, useRef } from "react";

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
const PAGE_ID = "example-tracking-log";

export default function () {
  const [dataSource, setDataSource] = useState([]);
  const [on, setOn] = useState(false);
  const removeListen = useRef<any>();
  useEffect(() => {
    if (on) {
      addListener();
    } else {
      removeListen.current && removeListen.current();
    }
  }, [on]);

  function addListener() {
    removeListen.current = listen("x_front_tracking_data", function (data) {
      console.log("x_front_tracking_data", data);
    });
  }

  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
      {/* <DataGrid /> */}
    </Page>
  );
}
