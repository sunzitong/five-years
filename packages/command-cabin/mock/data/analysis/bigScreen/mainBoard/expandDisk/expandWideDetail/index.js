/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114836
 *
 * 拓展盘面详情-拓宽台账宽表
 * @createBy baishiqiang
 * @updateAt 2021/9/28 下午2:44:00
 * @method GET
 */

exports.path = "/analysis/bigScreen/mainBoard/expandDisk/expandWideDetail";

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
        projectCode: "", //项目编码
        create_time: "", //立项时间
        grade: "", //等级
        gradeDesc: "", //等级对应的描述
        existingStatus: "", //现有状态
        cityCode: "", //城市编码
        city: "", //城市
        project_name: "", //项目名称
        asset_type: "", //资产类型
        cooperationMode: "", //合作模式
        expander_login_name: "", //拓展人
        number_of_rooms: 100, //房间数量
        first_investment_time: "", //首次投委时间
        signing_time: "", //签约时间
        oa_regional_development_director: "", //地区拓展负责人
        this_week_latest_progress: "", //本周最新进展
        project_reason_action: "", //项目卡点
        suspend_drain: "", //暂缓/流失原因
        overdue_warning: "", //超会超期预警
        overdue_days: 30, //超期天数
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
