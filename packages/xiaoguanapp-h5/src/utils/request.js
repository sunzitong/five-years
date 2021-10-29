import { fetch } from 'dva';
import { Toast } from 'antd-mobile';
import { getAppToken } from 'utils/getToken';

getAppToken();

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  408: '请求超时',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status <= 401) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.status = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @returns {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const token = sessionStorage.getItem('xiaoguan_notice_token');
  const defaultOptions = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
      // Authorization: 'Bearer appc1a125f5a4bc412fb4672e5cbb9df7c9',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .catch((e) => {
      setTimeout(() => {
        Toast.fail(e.message);
      }, 0);
    });
}
