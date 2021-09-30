/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114804
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 查询主屏(中心位置)地区(城市)维度详细信息-参数
 */
export interface RegionDetailsInfoParams {
  /**
   * 地区类型
   */
  regionType: unknown;

  /**
   * 地区id
   */
  regionId: number;

  /**
   * 数据范围（年累，月累）
   */
  dateScope: unknown;
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
 * @updateAt 2021/9/30 17:12:11
 * @method GET
 */
export const fetchRegionDetailsInfo = (params: RegionDetailsInfoParams) => {
  return http.get<RegionDetailsInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/regionDetailsInfo`,
    {
      ...params,
    }
  );
};
