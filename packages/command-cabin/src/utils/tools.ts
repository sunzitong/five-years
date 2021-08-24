import Vue from "vue";
import { iwant } from "@guanyu/shared";

export interface ToPixel {
  (px: number, unit?: false): number;
  (px: number, unit: true): string;
}

export interface FormatColorStr {
  (str: string, length: number): string[];
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
export const formatColorStr: FormatColorStr = (
  str: string,
  length: number
): string[] => {
  if (str.includes("|")) {
    return str.split("|").slice(0, length);
  }
  return [str].concat(Array(length - 1).fill("#FFF"));
};
