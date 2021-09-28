/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114820
 *
 * 拓展盘面-商机转化
 * @createBy baishiqiang
 * @updateAt 2021/9/28 上午11:12:26
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/businessOppTrans";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    yearsEstabProjectNum: 100, //年累立项
    yearsMeetingProjectNum: 30, //年累过会
    yeasSignedProjectNum: 10, //年累签约
    estabTransRatio: 30.0, // 转化率，立项-签约
    meetingTransRatio: 30.0, //转化率，过会-签约
  },
};
