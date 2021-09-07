/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 经营现状-设备离线率-参数
 */
export interface DeviceOfflineParams {
  /**
   * 门店ID
   */
  projectId: number;

  /**
   * 统计哪个时间的的数据，默认是当前时间
   */
  dataTime?: string;
}

/**
 * 经营现状-设备离线率-返回值
 */
export interface DeviceOfflineReturn {
  elecDeviceOfflineRatio: number;
  waterDeviceOfflineRatio: number;
  doorDeviceOfflineRatio: number;
  updateTime: string;
}

/**
 * 经营现状-设备离线率
 * @createBy baishiqiang
 * @updateAt 2021/9/6 下午6:20:39
 * @method GET
 */
export const fetchDeviceOffline = (params: DeviceOfflineParams) => {
  return http.get<DeviceOfflineReturn>(
    `${BASE_URL}/bigScreen/projectBoard/managementSituation/deviceOffline`,
    {
      ...params,
    }
  );
};
