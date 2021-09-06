import fetch from "node-fetch";
import { Api, YApiConfig } from "@/config";
import { noop } from "lodash";

const cache = {
  basepath: "",
  callback: noop,
  config: null as YApiConfig | null,
};
const timeout = 100000;

/**
 * 获取项目信息
 */
const fetchProject = async () => {
  if (!cache.config) return;
  const { token } = cache.config;
  const response = await fetch(
    `http://docs.gyapt.cn/api/project/get?token=${token}`,
    {
      method: "GET",
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  cache.basepath = json?.data?.basepath;
};

/**
 * 获取分类下接口列表
 */
const fetchApiList = async () => {
  if (!cache.config) return;
  const { token, category_ids = [], api_ids = [] } = cache.config;
  for (const catid of category_ids) {
    const response = await fetch(
      `http://docs.gyapt.cn/api/interface/list_cat?token=${token}&catid=${catid}&limit=${1024}`,
      {
        method: "GET",
        timeout,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    const list = json?.data?.list ?? [];
    for (const item of list) {
      console.log("-", item.title, item.path);
      await fetchApiById(item._id);
    }
  }
  for (const id of api_ids) {
    console.log("--其他接口");
    await fetchApiById(id);
  }
};

/**
 * 获取接口信息
 * @param id 接口id
 */
const fetchApiById = async (id: number) => {
  if (!cache.config) return;
  const { token } = cache.config;
  const response = await fetch(
    `http://docs.gyapt.cn/api/interface/get?token=${token}&id=${id}`,
    {
      method: "GET",
      timeout,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  const data = json?.data ?? {};
  cache.callback({ ...data, basepath: cache.basepath });
};

export const start = async (callback: (api: Api) => unknown) => {
  cache.callback = callback;
  cache.config = (global as any)["PROJECT_CONFIG"];
  await fetchProject();
  await fetchApiList();
  return true;
};
