import { Box, SxProps, Theme } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation, useOutlet, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const headerSx: SxProps<Theme> = (theme) => ({
  position: "relative",
  zIndex: 9999,
  height: "30px",
  background: theme.palette.x_header_color,
  paddingLeft: "80px",
  lineHeight: "30px",
  fontSize: "14px",
  color: theme.palette.text.primary,
  userSelect: "none",
  cursor: "default",
});

export default function () {
  const header = window.__TAURI__ ? (
    <Box
      data-tauri-drag-region=""
      className="tr-window__titlebar"
      sx={headerSx}
    >
      我是标题,你也可以在这里使用html写其他的ui
    </Box>
  ) : null;

  return (
    <Box className="tr-window">
      {/* 头部 */}
      {header}
      {/* 路由窗口 */}
      <Box className="tr-window__main">
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </Box>
    </Box>
  );
}
