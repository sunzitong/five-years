/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113948
 *
 * 营造盘面详情
 * @createBy huyanan
 * @updateAt 2021/9/22 上午9:14:33
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/list";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    total: 8, //总数量
    pages: 1, //总页数
    pageSize: 10, //每页数量
    pageNum: 1, //第几页
    list: [
      {
        projectNo: "L-CD00-CDSDT00.08", //分期ID
        name: "龙湖冠寓成都时代店", //名称
        cityDepartmentName: "成都", //城市
        year: 2021, //开业年份
        stage: "已开业", //项目阶段 已开业/未开业
        transactionModel: "重资产", //资产类型 重/中/轻资产
        roomNum: 320, //房间间数
        planEnterDate: "2019/07/30", //计划进场时间
        actualEnterDate: "2019/07/30", //实际进场时间
        structureFinishDate: "2019/07/30", //结构封顶时间
        mainFinishDate: "2019/07/30", //主题竣工时间
        transferImprovementDate: "2019/07/30", //移交精装修时间
        improvementStartDate: "2019/07/30", //精装修开始时间
        isIpd: "是", //是否IPD 是/否
        transferServiceDate: "2019/07/30", //移交运营时间
        workDays: 20, //工期（天）
        planOpenDate: "2019/07/30", //计划开业时间
        actualOpenDate: "2019/07/30", //实际开业时间
        startCheckScore: 20, //开业检分数
        midCheckScore: 10, //中期停止点检查得分
        qualityScore: 10, //移交质量评估合格率
        riskType: "延期风险", //风险类别
        riskReportDate: "2021/08/07", //风险提报时间
        chokePoint: "无", //项目卡点
        fireControlType: "证照合规", //消防证照合规性
        buildingDesignPerson: "无",
        buildingDesignTel: "无",
        buildingDesignCompany: "无",
        improvementDesignPerson: "无",
        improvementDesignTel: "无",
        improvementDesignCompany: "无",
        landscapeDesignPerson: "无",
        landscapeDesignTel: "无",
        landscapeDesignCompany: "无",
        buildingConstructionPerson: "无",
        buildingConstructionTel: "无",
        buildingConstructionCompany: "无",
        improvementConstructionPerson: "无",
        improvementConstructionTel: "无",
        improvementConstructionCompany: "无",
        landscapeConstructionPerson: "无",
        landscapeConstructionTel: "无",
        landscapeConstructionCompany: "无",
      },
      {
        projectNo: "L-XM00-XMHLG00.01",
        name: "龙湖冠寓厦门高新园店",
        cityDepartmentName: "厦门",
        year: 2021,
        stage: "已开业",
        transactionModel: "轻资产",
        roomNum: 100,
        planEnterDate: "2021/08/18",
        actualEnterDate: "2021/08/18",
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: "是",
        transferServiceDate: null,
        workDays: null,
        planOpenDate: "2021/08/28",
        actualOpenDate: "2021/08/28",
        startCheckScore: null,
        midCheckScore: 100,
        qualityScore: 100,
        riskType: "延期风险",
        riskReportDate: "2021/08/19",
        chokePoint: "卡点",
        fireControlType: "证照合规",
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
      },
      {
        projectNo: "4",
        name: "123",
        cityDepartmentName: "bj",
        year: 2021,
        stage: "已开业",
        transactionModel: "轻资产",
        roomNum: 0,
        planEnterDate: null,
        actualEnterDate: null,
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: null,
        transferServiceDate: null,
        workDays: null,
        planOpenDate: null,
        actualOpenDate: null,
        startCheckScore: null,
        midCheckScore: null,
        qualityScore: null,
        riskType: "延期风险",
        riskReportDate: "2021/08/23",
        chokePoint: null,
        fireControlType: "证照合规",
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
      },
      {
        projectNo: "5",
        name: "123",
        cityDepartmentName: "bj",
        year: 2021,
        stage: "未开业",
        transactionModel: "重资产",
        roomNum: 0,
        planEnterDate: "2019/07/31",
        actualEnterDate: "2019/07/31",
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: "否",
        transferServiceDate: null,
        workDays: null,
        planOpenDate: "2019/07/31",
        actualOpenDate: "2019/07/31",
        startCheckScore: null,
        midCheckScore: null,
        qualityScore: null,
        riskType: "跨年风险",
        riskReportDate: "2021/08/23",
        chokePoint: null,
        fireControlType: "证照不合规",
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
      },
      {
        projectNo: "6",
        name: "123",
        cityDepartmentName: "bj",
        year: 2021,
        stage: "已开业",
        transactionModel: "中资产",
        roomNum: 0,
        planEnterDate: "2019/07/31",
        actualEnterDate: "2019/07/31",
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: "是",
        transferServiceDate: null,
        workDays: null,
        planOpenDate: "2019/07/31",
        actualOpenDate: "2019/07/31",
        startCheckScore: null,
        midCheckScore: null,
        qualityScore: null,
        riskType: "延期风险",
        riskReportDate: "2021/08/23",
        chokePoint: null,
        fireControlType: "办理中",
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
      },
      {
        projectNo: "7",
        name: "123",
        cityDepartmentName: "bj",
        year: 2021,
        stage: "已开业",
        transactionModel: "中资产",
        roomNum: 0,
        planEnterDate: "2019/07/31",
        actualEnterDate: "2019/07/31",
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: "是",
        transferServiceDate: null,
        workDays: null,
        planOpenDate: "2019/07/31",
        actualOpenDate: "2019/07/31",
        startCheckScore: null,
        midCheckScore: null,
        qualityScore: null,
        riskType: "跨年风险",
        riskReportDate: "2021/08/23",
        chokePoint: null,
        fireControlType: null,
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
      },
      {
        projectNo: "8",
        name: "",
        cityDepartmentName: "成都",
        year: 2019,
        stage: "已开业",
        transactionModel: "重资产",
        roomNum: 320,
        planEnterDate: "2019/07/31",
        actualEnterDate: "2019/07/31",
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: "是",
        transferServiceDate: null,
        workDays: null,
        planOpenDate: "2019/07/31",
        actualOpenDate: "2019/07/31",
        startCheckScore: null,
        midCheckScore: 10,
        qualityScore: 10,
        riskType: "延期风险",
        riskReportDate: "2021/08/08",
        chokePoint: "无",
        fireControlType: "证照合规",
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
      },
      {
        projectNo: "9",
        name: "龙湖冠寓厦门高新园店",
        cityDepartmentName: "厦门",
        year: 2021,
        stage: "已开业",
        transactionModel: "轻资产",
        roomNum: 100,
        planEnterDate: "2021/08/19",
        actualEnterDate: "2021/08/19",
        structureFinishDate: null,
        mainFinishDate: null,
        transferImprovementDate: null,
        improvementStartDate: null,
        isIpd: "是",
        transferServiceDate: null,
        workDays: null,
        planOpenDate: "2021/08/29",
        actualOpenDate: "2021/08/29",
        startCheckScore: null,
        midCheckScore: 100,
        qualityScore: 100,
        riskType: "延期风险",
        riskReportDate: "2021/08/20",
        chokePoint: "卡点",
        fireControlType: "证照合规",
        buildingDesignPerson: null,
        buildingDesignTel: null,
        buildingDesignCompany: null,
        improvementDesignPerson: null,
        improvementDesignTel: null,
        improvementDesignCompany: null,
        landscapeDesignPerson: null,
        landscapeDesignTel: null,
        landscapeDesignCompany: null,
        buildingConstructionPerson: null,
        buildingConstructionTel: null,
        buildingConstructionCompany: null,
        improvementConstructionPerson: null,
        improvementConstructionTel: null,
        improvementConstructionCompany: null,
        landscapeConstructionPerson: null,
        landscapeConstructionTel: null,
        landscapeConstructionCompany: null,
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
