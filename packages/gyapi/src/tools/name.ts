import * as _ from "lodash";
import { Api } from "@/config";
import * as dayjs from "dayjs";

/**
 * 获取接口地址尾部
 * @param path 接口地址
 */
const getPathTail = (path: string) => {
  return path
    .split("/")
    .slice(-1)[0]
    .replace(/{|}/g, "")
    .replace(/([-_].)/g, ($1) => $1[1].toUpperCase());
};

/**
 * 首字母转大写
 * @param str 被转换字符串
 */
export const toPascal = (str: string) => {
  return str.replace(/./, ($1) => $1.toUpperCase());
};

/**
 * 格式化生成接口名称
 * @param api 接口
 */
export const getApiName = (api: Api) => {
  return `fetch${toPascal(getPathTail(api.path))}`;
};

/**
 * 格式化生成类型名
 */
export const getTypeName = (api: Api, { suffix }: { suffix: string }) => {
  return toPascal(getPathTail(api.path)) + toPascal(suffix);
};

/**
 * 生成接口地址
 * @param api 接口
 */
export const getApiPath = (api: Api, toParams = false) => {
  let path = `${api.basepath}${api.path}`;
  if (toParams) {
    path = path.replace(/{\w+}/g, ($1) => {
      return ":" + $1.slice(1, -1);
    });
  }
  return path;
  // http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=%E5%9F%BA%E7%A1%80-%E5%B9%B3%E5%8F%B0
};

/**
 * 生成接口修改时间
 * @param api 接口
 */
export const getUpdateTime = (api: Api) => {
  return dayjs(api.up_time * 1000).format("YYYY/M/D A h:m:s");
};
