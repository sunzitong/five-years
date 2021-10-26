/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/115336
 *
 * 客户洞察
 * @createBy zhangyao03
 * @updateAt 2021/10/21 16:18:27
 * @method GET
 */

exports.path =
  "/analysis/bigScreen/projectBoard/managementSituation/customerInsight";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    complaintRatio: 0.0, //投诉率
    receiveOrderTimelinessRatio: 97.5, //接单及时率
    complaintDetails: [
      //投诉率具体排名问题
      {
        itemId: 1505,
        itemName: "管家服务",
        orderStatusSum: 14,
      },
      {
        itemId: 1507,
        itemName: "保洁安保人员",
        orderStatusSum: 8,
      },
      {
        itemId: 1510,
        itemName: "房屋质量",
        orderStatusSum: 4,
      },
      {
        itemId: 1511,
        itemName: "费用问题",
        orderStatusSum: 3,
      },
      {
        itemId: 1526,
        itemName: "邻里问题",
        orderStatusSum: 3,
      },
      {
        itemId: 1525,
        itemName: "销售相关",
        orderStatusSum: 2,
      },
      {
        itemId: 1527,
        itemName: "噪音问题",
        orderStatusSum: 1,
      },
      {
        itemId: 1508,
        itemName: "维修服务",
        orderStatusSum: 1,
      },
    ],
  },
  timestamp: 1634640790706,
};
