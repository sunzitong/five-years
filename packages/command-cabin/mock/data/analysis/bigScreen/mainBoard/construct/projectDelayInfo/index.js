/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113942
 *
 * 营造盘面-开业延期
 * @createBy huyanan
 * @updateAt 2021/10/21 10:1:43
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/projectDelayInfo";

exports.method = "GET";

exports.response = {
  traceId: null,
  requestId: null,
  status: "ok",
  msg: "ok",
  data: {
    delayProjectNum: 10,
    delayRoomNum: 1712,
    delayModelList: [
      {
        id: 2,
        planOpenDate: "2019/07/31",
        cityName: "北京",
        projectName: "123",
        transactionModel: "重资产",
        roomNum: 23,
        riskType: "跨年风险",
        chokePoint: null,
      },
      {
        id: 3,
        planOpenDate: "2019/07/31",
        cityName: "bj",
        projectName: "123",
        transactionModel: "中资产",
        roomNum: 54,
        riskType: "延期风险",
        chokePoint: null,
      },
      {
        id: 4,
        planOpenDate: "2019/07/31",
        cityName: "bj",
        projectName: "123",
        transactionModel: "中资产",
        roomNum: 870,
        riskType: "跨年风险",
        chokePoint: null,
      },
      {
        id: 5,
        planOpenDate: "2019/07/30",
        cityName: "成都",
        projectName: "龙湖冠寓成都时代店",
        transactionModel: "重资产",
        roomNum: 320,
        riskType: "延期风险",
        chokePoint: "无",
      },
      {
        id: 6,
        planOpenDate: "2021/08/28",
        cityName: "厦门",
        projectName: "龙湖冠寓厦门高新园店",
        transactionModel: "轻资产",
        roomNum: 100,
        riskType: "延期风险",
        chokePoint: "卡点",
      },
      {
        id: 7,
        planOpenDate: null,
        cityName: "bj",
        projectName: "123",
        transactionModel: "轻资产",
        roomNum: 65,
        riskType: "延期风险",
        chokePoint: null,
      },
      {
        id: 8,
        planOpenDate: "2019/07/31",
        cityName: "bj",
        projectName: "123",
        transactionModel: "重资产",
        roomNum: 50,
        riskType: "跨年风险",
        chokePoint: null,
      },
      {
        id: 9,
        planOpenDate: "2019/07/31",
        cityName: "bj",
        projectName: "123",
        transactionModel: "中资产",
        roomNum: 40,
        riskType: "延期风险",
        chokePoint: null,
      },
      {
        id: 10,
        planOpenDate: "2019/07/31",
        cityName: "bj",
        projectName: "123",
        transactionModel: "中资产",
        roomNum: 90,
        riskType: "跨年风险",
        chokePoint: null,
      },
      {
        id: 12,
        planOpenDate: "2021/08/29",
        cityName: "厦门",
        projectName: "龙湖冠寓厦门高新园店",
        transactionModel: "轻资产",
        roomNum: 100,
        riskType: "延期风险",
        chokePoint: "卡点",
      },
    ],
  },
  timestamp: 1630659696315,
};
