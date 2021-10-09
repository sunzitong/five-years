/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店里程碑-参数
 */
export interface MilepostParams {
  /**
   * 40033
   */
  orgId: unknown;
}

/**
 * 门店里程碑-返回值
 */
export interface MilepostReturn {
  transactionModel: string;
  transactionModelType: string;
  firstInvestmentTime: Date;
  signingTime: Date;
  structureFinishDate: Date;
  mainFinishDate: Date;
  transferImprovementDate: Date;
  isIpd: string;
  improvementStartDate: Date;
  transferServiceDate: Date;
  workDays: number;
  startCheckScore: number;
  fireControlType: string;
  actualOpenDate: Date;
  pointRentRatioToday: number;
  phId: string;
  projectName: string;
  approvedDate: Date;
  targetCostNonTax: number;
  dynamicCostNonTax: number;
  costValLandSum: number;
  budgetBalanceNoTax: number;
  dataFrom: string;
}

/**
 * 门店里程碑
 * @createBy baishiqiang
 * @updateAt 2021/10/9 9:36:13
 * @method GET
 */
export const fetchMilepost = (
  params: MilepostParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<MilepostReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation/milepost`,
    { ...params },
    { ...options }
  );
};
