type Dictionary<T> = { [key: string]: T };

type env = {
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
  env: env;
  [key: string]: any;
};

interface Window {
  [key: string]: any;
  VIEW: any;
}

interface ApiResponse {
  msg: string;
  status: string;
  code: number;
  timestamp: number;
  data: any;
}
