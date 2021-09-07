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
   * 门店编号
   */
  projectNo: string;

  /**
   * 最新统计日，默认是当前时间，yyyy-mm-dd
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
  dataSource: string;
  updateTime: string;
}

/**
 * 经营现状-设备离线率
 * @createBy baishiqiang
 * @updateAt 2021/9/7 下午3:25:34
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
