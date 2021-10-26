import request from '@/utils/request';

export default function CreateApi(URL, METHOD = 'GET') {
  return async function r(params) {
    // console.log(params);
    switch (METHOD.toUpperCase()) {
      case 'GET':
        return request.get(URL, {
          params,
        });
      case 'POST':
        return request.post(URL, { data: params });
      case 'DELETE':
        return request.delete(URL, params);
      case 'DOWNLOAD':
        return request.get(URL, {
          params,
        }, { download: true });
      default:
        break;
    }
  };
}
