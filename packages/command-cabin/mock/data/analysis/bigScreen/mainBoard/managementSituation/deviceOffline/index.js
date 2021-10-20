/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113586
 *
 * 经营现状-设备离线率
 * @createBy baishiqiang
 * @updateAt 2021/10/20 13:46:10
 * @method GET
 */

exports.path =
  "/analysis/bigScreen/mainBoard/managementSituation/deviceOffline";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    elecDeviceOfflineRatio: 0.15, //电表离线率
    waterDeviceOfflineRatio: 0.15, //水表离线率
    doorDeviceOfflineRatio: 0.15, //门锁离线率
    dataSource: "OMS", //数据来源
    updateTime: "09-01 17:32", //数据最近更新时间
  },
};
