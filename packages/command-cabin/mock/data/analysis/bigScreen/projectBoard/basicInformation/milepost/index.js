/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 *
 * 门店里程碑（不包含成本决算信息）
 * @createBy baishiqiang
 * @updateAt 2021/9/30 16:43:56
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/basicInformation/milepost";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    firstInvestmentTime: "2021-09-14", //首次投委时间
    signingTime: "2021-09-14", //签约时间
    structureFinishDate: "2019-07-30", //结构封顶时间
    mainFinishDate: "2019-07-30", //主题竣工时间
    transferImprovementDate: "2019-07-30", //移交精装修时间
    isIpd: "是", //是否IPD 是/否,
    improvementStartDate: "2019-07-30", //精装修进场时间
    transferServiceDate: "2019-07-30", //移交运营时间
    workDays: 20, //工期（天）
    startCheckScore: 20, //开业检分数
    fireControlType: "证照合规", //消防证照合规性
    actualOpenDate: "2019-07-30", //实际开业时间
    pointRentRatioToday: 97.9, //出租率-当日时点出租率
  },
};
