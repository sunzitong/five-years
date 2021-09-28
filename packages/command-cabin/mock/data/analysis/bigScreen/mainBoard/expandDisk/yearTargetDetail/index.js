/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114838
 *
 * 拓展盘面详情-年度目标表
 * @createBy baishiqiang
 * @updateAt 2021-9-28 6:25:40 ├F10: PM┤
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/yearTargetDetail";

exports.method = "GET";

exports.response = {
  status: "ok",
  msg: "ok",
  data: {
    total: 1, //总数量
    pages: 1, //总页数
    pageSize: 10, //每页数量
    pageNum: 1, //第几页
    list: [
      {
        id: 1, //主键ID
        year: "2021", //年份
        city: "北京", //城市
        targetNumber: 100, //年度拓展目标
        annualOpeningTarget: 100, //"年度开业目标"
      },
    ],
    orders: [],
    limit: 10,
    start: 0,
    previousNumber: 1,
    nextNumber: 1,
    firstNumber: 1,
    lastNumber: 8,
  },
};
