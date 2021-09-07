/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-经营现状-舆情风险-参数
 */
export interface SentimentParams {
  /**
   * 组织级别：见公用枚举
   */
  dataLevel: string;

  /**
   * 组织id
   */
  levelId: number;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: string;
}

/**
 * 指挥中心-经营现状-舆情风险-返回值
 */
export interface SentimentReturn {
  redNum: number;
  yellowNum: number;
  numsByCity: NumsByCity[];
  numsByType: NumsByType[];
}

export interface NumsByCity {
  cityId: number;
  cityName: string;
  redNum: number;
  yellowNum: number;
}

export interface NumsByType {
  typeNum: number;
  num: number;
  ratio: number;
}

/**
 * 指挥中心-经营现状-舆情风险
 * @createBy wuyao
 * @updateAt 2021/9/3 上午11:29:39
 * @method GET
 */
export const fetchSentiment = (params: SentimentParams) => {
  return http.get<SentimentReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/managementSituation/sentiment`,
    {
      ...params,
    }
  );
};
