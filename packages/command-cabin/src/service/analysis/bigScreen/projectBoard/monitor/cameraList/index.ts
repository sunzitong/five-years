/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114858
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏-现场监控-参数
 */
export interface CameraListParams {
  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 门店屏-现场监控-返回值
 */
export interface CameraListItemReturn {
  imageUrl: string;
  cameraId: string;
  location: string;
}

/**
 * 门店屏-现场监控
 * @createBy baishiqiang
 * @updateAt 2021/10/8 9:4:45
 * @method GET
 */
export const fetchCameraList = (
  params: CameraListParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<CameraListItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/monitor/cameraList`,
    { ...params },
    { ...options }
  );
};
