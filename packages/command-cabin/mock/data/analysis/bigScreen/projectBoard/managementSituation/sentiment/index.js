/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113600
 *
 * 门店屏幕-经营现状-舆情风险
 * @createBy wuyao
 * @updateAt 2021/10/19 15:25:59
 * @method GET
 */

exports.path = "/analysis/bigScreen/projectBoard/managementSituation/sentiment";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    redNum: 23, //红色数
    yellowNum: 2323, //橙色数
    numsByType: [
      {
        typeNum: "名称", //类型
        num: 23, //数值
        ratio: 23.23, //占比
      },
      {
        typeNum: "名称1", //类型
        num: 25, //数值
        ratio: 23.23, //占比
      },
    ], //红橙舆情分类分布
  },
};
