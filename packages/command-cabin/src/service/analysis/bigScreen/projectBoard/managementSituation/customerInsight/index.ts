/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/115336
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 客户洞察-参数
 */
export interface CustomerInsightParams {
  /**
   * 地区类型
   */
  dataLevel: unknown;

  /**
   * 地区id
   */
  levelId: number;

  /**
   * 数据范围（年累，月累）
   */
  dateScope: unknown;

  /**
   * 时间（如果是年累则为2020，若是月累则为2021-7格式）
   */
  date: unknown;

  /**
   * 门店分期id
   */
  phId: unknown;
}

/**
 * 客户洞察-返回值
 */
export interface CustomerInsightReturn {
  complaintRatio: number;
  receiveOrderTimelinessRatio: number;
  complaintDetails: ComplaintDetail[];
}

export interface ComplaintDetail {
  itemId: number;
  itemName: string;
  orderStatusSum: number;
}

/**
 * 客户洞察
 * @createBy zhangyao03
 * @updateAt 2021/10/21 11:4:9
 * @method GET
 */
export const fetchCustomerInsight = (
  params: CustomerInsightParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<CustomerInsightReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/managementSituation/customerInsight`,
    { ...params },
    { ...options }
  );
};
