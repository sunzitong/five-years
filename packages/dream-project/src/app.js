import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';

let appKey = '5e1ef78402ee4bda898c955c997d6a6b';
let jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
const visitSource = judgeDevice();

// 正式环境
if (window.location.href.includes('m.iguanyu.com')) {
  appKey = '15870161b5d247abb895eac7759a267b';
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

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
