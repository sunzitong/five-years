/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114804
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 查询主屏(中心位置)地区(城市)维度详细信息-参数
 */
export interface RegionDetailsInfoParams {
  /**
   * 地区类型
   */
  orgType: unknown;

  /**
   * 地区id
   */
  orgId: number;

  /**
   * 数据范围（年累，月累）
   */
  dateScope: unknown;

  /**
   * 月份形式日期
   */
  month: unknown;

  /**
   * 年份形式
   */
  year: number;
}

/**
 * 查询主屏(中心位置)地区(城市)维度详细信息-返回值
 */
export interface RegionDetailsInfoReturn {
  newGetRoomNum: number;
  newGetRoomNumBias: number;
  openRoomNum: number;
  newOpenRoomNumBias: number;
  netProfitRateAll: number;
  netProfitRateBiasAll: number;
  totalIncomeAll: number;
  totalIncomeBiasAll: number;
  centerRegionDetails: CenterRegionDetail[];
}

export interface CenterRegionDetail {
  id: number;
  phId: string;
  projectName: string;
  netProfitRate: number;
  netProfitRateBias: number;
  totalIncome: number;
  totalIncomeBias: number;
}

/**
 * 查询主屏(中心位置)地区(城市)维度详细信息
 * @createBy zhangyao03
 * @updateAt 2021/10/20 13:45:3
 * @method GET
 */
export const fetchRegionDetailsInfo = (
  params: RegionDetailsInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<RegionDetailsInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/regionDetailsInfo`,
    { ...params },
    { ...options }
  );
};
