import { getAppAuthInfo } from '@guanyu/xiaoguan-h5-tools';
import { parse } from 'qs';

const url = decodeURIComponent(window.location.href);

export const getAppToken = () => {
  const authInfo = getAppAuthInfo() || {};
  if (authInfo.access_token) {
    sessionStorage.setItem('xiaoguan_notice_token', authInfo.access_token);
  }
};

export const urlParams = parse(url.split('?')[1]);
