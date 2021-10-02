/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114930
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 退出登录
 * @createBy xiejiabin
 * @updateAt 2021/10/2 15:2:31
 * @method POST
 */
export const fetchLogout = (
  params?: Record<string, unknown>,
  options?: Partial<ServiceOptions>
) => {
  return http.post<any>(
    `${BASE_URL}/auth/api/logout`,
    { ...params },
    { ...options }
  );
};
