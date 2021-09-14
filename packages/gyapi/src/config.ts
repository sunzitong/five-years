/**
 * 接口数据格式
 */
export interface Api {
  query_path: { path: string; params: unknown[] };
  edit_uid: number;
  status: "undone" | "done";
  type: "static" | "var";
  req_body_is_json_schema: boolean;
  res_body_is_json_schema: boolean;
  req_body_type?: "json" | "form" | "raw" | "file";
  req_body_other?: string;
  api_opened: boolean;
  index: number;
  tag: string[];
  _id: number;
  method: "GET" | "POST" | "UNKNOWN";
  catid: number;
  title: string;
  path: string;
  project_id: number;
  req_params: {
    desc: string;
    name: string;
    example?: string;
    _id: string;
  }[];
  res_body_type: "json" | "raw";
  uid: number;
  add_time: number;
  up_time: number;
  req_query: {
    required: "0" | "1";
    name: string;
    example: string;
    desc: string;
    _id: string;
  }[];
  req_headers: unknown[];
  req_body_form: {
    desc: string;
    example: string;
    name: string;
    required: "1" | "0";
    type: "file" | "text";
    _id: string;
  }[];
  __v: number;
  markdown: string;
  desc: string;
  res_body: string;
  username: string;
  basepath: string;
}
/**
 * 配置格式
 * http://docs.gyapt.cn/
 */
export type YApiConfig = {
  category_ids: number[];
  /**
   * 接口id(不包含在分类id内的其他接口)
   */
  api_ids: number[];
  /**
   * 模板
   */
  template: {
    name: string;
    output: string;
    enable: boolean;
    extname: string;
  }[];
  /**
   * 项目token
   */
  token: string;
};

/**
 * 项目配置demo
 */
// {
//   /**
//    * 项目token
//    */
//   token: "85633e9f514a365577e0901919a0ea10942178f02cee9506dea950923d28e7ed",
//   /**
//    * 分类id
//    */
//   // category_ids: [12058, 16379, 16418],
//   category_ids: [16418],
//   /**
//    * 代码模版
//    * name 对应template里的文件
//    * output 输出路径 相对路径
//    */
//   template: [
//     { name: "mock", output: "./output/", enable: false },
//     { name: "vue-service", output: "./output/service/", enable: true },
//   ],
// };
