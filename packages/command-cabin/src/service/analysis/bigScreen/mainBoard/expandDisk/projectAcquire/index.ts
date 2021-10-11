/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114796
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面-项目获取-参数
 */
export interface ProjectAcquireParams {
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
 * 拓展盘面-项目获取-返回值
 */
export interface ProjectAcquireReturn {
  signedRoomNum: number;
  mediumSignedRoomNum: number;
  lightSignedRoomNum: number;
  heavySignedRoomNum: number;
  yearExpandTarget: number;
  expandFinishRatio: number;
  targetDiff: number;
  dataSource: string;
  updateTime: string;
}

/**
 * 拓展盘面-项目获取
 * @createBy baishiqiang
 * @updateAt 2021/10/11 14:15:57
 * @method GET
 */
export const fetchProjectAcquire = (
  params: ProjectAcquireParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<ProjectAcquireReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/projectAcquire`,
    { ...params },
    { ...options }
  );
};
