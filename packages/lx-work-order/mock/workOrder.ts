export default {
  'GET /workOrder/reportOrder/notification-detail': {
    status: 'ok',
    msg: 'ok',
    data: {
      baseInfo: {
        reportOrderId: 1,
        areaName: '北京市朝阳区',
        projectName: '门店1',
        roomNo: null,
        reportType: '运营问题',
        eventTypeName: '人员意外伤亡类-租户及员工自杀-租户及员工自杀',
        reportLevel: '红色',
        reportOrderStatus: 'PENDING',
        reportOrderStatusDesc: '处理中',
      },
      orderDetail: {
        happenTime: '2020-10-01 10:00:00',
        creater: '管家',
        handler: '管家',
        clientAndBackGround: '多次发生报事',
        eventSituation: '10月份以来多次发生故障',
        casualtiesSituation: '无人员伤亡',
        publicOpinion: '没有引发舆论',
        measures: '已跟进处理',
        nextProcessingPlan: '帮租户维修',
        imgUrl: [
          'https://guanyutest.aliyuncs.com/test/app/test1.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test2.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test3.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test1.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test2.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test3.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test1.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test2.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test3.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test1.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test2.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test3.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test1.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test2.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test3.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test4.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test1.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test2.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test21.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test22.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test23.jpg',
          'https://guanyutest.aliyuncs.com/test/app/test24.jpg',
        ],
        notifyLimit: [],
      },
      handlerRecord: [
        {
          title: '好的', //title展示，小冠APP使用
          time: '2019-06-01 12:23:23', //时间
          handlerType: '已创建', //操作类型
          handlerName: '张三', //操作人
          desc: '租户或相关家属情况xxx', //备注
          tenantsAndFamily: '租户5人', //租户或相关家属情况
          otherTenants: '暂无其他租户', //其他租户
          media: '舆论情况稳定，暂无其他情况', //舆情及其他相关情况
          followUpAction: '管家持续跟进', //后续动作
          otherInformation: '暂无其他情况', //其他情况说明
          dealIdea: '未填写', //处理意见
          causes: '水管质量不好', //产生原因
          handlRemark: '处理备注222', //处理备注
          withdrawReason: '撤回理由111', //撤回理由
          imgs: [
            //处理记录图片
            // 'http://123.jpg',
            // 'http://456.jpg',
          ],
        },
      ],
    },
    timestamp: 1604473376086,
  },
  'GET /workOrder/reportOrder/longxin/todo': {
    status: 'ok',
    msg: 'ok',
    data: {},
  },
  'POST /workOrder/reportOrder/ideaBack': {
    status: 'ok',
    msg: 'ok',
    data: {},
  },
};
