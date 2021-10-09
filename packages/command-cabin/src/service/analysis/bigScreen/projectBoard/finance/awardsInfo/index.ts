/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114944
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-奖补到账-参数
 */
export interface AwardsInfoParams {
  /**
   * 门店分期ID
   */
  phId: unknown;
}

/**
 * 财务相关指标-奖补到账-返回值
 */
export interface AwardsInfoReturn {
  dataSource: string;
  updateTime: Date;
  awards: number;
}

/**
 * 财务相关指标-奖补到账
 * @createBy huyanan
 * @updateAt 2021/10/9 15:57:12
 * @method GET
 */
export const fetchAwardsInfo = (
  params: AwardsInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<AwardsInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/finance/awardsInfo`,
    { ...params },
    { ...options }
  );
};
