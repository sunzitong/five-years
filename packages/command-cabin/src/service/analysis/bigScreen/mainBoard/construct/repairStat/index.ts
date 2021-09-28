/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113592
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
  orgType: unknown;

  /**
   * 国家组织ID/大区组织ID/城市组织ID
   */
  orgId: number;

  /**
   * 年累，默认是当前年份，yyyy
   */
  dataTime?: number;
}

/**
 * 营造盘面-维保报事-返回值
 */
export interface RepairStatReturn {
  plumbingElectricRepair: DecorationRepair;
  decorationRepair: DecorationRepair;
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
 * @updateAt 2021/9/10 下午4:14:25
 * @method GET
 */
export const fetchRepairStat = (params: RepairStatParams) => {
  return http.get<RepairStatReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/repairStat`,
    {
      ...params,
    }
  );
};
