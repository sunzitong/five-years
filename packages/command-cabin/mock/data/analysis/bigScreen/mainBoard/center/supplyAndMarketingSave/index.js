/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114946
 *
 * 主屏-供销存
 * @createBy zhangyao03
 * @updateAt 2021/10/21 10:32:1
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/center/supplyAndMarketingSave";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    regionName: "北京地区", //区域名称
    ytdIncomeGap: 111.1, //YTD收入缺口(万元)
    forecastIncomeGap: 10.1, //预估获取项目收入缺口(万元)
    contractTerminationIncomeGap: 98.1, //解约&终止项目收入缺口(万元)
    openedAndTerminationIncomeGap: 23.1, //已开业-中止收入缺口(万元)
    openedAndPostponeIncomeGap: 23.1, //已开业-延期开业收入缺口(万元)
    openedAndAheadIncomeGap: 23.1, //已开业-提前开业收入缺口(万元)
    openAsUsualIncomeGap: 23.1, //已开业-正常营业收入缺口(万元)
  },
};
