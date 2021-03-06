/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114814
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面-战略合作-参数
 */
export interface StrategyCooperationParams {
  /**
   * 组织类型
   */
  orgType: unknown;

  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 拓展盘面-战略合作-返回值
 */
export interface StrategyCooperationReturn {
  stateEnterpriseCoopNum: number;
  stateEnterpriseNegoNum: number;
  fundSideCoopNum: number;
  fundSideNegoNum: number;
  mainToMainCoopNum: number;
  mainToMainNegoNum: number;
}

/**
 * 拓展盘面-战略合作
 * @createBy baishiqiang
 * @updateAt 2021/10/25 16:27:36
 * @method GET
 */
export const fetchStrategyCooperation = (
  params: StrategyCooperationParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<StrategyCooperationReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/strategyCooperation`,
    { ...params },
    { ...options }
  );
};
