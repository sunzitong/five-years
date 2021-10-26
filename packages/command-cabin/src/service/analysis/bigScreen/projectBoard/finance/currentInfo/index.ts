/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114920
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-当前投资实现情况-参数
 */
export interface CurrentInfoParams {
  /**
   * 门店分期ID
   */
  phId: unknown;
}

/**
 * 财务相关指标-当前投资实现情况-返回值
 */
export interface CurrentInfoReturn {
  dataSource: string;
  updateTime: Date;
  month: number;
  transactionModel: string;
  list: List[];
}

export interface List {
  quota: string;
  graduation: string;
  reality: string;
  diff: string;
}

/**
 * 财务相关指标-当前投资实现情况
 * @createBy huyanan
 * @updateAt 2021/10/9 16:1:24
 * @method GET
 */
export const fetchCurrentInfo = (
  params: CurrentInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<CurrentInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/finance/currentInfo`,
    { ...params },
    { ...options }
  );
};
