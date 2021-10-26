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
  req_headers: {
    desc: string;
    example: string;
    name: string;
    required: "1" | "0";
    _id: string;
  }[];
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
    filename: string;
  }[];
  /**
   * 项目token
   */
  token: string;
};
