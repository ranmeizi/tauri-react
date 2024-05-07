import Page from "@/components/Page";
import {
  Container,
  SxProps,
  Theme,
  Typography,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Pacman from "@/components/Widgets/Pacman";
import CloseIcon from "@mui/icons-material/Close";
import { invoke } from "@tauri-apps/api/tauri";
import DocContent from "../../components/DocContent";

const WINDOW_SIZE = {
  config: { height: 600, width: 400 },
  default: { height: 600, width: 800 },
};

const styleSheet: SxProps<Theme> = (theme) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "doc-example";

const get_examples = (): ExampleItem[] => [
  {
    title: "标签页",
    desc: "chrome风格的标签页",
    url: "/w/t/page-a",
    features: window.h5_bridge.utils.features.encode({
      ...WINDOW_SIZE.default,
      label: "chrome_tag_view",
    }),
  },
  {
    title: "hybrid",
    desc: "与外壳交互",
    url: "/",
  },
  {
    title: "主题切换",
    desc: "定义 和 使用 mui theme",
    url: "/w/mui",
    features: window.h5_bridge.utils.features.encode({
      ...WINDOW_SIZE.config,
      label: "window_config",
    }),
  },
  {
    title: "路由过渡动画",
    desc: "使用router6 和 framer 实现路由过渡动画",
    url: "/w/tr/example/router-transition/direction/page1",
    features: window.h5_bridge.utils.features.encode({
      ...WINDOW_SIZE.default,
      label: "router_transition",
    }),
  },
  {
    title: "framer动画",
    desc: "使用 framer 进场动画",
    url: "/w/tr/example/router-transition/mobile/page1",
    features: window.h5_bridge.utils.features.encode({
      ...WINDOW_SIZE.default,
      label: "router_transition_mobile",
    }),
  },
  {
    title: "Rxdb数据存储",
    desc: "响应式，持久化的数据存储",
    url: "/w/mui",
    features: window.h5_bridge.utils.features.encode({
      ...WINDOW_SIZE.config,
      label: "window_config",
    }),
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
    url: "/w/tracking-log",
    features: window.h5_bridge.utils.features.encode({
      ...WINDOW_SIZE.default,
      label: "window_config",
    }),
  },
];

export default function DocExamples() {
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <DocContent>
        <Container fixed sx={{ flex: 1, overflow: "scroll" }}>
          <Typography variant="h6" sx={{ marginTop: "12px" }}>
            示例
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: "24px" }}>
            {get_examples().map((item) => (
              <Grid key={item.title} item lg={2} md={4} sm={6}>
                <ExampleCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </DocContent>
    </Page>
  );
}

type ExampleItem = {
  title: string;
  desc: string;
  url?: string;
  features?: string;
  action?: (apis: any) => void;
};

function ExampleCard({ title, desc, url, action, features }: ExampleItem) {
  const [header, setHeader] = useState<ReactNode>(null);

  function handleClick() {
    console.log(url, "uuuu");
    if (url) {
      window.h5_bridge.openWindow(url, "_blank", features);
    }

    if (action) {
      action({ setWindowHeader });
    }
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
