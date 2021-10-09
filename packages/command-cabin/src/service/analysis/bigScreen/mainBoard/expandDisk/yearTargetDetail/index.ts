/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114838
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面详情-年度目标表-参数
 */
export interface YearTargetDetailParams {
  /**
   * GROUP:全国；AREA:大区；CITY:城市；
   */
  orgType: unknown;

  /**
   * 组织ID
   */
  orgId: number;

  /**
   * 开始年份，默认当年
   */
  startYear?: number;

  /**
   * 结束年份，默认当年
   */
  endYear?: number;

  /**
   * 第几页，默认1
   */
  pageNum?: number;

  /**
   * 每页数据量，默认10
   */
  pageSize?: number;
}

/**
 * 拓展盘面详情-年度目标表-返回值
 */
export interface YearTargetDetailReturn {
  total: number;
  pages: number;
  pageSize: number;
  pageNum: number;
  list: List[];
  orders: any[];
  limit: number;
  start: number;
  previousNumber: number;
  nextNumber: number;
  firstNumber: number;
  lastNumber: number;
}

export interface List {
  id: number;
  year: string;
  city: string;
  targetNumber: number;
  annualOpeningTarget: number;
}

/**
 * 拓展盘面详情-年度目标表
 * @createBy baishiqiang
 * @updateAt 2021/10/8 18:41:7
 * @method GET
 */
export const fetchYearTargetDetail = (
  params: YearTargetDetailParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<YearTargetDetailReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/yearTargetDetail`,
    { ...params },
    { ...options }
  );
};
