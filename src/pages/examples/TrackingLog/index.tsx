import Page from "@/components/Page";
import { Box, Paper, Switch, SxProps, Theme, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useState, useRef } from "react";

const styleSheet: SxProps<Theme> = (theme) => ({
  padding: "24px",
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "example-tracking-log";

const columns: GridColDef[] = [
  { field: "pageid", headerName: "PAGE_ID", width: 240 },
  { field: "event", headerName: "EVENT" },
  { field: "duration", headerName: "DURATION" },
  { field: "ref", headerName: "REF_PAGE_ID", width: 240 },
  { field: "ts", headerName: "TIMESTAMP", width: 180 },
];

export default function () {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [on, setOn] = useState(false);
  const removeListen = useRef<any>();
  useEffect(() => {
    if (on) {
      addListener();
    } else {
      removeListen.current && removeListen.current();
    }
  }, [on]);

  async function addListener() {
    removeListen.current = await listen(
      "x_front_tracking_data",
      function (data: any) {
        setDataSource((d) => [
          {
            id: d.length + 1,
            ...data.payload,
          },
          ...d,
        ]);
      }
    );
  }

  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box sx={{ padding: "24px" }}>
          <Typography variant="h6">
            tracking中upload将会发送tauri事件
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">开启监控</Typography>
            <Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
          </Box>
        </Box>

        <DataGrid
          rowHeight={34}
          columnHeaderHeight={40}
          columns={columns}
          rows={dataSource}
          getRowId={(data) => data.id}
          columnBufferPx={100}
        />
      </Paper>
    </Page>
  );
}
