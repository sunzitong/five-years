/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/115284
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 时间筛选-返回值
 */
export interface YearMonthListReturn {
  years: number[];
  months: string[];
}

/**
 * 时间筛选
 * @createBy huyanan
 * @updateAt 2021/10/19 15:3:24
 * @method GET
 */
export const fetchYearMonthList = (
  params?: Record<string, unknown>,
  options?: Partial<ServiceOptions>
) => {
  return http.get<YearMonthListReturn>(
    `${BASE_URL}/analysis/commandCabin/yearMonthList`,
    { ...params },
    { ...options }
  );
};
