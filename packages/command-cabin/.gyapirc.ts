export default {
  /**
   * 项目token
   */
  token: "85633e9f514a365577e0901919a0ea10942178f02cee9506dea950923d28e7ed",
  /**
   * 分类id
   */
  category_ids: [16724],
  /**
   * 接口id(不包含在分类id内的其他接口)
   */
  api_ids: [112036],
  /**
   * 代码模版
   * name 对应template里的文件
   * output 输出路径 相对路径
   */
  template: [{ name: "vue-service", output: "./src/service/", enable: true }],
};
