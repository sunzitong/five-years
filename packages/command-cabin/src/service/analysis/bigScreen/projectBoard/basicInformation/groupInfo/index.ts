/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113950
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店基本信息-团队信息-参数
 */
export interface GroupInfoParams {
  /**
   * 门店分期ID
   */
  phId: string;
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
 * @updateAt 2021-9-10 3:26:25 ├F10: PM┤
 * @method GET
 */
export const fetchGroupInfo = (params: GroupInfoParams) => {
  return http.get<GroupInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation/groupInfo`,
    {
      ...params,
    }
  );
};
