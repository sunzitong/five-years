/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114956
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏-经营性支出-参数
 */
export interface OperatingExpensesParams {
  /**
   * 数据范围（年累，月累）
   */
  dateScope: unknown;

  /**
   * 分期id
   */
  phId: unknown;

  /**
   * 年累传2021，月累传2021-11格式
   */
  date: unknown;
}

/**
 * 门店屏-经营性支出-返回值
 */
export interface OperatingExpensesReturn {
  marketingExpense: number;
  marketingExpenseRatio: number;
  operatingCost: number;
  operatingCostRatio: number;
  managementCost: number;
  managementCostRatio: number;
  rentCost: number;
  rentCostRatio: number;
  allCost: number;
  allCostRatio: number;
  energyCost: number;
}

/**
 * 门店屏-经营性支出
 * @createBy zhangyao03
 * @updateAt 2021/10/21 15:35:20
 * @method GET
 */
export const fetchOperatingExpenses = (
  params: OperatingExpensesParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<OperatingExpensesReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/managementSituation/operatingExpenses`,
    { ...params },
    { ...options }
  );
};
