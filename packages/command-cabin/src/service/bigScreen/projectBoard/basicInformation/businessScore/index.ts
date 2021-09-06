/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-综合经营指数-参数
 */
export interface BusinessScoreParams {
  /**
   * 门店ID
   */
  projectId: number;
}

/**
 * 财务相关指标-综合经营指数-返回值
 */
export interface BusinessScoreReturn {
  totalScore: number;
  creditScore: number;
  channelEffectScore: number;
  healthyScore: number;
}

/**
 * 财务相关指标-综合经营指数
 * @createBy huyanan
 * @updateAt 2021/9/6 上午10:26:05
 * @method GET
 */
export const fetchBusinessScore = (params: BusinessScoreParams) => {
  return http.get<BusinessScoreReturn>(
    `${BASE_URL}/bigScreen/projectBoard/basicInformation/businessScore`,
    {
      ...params,
    }
  );
};
