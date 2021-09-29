/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113592
 *
 * 营造盘面-维保报事
 * @createBy baishiqiang
 * @updateAt 2021/9/10 16:14:25
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/repairStat";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    //水电类报事
    plumbingElectricRepair: {
      count: 15, //数量
      ratio: 0.15, //比例
    },
    //装修类报事
    decorationRepair: {
      count: 20,
      ratio: 0.2,
    },
    //设备类报事
    deviceRepair: {
      count: 20,
      ratio: 0.2,
    },
    //其它
    other: {
      count: 0,
      ratio: 0.0,
    },
  },
};
