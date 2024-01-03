import Page from "@/components/Page";
import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".title": {
    fontSize: "32px",
    fontWeight: "bold",
  },
  ".content": {
    color: "#ccc",
  },
});

export default function () {
  return (
    <Box sx={styleSheet}>
      <div className="title">功能页</div>
      <div className="content">内容和cssinjs</div>
    </Box>
  );
}
