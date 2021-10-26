import { delay } from 'roadhog-api-doc';

// const responseSave = {
//   status: 'ok',
//   msg: 'ok',
//   data: {},
//   timestamp: 1551841460808,
// };

const responseInfo = {
  status: 'ok',
  data: '未核销原因',
  msg: 'msg',
};

const proxy = {
  'POST /api/contract/guanyu/big/agentOrderUnPay': responseInfo,
  // 'POST /api/bankFlowController/getUnPayRemarkById': responseInfo,
};

export default delay(proxy, 300);
