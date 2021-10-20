/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114998
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 主屏-供销存详情页-参数
 */
export interface SupplyAndMarketingSaveDetailParams {
  /**
   * 地区类型
   */
  regionType: unknown;

  /**
   * 地区id
   */
  regionId: number;

  /**
   * 地区名字
   */
  regionName: unknown;

  /**
   * 年份加月份
   */
  dateShort: number;

  /**
   * 数据范围（年累，月累）【但是目前需求数据只有年累级别】
   */
  dateScope?: unknown;
}

/**
 * 主屏-供销存详情页-返回值
 */
export interface SupplyAndMarketingSaveDetailReturn {
  regionName?: string;
  ytdIncomeGap: number;
  forecastIncomeGap: number | null;
  contractTerminationIncomeGap: number | null;
  openedAndTerminationIncomeGap: number | null;
  openedAndPostponeIncomeGap: number | null;
  openedAndAheadIncomeGap: number | null;
  openAsUsualIncomeGap: number | null;
  citySupplyDetails?: SupplyAndMarketingSaveDetailReturn[];
  needShowName?: string;
}

/**
 * 主屏-供销存详情页
 * @createBy zhangyao03
 * @updateAt 2021/10/12 17:59:50
 * @method GET
 */
export const fetchSupplyAndMarketingSaveDetail = (
  params: SupplyAndMarketingSaveDetailParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<SupplyAndMarketingSaveDetailReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/supplyAndMarketingSaveDetail`,
    { ...params },
    { ...options }
  );
};
