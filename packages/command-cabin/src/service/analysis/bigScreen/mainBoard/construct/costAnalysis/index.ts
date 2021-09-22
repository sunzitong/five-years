/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114600
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 成本分析模块-参数
 */
export interface CostAnalysisParams {
  /**
   * 地区类型
   */
  regionType: string;

  /**
   * 地区id
   */
  regionId: number;
}

/**
 * 成本分析模块-返回值
 */
export interface CostAnalysisReturn {
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
  useRate: number;
}

/**
 * 成本分析模块
 * @createBy zhangyao03
 * @updateAt 2021/9/22 下午3:41:46
 * @method GET
 */
export const fetchCostAnalysis = (params: CostAnalysisParams) => {
  return http.get<CostAnalysisReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/costAnalysis`,
    {
      ...params,
    }
  );
};
