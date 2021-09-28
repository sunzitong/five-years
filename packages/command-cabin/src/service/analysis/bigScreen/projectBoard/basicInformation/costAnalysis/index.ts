/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114606
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 成本决算信息-参数
 */
export interface CostAnalysisParams {
  /**
   * 项目分期id
   */
  phId: unknown;
}

/**
 * 成本决算信息-返回值
 */
export interface CostAnalysisReturn {
  id: number;
  phId: string;
  projectName: string;
  approvedDate: Date;
  targetCostNonTax: number;
  dynamicCostNonTax: number;
  costValLandSum: number;
  budgetBalanceNoTax: number;
}

/**
 * 成本决算信息
 * @createBy zhangyao03
 * @updateAt 2021-9-22 2:23:38 ├F10: PM┤
 * @method GET
 */
export const fetchCostAnalysis = (params: CostAnalysisParams) => {
  return http.get<CostAnalysisReturn>(
    `${BASE_URL}/analysis//bigScreen/projectBoard/basicInformation/costAnalysis`,
    {
      ...params,
    }
  );
};
