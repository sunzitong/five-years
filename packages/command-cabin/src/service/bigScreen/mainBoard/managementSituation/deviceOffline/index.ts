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
   * area:大区；city:城市， 默认是全国
   */
  regionType?: number;

  /**
   * 大区ID/城市ID，默认是全国
   */
  regionId?: number;
}

/**
 * 经营现状-设备离线率-返回值
 */
export interface DeviceOfflineReturn {
  elecDeviceOfflineRatio: number;
  waterDeviceOfflineRatio: number;
  doorDeviceOfflineRatio: number;
  dataDate: Date;
}

/**
 * 经营现状-设备离线率
 * @createBy baishiqiang
 * @updateAt 2021/9/2 上午10:34:58
 * @method GET
 */
export const fetchDeviceOffline = (params?: DeviceOfflineParams) => {
  return http.get<DeviceOfflineReturn>(
    `${BASE_URL}/bigScreen/mainBoard/managementSituation/deviceOffline`,
    {
      ...params,
    }
  );
};
