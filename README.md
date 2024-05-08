# Tauri-React

tauri-react 是我在学习 tauri
过程中的一些尝试性的代码，觉得不错的我就沉淀下来写进项目中，为了将来有机会启动一个tauri项目做准备。

## 启动

- web端
```yarn dev```

- 桌面端
```yarn tauri dev```


## 基础功能实现

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
              mui 基于 emotion 本身提供了换肤方案
              <a
                href="https://mui.com/material-ui/customization/theming/"
              >
                Theming
              </a>
              ， 这里使用 RxDB 将这套换肤方案跨 window 和 持久化。
            </p>
          </li>
        </ul>

## 业务功能实现
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