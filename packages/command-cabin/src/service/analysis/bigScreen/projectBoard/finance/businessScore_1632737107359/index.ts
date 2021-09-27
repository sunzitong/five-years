/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114772
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-财务指标达成与预估-图表数据-参数
 */
export interface BusinessScore1632737107359Params {
  /**
   * 门店分期ID
   */
  phId: string;
}

/**
 * 财务相关指标-财务指标达成与预估-图表数据-返回值
 */
export interface BusinessScore1632737107359Return {
  month1: Month[];
  month2: Month[];
  month3: Month[];
  year1: Year[];
  year2: Year[];
  year3: Year[];
}

export interface Month {
  profitRate: number;
  npiProfitRate: number;
  ycost: number;
  cashSum: number;
  openIncome: number;
  avgRate: number;
  avgPriece: number;
  priceIncrement: number;
  threeCost: number;
  marketExpense: number;
  operCost: number;
  manageCost: number;
  rental: number;
  dataType: string;
  dataNum: number;
}

export interface Year {
  cost: number;
  dataType: string;
  dataNum: number;
}

/**
 * 财务相关指标-财务指标达成与预估-图表数据
 * @createBy huyanan
 * @updateAt 2021/9/27 下午6:24:24
 * @method GET
 */
export const fetchBusinessScore1632737107359 = (
  params: BusinessScore1632737107359Params
) => {
  return http.get<BusinessScore1632737107359Return>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/finance/businessScore_1632737107359`,
    {
      ...params,
    }
  );
};
