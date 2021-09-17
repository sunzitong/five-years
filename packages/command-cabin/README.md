# 项目内约定规则

## 接口请求调用

1. 组件需要继承自@/views/Base.ts

2. Base会自动添加watch,有以下效果

   1. 自动声明loading empty等$data和formatValue() sepNumber()等常用的method
   2. 在this添加store全局数据
   3. 在全局参数(this.store.global)变化的时候响应,重新发送请求
   4. 更新管理组件和父级组件的$data.loading
   5. 根据接口字段自动设置数据来源展示

3. 组件需要做如下约定

   1. 请求接口的函数统一使用名称: `fetch`
   2. 使用useStore调用,传入service函数和参数(useStore是为了避免不同组件重复请求相同的接口)
   3. fetch函数需要 `return response;`

   

# Vue2.x typescript 模板

*基于 vue-cli 4 生成*

---

1. service

   - 接口
   - axios 实例
   - `get` 和 `post`
   - 支持路由参数url

2. assets

   - `style.scss` 全局样式
   - `bg-img.scss` 背景图样式,可以在 vue 文件中直接使用 `$bg-img-`前缀

3. router

   - `index.ts` ~~有获取当前城市的代码 已删除~~
   - `pipe.ts` ~~有获取活动信息的代码 已删除~~

4. store

   - 全局数据 **没有使用** `vuex`
   - ~~`env` 的 `sn` 代表活动编号, 可以加了 `cityId` `cityName` 等字段, 已删除(在`router beforeEnter`中)~~
   - `env` 包含 `...process.env` ,在 mixins 或者 extends 之后,可以 在 vue 文件的 template 中使用
   - ~~`act` 是活动信息, `status` 初始空字符串,有 'success' 'fail' 'loading' 3 种情况~~
   - `MixStore.ts` 用于组件继承, 把 `store` 注入到 vue 组件中, 代替 mixins 方案

5. utils

   - 包含一些 `@guanyu/guanyu-h5-tools` `@guanyu/h5-tools` 提供的方法
   - 包含一些常用的工具函数, 大部分都删除了, 用第三方工具库和 `@guanyu/shared` 代替了
   - 如 `import isEmpty from "lodash/isEmpty"` 可以按需引入lodash
   - `mitter` 是 `mitt` 的实例, 用来代替eventbus

6. vue.config.js
   - ~~`VUE_APP_ACT_NUM` 默认活动编号 已删除~~
   - `VUE_APP_` 前缀的常量都可以通过 `env` 访问

7. mock
   - `express` 搭建
   - 修改 `routes/*` 的代码结合 `app.js` 注册, mock自己的接口
   - **依赖需要单独安装**
   - 在主项目中执行 `npm run dev`, 同时启动mock和serve
