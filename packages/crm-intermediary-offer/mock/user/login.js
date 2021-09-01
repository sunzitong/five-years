import { delay } from 'roadhog-api-doc';

const login = {
  status: 'ok',
  msg: 'ok',
  data: {
    Authorization: 'Abcderfghjoic12345',
    channelName: '',
    departmentId: 123,
  }, // token 后续接口调用放到 请求头 Authorization
  timestamp: 1571708704511,
};

const proxy = {
  'GET /crm/agency/login': login,
  'GET /crm/agency/sendCode': login,
};

export default delay(proxy, 1000);
