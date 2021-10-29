import { http } from './http';

export function getNewsNotice(id, token) {
  return http(`/app-server/api/v1/message/noticeDetail?id=${id}`, '', 'GET', token);
}

// 获取活动详情
export function getActiveDetail(data, token) {
  return http('/commactivity-server/clientapi/activityinfo', data, 'POST', token);
}

// 是否可以申请报名活动
export function applyJoinActive(data, token) {
  return http('/commactivity-server/clientapi/signupcheck', data, 'POST', token);
}

// 提交报名信息
export function submitSignup(data, token) {
  return http('/commactivity-server/clientapi/signup', data, 'POST', token);
}

// 生成短链接
export function getShortUrl(url) {
  return http(`/gymwebsite/common/getShortUrl?url=${url}`, '', 'GET');
}


// 根据短连接生成二维码
// export function getQRCode(url) {
//   return http(`/webapp/mini/getQRCode?key=437&page=${url}`, '', 'GET');
// }
