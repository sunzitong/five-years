/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114796
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面-项目获取-参数
 */
export interface ProjectAcquireParams {
  /**
   * 组织类型
   */
  orgType: string;

  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 拓展盘面-项目获取-返回值
 */
export interface ProjectAcquireReturn {
  signedRoomNum: number;
  yearExpandTarget: number;
  expandFinishRatio: number;
  targetDiff: number;
  dataFrom: string;
  dataTime: string;
}

/**
 * 拓展盘面-项目获取
 * @createBy baishiqiang
 * @updateAt 2021-9-28 10:25:11 ├F10: AM┤
 * @method GET
 */
export const fetchProjectAcquire = (params: ProjectAcquireParams) => {
  return http.get<ProjectAcquireReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/projectAcquire`,
    {
      ...params,
    }
  );
};
