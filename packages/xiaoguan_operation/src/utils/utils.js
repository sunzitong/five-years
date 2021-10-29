import moment from 'moment';

/**
 * 返回一个数组
 */
export const wantArray = array => (Array.isArray(array) ? array : []);

/**
 * 判断值是否有效
 * 无效值[undeined, null, NaN, '']
 */
export function isValidValue(val) {
  return ![undefined, null, NaN, ''].includes(val);
}

/**
 * 格式化数据
 * 非有效值返回 '--'
 */
export function formatValue(val) {
  if (!isValidValue(val)) return '--';
  return val;
}

/**
 * 时间格式化 YYYY-MM-DD 默认
 */
export function formatMoment(val, format = 'YYYY-MM-DD') {
  if (!isValidValue(val) || !moment(val).isValid()) return '--';
  return moment(val).format(format);
}

/**
 * 格式化日期 YYYY-MM-DD HH:mm:ss
 */
export function formatSecond(val) {
  return formatMoment(val, 'YYYY-MM-DD HH:mm:ss');
}
