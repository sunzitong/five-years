# 安装

## 源代码安装

```sh
git clone http://git.longhu.net/c3-guanyu/fe/fe-h5/toch5.git
git checkout deploy/command-cabin
cd toch5/packages/gyapi
npm link
```

## npm私服安装

*TODO*

# 使用



1. 切换到项目代码目录
2. 创建.gyapirc配置文件
    - 支持`.gyapirc`,`.gyapirc.json`,`.gyapirc.js`,`.gyapirc.ts(建议)`文件
3. 执行`gyapi`指令
   - 建议在package.json的scripts选项中配置`gyapi`指令
   
   

## .gyapirc.ts 示例

```typescript
/**
 * gyapi代码生成工具配置
 * @接口文档 http://docs.gyapt.cn/
 * @token 在项目-设置-token配置中查找
 * @接口分类id 在url上查找cat_{分类id}
 * @接口id 在url上查找/interface/api/{接口id}
 */

export default {
  /**
   * 项目token
   */
  token: "",
  /**
   * 分类id
   */
  category_ids: [],
  /**
   * 接口id(不包含在分类id内的其他接口)
   */
  api_ids: [],
  /**
   * 代码模版
   * @name 内置模版名称
   * @output 生成文件的相对路径
   * @enable 是否启用
   */
  template: [
    // service代码模版，主要包含请求接口的代码、参数和返回值类型。
    {
      name: "vue-service",
      output: "./src/service/",
      filename: "index.ts",
      enable: true,
    },
    // mock代码模版，导出接口内容，mock功能需要自己实现(比如express)
    {
      name: "express-mock",
      output: "./mock/data/",
      filename: "index.js",
      enable: true,
    },
    // 枚举代码，根据命名识别公共枚举接口，根据接口文档生成枚举代码
    // (硬编码，以接口文档为准，不会判断接口的实际返回值)
    {
      name: "typescript-enums",
      output: "./src/service/",
      filename: "enums.ts",
      enable: true,
    },
  ],
};

```






# 附录

## *yapi open api*

>- /api/project/get [获取项目基本信息]
>- /api/interface/getCatMenu [获取所有分类]
>- /api/interface/list_menu [获取所有分类和接口]
>- /api/interface/list [获取接口列表分页]
>- /api/interface/list_cat [获取某个分类下接口列表分页]
>- /api/interface/get [获取接口详情]
