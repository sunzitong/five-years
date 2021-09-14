import { start } from "./service/yapi";
import * as doT from "dot";
import { Api, YApiConfig } from "./config";
import * as path from "path";
import { write } from "./service/file";
import { spawn } from "child_process";

doT.templateSettings.strip = false;

const configFile = process.argv.splice(2)[0];
{
  if (!configFile) throw new Error();
  const RC = require(configFile);
  (global as any)["PROJECT_CONFIG"] = RC.default || RC;
}

const config: YApiConfig = (global as any)["PROJECT_CONFIG"];
const { template } = config;

/**
 * 美化代码
 * @param fullPath 文件路径
 */
const prettier = (fullPath: string) => {
  spawn(`prettier`, [`--write`, fullPath], {
    stdio: "inherit",
    cwd: path.dirname(configFile),
  });
};

/*
 * 处理函数
 * @param api 接口
 */
const callback = async (api: Api) => {
  for (let tmpl of template) {
    if (!tmpl.enable) continue;
    const t = await import(`./template/${tmpl.name}`);
    const paramsType = await t.tools.getParamsType(api);
    const returnType = await t.tools.getReturnType(api);
    const code = doT.template(t.default)({
      api,
      tools: t.tools,
      types: { paramsType, returnType },
    });
    const fullPath = path
      .join(
        path.dirname(configFile),
        tmpl.output,
        api.basepath,
        api.path,
        `index${tmpl.extname}`
      )
      .replace(/{|}/g, "");
    console.log(`写入${fullPath}`);
    await write(fullPath, code);
    prettier(fullPath);
  }
};

start(callback);
