import * as baseTools from "../tools";

/**
 * 传递给模版的辅助函数
 */
export const tools = { ...baseTools };

/**
 * vue模版service层
 */
export default `
{{?it.tools.isEnumApi(it.api)}}
/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/{{=it.api.project_id}}/interface/api/{{=it.api._id}}
 */
{{
  const record = it.tools.formatEnumData(it.api);
}}
{{ for(var name in record) { }}
/**
 * 枚举-{{=name}}
 */
export enum {{=name}} {
  {{
    const list = record[name];
  }}
  {{~list:item}}
  /**
   * {{=it.tools.getEnumLabel(item)}}
   */
  {{=it.tools.getEnumValue(item)}}="{{=it.tools.getEnumValue(item)}}",
  {{~}}
}
{{ } }}

{{?}}
`;
