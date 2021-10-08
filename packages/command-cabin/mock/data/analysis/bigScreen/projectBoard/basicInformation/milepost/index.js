/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 *
 * 门店里程碑
 * @createBy baishiqiang
 * @updateAt 2021/10/8 10:46:19
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/basicInformation/milepost";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    transactionModel: "LightAsset", //资产类型 LightAsset-轻资产，MediumAsset-中资产，HeavyAsset-重资产
    transactionModelType: "轻资产", //资产类型描述
    firstInvestmentTime: "2021-09-14", //首次投委时间
    signingTime: "2021-09-14", //签约时间
    structureFinishDate: "2019-07-30", //结构封顶时间
    mainFinishDate: "2019-07-30", //主题竣工时间
    transferImprovementDate: "2019-07-30", //室内清水作业面移交精装完成时间
    isIpd: "是", //是否IPD 是/否,
    improvementStartDate: "2019-07-30", //精装修进场时间
    transferServiceDate: "2019-07-30", //移交运营时间
    workDays: 20, //工期（天）
    startCheckScore: 20, //开业检分数
    fireControlType: "证照合规", //消防证照合规性
    actualOpenDate: "2019-07-30", //实际开业时间
    pointRentRatioToday: 97.9, //出租率-当日时点出租率
    phId: "L-CD00-CDSDT00.08", //项目分期id
    projectName: "龙湖冠寓成都时代店", //项目名字
    approvedDate: "2020-09-16 00:00:00", //目标成本上线时间
    targetCostNonTax: 123123.12, //总目标成本
    dynamicCostNonTax: 123123.12, //动态总成本
    costValLandSum: 123123.12, //项目结算成本
    budgetBalanceNoTax: 123123.12, //结余金额
  },
};
