/**
 * 用 @guanyu/shared cloneJSON 代替
 * @param obj 序列化JSON克隆对象
 */

import Vue from "vue";
import { iwant } from "@guanyu/shared";

/**
 * 交换数组位置
 * 用 @guanyu/shared swapArray 代替
 * @param arr 源数组
 * @param index1 索引1
 * @param index2 索引2
 */

/**
 * 判断字段是否存在
 * 用 lodash/get 代替
 * @param object 对象
 * @param path 字符串表示的访问路径
 */

/**
 * 获取线上环境
 * 用 @guanyu/shared getEnvHost 代替
 * @returns staging | test109 | development | production
 */

/**
 * 获取url的query 包括hash模式的$route.query
 * 用 @guanyu/shared getQueries 代替
 * @param searchStr 网址的search部分 不传则当前网址
 */

export interface ToPixel {
  (px: number, unit?: false): number;
  (px: number, unit: true): string;
}

/**
 * 转rem
 */
export const toRem: ToPixel = (px: number, unit = false): any => {
  const rem = iwant.calc(px / 100, 5);
  return unit ? `${rem}rem` : rem;
};

/**
 * 转vw
 */
export const toVw: ToPixel = (px: number, unit = false): any => {
  const vw = iwant.calc((100 / 375) * px, 5);
  return unit ? `${vw}vw` : vw;
};

/**
 * 根据rootpx按比例计算
 */
export const toRpx: ToPixel = (px: number, unit = false): any => {
  const rpx = iwant.calc((Vue.rpx / 100) * px, 5);
  return unit ? `${rpx}px` : rpx;
};

const getYearAndMonth = (date: DateType) => {
  const d = new Date(date);
  return {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
  };
};

/**
 *
 * @param year 当前年
 * @param month 当前月
 * @param count 往前取几个月
 * @returns string '2020-1';
 */
export const getMonthByNum = (end: DateType, count: number, double = true) => {
  const e = getYearAndMonth(end);

  const res = [];
  for (let i = count; i--; ) {
    if (e.m === 0) {
      e.m = 12;
      e.y--;
    }
    res.push(`${e.y}-${double ? `${e.m}`.padStart(2, "0") : e.m}`);
    e.m--;
  }
  return res;
};

export type DateType = string | number | Date;
/**
 *
 * @param start 开始日期
 * @param end 结束日期
 * @returns string '2020-1';
 */
export const getMonthByDate = (
  start: DateType,
  end: DateType,
  double = true
) => {
  const s = getYearAndMonth(start);
  const e = getYearAndMonth(end);
  const res = [];

  if (s.y >= e.y && s.m >= s.m) {
    return [`${e.y}-${e.m}`];
  }

  while (e.y !== s.y || e.m !== s.m) {
    if (s.m > 11) {
      s.y += 1;
      s.m = 0;
    }
    const m = double ? `${s.m + 1}`.padStart(2, "0") : s.m;
    res.unshift(`${s.y}-${m}`);
    s.m += 1;
  }

  return res;
};
