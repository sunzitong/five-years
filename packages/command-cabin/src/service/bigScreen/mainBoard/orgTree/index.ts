/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 地区筛选（全国-大区-地区-城市）-返回值
 */
export interface OrgTreeReturn {
  orgLevel: number;
  orgName: string;
  orgId: number;
  parentOrgId: number;
  childList?: OrgTreeReturn[];
}

/**
 * 地区筛选（全国-大区-地区-城市）
 * @createBy baishiqiang
 * @updateAt 2021/9/9 下午1:58:17
 * @method GET
 */
export const fetchOrgTree = (params?: Record<string, unknown>) => {
  return http.get<OrgTreeReturn>(`${BASE_URL}/bigScreen/mainBoard/orgTree`, {
    ...params,
  });
};
