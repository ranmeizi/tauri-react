import Page from "@/components/Page";
import {
  Container,
  Divider,
  SxProps,
  Theme,
  Typography,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Pacman from "@/components/Widgets/Pacman";
import CloseIcon from "@mui/icons-material/Close";
import { invoke } from "@tauri-apps/api/tauri";
import DarkModeSwitch from "./setting/components/DarkModeSwitch";

const styleSheet: SxProps<Theme> = (theme) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  ".header": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "12px 0",
  },
  ".header__settings": {
    position: "absolute",
    right: "24px",
  },
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "homepage";

const examples: ExampleItem[] = [
  {
    title: "标签页",
    desc: "chrome风格的标签页",
    link: "/w/t/page-a",
  },
  {
    title: "hybrid",
    desc: "与外壳交互",
    link: "/",
  },
  {
    title: "主题切换",
    desc: "定义 和 使用 mui theme",
    link: "/w/mui",
  },
  {
    title: "路由过渡动画",
    desc: "使用router6 和 framer 实现路由过渡动画",
    link: "/w/tr/example/router-transition/direction/page1",
  },
  {
    title: "framer动画",
    desc: "使用 framer 进场动画",
    link: "/w/tr/example/router-transition/mobile/page1",
  },
  {
    title: "Rxdb数据存储",
    desc: "响应式，持久化的数据存储",
    action: () => {
      invoke("open_new_window", {
        url: "http://localhost:1420/w/mui",
        lebel: "window_rxdb_example",
        height: 600,
        width: 400,
      });
    },
  },
  {
    title: "html绘制的头部",
    desc: "保留原始功能按钮，拖拽",
    action: ({ setWindowHeader }) => {
      // 设置头部
      setWindowHeader(
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "250px",
          }}
        >
          <Pacman />
          <IconButton
            size="small"
            onClick={() => setWindowHeader(null)}
            sx={{ marginLeft: "12px" }}
          >
            <CloseIcon sx={{ fontSize: "8px" }} />
          </IconButton>
        </Box>
      );
    },
  },
  {
    title: "用户行为追踪",
    desc: "页面/点击 事件日志",
    action: () => {
      invoke("open_new_window", {
        url: "http://localhost:1420/w/tracking-log",
        lebel: "window_tracking_log",
        height: 800,
        width: 960,
      });
    },
  },
];

export default function () {
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
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

      <Divider></Divider>
      <Container fixed sx={{ flex: 1, overflow: "scroll" }}>
        <Typography variant="h6" sx={{ marginTop: "12px" }}>
          Example
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: "24px" }}>
          {examples.map((item) => (
            <Grid key={item.title} item lg={2} md={4} sm={6}>
              <ExampleCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

type ExampleItem = {
  title: string;
  desc: string;
  link?: string;
  action?: (apis: any) => void;
};

function ExampleCard({ title, desc, link, action }: ExampleItem) {
  const navigate = useNavigate();
  const [header, setHeader] = useState<ReactNode>(null);

  function handleClick() {
    if (link) {
      return navigate(link);
    }

    action && action({ setWindowHeader });
  }

  function setWindowHeader(node: ReactNode) {
    setHeader(
      createPortal(node, document.querySelector(".tr-window__titlebar")!)
    );
  }

  return (
    <Card
      sx={{
        height: "110px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {header}
      <CardContent sx={{ padding: "8px" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: "14px" }}
          component="div"
          color="text.secondary"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "12px", maxHeight: "45px", overflow: "scroll" }}
        >
          {desc}
        </Typography>
      </CardContent>
      <Button onClick={handleClick} sx={{ fontSize: "12px" }}>
        Click me
      </Button>
    </Card>
  );
}
