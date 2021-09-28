/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114858
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏-现场监控-参数
 */
export interface LocationListParams {
  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 门店屏-现场监控-返回值
 */
export interface LocationListItemReturn {
  imageUrl: string;
  videoUrl: string;
  location: string;
}

/**
 * 门店屏-现场监控
 * @createBy baishiqiang
 * @updateAt 2021/9/28 下午3:40:05
 * @method GET
 */
export const fetchLocationList = (params: LocationListParams) => {
  return http.get<LocationListItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/monitor/locationList`,
    {
      ...params,
    }
  );
};
