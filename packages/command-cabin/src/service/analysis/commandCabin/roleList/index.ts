/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/115016
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 获取角色列表-返回值
 */
export type RoleListItemReturn = number;

/**
 * 获取角色列表
 * @createBy huyanan
 * @updateAt 2021/10/13 12:32:55
 * @method GET
 */
export const fetchRoleList = (
  params?: Record<string, unknown>,
  options?: Partial<ServiceOptions>
) => {
  return http.get<RoleListItemReturn[]>(
    `${BASE_URL}/analysis/commandCabin/roleList`,
    { ...params },
    { ...options }
  );
};
