/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113594
 *
 * 指挥中心-经营现状-舆情风险
 * @createBy wuyao
 * @updateAt 2021/10/21 16:53:40
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/managementSituation/sentiment";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    redNum: 23, //红色数
    yellowNum: 2323, //橙色数
    numsByCity: [
      {
        cityId: 1, //城市id
        cityName: "北京", //城市名称
        redNum: 23, //红色数
        yellowNum: 2323, //橙色数
      },
      {
        cityId: 2, //城市id
        cityName: "上海", //城市名称
        redNum: 23, //红色数
        yellowNum: 2323, //橙色数
      },
    ], //各月红橙舆情条数
    numsByType: [
      {
        typeNum: "名称", //类型
        num: 23, //数值
        ratio: 23.23, //占比
      },
      {
        typeNum: "名称1", //类型
        num: 23, //数值
        ratio: 23.23, //占比
      },
    ], //红橙舆情分类分布
  },
};
