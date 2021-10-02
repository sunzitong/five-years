/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114928
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 切换角色-参数
 */
export interface SwitchRoleParams {
  /**
   * 用户ID
   */
  userId: unknown;

  /**
   * 角色ID
   */
  roleId: number;

  /**
   * oms
   */
  source: unknown;
}

/**
 * 切换角色-返回值
 */
export interface SwitchRoleReturn {
  idmToken: string;
  token: string;
  userName: string;
  needChangePassword: boolean;
  authority: any[];
  roleFlag: boolean;
}

/**
 * 切换角色
 * @createBy xiejiabin
 * @updateAt 2021/10/2 14:59:4
 * @method POST
 */
export const fetchSwitchRole = (params: SwitchRoleParams) => {
  return http.post<SwitchRoleReturn>(`${BASE_URL}/auth/switchRole`, {
    ...params,
  });
};
