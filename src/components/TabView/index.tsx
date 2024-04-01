import Page from "@/components/Page";
import { Box, SxProps, Tabs, Tab, Theme, BoxProps } from "@mui/material";
import React, { PropsWithChildren, createContext, useState } from "react";
import TrTabs from "./components/Tabs";
import TrTab from "./components/Tab";

const styleSheet: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",

  ".tr-tabs-view__router-view": {
    flex: 1,
    backgroundColor: theme.palette.x_tab_view.tabActive,
    borderRadius: "12px",
  },
});

type TabViewProps = {
  header?: React.ReactNode;
};

export default function ({
  header,
  children,
}: PropsWithChildren<TabViewProps>) {
  const [activeKey, setActiveKey] = useState(0);

  const list = Array(100)
    .fill(1)
    .map((_, index) => index + 1);

  return (
    <Box className="tr-tabs-view" sx={styleSheet}>
      <Box sx={{ display: "flex" }}>
        {header}
        {/* tags横向滚动区域 */}
        <TrTabs value={activeKey} onChange={(v) => setActiveKey(v)}>
          {list.map((item) => (
            <TrTab>{item}</TrTab>
          ))}
        </TrTabs>
      </Box>

      <Box className="tr-tabs-view__router-view">{children}</Box>
    </Box>
  );
}
