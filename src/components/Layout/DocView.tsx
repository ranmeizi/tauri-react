import Page from "@/components/Page";
import DarkModeSwitch from "@/pages/setting/components/DarkModeSwitch";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { invoke } from "@tauri-apps/api";

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
  return <Box sx={styleSheet}></Box>;
}
SettingsIcon;
function Header() {
  return (
    <Box className="header">
      <Typography variant="h4" component="h1">
        Truri-React
      </Typography>
      <Stack direction={"row"} gap={2} className="header__settings">
        <DarkModeSwitch />
        <IconButton
          onClick={() => {
            invoke("open_new_window", {
              url: "http://localhost:1420/w/mui",
              lebel: "window_config",
              height: 600,
              width: 400,
            }).then((res) => {
              console.log("open_new_window", res);
            });
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
