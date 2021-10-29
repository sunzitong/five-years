import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';

let appKey = '3ec10a66f82f4951ba811df964fcc199';
let jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
const visitSource = judgeDevice();

// 正式环境
if (window.location.href.includes('m.iguanyu.com')) {
  appKey = 'c6911bc459bb41a5acbb720e91057739';
  jsSrc = 'https://datain.longfor.com/zhuge.js?v=';
}
zhugeio({
  appKey,
  jsSrc,
  options: {
    superProperty: {
      访问来源: visitSource === 'browser' ? '其他' : visitSource,
    },
  },
});
