type Dictionary<T> = { [key: string]: T };

type Env = {
  VUE_APP_BASE_API: string;
  VUE_APP_BASE_IMG: string;
  NODE_ENV: string;
  sn: string;
  cityId: string;
  cityName: string;
  [key: string]: any;
};

declare let require: any;
// declare var require: NodeRequire;

declare const process: {
  env: Env;
  [key: string]: any;
};

interface Window {
  [key: string]: any;
  VIEW: any;
}

interface ApiResponse<T = any> {
  msg: string;
  status: string;
  timestamp: number;
  data: T;
}
