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
  dataLevel: number;

  /**
   * 组织id
   */
  levelId: number;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: number;
}

/**
 * 指挥中心-经营现状-舆情风险-返回值
 */
export interface SentimentReturn {
  redNum: number;
  yellowNum: number;
  numsByDate: NumsByDate[];
  numsByType: NumsByType[];
}

export interface NumsByDate {
  date: string;
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
 * @updateAt 2021/9/1 下午8:01:57
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
