/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114792
 *
 * 门店屏幕-分险预警
 * @createBy wuyao
 * @updateAt 2021/10/14 15:16:2
 * @method GET
 */

exports.path =
  "/analysis/bigScreen/projectBoard/managementSituation/earlyWarning";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
      id: 12, //唯一id
      orderId: 12345, //工单id
      projectId: 84, //门店id
      projectName: "酒仙桥店", //门店名称
      stage: "INVEST", //阶段
      stageDesc: "投资", //阶段描述
      type: "INCOME", //预警类型
      typeDesc: "收入预警", //预警类型描述
      detail: "收入预警", //预警详情
      riskDegree: 3, //风险程度
    },
  ],
};
