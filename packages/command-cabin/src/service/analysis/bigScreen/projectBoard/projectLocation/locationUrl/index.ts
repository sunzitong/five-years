/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114834
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店屏-项目区位-参数
 */
export interface LocationUrlParams {
  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 门店屏-项目区位-返回值
 */
export interface LocationURLReturn {
  locationUrl: string;
}

/**
 * 门店屏-项目区位
 * @createBy baishiqiang
 * @updateAt 2021/10/8 9:20:23
 * @method GET
 */
export const fetchLocationUrl = (
  params: LocationUrlParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<LocationUrlReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/projectLocation/locationUrl`,
    { ...params },
    { ...options }
  );
};
