import { Api } from "@/config";
import * as json5 from "json5";
import { toPascal } from "./name";
import * as _ from "lodash";

/**
 * 是否是公用枚举接口
 * @param api 接口
 * @returns 是否是公用枚举接口
 */
export const isEnumApi = (api: Api) => {
  return (
    api.title.includes("枚举") &&
    api.path.toLowerCase().includes("enum") &&
    api.res_body_type === "json" &&
    !api.res_body_is_json_schema &&
    api.res_body.trim()
  );
};

/**
 * 格式化枚举data
 * @param api 接口
 * @returns 格式化后的枚举集合
 */
export const formatEnumData = (api: Api) => {
  const data = json5.parse(api.res_body)?.data;
  const record: Record<string, any> = {};
  if (_.isPlainObject(data)) {
    for (const name in data) {
      record[toPascal(name)] = data[name];
    }
  }
  return record;
};

/**
 * 获取枚举值
 * @param apiFieldItem 枚举对象
 * @returns 枚举值
 */
export const getEnumValue = (apiFieldItem: Record<string, string>) => {
  return apiFieldItem?.value || apiFieldItem?.name || "";
};

/**
 * 获取枚举注释
 * @param apiFieldItem 枚举对象
 * @returns 枚举注释
 */
export const getEnumLabel = (apiFieldItem: Record<string, string>) => {
  return apiFieldItem?.label || apiFieldItem?.desc || "";
};
