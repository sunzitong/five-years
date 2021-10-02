/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 *
 * 门店里程碑（不包含成本决算信息）
 * @createBy baishiqiang
 * @updateAt 2021/9/30 18:8:26
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/basicInformation/milepost";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
      title: "", //通过投委会
      value: {
        firstInvestmentTime: "2021-09-14", //首次投委时间
      },
    },
    {
      title: "", //签约时间
      value: {
        signingTime: "2021-09-14", //签约时间
      },
    },
    {
      title: "", //结构封顶
      value: {
        structureFinishDate: "2019-07-30", //结构封顶时间
      },
    },
    {
      title: "", //主体竣备
      value: {
        mainFinishDate: "2019-07-30", //主体竣备时间
      },
    },
    {
      title: "", //精装完成
      value: {
        transferImprovementDate: "2019-07-30", //移交精装修时间
        isIpd: "是", //是否IPD 是/否
      },
    },
    {
      title: "", //精装进场
      value: {
        improvementStartDate: "2019-07-30", //精装进场时间
        isIpd: "是", //是否IPD 是/否
      },
    },
    {
      title: "", //移交运营
      value: {
        transferServiceDate: "2019-07-30", //移交运营时间
        startCheckScore: 20, //开业检分数
        workDays: 20, //工期（天）
        fireControlType: "证照合规", //消防证照合规性
      },
    },
    {
      title: "", //开业
      value: {
        actualOpenDate: "2019-07-30", //实际开业时间
        pointRentRatioToday: 97.9, //出租率-当日时点出租率
      },
    },
    {
      title: "", //成本决算
      value: {
        id: 1, //id
        phId: "L-CD00-CDSDT00.08", //项目分期id
        projectName: "龙湖冠寓成都时代店", //项目名字
        approvedDate: "2020-09-16 00:00:00", //目标成本上线时间
        targetCostNonTax: 123123.12, //总目标成本
        dynamicCostNonTax: 123123.12, //动态总成本
        costValLandSum: 123123.12, //项目结算成本
        budgetBalanceNoTax: 123123.12, //结余金额
      },
    },
  ],
};
