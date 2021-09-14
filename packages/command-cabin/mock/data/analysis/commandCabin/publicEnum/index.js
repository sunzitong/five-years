/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/112036
 *
 * OMS-公用枚举
 * @createBy wuyao
 * @updateAt 2021/9/1 下午8:11:33
 * @method GET
 */

exports.path = "/analysis/commandCabin/publicEnum";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    publicSentimentTypes: [
      { name: "CUSTOMER_DEATH", desc: "租户身亡" },
      { name: "PERSONAL_INJURY", desc: "人身伤害" },
      { name: "EPIDEMIC_RELATED", desc: "疫情相关" },
      { name: "HARDWARE_RELATED", desc: "硬件相关" },
      { name: "MEDIA", desc: "媒体舆情" },
      { name: "PUBLIC_SECURITY", desc: "治安事件" },
      { name: "OTHER", desc: "其他" },
    ], //舆情分类
    crisisLabels: [
      { name: "RED", desc: "红色" },
      { name: "YELLOW", desc: "橙色" },
      { name: "GREEN", desc: "绿色" },
    ], //危机标签
    dataLevels: [
      { name: "GROUP", desc: "全国" },
      { name: "AREA", desc: "大区" },
      { name: "CITY", desc: "城市" },
    ], //组织级别
    dateScopes: [
      { name: "YEARLY", desc: "年范围" },
      { name: "MONTHLY", desc: "月范围" },
      { name: "DAILY", desc: "日范围" },
    ], //时间范围
  },
};
