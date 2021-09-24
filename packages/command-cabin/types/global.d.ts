/* eslint-disable @typescript-eslint/no-unused-vars */
type Dictionary<T> = { [key: string]: T };

type Env = {
  /**
   * 接口路径前缀
   */
  VUE_APP_BASE_API: string;
  /**
   * 图片路径前缀
   */
  VUE_APP_BASE_IMG: string;
  NODE_ENV: string;
  DEBUG: boolean;
  /**
   * 数字字体
   */
  VALUE_FONT: string;
  /**
   * 默认字体
   */
  TEXT_FONT: string;
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
