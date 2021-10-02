/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店里程碑（不包含成本决算信息）-参数
 */
export interface MilepostParams {
  /**
   * 40306
   */
  orgId: unknown;
}

/**
 * 门店里程碑（不包含成本决算信息）-返回值
 */
export interface MilepostItemReturn {
  title: string;
  value: Value;
}

export interface Value {
  firstInvestmentTime?: Date;
  signingTime?: Date;
  structureFinishDate?: Date;
  mainFinishDate?: Date;
  transferImprovementDate?: Date;
  isIpd?: string;
  improvementStartDate?: Date;
  transferServiceDate?: Date;
  startCheckScore?: number;
  workDays?: number;
  fireControlType?: string;
  actualOpenDate?: Date;
  pointRentRatioToday?: number;
  id?: number;
  phId?: string;
  projectName?: string;
  approvedDate?: Date;
  targetCostNonTax?: number;
  dynamicCostNonTax?: number;
  costValLandSum?: number;
  budgetBalanceNoTax?: number;
}

/**
 * 门店里程碑（不包含成本决算信息）
 * @createBy baishiqiang
 * @updateAt 2021/9/30 18:8:26
 * @method GET
 */
export const fetchMilepost = (
  params: MilepostParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<MilepostItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation/milepost`,
    { ...params },
    { ...options }
  );
};
