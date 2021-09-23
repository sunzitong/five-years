import { getAppAuthInfo } from '@guanyu/xiaoguan-h5-tools';

export const getAppToken = () => {
  const authInfo = getAppAuthInfo() || {};
  if (authInfo.access_token) {
    sessionStorage.setItem('xiaoguan_notice_token', authInfo.access_token);
  }
};
