# Vue2.x typescript 模板

*基于 vue-cli 4 生成*

---

**快捷清除mock i18n tests等文件和配置**
```sh
npm run clean
# or
yarn clean
```

---

1. api

   - 接口
   - axios 实例
   - `get` 和 `post`
   - 接口请求

2. assets

   - `style.scss` 全局样式
   - `bg-img.scss` 背景图样式,可以在 vue 文件中直接使用

3. router

   - `index.ts` 有获取当前城市的代码 可删除代码
   - `pipe.ts` 有获取活动信息的代码 可删除代码

4. store

   - 全局数据 **没有使用** `vuex`
   - `env` 的 `sn` 代表活动编号, 当前项目加了 `cityId` `cityName` 字段, 可以删除(在`router beforeEnter`中)
   - `env` 包含 `...process.env` ,在 mixins 或者 extends 之后,可以 在 vue 文件的 template 中使用
   - `act` 是活动信息, `status` 初始空字符串,有 'success' 'fail' 'loading' 3 种情况
   - `MixStore.ts` 用于组件继承, 把 `store` 混入到 vue 组件中, 代替 mixins 方案

5. utils

   - 包含一些 `@guanyu/guanyu-h5-tools` `@guanyu/h5-tools` 提供的方法
   - 包含一些常用的工具函数, 大部分都删除了, 用第三方工具库代替了
   - 如 `import isEmpty from "lodash/isEmpty"` 可以按需引入lodash

6. vue.config.js
   - `VUE_APP_ACT_NUM` 默认活动编号
