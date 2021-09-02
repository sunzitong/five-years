/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-维保报事-参数
 */
export interface RepairParams {
  /**
   * area:大区；city:城市，默认是全国
   */
  regionType?: number;

  /**
   * 大区ID/城市ID，默认是全国
   */
  regionId?: number;
}

/**
 * 营造盘面-维保报事-返回值
 */
export interface RepairReturn {
  electricRepair: Repair;
  decorationRepair: Repair;
  plumbingRepair: Repair;
  leakageRepair: Repair;
  deviceRepair: Repair;
}

export interface Repair {
  count: number;
  ratio: number;
}

/**
 * 营造盘面-维保报事
 * @createBy baishiqiang
 * @updateAt 2021/9/2 下午1:34:22
 * @method GET
 */
export const fetchRepair = (params?: RepairParams) => {
  return http.get<RepairReturn>(
    `${BASE_URL}/bigScreen/mainBoard/construct/repair`,
    {
      ...params,
    }
  );
};
