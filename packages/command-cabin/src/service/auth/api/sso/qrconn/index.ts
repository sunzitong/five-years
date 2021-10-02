/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114924
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 轮询二维码-参数
 */
export interface QrconnParams {
  /**
   * qrId
   */
  code: unknown;

  /**
   * 时间戳
   */
  timestamp: number;
}

/**
 * 轮询二维码-返回值
 */
export interface QrconnReturn {
  msg: string;
  code: string;
  token: string;
  status: string;
}

/**
 * 轮询二维码
 * @createBy xiejiabin
 * @updateAt 2021/10/2 14:41:43
 * @method GET
 */
export const fetchQrconn = (params: QrconnParams) => {
  return http.get<QrconnReturn>(`${BASE_URL}/auth/api/sso/qrconn`, {
    ...params,
  });
};
