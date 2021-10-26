import * as baseTools from "../tools";

/**
 * 传递给模版的辅助函数
 */
export const tools = { ...baseTools };

/**
 * express mock
 */
export default `
/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/{{=it.api.project_id}}/interface/api/{{=it.api._id}}
 *
 * {{=it.api.title}}
 * @createBy {{=it.api.username}}
 * @updateAt {{=it.tools.getUpdateTime(it.api)}}
 * @method {{=it.api.method}}
 */

exports.path = "{{=it.tools.getApiPath(it.api,true)}}";

exports.method = "{{=it.api.method}}";
{{
  if (
    it.api.res_body_type === "json" &&
    !it.api.res_body_is_json_schema &&
    it.api.res_body &&
    it.api.res_body.trim()
  ) {
}}
exports.response = {{=it.api.res_body}};
{{ } }}
`;
