/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113946
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-产品品质-参数
 */
export interface ProductQualityParams {
  /**
   * 见通用枚举接口  GROUP:全国；AREA:大区；CITY:城市
   */
  orgType: unknown;

  /**
   * 大区ID/城市ID，默认传0
   */
  orgId: number;

  /**
   * 统计哪一年的数据，默认是当前年份
   */
  dateScope: unknown;

  /**
   * 年份
   */
  date: number;
}

/**
 * 营造盘面-产品品质-返回值
 */
export interface ProductQualityReturn {
  ipdRatio: number;
  checkScore: number;
  qualityScore: number;
}

/**
 * 营造盘面-产品品质
 * @createBy huyanan
 * @updateAt 2021/10/21 10:3:41
 * @method GET
 */
export const fetchProductQuality = (
  params: ProductQualityParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<ProductQualityReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/productQuality`,
    { ...params },
    { ...options }
  );
};
