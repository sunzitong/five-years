/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114848
 *
 * 查询主屏(中心位置)顶部信息
 * @createBy zhangyao03
 * @updateAt 2021-9-28 2:37:06 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/center/topStatisticData";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    totalGetRoomNum: 111, //累计获取房间数
    totalOpenRoomNum: 10, //累计已开业间数
    totalIncomeAll: 10, //年累收入总额(万元)
  },
};
