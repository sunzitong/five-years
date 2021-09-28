/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114834
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 项目区位-参数
 */
export interface ProjectLocationParams {
  /**
   * 组织ID
   */
  orgId: number;
}

/**
 * 项目区位-返回值
 */
export interface ProjectLocationReturn {
  projectLocation: string;
}

/**
 * 项目区位
 * @createBy baishiqiang
 * @updateAt 2021/9/28 上午11:52:37
 * @method GET
 */
export const fetchProjectLocation = (params: ProjectLocationParams) => {
  return http.get<ProjectLocationReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/projectLocation`,
    {
      ...params,
    }
  );
};
