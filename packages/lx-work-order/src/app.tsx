import { Toast } from 'antd-mobile';
import { configRequest } from '@guanyu/shared';

const request = configRequest({
  // http错误
  onError(err) {
    Toast.fail(err.message);
  },
  // status!=="ok"
  onFail(msg) {
    Toast.fail(msg);
  },
});

request.requestInterceptors = [];

export { request };
