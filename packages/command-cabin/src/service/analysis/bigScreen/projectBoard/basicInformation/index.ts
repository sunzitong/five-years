/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店里程碑（不包含成本决算信息）-参数
 */
export interface BasicInformationParams {
  /**
   * 40306
   */
  orgId: unknown;
}

/**
 * 门店里程碑（不包含成本决算信息）-返回值
 */
export interface BasicInformationReturn {
  firstInvestmentTime: string;
  signingTime: string;
  structureFinishDate: string;
  mainFinishDate: string;
  transferImprovementDate: string;
  isIpd: string;
  improvementStartDate: string;
  transferServiceDate: string;
  workDays: number;
  startCheckScore: number;
  fireControlType: string;
  actualOpenDate: string;
  pointRentRatioToday: number;
}

/**
 * 门店里程碑（不包含成本决算信息）
 * @createBy baishiqiang
 * @updateAt 2021-9-28 11:54:49 ├F10: AM┤
 * @method GET
 */
export const fetchBasicInformation = (params: BasicInformationParams) => {
  return http.get<BasicInformationReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation`,
    {
      ...params,
    }
  );
};
