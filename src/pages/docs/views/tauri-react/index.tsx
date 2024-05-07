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
  a: {
    fontSize: "14px",
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
        <ul>
          <li>
            <div>状态管理/数据持久化</div>
            <p>
              使用 RxDB 本身支持跨 window 状态更新的特性，并使用 IndexedDB 作为
              storage 存储，天然支持持久化
            </p>
          </li>
          <li>
            <div>HTML 渲染的 header/菜单</div>
            <p>
              因为桌面应用需要跨端 macos/linux/windows 运行，统一由内容 html
              去渲染 header 和 菜单 会有比较统一的观感，但此举需要使用 rust
              实现菜单中常用的 api（TODO）。
            </p>
            <p>
              ps:菜单部分也需要按操作系统来定制开发,例如 macos
              的菜单在系统栏，而 windows 的菜单在 header 底下，为 windows
              创建菜单观感不好，但为 macos
              创建菜单锦上添花（但这不包含在基础功能中）
            </p>
          </li>
          <li>
            <div>与外壳的交互</div>
            <p>
              在 web 端角度，外壳分 tauri Window / 浏览器 /
              移动端浏览器。为了适配更多外壳环境，抽离了一个 hybrid
              层完成与外壳的交互。
            </p>
            <p>
              而在 tauri 外壳的角度，参考 浏览器bom/app/小程序 提供的api，封装
              tauri 自己的 handler 交互，并与 web 端 hybrid 对接。
            </p>
          </li>
          <li>
            <div>Theme主题</div>
            <p>
              mui 基于 emotion 本身提供了换肤方案{" "}
              <a
                href="#"
                onClick={() =>
                  window.h5_bridge.openBrowser(
                    "https://mui.com/material-ui/customization/theming/"
                  )
                }
              >
                Theming
              </a>
              ， 这里使用 RxDB 将这套换肤方案跨 window 和 持久化。
            </p>
          </li>
        </ul>
        <Typography variant="subtitle1">业务功能实现</Typography>
        <ul>
          <li>
            <div>用户行为追踪</div>
            <p>
              针对此需求，开发了 tracking 模块，它是一个常用埋点需求的 api
              工具集，它包含了
              <ul>
                <li>
                  abstract 统一埋点接口：让多家埋点 sdk
                  可实现统一接口，让代码中的埋点代码更整洁
                </li>
                <li>
                  duration 时长统计：收集 page 组件的 show 事件，为 window
                  记录唯一的 show id 并在 id 切换时，统计时长。
                </li>
                <li>
                  linknode 页面溯源：收集 page 组件的 load 事件和路由的
                  state，维护一个 history 链表。
                </li>
              </ul>
            </p>
            <p>
              使用这些功能封装了 &lt;Page/&gt; 组件，让开发者只需传入 PageId
              即可实现 页面展示/页面停留 2个行为的日志记录
            </p>
            <p>
              ps:跨页由于是不同js运行环境，并且page组件也没有销毁，事件记录会有问题。目前只能分析数据时按照时间戳自己算。支不支持window的聚焦失焦再说。
            </p>
          </li>
          <li>
            <div>标签页</div>
            <p>
              例如 vscode apipost apifox
              等等应用都使用了标签页来管理路由页面，这里仿照 chrome
              样式实现了一个标签页
            </p>
          </li>
          <li>
            <div>Form</div>
            <p>TODO</p>
          </li>
          <li>
            <div>CRUD</div>
            <p>TODO</p>
          </li>
        </ul>
        <Typography variant="subtitle1">代码结构</Typography>
        <pre>{dir}</pre>
        <Typography variant="subtitle1">代码框架</Typography>
        <Typography variant="body1">
          <div>
            推荐的开发模式是:
            <p>
              <li>
                使用 router 组合不同层级的 view。最终的叶子节点，是 Page。
              </li>
              <li>
                着重于 Page 的开发，常用的页面，先归纳出 code-snippets 模板
              </li>
              <li>再用 components 去和模板组装 page 页面</li>
            </p>
          </div>
        </Typography>
        <Typography variant="subtitle1">多端适配</Typography>
        <Typography variant="body1">
          TODO，需要组织一下 rust
          代码，从【依赖】【函数】【类】【UI】等多个角度来适配
          macos/linux/windows，让代码易于维护
        </Typography>
      </DocContent>
    </Page>
  );
}

const dir = `
    |--.vscode                vscode配置文件/代码段
      |--*.code-snippets      某类代码段   
    |--src                    web 源代码
      |--@hybrid              hybrid 层,用来与外壳交互
      |--assets               资源
      |--components           react components
      |--contexts             react context
      |--db                   RxDB
        |--dao                存取函数
        |--hook               使用 dao 的 react hook
        |--schema             collection 结构       
      |--page                 页面
      |--routes               路由
      |--tracking             埋点模块
        |--impls              sdk 实现
        |--tool               工具
          |--abstract.ts      接口
          |--Agent.ts         接口
          |--duration.ts      时长统计
          |--LinkNode.ts      页面溯源
        |--page.wrapper.tsx   给Page组件提供埋点功能
      |--utils                工具  
    |--src-tauri              tauri 源代码
      |--src
        |--handlers           壳子交互
        |--setups             window初始化代码
        |--main.rs            入口文件(todo 入口并不应该有这么多代码)
      |--tauri.conf.json      配置文件
    |--types                  类型
`;
