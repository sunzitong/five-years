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
   * group:全国；area:大区；city:城市
   */
  regionType: number;

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
 * @updateAt 2021/9/6 上午10:03:22
 * @method GET
 */
export const fetchProductQuality = (params: ProductQualityParams) => {
  return http.get<ProductQualityReturn>(
    `${BASE_URL}/bigScreen/mainBoard/construct/productQuality`,
    {
      ...params,
    }
  );
};
