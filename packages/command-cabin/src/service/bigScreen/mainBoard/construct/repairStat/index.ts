/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-维保报事-参数
 */
export interface RepairStatParams {
  /**
   * OMS-公用枚举-dataLevels 组织级别
   */
  regionType: string;

  /**
   * 大区ID/城市ID，默认是空
   */
  regionId?: number;

  /**
   * 年累，默认是当前年份，yyyy
   */
  dataTime?: number;
}

/**
 * 营造盘面-维保报事-返回值
 */
export interface RepairStatReturn {
  electricRepair: DecorationRepair;
  decorationRepair: DecorationRepair;
  plumbingRepair: DecorationRepair;
  leakageRepair: DecorationRepair;
  deviceRepair: DecorationRepair;
  other: DecorationRepair;
}

export interface DecorationRepair {
  count: number;
  ratio: number;
}

/**
 * 营造盘面-维保报事
 * @createBy baishiqiang
 * @updateAt 2021/9/8 上午10:15:34
 * @method GET
 */
export const fetchRepairStat = (params: RepairStatParams) => {
  return http.get<RepairStatReturn>(
    `${BASE_URL}/bigScreen/mainBoard/construct/repairStat`,
    {
      ...params,
    }
  );
};
