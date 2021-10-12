/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113944
 *
 * 营造盘面-项目开业
 * @createBy huyanan
 * @updateAt 2021/10/12 11:18:35
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/construct/projectOpen";

exports.method = "GET";

exports.response = {
  traceId: null,
  requestId: null,
  status: "ok",
  msg: "ok",
  data: {
    totalOpenNum: 1639, //累计已开业间数
    totalOpenList: [
      //开业柱状图
      {
        year: 2017,
        total: 36000,
        list: [
          {
            transactionModel: "中资产",
            roomNum: 12000,
          },
          {
            transactionModel: "重资产",
            roomNum: 12000,
          },
          {
            transactionModel: "轻资产",
            roomNum: 12000,
          },
        ],
      },
      {
        year: 2018,
        total: 1959,
        list: [
          {
            transactionModel: "中资产",
            roomNum: 1054,
          },
          {
            transactionModel: "重资产",
            roomNum: 640,
          },
          {
            transactionModel: "轻资产",
            roomNum: 265,
          },
        ],
      },
      {
        year: 2019, //年份
        total: 8787, //合计
        list: [
          {
            transactionModel: "中资产", //资产类型
            roomNum: 3513, //房间数
          },
          {
            transactionModel: "重资产",
            roomNum: 640,
          },
          {
            transactionModel: "轻资产",
            roomNum: 4634,
          },
        ],
      },
      {
        year: 2020,
        total: 1959,
        list: [
          {
            transactionModel: "中资产",
            roomNum: 1054,
          },
          {
            transactionModel: "重资产",
            roomNum: 640,
          },
          {
            transactionModel: "轻资产",
            roomNum: 265,
          },
        ],
      },
      {
        year: 2021,
        total: 1959,
        list: [
          {
            transactionModel: "中资产",
            roomNum: 1054,
          },
          {
            transactionModel: "重资产",
            roomNum: 640,
          },
          {
            transactionModel: "轻资产",
            roomNum: 265,
          },
        ],
      },
    ],
    openTargetNum: 8721, //年开业目标间数
    notOpenNotGetNum: 1639, //待获取待开业间数
    notOpenNotGetRatio: 26.9, //待获取待开业间数占比
    openInfo: {
      //当年开业数据
      total: 1639, //年已开业间数
      ratio: 12.01, //年已开业间数占比
      list: [
        {
          transactionModel: "重资产",
          roomNum: 320, //房间数
          ratio: 50.1232, //房间数占比
        },
        {
          transactionModel: "轻资产",
          roomNum: 265,
          ratio: 10.0,
        },
        {
          transactionModel: "中资产",
          roomNum: 1054,
          ratio: 40.2341,
        },
      ],
    },
    notOpenInfo: {
      //当年未开业数据
      total: 73, //已获取待开业间数
      ratio: 12.01, //已获取待开业间数占比
      list: [
        {
          transactionModel: "重资产",
          roomNum: 320, //房间数
          ratio: 1.0, //房间数占比
        },
        {
          transactionModel: "轻资产",
          roomNum: 265,
          ratio: 4.0987,
        },
        {
          transactionModel: "中资产",
          roomNum: 1054,
          ratio: 100.0,
        },
      ],
    },
  },
  timestamp: 1630893610239,
};
