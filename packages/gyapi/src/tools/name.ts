import * as _ from "lodash";
import { Api } from "@/config";

/**
 * 获取接口地址尾部
 * @param path 接口地址
 */
const getPathTail = (path: string) => {
  return path.split("/").slice(-1)[0].replace(/{|}/g, "").replace(/\-/g, "_");
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
export const getApiPath = (api: Api) => {
  return `${api.basepath}${api.path}`;
  // replace(/{\w+}/g, $1 => {
  //   return ":" + $1.slice(1, -1);
  // })
  // http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=%E5%9F%BA%E7%A1%80-%E5%B9%B3%E5%8F%B0
};
