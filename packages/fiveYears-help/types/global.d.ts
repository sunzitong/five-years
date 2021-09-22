/* eslint-disable @typescript-eslint/no-unused-vars */
type Dictionary<T> = { [key: string]: T };

type Env = {
  VUE_APP_BASE_API: string;
  VUE_APP_BASE_IMG: string;
  NODE_ENV: string;
  [key: string]: any;
};

namespace NodeJS {
  interface Process {
    env: Env;
  }
}

interface Window {
  [key: string]: any;
  VIEW: any;
  PAGE: any;
}

/* 此处添加的声明在全局自动生效 */
