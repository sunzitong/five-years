/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114798
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面-商机储备-参数
 */
export interface BusinessOppReserveParams {
  /**
   * 组织类型
   */
  orgType: unknown;

  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 拓展盘面-商机储备-返回值
 */
export interface BusinessOppReserveReturn {
  toSignProjectNum: number;
  toSignRommNum: number;
  toMeetingProjectNum: number;
  toMeetingRoomNum: number;
  dataFrom: string;
  dataTime: string;
}

/**
 * 拓展盘面-商机储备
 * @createBy baishiqiang
 * @updateAt 2021/9/28 AM 10:29:44
 * @method GET
 */
export const fetchBusinessOppReserve = (params: BusinessOppReserveParams) => {
  return http.get<BusinessOppReserveReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/businessOppReserve`,
    {
      ...params,
    }
  );
};
