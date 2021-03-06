/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114796
 *
 * 拓展盘面-项目获取
 * @createBy baishiqiang
 * @updateAt 2021/10/19 14:7:18
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/projectAcquire";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    signedRoomNum: 100, //已签约总间数量
    mediumSignedRoomNum: 30, //中资产签约间数
    lightSignedRoomNum: 30, //轻资产签约间数
    heavySignedRoomNum: 40, //重资产签约间数
    yearExpandTarget: 100, //年度拓展目标
    expandFinishRatio: 33.3, //拓展完成率
    targetDiff: 30, //目标差额
    dataSource: "龙头", //数据来源
    updateTime: "09-28 09:39", //数据更新时间
  },
};
