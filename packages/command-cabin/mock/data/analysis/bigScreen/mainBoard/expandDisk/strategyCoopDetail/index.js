/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114840
 *
 * 拓展盘面详情-战略合作表
 * @createBy baishiqiang
 * @updateAt 2021/9/28 下午2:49:37
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/strategyCoopDetail";

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
        city: "", //城市
        partnerName: "", //合作方名称
        enterpriseState: "", //企业状态
        enterpriseStateDesc: "", //企业状态描述
        type: 1, //类型
        typeDesc: "", //类型描述
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
