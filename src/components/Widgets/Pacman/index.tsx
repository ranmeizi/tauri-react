import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import "./style.less";

const points = Array(8)
  .fill(1)
  .map((_) => 1);

export default function Pacman() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "200px",
        fontSize: "10px",
      }}
    >
      <div className="pacman"></div>
      {points.map((item) => (
        <div className="path"></div>
      ))}
    </Box>
  );
}
