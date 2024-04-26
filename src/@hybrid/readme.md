# @hybrid

整合一下各个黄精的 api 统一调用

## AbsHybrid

我希望能有统一的 hybrid api ，至少是我们自己定义统一的api，所以我在 @hybrid 中定义了一个抽象类 [AbsHybrid](./src/%40hybrid/hybrid.ts),将必要的 api 写在 AbsHybrid 中约束各端一定要实现这个 api  

## 个性化 hybrid api

除了必须实现的 api ，各端还应该有自己个性化的api，我在 @hybrid 文件夹下，用各端名称创建文件夹，其中的 class 受 AbsHybrid 约束，但私有的函数也会被 [bridge](./src/%40hybrid/hybrid.ts) 这个 Proxy 代理调用，不用担心各端没实现对应 api bridge 会抛出异常。

在这里开发请整合一下

1. 在各个app中的api  
2. 在微信浏览器的api
3. 在各个小程序中的api
4. 在浏览器中的api

也可以不整合
麻烦在你自己代码里单独调用
