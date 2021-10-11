/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114808
 *
 * 财务相关指标-财务指标达成与预估
 * @createBy huyanan
 * @updateAt 2021/10/11 16:21:18
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/finance/financeLine";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    month: 2, //当前是第n月
    year: 3, //当前是第n年
    transactionModel: "MediumAsset", //资产类型 LightAsset MediumAsset HeavyAsset
    infoMap: {
      //指标数据
      month1: [
        //投资任务书-月指标
        {
          profitRate: 1, //净利润率
          npiProfitRate: 0, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 11, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 111, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
        {
          profitRate: 2, //净利润率
          npiProfitRate: 0, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 22, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 222, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 2, //年份、月份数
        },
        {
          profitRate: 8, //净利润率
          npiProfitRate: 0, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 33, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 333, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 3, //年份、月份数
        },
        {
          profitRate: 33, //净利润率
          npiProfitRate: 33, //npi利润率
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
          dataNum: 4, //年份、月份数
        },
      ],
      month2: [
        //最新过会版-月指标
        {
          profitRate: 78, //净利润率
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
        {
          profitRate: 78, //净利润率
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
          dataNum: 2, //年份、月份数
        },
        {
          profitRate: 78, //净利润率
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
          dataNum: 3, //年份、月份数
        },
        {
          profitRate: 3, //净利润率
          npiProfitRate: 33, //npi利润率
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
          dataNum: 4, //年份、月份数
        },
      ],
      month3: [
        //月度运维版-月指标
        {
          profitRate: 8, //净利润率
          npiProfitRate: 3, //npi利润率
          ycost: 3, //y-c
          cashSum: 0, //现金流
          openIncome: 8, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 8, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
        {
          profitRate: 11, //净利润率
          npiProfitRate: 33, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 11, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 11, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 2, //年份、月份数
        },
        {
          profitRate: 13, //净利润率
          npiProfitRate: 33, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 13, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 13, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 3, //年份、月份数
        },
        {
          profitRate: 18, //净利润率
          npiProfitRate: 33, //npi利润率
          ycost: 0, //y-c
          cashSum: 0, //现金流
          openIncome: 18, //收入
          avgRate: 0.47, //平局出租率
          avgPriece: 2, //平均单房价格
          priceIncrement: 0, //涨幅
          threeCost: 18, //三费合计
          marketExpense: 0, //营销费用
          operCost: 0, //运营成本
          manageCost: 0, //管理成本
          rental: 0, //承租租金
          dataType: "month", //指标类型 year month
          dataNum: 4, //年份、月份数
        },
      ],
      year1: [
        //投资任务书-年指标
        {
          cost: 0, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
        {
          cost: 1, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 2, //年份、月份数
        },
        {
          cost: 3, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 3, //年份、月份数
        },
        {
          cost: 78, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 4, //年份、月份数
        },
        {
          cost: 78, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 5, //年份、月份数
        },
      ],
      year2: [
        //最新过会版-年指标
        {
          cost: 0, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
        {
          cost: 1, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 2, //年份、月份数
        },
        {
          cost: 3, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 3, //年份、月份数
        },
        {
          cost: 78, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 4, //年份、月份数
        },
        {
          cost: 78, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 5, //年份、月份数
        },
      ],
      year3: [
        //月度运维版-年指标
        {
          cost: 0, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 1, //年份、月份数
        },
        {
          cost: 1, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 2, //年份、月份数
        },
        {
          cost: 3, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 3, //年份、月份数
        },
        {
          cost: 78, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 4, //年份、月份数
        },
        {
          cost: 78, //cost预估
          dataType: "year", //指标类型 year month
          dataNum: 5, //年份、月份数
        },
      ],
    },
  },
  timestamp: 1632737364180,
};
