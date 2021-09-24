/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114572
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏幕-经营现状-收入量价情况-参数
 */
export interface IncomeParams {
  /**
   * 门店id
   */
  projectId: number;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: string;
}

/**
 * 门店屏幕-经营现状-收入量价情况-返回值
 */
export interface IncomeReturn {
  updateAt: Date;
  totalIncome: number;
  totalFinishLimit: number;
  guanyuIncome: number;
  guanyuFinishLimit: number;
  coWorkingIncome: number;
  coWorkingFinishLimit: number;
  commerceIncome: number;
  commerceFinishLimit: number;
  incrementAndParkIncome: number;
  incrementAndParkFinishLimit: number;
  contractSporadicIncome: number;
  avgRentRatio: number;
  pointRentRatio: number;
  rentRatioYoy: number;
  avgRenewRatio: number;
  renewRatioYoy: number;
  avgPrice: number;
  avgPriceYoy: number;
}

/**
 * 门店屏幕-经营现状-收入量价情况
 * @createBy wuyao
 * @updateAt 2021/9/24 下午2:36:38
 * @method GET
 */
export const fetchIncome = (params: IncomeParams) => {
  return http.get<IncomeReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/managementSituation/income`,
    {
      ...params,
    }
  );
};
