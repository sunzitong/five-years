/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/112036
 *
 * OMS-公用枚举
 * @createBy wuyao
 * @updateAt 2021/9/29 17:32:14
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
    riskTypes: [
      { name: "Delay", desc: "延期风险" },
      { name: "CrossYear", desc: "跨年风险" },
      { name: "NoRisk", desc: "无风险" },
    ],
    warningOptStages: [
      { name: "INVEST", desc: "投资" },
      { name: "OPERATE", desc: "运营" },
      { name: "MARKETING", desc: "营销" },
    ], //预警阶段
    warningTypes: [
      { name: "OVER_PERIOD", desc: "超期预警" },
      { name: "INCOME", desc: "收入预警" },
      { name: "RENT_RATIO", desc: "出租率预警" },
      { name: "STAFF_LEAVE", desc: "人员离岗" },
      { name: "OPT_QUALITY", desc: "运营品质" },
      { name: "SECURITY", desc: "安全风险" },
      { name: "FIRE_SITUATION", desc: "火情风险" },
    ], //预警类型
  },
};
