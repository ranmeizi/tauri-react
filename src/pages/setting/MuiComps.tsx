import Page from "@/components/Page";
import { Box, SxProps, Theme, Typography, Divider } from "@mui/material";
import DarkModeSwitch from "./components/DarkModeSwitch";
import List from "./components/List";
import PrimaryPicker from "./components/PrimaryPicker";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".header": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "12px 0",
  },
  ".header__settings": {
    position: "absolute",
    left: "24px",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "mui-config";

export default function () {
  const introItems = [
    {
      label: "全局的config",
      field: (
        <Box>
          <Typography variant="body2">
            使用 rxdb
            进行状态管理，可实时的共享到多窗口，并且本身支持持久化，非常适合可以打开多窗口的tauri桌面应用。
          </Typography>
        </Box>
      ),
    },
  ];
  const configItems = [
    {
      label: "暗黑模式",
      field: <DarkModeSwitch component="switch" />,
    },
    {
      label: "主题色",
      field: <PrimaryPicker />,
    },
  ];
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      {/* 头部 */}
      <Box className="header">
        <Typography variant="h4" component="h1">
          Theme Config
        </Typography>
      </Box>
      <Divider></Divider>
      <Box sx={{ height: "100%", overflow: "scroll" }}>
        <Box sx={{ padding: 2 }}>
          <List items={introItems} />
        </Box>
        <Box sx={{ padding: 2 }}>
          <List items={configItems} />
        </Box>
      </Box>
    </Page>
  );
}
