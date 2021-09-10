/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-产品品质-参数
 */
export interface ProductQualityParams {
  /**
   * GROUP:全国；AREA:大区；CITY:城市
   */
  regionType: string;

  /**
   * 大区ID/城市ID，默认是空
   */
  regionId?: number;

  /**
   * 统计哪一年的数据，默认是当前年份
   */
  dataTime?: number;
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
 * @updateAt 2021/9/10 下午2:40:44
 * @method GET
 */
export const fetchProductQuality = (params: ProductQualityParams) => {
  return http.get<ProductQualityReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/productQuality`,
    {
      ...params,
    }
  );
};
