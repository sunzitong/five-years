/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 所有门店列表-返回值
 */
export interface ProjectListItemReturn {
  groupOrgId: number;
  groupName: string;
  areaId: number;
  areaName: string;
  regionId: number;
  regionName: string;
  cityId: number;
  cityName: string;
  projectId: number;
  projectName: string;
  phId: string;
  optStatus: string;
  transactionModel: string;
  openMonth: number;
  orgId: number;
  areaOrgId: number;
  regionOrgId: number;
  cityOrgId: number;
}

/**
 * 所有门店列表
 * @createBy baishiqiang
 * @updateAt 2021/9/9 下午2:28:23
 * @method GET
 */
export const fetchProjectList = (params?: Record<string, unknown>) => {
  return http.get<ProjectListItemReturn[]>(
    `${BASE_URL}/commandCabin/projectList`,
    {
      ...params,
    }
  );
};
