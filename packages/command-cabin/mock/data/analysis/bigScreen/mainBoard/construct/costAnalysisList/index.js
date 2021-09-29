/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114602
 *
 * 成本分析详情列表
 * @createBy zhangyao03
 * @updateAt 2021/9/29 14:15:19
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/costAnalysisList";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
      id: 1, //id
      phId: "L-CD00-CDSDT00.08", //项目分期id
      projectName: "龙湖冠寓成都时代店", //项目名字
      cityId: "30001", //城市ID
      city: "北京", //城市
      approvedDate: "2020-09-16 00:00:00", //目标成本上线时间
      dynamicCostNonTax: 123123.12, //动态总成本
      targetCostNonTax: 123123.12, //总目标成本
      diff: 98.6, //目标成本差异率
      isRisk: true, //是否有风险
    },
  ],
};
