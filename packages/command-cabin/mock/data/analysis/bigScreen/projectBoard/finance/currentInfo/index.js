/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114772
 *
 * 财务相关指标-当前投资实现情况
 * @createBy huyanan
 * @updateAt 2021/9/28 PM 2:48:58
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/finance/currentInfo";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    awards: 39.6, //奖补到账
    month: 60, //项目动态收益回收周期
    transactionModel: "LightAsset", //资产类型 LightAsset MediumAsset HeavyAsset
    list: [
      {
        "冠寓第三年Y-C%": ["23.3", "35.5", "12.2"],
      },
      {
        "NPI利润率%（第1/2/3年）": ["23/30/40", "23/30/40", "0/0/0"],
      },
    ],
  },
  timestamp: 1632737364180,
};
