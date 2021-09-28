/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114814
 *
 * 拓展盘面-战略合作
 * @createBy baishiqiang
 * @updateAt 2021/9/28 AM 11:2:56
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/strategyCooperation";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    stateEnterpriseCoopNum: 1, //国企平台已合作个数
    stateEnterpriseNegoNum: 1, //国企平台洽谈中个数
    fundSideCoopNum: 1, //资金方已合作个数
    fundSideNegoNum: 1, //资金方洽谈中个数
    mainToMainCoopNum: 1, //总对总已合作个数
    mainToMainNegoNum: 1, //总对总洽谈中个数
  },
};
