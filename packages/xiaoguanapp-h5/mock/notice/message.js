import { delay } from 'roadhog-api-doc';

// 消息详情
const messageDetail = {
  status: 'ok',
  msg: 'ok',
  data: {
    title: '消息标题',
    content: '待阅模板',
    detailContents: {
      OMS: '<p>{{date}}---{{name}}--{{project}}龙湖</p>',
      App_B: '<p>2019-01-01---王景辉--项目--成都龙湖，哈哈水电费我去热无法，发动机萨科技而科技疯狂夺金萨克拉附近的洛杉矶发顺丰读书卡街坊邻居顶仨垃圾分类扩大精神分裂空间看了就安分了健康路附近的索拉卡交付</p>',
    },
    createTime: 1573093454000,
  },
  timestamp: 1551841460808,
};

const proxy = {
  'GET /notification/message/detailContent': messageDetail,
};

export default delay(proxy, 300);
