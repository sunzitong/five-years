/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114600
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 成本分析模块-参数
 */
export interface CostAnalysisParams {
  /**
   * 地区类型
   */
  orgType: unknown;

  /**
   * 地区id
   */
  orgId: number;

  /**
   * 年累
   */
  dateScope: unknown;

  /**
   * 年份（只有年份级别）
   */
  date: number;
}

/**
 * 成本分析模块-返回值
 */
export interface CostAnalysisReturn {
  updateTime: Date;
  dataSource: string;
  riskItemNum: number;
  allItemDiff: number;
  costAnalysisModelList: CostAnalysisModelList[];
}

export interface CostAnalysisModelList {
  id: number;
  phId: string;
  projectName: string;
  dynamicCostNonTax: number;
  targetCostNonTax: number;
  diff: number;
}

/**
 * 成本分析模块
 * @createBy zhangyao03
 * @updateAt 2021/10/21 10:0:44
 * @method GET
 */
export const fetchCostAnalysis = (
  params: CostAnalysisParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<CostAnalysisReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/costAnalysis`,
    { ...params },
    { ...options }
  );
};
