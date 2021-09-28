/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114804
 *
 * 查询主屏(中心位置)地区(城市)维度详细信息
 * @createBy zhangyao03
 * @updateAt 2021-9-28 2:13:42 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/center/regionDetailsInfo";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    newGetRoomNum: 111, //新增获取房间数
    newGetRoomNumBias: 111, //新增获取房间数(偏差)
    openRoomNum: 10, //开业间数
    newOpenRoomNumBias: 98, //开业间数(偏差)
    netProfitRateAll: 23.1, //净利润率总计
    netProfitRateBiasAll: 23.1, //净利润率(偏差)总计
    totalIncomeAll: 23.1, //全业态收入总计
    totalIncomeBiasAll: 23.1, //全业态收入(偏差)总计
    centerRegionDetails: [
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
        projectName: "龙湖冠寓成都时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        diff: 98.6, //动态成本利用率
      },
      {
        id: 3, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都时代店", //项目名字
        dynamicCostNonTax: 123123.12, //动态总成本
        targetCostNonTax: 123123.12, //总目标成本
        diff: 98.6, //动态成本利用率
      },
    ],
  },
};
