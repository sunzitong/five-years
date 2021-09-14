/**
 * gyapi代码生成工具配置
 * 接口文档 http://docs.gyapt.cn/
 * token 在项目-设置-token配置中查找
 * 接口分类id 在url上查找cat_{分类id}
 * 接口id 在url上查找/interface/api/{接口id}
 */

export default {
  /**
   * 项目token
   */
  token: "85633e9f514a365577e0901919a0ea10942178f02cee9506dea950923d28e7ed",
  /**
   * 分类id
   */
  category_ids: [16724, 16731],
  /**
   * 接口id(不包含在分类id内的其他接口)
   */
  api_ids: [112036],
  /**
   * 代码模版
   * name 内置模版名称
   * output 生成文件的相对路径
   */
  template: [
    {
      name: "vue-service",
      output: "./src/service/",
      extname: ".ts",
      enable: true,
    },
    {
      name: "express-mock",
      output: "./mock/data/",
      extname: ".js",
      enable: true,
    },
  ],
};
