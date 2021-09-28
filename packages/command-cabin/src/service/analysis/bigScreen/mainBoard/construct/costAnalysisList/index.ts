/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114602
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 成本分析详情列表-参数
 */
export interface CostAnalysisListParams {
  /**
   * 地区类型
   */
  regionType: unknown;

  /**
   * 地区id
   */
  regionId: number;

  /**
   * 开始目标成本上线时间
   */
  approvedDateFrom: unknown;

  /**
   * 结束目标成本上线时间
   */
  approvedDateTo: unknown;

  /**
   * 目标成本差异是否有风险
   */
  isRisk?: boolean;
}

/**
 * 成本分析详情列表-返回值
 */
export interface CostAnalysisListItemReturn {
  id: number;
  phId: string;
  projectName: string;
  cityId: string;
  city: string;
  approvedDate: Date;
  dynamicCostNonTax: number;
  targetCostNonTax: number;
  diff: number;
}

/**
 * 成本分析详情列表
 * @createBy zhangyao03
 * @updateAt 2021/9/24 上午10:37:14
 * @method GET
 */
export const fetchCostAnalysisList = (params: CostAnalysisListParams) => {
  return http.get<CostAnalysisListItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/costAnalysisList`,
    {
      ...params,
    }
  );
};
