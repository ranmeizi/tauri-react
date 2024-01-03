import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation, useOutlet, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function () {
  const outlet = useOutlet();
  const location = useLocation();

  console.log(outlet);
  return (
    <Box className="tr-window">
      <Box
        data-tauri-drag-region=""
        className="tr-window__titlebar"
        sx={{
          height: "30px",
          background: "#f0f0f0",
          paddingLeft: "80px",
          lineHeight: "30px",
          fontSize: "14px",
          color: "#333",
          userSelect: "none",
        }}
      >
        我是标题,你也可以在这里使用html写其他的ui
      </Box>
      {/* 头部 */}
      <Box className="tr-window__main">
        {/* {outlet} */}
        <AnimatePresence>
          {outlet ? React.cloneElement(outlet, { key: location.key }) : outlet}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
