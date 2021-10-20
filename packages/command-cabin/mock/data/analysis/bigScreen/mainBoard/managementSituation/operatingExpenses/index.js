/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114952
 *
 * 经营性支出
 * @createBy zhangyao03
 * @updateAt 2021/10/20 16:53:15
 * @method GET
 */

exports.path =
  "/analysis/bigScreen/mainBoard/managementSituation/operatingExpenses";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    marketingExpense: 111, //营销费用(万元)
    marketingExpenseRatio: 111, //营销费用(费效比)
    operatingCost: 10, //运营成本(万元)
    operatingCostRatio: 98, //运营成本(费效比)
    managementCost: 23.1, //管理成本(万元)
    managementCostRatio: 23.1, //管理成本(费效比)
    rentCost: 23.1, //租金成本(万元)
    rentCostRatio: 23.1, //租金成本(费效比)
    allCost: 23.1, //三费总和(万元)
    allCostRatio: 23.1, //三费总和(费效比)
    yuanAverageCost: 23, //元均收入(元)
    peopleAndRoomRatio: "1:23", //人房比
    energyCost: 23.1, //能源费用(万元)
  },
};
