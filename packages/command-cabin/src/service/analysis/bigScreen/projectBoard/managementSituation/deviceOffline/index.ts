/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113624
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 经营现状-设备离线率-参数
 */
export interface DeviceOfflineParams {
  /**
   * 门店组织ID
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
 * @updateAt 2021/9/10 14:39:38
 * @method GET
 */
export const fetchDeviceOffline = (
  params: DeviceOfflineParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<DeviceOfflineReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/managementSituation/deviceOffline`,
    { ...params },
    { ...options }
  );
};
