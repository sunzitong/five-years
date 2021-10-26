/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114926
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 解析token-返回值
 */
export interface TokenReturn {
  userId: number;
  userName: string;
  phone: string;
  roleId: number;
  departmentIds: number[];
  cityDepartmentIds: number[];
  departmentType: string;
  projectIds: number[];
  authorities: string[];
  modules: string[];
  cityIds: number[];
  oaAccount: string;
  enterpriseId: number;
  userRoleOrgs: UserRoleOrg[];
  all: boolean;
}

export interface UserRoleOrg {
  roleId: number;
  roleName: string;
  crossPos: number;
  dmFlag: number;
  departmentType: null;
  organizationInfos: OrganizationInfo[];
  primaryRole: boolean;
}

export interface OrganizationInfo {
  id: number;
  parentId: number;
  name: string;
  orgType: null;
  outId: null;
}

/**
 * 解析token
 * @createBy xiejiabin
 * @updateAt 2021/10/2 15:3:23
 * @method GET
 */
export const fetchToken = (
  params?: Record<string, unknown>,
  options?: Partial<ServiceOptions>
) => {
  return http.get<TokenReturn>(
    `${BASE_URL}/auth/token`,
    { ...params },
    { ...options }
  );
};
