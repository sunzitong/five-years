/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114600
 *
 * 成本分析模块
 * @createBy zhangyao03
 * @updateAt 2021/9/22 下午5:06:23
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/costAnalysis";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    riskItemNum: 10, //成本风险预警项目个数
    allItemDiff: 0.1231, //总体成本差异率
    costAnalysisModelList: [
      {
        id: 1, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        useRate: 0.9862, //动态成本利用率
      },
      {
        id: 2, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都xxx时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        useRate: 0.9862, //动态成本利用率
      },
      {
        id: 3, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都xxx时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        useRate: 0.9862, //动态成本利用率
      },
    ],
  },
};
