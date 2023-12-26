# Tauri-React

## 主题切换

使用 @mui theme 和 styled 实现主题切换

## 组件

### TitleBar

窗口可拖拽的头部

### Page

功能页面
router element 的页面

#### search state

使用 router useSearchParams 固定 state 到 url

#### 拓展 tracking page wrapper

给 Page 添加埋点功能

### Window

主Window(主要窗体/弹出窗)

### MenuView

一级导航
带侧边栏的 RouterView

### TagView

二级导航
带页签的 RouterView

## TODO LIST

rust

- [x] 打开新窗口
- [x] 自定义窗口头部
- [ ] 多窗口/前后端状态同步(theme)
- [ ] 后端状态持久化
- [ ] ??

web

- [ ] Window Layout  
- [ ] Menu Layout
- [ ] TagView Layout
  - [ ] 标签页开发
- [ ] 尝试使用 rxdb 同步状态/ 状态管理(抛弃react-redux)
  - [ ] rx react的context 创建一个collection 作为配置表，context接收值，做系统级更新 (犹豫)
  - [ ] rx react的hoc 包裹一层响应式 props 作为组件更新，组件级更新 (看起来这样更合适)
- [ ] ??
