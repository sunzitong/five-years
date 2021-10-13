/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114282
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 地区筛选（国家-大区-城市）-返回值
 */
export interface OrgTreeItemReturn {
  orgLevel: number;
  orgId: number;
  orgName: string;
  parentOrgId: number;
  isHidden: number;
  childList: ChildList[];
}

export interface ChildList {
  orgLevel: number;
  orgId: number;
  orgName: string;
  parentOrgId: number;
  childList: ChildList[] | null;
}

/**
 * 地区筛选（国家-大区-城市）
 * @createBy baishiqiang
 * @updateAt 2021/10/13 15:2:43
 * @method GET
 */
export const fetchOrgTree = (
  params?: Record<string, unknown>,
  options?: Partial<ServiceOptions>
) => {
  return http.get<OrgTreeItemReturn[]>(
    `${BASE_URL}/analysis/commandCabin/orgTree`,
    { ...params },
    { ...options }
  );
};
