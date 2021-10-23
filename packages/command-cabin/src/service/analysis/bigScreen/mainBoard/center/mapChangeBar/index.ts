/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114768
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-地图数据切换条-参数
 */
export interface MapChangeBarParams {
  /**
   * 组织级别：见公用枚举
   */
  orgType: unknown;

  /**
   * 组织id
   */
  orgId: number;

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
 * 指挥中心-地图数据切换条-返回值
 */
export interface MapChangeBarReturn {
  newIncreNum: number;
  openNum: number;
  netProfitsRatio: number;
  allFormatIncome: number;
}

/**
 * 指挥中心-地图数据切换条
 * @createBy wuyao
 * @updateAt 2021/10/21 16:46:51
 * @method GET
 */
export const fetchMapChangeBar = (
  params: MapChangeBarParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<MapChangeBarReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/mapChangeBar`,
    { ...params },
    { ...options }
  );
};
