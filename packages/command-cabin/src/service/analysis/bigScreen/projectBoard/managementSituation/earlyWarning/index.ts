/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114792
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏幕-分险预警-参数
 */
export interface EarlyWarningParams {
  /**
   * 门店id
   */
  projectId: number;

  /**
   * 预警阶段：见公用枚举
   */
  stage: unknown;

  /**
   * 风险程度：1=一个红灯。。。
   */
  riskDegree: unknown;
}

/**
 * 门店屏幕-分险预警-返回值
 */
export interface EarlyWarningItemReturn {
  id: number;
  orderId: number;
  projectId: number;
  projectName: string;
  stage: string;
  stageDesc: string;
  type: string;
  typeDesc: string;
  detail: string;
  riskDegree: number;
}

/**
 * 门店屏幕-分险预警
 * @createBy wuyao
 * @updateAt 2021/10/13 15:12:33
 * @method GET
 */
export const fetchEarlyWarning = (
  params: EarlyWarningParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<EarlyWarningItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/managementSituation/earlyWarning`,
    { ...params },
    { ...options }
  );
};
