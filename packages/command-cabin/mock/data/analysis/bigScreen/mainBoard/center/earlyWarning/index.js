/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114788
 *
 * 指挥中心-异常预警
 * @createBy wuyao
 * @updateAt 2021/9/27 下午6:45:22
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/center/earlyWarning";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: [
    {
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
