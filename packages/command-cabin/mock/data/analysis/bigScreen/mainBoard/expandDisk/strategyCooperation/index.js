/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114814
 *
 * 拓展盘面-战略合作
 * @createBy baishiqiang
 * @updateAt 2021/10/25 16:27:36
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/strategyCooperation";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    stateEnterpriseCoopNum: 0, //国企平台已合作个数
    stateEnterpriseNegoNum: 0, //国企平台洽谈中个数
    fundSideCoopNum: 1, //资金方已合作个数
    fundSideNegoNum: 90, //资金方洽谈中个数
    mainToMainCoopNum: 1, //总对总已合作个数
    mainToMainNegoNum: 0, //总对总洽谈中个数
  },
};
