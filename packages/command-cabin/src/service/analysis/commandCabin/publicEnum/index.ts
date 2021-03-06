/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/112036
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * OMS-公用枚举-返回值
 */
export interface PublicEnumReturn {
  publicSentimentTypes: EnumItem[];
  crisisLabels: EnumItem[];
  dataLevels: EnumItem[];
  dateScopes: EnumItem[];
  riskTypes: EnumItem[];
  warningOptStages: EnumItem[];
  warningTypes: EnumItem[];
}

export interface EnumItem {
  name: string;
  desc: string;
}

/**
 * OMS-公用枚举
 * @createBy wuyao
 * @updateAt 2021/9/29 17:32:14
 * @method GET
 */
export const fetchPublicEnum = (
  params?: Record<string, unknown>,
  options?: Partial<ServiceOptions>
) => {
  return http.get<PublicEnumReturn>(
    `${BASE_URL}/analysis/commandCabin/publicEnum`,
    { ...params },
    { ...options }
  );
};
