import Page from "@/components/Page";
import { SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import DocContent from "../../components/DocContent";

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
const PAGE_ID = "doc-index";

export default function DocTauriReact() {
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <DocContent>
        <Typography variant="h5">Tauri React</Typography>
        <Typography variant="body1">
          tauri-react 是我在学习 tauri
          过程中的一些尝试性的代码，觉得不错的我就沉淀下来写进项目中，为了将来有机会启动一个tauri项目做准备。
        </Typography>

        <Typography variant="h6">三方库及文档汇总</Typography>
        <ul>
          <li>Tauri</li>:<a />
        </ul>
      </DocContent>
    </Page>
  );
}
