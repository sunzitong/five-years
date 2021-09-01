import { typeOf } from '@/utils/library';

const { localStorage } = window;
const AUTH_STORE = '____CRM____H5____';

/**
 * 获取用户token
 */
export const getAuthInfo = () => {
  const value = localStorage.getItem(AUTH_STORE);
  if (value === null) return {};
  return JSON.parse(value);
};


/**
 * 保存用户token
 */
export const setAuthInfo = (data) => {
  if (typeOf(data) !== 'object') return;
  const newInfo = Object.assign(getAuthInfo(), data);
  localStorage.setItem(AUTH_STORE, JSON.stringify(newInfo));
};

/**
 * 清除用户token
 */
export const removeAuthInfo = () => {
  localStorage.removeItem(AUTH_STORE);
};
