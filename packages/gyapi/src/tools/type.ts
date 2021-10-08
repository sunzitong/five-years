import * as _ from "lodash";
import * as json5 from "json5";
import { Api } from "@/config";
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
  TypeScriptTargetLanguage,
} from "quicktype-core";
import { getTypeName } from "./name";

export type Types = {
  name: string;
  desc?: string;
  type: string;
  required?: boolean;
}[];

/**
 * 解析query和params格式参数,根据值推测
 * @param value 参数的值
 * @returns 单个值的ts类型
 */
export const inferQueryType = (value: unknown) => {
  if (value === "true" || value === "false") return "boolean";
  const n = _.toNumber(value);
  if (_.isNumber(n) && !_.isNaN(n)) return "number";
  // return value ? "string" : "unknown";
  return "unknown";
};

/**
 * 解析form格式参数,考虑文件类型
 * @param value 参数的值
 * @param type 值的mock类型
 * @returns 单个值的ts类型
 */
export const inferFormType = (value: unknown, type: "text" | "file") => {
  if (type === "file") return "Blob";
  return inferQueryType(value);
};

/**
 * 解析json格式参数
 * @param typeName 顶级类型名
 * @param jsonString json字符串
 * @returns ts类型
 */
export const inferJsonType = async (options: {
  typeName: string;
  jsonString: string;
  description?: string;
  allPropertiesOptional?: boolean;
}) => {
  const { typeName, jsonString, description, allPropertiesOptional } = options;

  const tsLang = new TypeScriptTargetLanguage();
  const jsonInput = jsonInputForTargetLanguage(tsLang);

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
    description,
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const { lines } = await quicktype({
    inputData,
    lang: tsLang,
    inferEnums: false,
    allPropertiesOptional,
    rendererOptions: {
      "just-types": "on",
      "acronym-style": "original",
    },
  });
  return lines.join("\n");
};

/**
 * 参数是否可空未知
 * @param types 参数类型
 * @returns 生成的参数是否为空
 */
const paramsTypeIsUnknown = (types: Types) => {
  return _.isEmpty(types);
};

/**
 * 参数全部可选
 * @param types 参数类型
 * @returns 生成的参数是否全部为可选
 */
const paramsTypeIsOptional = (types: Types) => {
  return !types.some((t) => t.required);
};

/**
 * 生成参数类型
 * @param api 接口
 * @returns 参数类型
 */
export const getParamsType = async (api: Api) => {
  const parsedTypes: Types = [];
  // quicktype解析json
  const qkType = { jsonType: "", hasJsonType: false };
  // 类型名
  const typeName = getTypeName(api, { suffix: "Params" });
  // GET参数
  if (api.method === "GET") {
    api.req_query.forEach((query) =>
      parsedTypes.push({
        name: query.name,
        desc: query.desc,
        type: inferQueryType(query.example),
        required: !!+query.required,
      })
    );
  }
  // POST参数
  if (api.method === "POST") {
    // POST-form格式
    if (api.req_body_type === "form") {
      api.req_body_form.forEach((form) => {
        parsedTypes.push({
          name: form.name,
          desc: form.desc,
          type: inferFormType(form.example, form.type),
          required: !!+form.required,
        });
      });
    }
    // POST-json格式
    if (
      api.req_body_type === "json" &&
      !api.req_body_is_json_schema &&
      api.req_body_other?.trim()
    ) {
      const json = json5.parse(api.req_body_other);
      if (typeof json === "object") {
        qkType.jsonType = await inferJsonType({
          typeName: typeName,
          jsonString: JSON.stringify(json),
          description: `${api.title}-参数`,
          allPropertiesOptional: true,
        });
        qkType.hasJsonType = true;
      }
    }
  }
  // 路径参数
  api.req_params.forEach((param) =>
    parsedTypes.push({
      name: param.name,
      desc: param.desc,
      type: inferQueryType(param.example),
      required: true,
    })
  );
  // headers参数
  const headersName: string[] = [];
  api.req_headers.forEach((param) => {
    if (!param.name.includes("-")) {
      //     parsedTypes.push({
      //       name: param.name,
      //       desc: param.desc,
      //       type: inferQueryType(param.example),
      //       required: !!+param.required,
      //     });
      headersName.push(param.name);
    }
  });
  return {
    typeName,
    parsedTypes,
    isUnknown: paramsTypeIsUnknown(parsedTypes),
    isOptional: paramsTypeIsOptional(parsedTypes),
    headersName,
    ...qkType,
  };
};

/**
 * 生成接口返回类型
 * @param api 接口
 */
export const getReturnType = async (api: Api) => {
  const returnType = {
    typeName: "",
    primitiveType: "any",
    hasJsonType: false,
    jsonType: "",
    jsonIsArray: false,
  };
  // 返回格式为json
  if (
    api.res_body_type === "json" &&
    !api.res_body_is_json_schema &&
    api.res_body?.trim()
  ) {
    const data = json5.parse(api.res_body)?.data;
    const dataType = typeof data;
    // 返回原始类型
    if (["string", "number", "boolean"].includes(dataType)) {
      returnType.primitiveType = dataType;
    }
    if (dataType === "object") {
      // 直接返回的数组
      if (_.isArray(data)) {
        returnType.jsonIsArray = true;
      }
      // 返回值为空
      if (_.isEmpty(data)) {
        returnType.primitiveType = "any";
      } else {
        const typeName = getTypeName(api, {
          suffix: returnType.jsonIsArray ? "ItemReturn" : "Return",
        });
        returnType.hasJsonType = true;
        returnType.jsonType = await inferJsonType({
          typeName: typeName,
          jsonString: JSON.stringify(data),
          description: `${api.title}-返回值`,
          allPropertiesOptional: false,
        });
        returnType.typeName = typeName;
      }
    }
  }
  return returnType;
};
