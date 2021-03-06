/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113950
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店基本信息-团队信息-参数
 */
export interface GroupInfoParams {
  /**
   * 门店分期ID
   */
  phId: unknown;
}

/**
 * 门店基本信息-团队信息-返回值
 */
export interface GroupInfoReturn {
  businessGroups: Group[];
  designGroups: Group[];
  constructGroups: Group[];
}

export interface Group {
  person: string;
  tel: string;
  specialty: string;
  company: null | string;
}

/**
 * 门店基本信息-团队信息
 * @createBy huyanan
 * @updateAt 2021/9/10 15:26:25
 * @method GET
 */
export const fetchGroupInfo = (
  params: GroupInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<GroupInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation/groupInfo`,
    { ...params },
    { ...options }
  );
};
