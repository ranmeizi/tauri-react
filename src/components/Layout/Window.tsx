import { Box, SxProps, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useOutlet, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { os } from "@tauri-apps/api";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { appWindow } from "@tauri-apps/api/window";
import CropDinIcon from "@mui/icons-material/CropDin";

const platformName = await os.platform();

const MacOSheaderSx: SxProps<Theme> = (theme) => ({
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

const WindowsheaderSx: SxProps<Theme> = (theme) => ({
  position: "relative",
  zIndex: 9999,
  height: "30px",
  background: theme.palette.x_header_color,
  lineHeight: "30px",
  fontSize: "14px",
  color: theme.palette.text.primary,
  userSelect: "none",
  cursor: "default",

  ".windows-titlebar": {
    position: "absolute",
    height: "100%",
    right: 0,
    top: 0,
    display: "flex",

    ".titlebar-button": {
      height: "100%",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "0.15s",
      ".MuiSvgIcon-root": {
        fontSize: "16px",
      },

      "&:hover": {
        background: "rgba(128,128,128,.2)",
      },
    },

    ".maximize-button": {
      ".MuiSvgIcon-root": {
        transform: "scaleY(0.8) rotateY(180deg)",
      },
    },

    ".close-button": {
      "&:hover": {
        background: "rgba(255,0,0,.8) !important",
      },
    },
  },
});

export default function () {
  const header = window.__TAURI__ ? (
    platformName === "darwin" ? (
      <MacHeader></MacHeader>
    ) : (
      <WindowsHeader></WindowsHeader>
    )
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

function MacHeader() {
  return (
    <Box
      data-tauri-drag-region=""
      className="tr-window__titlebar"
      sx={MacOSheaderSx}
    >
      {/* tauri-react */}
    </Box>
  );
}

function useMaxmize() {
  const [isMax, setIsMax] = useState(false);
  useEffect(() => {
    async function handler() {
      setIsMax(await appWindow.isMaximized());
    }
    appWindow.onResized(handler);
    appWindow.onMoved(handler);
  }, []);
  return isMax;
}

function WindowsHeader() {
  const isMax = useMaxmize();
  return (
    <Box
      data-tauri-drag-region=""
      className="tr-window__titlebar"
      sx={WindowsheaderSx}
    >
      {/* 右边是操作按钮 */}
      <div className="windows-titlebar">
        <div
          className="titlebar-button minimize-button"
          onClick={() => appWindow.minimize()}
        >
          <RemoveIcon />
        </div>
        {isMax ? (
          <div
            className="titlebar-button maximize-button"
            onClick={() => appWindow.toggleMaximize()}
          >
            <ContentCopyIcon />
          </div>
        ) : (
          <div
            className="titlebar-button remaximize-button"
            onClick={() => appWindow.toggleMaximize()}
          >
            <CropDinIcon />
          </div>
        )}

        <div
          className="titlebar-button close-button"
          onClick={() => appWindow.close()}
        >
          <CloseIcon />
        </div>
      </div>
    </Box>
  );
}
