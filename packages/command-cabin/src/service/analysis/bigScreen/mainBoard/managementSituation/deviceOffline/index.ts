/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113586
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 经营现状-设备离线率-参数
 */
export interface DeviceOfflineParams {
  /**
   * OMS-公用枚举-dataLevels 组织级别
   */
  orgType: unknown;

  /**
   * 国家组织ID/大区组织ID/城市组织ID
   */
  orgId: number;

  /**
   * 最新统计日，默认是当前时间，yyyy-mm-dd
   */
  dataTime?: unknown;
}

/**
 * 经营现状-设备离线率-返回值
 */
export interface DeviceOfflineReturn {
  elecDeviceOfflineRatio: number;
  waterDeviceOfflineRatio: number;
  doorDeviceOfflineRatio: number;
  dataSource: string;
  updateTime: string;
}

/**
 * 经营现状-设备离线率
 * @createBy baishiqiang
 * @updateAt 2021/10/20 13:46:10
 * @method GET
 */
export const fetchDeviceOffline = (
  params: DeviceOfflineParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<DeviceOfflineReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/managementSituation/deviceOffline`,
    { ...params },
    { ...options }
  );
};
