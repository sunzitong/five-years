/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114836
 *
 * 拓展盘面详情-拓宽台账宽表
 * @createBy baishiqiang
 * @updateAt 2021/10/8 18:40:51
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/expandWideDetail";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    total: 1, //总数量
    pages: 1, //总页数
    pageSize: 10, //每页数量
    pageNum: 1, //第几页
    list: [
      {
        id: 1, //主键ID
        projectCode: "", //项目编码
        create_time: "", //立项时间
        grade: "", //等级
        gradeDesc: "", //等级对应的描述
        existingStatus: "", //现有状态
        cityCode: "", //城市编码
        city: "", //城市
        projectName: "", //项目名称
        assetType: "", //资产类型
        cooperationMode: "", //合作模式
        expanderLoginName: "", //拓展人
        numberOfRooms: 100, //房间数量
        firstInvestmentTime: "", //首次投委时间
        signingTime: "", //签约时间
        oaRegionalDevelopmentDirector: "", //地区拓展负责人
        thisWeekLatestProgress: "", //本周最新进展
        projectReasonAction: "", //项目卡点
        suspendDrain: "", //暂缓/流失原因
        overdueWarning: "是", //超会超期预警，是/否
        overdueDays: 30, //超期天数
      },
    ],
    orders: [],
    limit: 10,
    start: 0,
    previousNumber: 1,
    nextNumber: 1,
    firstNumber: 1,
    lastNumber: 8,
  },
};
