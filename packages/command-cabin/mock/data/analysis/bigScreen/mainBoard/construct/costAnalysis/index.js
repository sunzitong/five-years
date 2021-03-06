/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114600
 *
 * 成本分析模块
 * @createBy zhangyao03
 * @updateAt 2021/10/21 10:0:44
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/costAnalysis";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    updateTime: "2021-09-26 10:21:40", //总体成本差异率
    dataSource: "*取自成本系统", //数据来源
    riskItemNum: 10, //成本风险预警项目个数
    allItemDiff: 98.6, //总体成本差异率
    costAnalysisModelList: [
      {
        id: 1, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        diff: 98.6, //动态成本利用率
      },
      {
        id: 2, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都一二三时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        diff: 98.6, //动态成本利用率
      },
      {
        id: 3, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都一二三四时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        diff: 98.6, //动态成本利用率
      },
    ],
  },
};
