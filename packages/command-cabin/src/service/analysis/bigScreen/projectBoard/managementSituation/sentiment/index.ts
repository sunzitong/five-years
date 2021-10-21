/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113600
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏幕-经营现状-舆情风险-参数
 */
export interface SentimentParams {
  /**
   * 门店id
   */
  projectId: number;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: unknown;

  /**
   * 时间
   */
  date: unknown;
}

/**
 * 门店屏幕-经营现状-舆情风险-返回值
 */
export interface SentimentReturn {
  redNum: number;
  yellowNum: number;
  numsByType: NumsByType[];
}

export interface NumsByType {
  typeNum: string;
  num: number;
  ratio: number;
}

/**
 * 门店屏幕-经营现状-舆情风险
 * @createBy wuyao
 * @updateAt 2021/10/21 16:49:31
 * @method GET
 */
export const fetchSentiment = (
  params: SentimentParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<SentimentReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/managementSituation/sentiment`,
    { ...params },
    { ...options }
  );
};
