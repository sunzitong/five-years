/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114820
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面-商机转化-参数
 */
export interface BusinessOppTransParams {
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
 * 拓展盘面-商机转化-返回值
 */
export interface BusinessOppTransReturn {
  yearsEstabProjectNum: number;
  yearsMeetingProjectNum: number;
  yeasSignedProjectNum: number;
  estabTransRatio: number;
  meetingTransRatio: number;
}

/**
 * 拓展盘面-商机转化
 * @createBy baishiqiang
 * @updateAt 2021/9/28 AM 11:12:26
 * @method GET
 */
export const fetchBusinessOppTrans = (params: BusinessOppTransParams) => {
  return http.get<BusinessOppTransReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/businessOppTrans`,
    {
      ...params,
    }
  );
};
