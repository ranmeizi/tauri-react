import Page from "@/components/Page";
import { SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import DocContent from "../../components/DocContent";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";

const styleSheet: SxProps<Theme> = (theme) => ({
  ".lib-title": {
    fontWeight: "bold",
    marginRight: "6px",
  },
  ".slogan": {
    fontSize: "12px",
    color: theme.palette.grey[500],
    margin: "0 6px",
  },
  ".MuiTypography-body1": {
    textIndent: "2em",
  },
  ".MuiTypography-h3,.MuiTypography-h4,.MuiTypography-h5,.MuiTypography-h6,.MuiTypography-subtitle1":
    {
      fontWeight: "bold",
      margin: "12px 0",
    },
});

const libs = [
  {
    title: "Tauri",
    slogan: "构建跨平台的快速、安全、前端隔离应用",
    link: "https://tauri.app/zh-cn/",
  },
  {
    title: "React",
    slogan: "用于构建 Web 和原生交互界面的库",
    link: "https://react.docschina.org/",
  },
  {
    title: "React-Router",
    slogan: "React 路由解决方案",
    link: "https://reactrouter.com/en/main",
  },
  {
    title: "RxDB",
    slogan: "JavaScript应用程序的本地数据库",
    link: "https://rxdb.info/",
  },
  {
    title: "Rust",
    slogan: "一门赋予每个人构建可靠且高效软件能力的语言",
    link: "https://www.rust-lang.org/zh-CN/",
  },
  {
    title: "MUI",
    slogan: "为React增效的UI工具库",
    link: "https://mui.com/",
    recommend: true,
  },
  {
    title: "React Hook Form",
    slogan: "高性能、灵活且可扩展的表单以及易于使用的验证",
    link: "https://react-hook-form.com/",
    recommend: true,
  },
  {
    title: "Framer Motion",
    slogan: "高质量的React动效库",
    link: "https://www.framer.com/motion/",
    recommend: true,
  },
];

/** 用于埋点的 pageId (必须) */
const PAGE_ID = "doc-index";

// 外链
function externalLink(url: string) {
  return () => window.h5_bridge.openBrowser(url);
}

export default function DocTauriReact() {
  return (
    <Page pageId={PAGE_ID} sx={styleSheet}>
      <DocContent>
        <Typography variant="h3">Tauri React</Typography>
        <Typography variant="body1">
          tauri-react 是我在学习 tauri
          过程中的一些尝试性的代码，觉得不错的我就沉淀下来写进项目中，为了将来有机会启动一个tauri项目做准备。
        </Typography>

        <Typography variant="subtitle1">三方库及文档汇总</Typography>
        <Typography variant="body1">
          基础功能实现用的三方库文档，以及推荐使用的开发库
        </Typography>
        <ul>
          {libs.map((item) => (
            <li>
              <span className="lib-title">
                {item.title}
                {item.recommend && (
                  <RecommendOutlinedIcon
                    style={{
                      fontSize: "16px",
                      color: "orange",
                      margin: "0 4px",
                    }}
                  />
                )}
                <span className="slogan">{item.slogan}</span>:
              </span>
              <a href="#" onClick={externalLink(item.link)}>
                文档链接
              </a>
            </li>
          ))}
        </ul>

        <Typography variant="subtitle1">基础功能实现</Typography>
        <Typography variant="subtitle1">业务功能实现</Typography>
        <ul>
          <li>用户行为追踪</li>
        </ul>
        <Typography variant="subtitle1">代码结构</Typography>
        <Typography variant="subtitle1">代码框架</Typography>
        <Typography variant="subtitle1">多端适配</Typography>

        <Typography variant="subtitle1">未完成</Typography>
      </DocContent>
    </Page>
  );
}
