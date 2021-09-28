/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114808
 *
 * 财务相关指标-财务指标达成与预估
 * @createBy huyanan
 * @updateAt 2021-9-28 11:08:06 ├F10: AM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/finance/financeLine";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    month: 48, //当前是第n月
    transactionModel: "LightAsset", //资产类型 LightAsset MediumAsset HeavyAsset
    infoMap: {
      //指标数据
      month1: [
        //投资任务书-月指标
        {
          profitRate: 0, //净利润率
          npiProfitRate: 0, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 0, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 0, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
      ],
      month2: [
        //最新过会版-月指标
        {
          profitRate: 0, //净利润率
          npiProfitRate: 0, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 0, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 0, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
      ],
      month3: [
        //月度运维版-月指标
        {
          profitRate: 0, //净利润率
          npiProfitRate: 0, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 0, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 0, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
      ],
      year1: [
        //投资任务书-年指标
        {
          cost: 0, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
      ],
      year2: [
        //最新过会版-年指标
        {
          cost: 0, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
      ],
      year3: [
        //月度运维版-年指标
        {
          cost: 0, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
      ],
    },
  },
  timestamp: 1632737364180,
};
