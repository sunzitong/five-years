/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114808
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-财务指标达成与预估-参数
 */
export interface FinanceLineParams {
  /**
   * 门店分期ID
   */
  phId: unknown;
}

/**
 * 财务相关指标-财务指标达成与预估-返回值
 */
export interface FinanceLineReturn {
  dataSource: string;
  updateTime: Date;
  month: number;
  year: number;
  transactionModel: string;
  infoMap: InfoMap;
}

export interface InfoMap {
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
  ycost?: number;
}

export interface Year {
  cost: number;
  ycost: number;
  dataType: string;
  dataNum: number;
}

/**
 * 财务相关指标-财务指标达成与预估
 * @createBy huyanan
 * @updateAt 2021/10/20 11:1:56
 * @method GET
 */
export const fetchFinanceLine = (
  params: FinanceLineParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<FinanceLineReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/finance/financeLine`,
    { ...params },
    { ...options }
  );
};
