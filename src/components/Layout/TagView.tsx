import Page from "@/components/Page";
import { Box, SxProps, Tabs, Tab, Theme, BoxProps } from "@mui/material";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import TrTabs from "@/components/TagView/components/Tabs";
import { useTags } from "@/db/dao/AppTags";
import { Outlet, useNavigate } from "react-router-dom";

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
  namespace?: string;
  homepage: string;
  header?: React.ReactNode;
} & BoxProps;

export default function ({
  namespace = "default",
  homepage,
  header,
  children,
  ...boxProps
}: PropsWithChildren<TabViewProps>) {
  const navigate = useNavigate();

  const { tags = [], initialize, current } = useTags(namespace);

  const currTag = useMemo(
    () => (current === undefined ? null : tags?.[current]),
    [tags, current]
  );

  useEffect(() => {
    // 页面跳转
    currTag?.key && navigate(currTag.key, { replace: true });
  }, [currTag?.key]);

  useEffect(() => {
    if (!tags) {
      initialize();
    }
  }, []);

  if (!tags) {
    return null;
  }

  function onTabChange(index: number) {
    const tag = tags[index];

    navigate(tag.key, { replace: true });
  }

  return (
    <Box {...boxProps} className="tr-tabs-view" sx={styleSheet}>
      <Box sx={{ display: "flex" }}>
        {header}
        {/* tags横向滚动区域 */}
        <TrTabs value={current} items={tags} onChange={onTabChange}></TrTabs>
        {/* 浮动窗口 */}
      </Box>
      <Box className="tr-tabs-view__router-view">
        <Outlet />
      </Box>
    </Box>
  );
}
