import Page from "@/components/Page";
import DocContent from "@/pages/docs/components/DocContent";
import { SxProps, Theme } from "@mui/material";
import React from "react";

const styleSheet: SxProps<Theme> = (theme) => ({});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "doc-introduce-window-header";

export default function DocWindowHeader() {
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <DocContent>1</DocContent>
    </Page>
  );
}
