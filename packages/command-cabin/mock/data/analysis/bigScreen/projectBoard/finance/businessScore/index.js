/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113952
 *
 * 财务相关指标-综合经营指数
 * @createBy huyanan
 * @updateAt 2021-9-10 3:26:15 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/finance/businessScore";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    lastMonthScore: {
      totalScore: 20, //综合经营指数
      creditScore: 20, //信用指数
      channelEffectScore: 20, //渠道能效值
      healthyScore: 20, //运营健康度
      dataDate: "2021-08-06",
    },
    currentMonthScore: {
      totalScore: 80, //综合经营指数
      creditScore: 80, //信用指数
      channelEffectScore: 80, //渠道能效值
      healthyScore: 80, //运营健康度
      dataDate: "2021-09-06",
    },
  },
};
