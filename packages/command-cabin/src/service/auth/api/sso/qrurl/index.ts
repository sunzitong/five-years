/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114922
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 请求二维码-参数
 */
export interface QrurlParams {
  /**
   * oms
   */
  source: unknown;
}

/**
 * 请求二维码-返回值
 */
export interface QrurlReturn {
  appName: string;
  qrId: string;
}

/**
 * 请求二维码
 * @createBy xiejiabin
 * @updateAt 2021/10/2 14:38:56
 * @method GET
 */
export const fetchQrurl = (params: QrurlParams) => {
  const { source, ...partial } = params;
  return http.get<QrurlReturn>(`${BASE_URL}/auth/api/sso/qrurl`, partial, {
    headers: { source },
  });
};
