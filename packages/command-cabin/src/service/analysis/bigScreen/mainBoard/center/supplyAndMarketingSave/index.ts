/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114946
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 主屏-供销存-参数
 */
export interface SupplyAndMarketingSaveParams {
  /**
   * 地区类型
   */
  regionType: unknown;

  /**
   * 地区id
   */
  regionId: number;

  /**
   * 数据范围（年累，月累）【但是目前需求数据只有年累级别】
   */
  dateScope?: unknown;

  /**
   * 地区名字
   */
  regionName: unknown;
}

/**
 * 主屏-供销存-返回值
 */
export interface SupplyAndMarketingSaveReturn {
  regionName: string;
  ytdIncomeGap: number;
  forecastIncomeGap: number;
  contractTerminationIncomeGap: number;
  openedAndTerminationIncomeGap: number;
  openedAndPostponeIncomeGap: number;
  openedAndAheadIncomeGap: number;
  openAsUsualIncomeGap: number;
}

/**
 * 主屏-供销存
 * @createBy zhangyao03
 * @updateAt 2021/10/12 16:8:39
 * @method GET
 */
export const fetchSupplyAndMarketingSave = (
  params: SupplyAndMarketingSaveParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<SupplyAndMarketingSaveReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/supplyAndMarketingSave`,
    { ...params },
    { ...options }
  );
};
