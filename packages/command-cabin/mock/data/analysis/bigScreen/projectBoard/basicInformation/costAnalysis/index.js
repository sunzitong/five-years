/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114606
 *
 * 成本决算信息（已废弃）
 * @createBy zhangyao03
 * @updateAt 2021/10/9 16:3:1
 * @method GET
 */

exports.path =
  "/analysis//bigScreen/projectBoard/basicInformation/costAnalysis";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    id: 1, //id
    phId: "L-CD00-CDSDT00.08", //项目分期id
    projectName: "龙湖冠寓成都时代店", //项目名字
    approvedDate: "2020-09-16 00:00:00", //目标成本上线时间
    targetCostNonTax: 123123.12, //总目标成本
    dynamicCostNonTax: 123123.12, //动态总成本
    costValLandSum: 123123.12, //项目结算成本
    budgetBalanceNoTax: 123123.12, //结余金额
  },
};
