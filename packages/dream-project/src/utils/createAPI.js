import { stringify } from 'qs';
import request from '@/utils/request';

export default function CreateApi(URL, METHOD = 'GET', alwaysReturn) {
  return async function r(params) {
    switch (METHOD.toUpperCase()) {
      case 'GET':
        let a = request(`${URL}?${stringify(params)}`, {}, alwaysReturn)
        return a;
      case 'POST':
        return request(`${URL}`, {
          method: 'post',
          data: params,
        }, alwaysReturn);
      case 'DOWNLOAD':
        return request(`${URL}?${stringify(params)}`, {
          method: 'GET',
          download: true,
        }, alwaysReturn);
      default:
        break;
    }
  };
}
