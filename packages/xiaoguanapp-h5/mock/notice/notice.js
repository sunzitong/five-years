import { delay } from 'roadhog-api-doc';

// 公告详情
const noticeDetail = {
  status: 'ok',
  msg: 'ok',
  data: {
    id: 1,
    noticeId: 12,
    createTime: 1571644820000,
    projectId: 10,
    projectName: '门店名称',
    noticeTemplateStatus: 'Important',
    noticeContents: {
      title: '上线公告标题',
      content: '<p>公告内容：放大发范德萨发发发任务热水打发大水安抚阿斯蒂芬撒旦撒范德萨撒范法师打发斯蒂芬撒旦法撒旦法撒旦法三大法师法萨芬收费热无法萨芬废弃物热风的发大水热发大水发撒的范德萨发的是范德萨发人太少方式大姐夫开会萨拉丁后方可打砂机 发动机省略号反绝杀进口量分为hiof纳斯达克量加热炉哈佛就看电视了非进口打蜡附近可我就如风过境开始都是加咖啡接口都酸辣粉进口代理商价放大数据库里附近为了居然放两大设计费啥叫好福利的沙基里防静电卡死了恢复健康的哈弗大厦返回了撒娇萨芬撒范德萨发德萨发发按时范德萨发</p>',
      startTime: '影响开始时间',
      endTime: '影响j结束时间',
      scope: '影响范围',
      tips: '注意事项',
      contacts: '联系人',
      tel: '联系人电话',
      pics: [
        'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/2pQlzdo6TEs.jpg',
        'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/93hOV21jCxI.png',
      ],
      attachments: [
        {
          uid: '1',
          name: '冠寓大house',
          url: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/2pQlzdo6TEs.jpg',
        },
        {
          uid: '2',
          name: '小程序图',
          url: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/93hOV21jCxI.png',
        },
      ],
    },
  },
};

// 公告详情
const shareDetail = {
  status: 'ok',
  msg: 'ok',
  data: {
    id: 1,
    noticeId: 12,
    createTime: 1571644820000,
    projectId: 10,
    projectName: '门店名称',
    noticeTemplateStatus: 'Important',
    noticeContents: {
      title: '上线公告标题',
      content: '<p>公告内容：放大发范德萨发发发任务热水打发大水安抚阿斯蒂芬撒旦撒范德萨撒范法师打发斯蒂芬撒旦法撒旦法撒旦法三大法师法萨芬收费热无法萨芬废弃物热风的发大水热发大水发撒的范德萨发的是范德萨发人太少方式大姐夫开会萨拉丁后方可打砂机 发动机省略号反绝杀进口量分为hiof纳斯达克量加热炉哈佛就看电视了非进口打蜡附近可我就如风过境开始都是加咖啡接口都酸辣粉进口代理商价放大数据库里附近为了居然放两大设计费啥叫好福利的沙基里防静电卡死了恢复健康的哈弗大厦返回了撒娇萨芬撒范德萨发德萨发发按时范德萨发</p>',
      startTime: '影响开始时间',
      endTime: '影响j结束时间',
      scope: '影响范围',
      tips: '注意事项',
      contacts: '联系人',
      tel: '联系人电话',
      pics: [
        'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/2pQlzdo6TEs.jpg',
        'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/93hOV21jCxI.png',
      ],
      attachments: [
        {
          uid: '1',
          name: '冠寓大house',
          url: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/2pQlzdo6TEs.jpg',
        },
        {
          uid: '2',
          name: '小程序图',
          url: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/93hOV21jCxI.png',
        },
      ],
    },
  },
};

const proxy = {
  'GET /notification/notice/noticeUserRelationByNoticeId': noticeDetail,
  'GET /notification/notice/shareNoticeById': shareDetail,
};

export default delay(proxy, 300);
