/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114788
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-异常预警-参数
 */
export interface EarlyWarningParams {
  /**
   * 组织级别：见公用枚举
   */
  dataLevel: unknown;

  /**
   * 组织id
   */
  levelId: number;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: unknown;

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
 * 指挥中心-异常预警-返回值
 */
export interface EarlyWarningItemReturn {
  orderId?: number;
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
 * 指挥中心-异常预警
 * @createBy wuyao
 * @updateAt 2021/10/8 18:1:7
 * @method GET
 */
export const fetchEarlyWarning = (
  params: EarlyWarningParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<EarlyWarningItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/earlyWarning`,
    { ...params },
    { ...options }
  );
};
