import { delay } from 'roadhog-api-doc';
import { mock } from 'mockjs';

const data = {
  status: 'ok',
  msg: 'ok',
  ...mock({ 'data|1': [true, false] }),
  timestamp: 1571708704511,
};

const district = {
  status: 'ok',
  msg: 'ok',
  data: {
    projects: [
      { id: 84, name: '龙湖冠寓成都时代店', cityId: '235', cityName: '成都' },
      { id: 85, name: '龙湖冠寓成都金楠天街店', cityId: '235', cityName: '成都' },
      { id: 87, name: '龙湖冠寓厦门高新园店', cityId: '116', cityName: '厦门' },
      { id: 88, name: '龙湖冠寓苏州钟园路店', cityId: '78', cityName: '苏州' },
      { id: 89, name: '龙湖冠寓杭州西溪蓝保店', cityId: '87', cityName: '杭州' },
      { id: 90, name: '龙湖冠寓杭州未来城融通店', cityId: '87', cityName: '杭州' },
      { id: 91, name: '龙湖冠寓上海周浦店-test100', cityId: '73', cityName: '上海' },
      { id: 92, name: '龙湖冠寓重庆新壹城店', cityId: '234', cityName: '重庆' },
      { id: 93, name: '龙湖冠寓南京河西大街店', cityId: '74', cityName: '南京' },
      { id: 94, name: '龙湖冠寓南京九竹路店', cityId: '74', cityName: '南京' },
      { id: 95, name: '龙湖冠寓南京长盛街店', cityId: '74', cityName: '南京' },
      { id: 96, name: '龙湖冠寓西安大兴东路店', cityId: '288', cityName: '西安' },
      { id: 97, name: '龙湖冠寓广州番禺钟村店', cityId: '197', cityName: '广州' },
      { id: 98, name: '龙湖冠寓北京酒仙桥店', cityId: '1', cityName: '北京' },
    ],
  },
};

const proxy = {
  'GET /crm/agency/isSneakByPhoneAndProjectId': data,
  'GET /crm/agency/projectNameList': district,
};

export default delay(proxy, 1000);
