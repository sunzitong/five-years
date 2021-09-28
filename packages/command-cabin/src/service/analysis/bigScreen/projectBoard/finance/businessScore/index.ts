/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113952
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-综合经营指数-参数
 */
export interface BusinessScoreParams {
  /**
   * 门店分期ID
   */
  phId: string;
}

/**
 * 财务相关指标-综合经营指数-返回值
 */
export interface BusinessScoreReturn {
  lastMonthScore: TMonthScore;
  currentMonthScore: TMonthScore;
}

export interface TMonthScore {
  totalScore: number;
  creditScore: number;
  channelEffectScore: number;
  healthyScore: number;
  dataDate: Date;
}

/**
 * 财务相关指标-综合经营指数
 * @createBy huyanan
 * @updateAt 2021-9-10 3:26:15 ├F10: PM┤
 * @method GET
 */
export const fetchBusinessScore = (params: BusinessScoreParams) => {
  return http.get<BusinessScoreReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/finance/businessScore`,
    {
      ...params,
    }
  );
};
