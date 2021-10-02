/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113540
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 中央奖补、投后攻坚模块-参数
 */
export interface ExpansionAwardInfoParams {
  /**
   * 地区类型
   */
  regionType: unknown;

  /**
   * 地区id
   */
  regionId: number;
}

/**
 * 中央奖补、投后攻坚模块-返回值
 */
export interface ExpansionAwardInfoReturn {
  yearSubsidiesCollected: number;
  yearSubsidiesCompletionRate: number;
  yearNetIncomeCollected: number;
  allNetIncomeCollected: number;
  yearNetIncomeCompletionRate: number;
  allNetIncomeCompletionRate: number;
}

/**
 * 中央奖补、投后攻坚模块
 * @createBy zhangyao03
 * @updateAt 2021/9/17 14:0:54
 * @method GET
 */
export const fetchExpansionAwardInfo = (
  params: ExpansionAwardInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<ExpansionAwardInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/expansionAwardInfo`,
    { ...params },
    { ...options }
  );
};
