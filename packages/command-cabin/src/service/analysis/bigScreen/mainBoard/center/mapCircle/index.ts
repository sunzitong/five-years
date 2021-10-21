/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114770
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-地图大区/城市圆圈-参数
 */
export interface MapCircleParams {
  /**
   * 组织级别：见公用枚举
   */
  orgType: unknown;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: unknown;

  /**
   * 时间
   */
  date: unknown;
}

/**
 * 指挥中心-地图大区/城市圆圈-返回值
 */
export interface MapCircleItemReturn {
  orgId: number;
  orgName: string;
  longitude: number;
  latitude: number;
  newIncreNum: number;
  newIncreFinishLimit: number;
  openNum: number;
  openFinishLimit: number;
  netProfitsRatio: number;
  netProfitsDiff: number;
  netProfitsFinishLimit: number;
  allFormatIncome: number;
  allFormatIncomeFinishLimit: number;
}

/**
 * 指挥中心-地图大区/城市圆圈
 * @createBy wuyao
 * @updateAt 2021/10/21 16:49:48
 * @method GET
 */
export const fetchMapCircle = (
  params: MapCircleParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<MapCircleItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/mapCircle`,
    { ...params },
    { ...options }
  );
};
