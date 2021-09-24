import Vue from "vue";
import { iwant } from "@guanyu/shared";
import _ from "lodash";

export interface ToPixel {
  (px: number, unit?: false): number;
  (px: number, unit: true): string;
}

/**
 * 用 @guanyu/shared cloneJSON 代替
 * @param obj 序列化JSON克隆对象
 */

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

/**
 * 根据rootpx按比例计算
 */
export const toRpx: ToPixel = (px: number, unit = false): any => {
  const rpx = iwant.calc((Vue.rpx / 100) * px, 5);
  return unit ? `${rpx}px` : rpx;
};

/**
 * 拆分颜色
 * "#fff"|#000
 */
export const formatColors = (
  colors: string | string[],
  length: number
): string[] => {
  let arr = [];
  if (_.isArray(colors)) {
    arr = colors;
  } else {
    arr = colors.split("|");
  }
  arr = arr.slice(0, length);
  if (arr.length < length) {
    arr = arr.concat(Array(length - arr.length).fill("#FFF"));
  }
  return arr;
};

/**
 * 千分符格式化数字
 * @param number 要格式化的数字
 * @param sep 默认逗号分隔符
 * @param stepLen 默认按3位分隔
 */
export const sepNumber = (number: unknown, sep = ",", stepLen = 3) => {
  if (formatValue(number, null) === null) {
    return "";
  }
  const arr = `${number}`.split(".");
  let str = arr[0];
  // 负数
  const signed = +str < 0;
  if (signed) {
    str = str.substr(1);
  }
  let step = str.length % stepLen;
  let result = str.slice(0, step);
  while (step < str.length) {
    if (step > 0) result += sep;
    result += str.slice(step, step + stepLen);
    step += stepLen;
  }
  if (signed) {
    result = "-" + result;
  }
  if (arr[1]) {
    result += "." + arr[1];
  }
  return result;
};

/**
 * 角度转弧度
 * @param n number 角度
 * @returns angle 弧度
 */
export const d2a = (n: number): number => (n * Math.PI) / 180;

/**
 * 渲染 默认'--'
 * @param value value
 * @param defaultValue 默认值
 * @returns value | '--'
 */
export const formatValue = (value?: unknown, defaultValue: any = "--") => {
  return _.isNil(value) || value === "" || _.isNaN(value)
    ? defaultValue
    : value;
};

/**
 * 数字变化
 */
export const stepNumber = (
  {
    to,
    from = 0,
    duration = 1000,
    precision = 0,
  }: { to: number; from?: number; duration?: number; precision?: number },
  callback: (to: number) => void
) => {
  const plus = (to - from) / (duration / 30);
  const timer = setInterval(() => {
    from = from + plus;
    if ((plus > 0 && to > from) || (plus < 0 && to < from)) {
      // ...
    } else {
      clearInterval(timer);
      from = to;
    }
    callback(iwant.calc(from, precision));
  }, 30);
  return {
    clear: () => clearInterval(timer),
  };
};
