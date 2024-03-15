import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation, useOutlet, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function () {
  const outlet = useOutlet();
  const location = useLocation();

  const header = window.__TAURI__ ? (
    <Box
      data-tauri-drag-region=""
      className="tr-window__titlebar"
      sx={{
        position: "relative",
        zIndex: 9999,
        height: "30px",
        background: "#f0f0f0",
        paddingLeft: "80px",
        lineHeight: "30px",
        fontSize: "14px",
        color: "#333",
        userSelect: "none",
        cursor: "default",
      }}
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
          {outlet ? React.cloneElement(outlet, { key: location.key }) : outlet}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
