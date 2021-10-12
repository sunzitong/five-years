/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114782
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-现场监控详情-参数
 */
export interface MonitorInfoParams {
  /**
   * 工单id
   */
  orderId: number;
}

/**
 * 指挥中心-现场监控详情-返回值
 */
export interface MonitorInfoReturn {
  projectId: number;
  projectName: string;
  position: string;
  pictureUrl: string;
  problem: string;
  showTime: Date;
  reformTime: Date;
  cameraId: string;
  problemPictureUrls: string[];
  contacts: Contact[];
}

export interface Contact {
  roleName: string;
  name: string;
  phone: string;
}

/**
 * 指挥中心-现场监控详情
 * @createBy wuyao
 * @updateAt 2021/10/11 17:53:41
 * @method GET
 */
export const fetchMonitorInfo = (
  params: MonitorInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<MonitorInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/monitorInfo`,
    { ...params },
    { ...options }
  );
};
