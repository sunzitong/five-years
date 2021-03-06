/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114566
 *
 * 指挥中心-经营现状-收入量价情况
 * @createBy wuyao
 * @updateAt 2021/10/21 16:50:37
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/managementSituation/income";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    dataSource: "取自OMS", //数据来源
    updateTime: "2021-09-14 12:23:24", //更新时间
    totalIncome: 232333.3, //全业态收入
    totalFinishLimit: 193.4, //全业态收入完成度
    guanyuIncome: 232333.3, //冠寓收入
    guanyuFinishLimit: 93.4, //冠寓收入完成度
    coWorkingIncome: 232333.3, //一展收入
    coWorkingFinishLimit: 193.4, //一展收入完成度
    commerceIncome: 232333.3, //底商收入
    commerceFinishLimit: 93.4, //底商收入完成度
    incrementAndParkIncome: 233333.3, //增值级停车收入
    incrementAndParkFinishLimit: 93.4, //增值级停车收入完成度
    contractSporadicIncome: 232333.3, //违约金及其他收入
    avgRentRatio: 93.4, //平均出租率
    pointRentRatio: 93.4, //时点出租率
    rentRatioYoy: -3.4, //出租率同比
    avgRenewRatio: 93.4, //平均续租率
    renewRatioYoy: 3.4, //续租率同比
    avgPrice: 2395.6, //平均成交价
    avgPriceYoy: 3.4, //平均成交价同比
  },
};
