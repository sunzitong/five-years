import * as baseTools from "../tools";

/**
 * 传递给模版的辅助函数
 */
export const tools = { ...baseTools };

/**
 * vue模版service层
 */
export default `
/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/{{=it.api.project_id}}/interface/api/{{=it.api._id}}
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;
{{
  /* 名称相关 */
  const apiName = it.tools.getApiName(it.api);
  const apiPath = it.tools.getApiPath(it.api);
  /* 参数相关 */
  const paramsType = it.types.paramsType;
  /* 返回相关 */
  const returnType = it.types.returnType;
}}
{{?!paramsType.isUnknown}}
/**
 * {{=it.api.title}}-参数
 */
export interface {{=paramsType.typeName}} {
  {{~paramsType.parsedTypes:item}}
  {{?item.desc}}
  /**
   * {{=item.desc}}
   */{{?}}
  {{=item.name}}{{?!item.required}}?{{?}}: {{=item.type}};
  {{~}}
}
{{?}}

{{?paramsType.hasJsonType}}
{{=paramsType.jsonType}}
{{?}}

{{?returnType.hasJsonType}}
{{?returnType.jsonIsArray}}
/**
 * {{=it.api.title}}-返回值
 */{{?}}
{{=returnType.jsonType}}
{{?}}
/**
 * {{=it.api.title}}
 * @createBy {{=it.api.username}}
 * @updateAt {{=it.tools.getUpdateTime(it.api)}}
 * @method {{=it.api.method}}
 */
export const {{=apiName}} = (
  params{{?!paramsType.hasJsonType&&(paramsType.isOptional||paramsType.isUnknown)}}?{{?}}: {{?!paramsType.hasJsonType&&paramsType.isUnknown}}Record<string,unknown>{{??}}{{=paramsType.typeName}}{{?}}
) => {
  return http.{{=it.api.method.toLowerCase()}}<{{=returnType.typeName||returnType.primitiveType}}{{?returnType.jsonIsArray}}[]{{?}}>(\`$\{BASE_URL\}{{=apiPath}}\`, {
    ...params
  });
};
`;
