/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114598
 *
 * 经营现状-逾期金额
 * @createBy huyanan
 * @updateAt 2021-9-22 7:26:18 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/managementSituation/overdue";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    overdueRatio: 2.3, //逾期率（%）
    overdueAmount: 139.1, //总逾期金额(万元)
    overdueAmountGuanyu: 25.1, //长租
    overdueAmountGuanyuFit: 15.0, //长租-散客
    overdueAmountGuanyuPro: 10.1, //长租-企客
    overdueAmountCoworking: 23.1, //一展
    overdueAmountCommerce: 22.1, //底商
    payBackAmount: 31.0, //轻资产回款
    dataSource: "OMS", //数据来源
    updateTime: "09-01 17:32", //数据最近更新时间
  },
};
