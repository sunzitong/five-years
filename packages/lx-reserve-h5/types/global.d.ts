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

namespace NodeJS {
  interface Process {
    env: Env;
  }
}

interface Window {
  [key: string]: any;
  VIEW: any;
  BMap: any;
}

type ResponseData<T> =
  | {
      msg: string | null;
      status: "ok";
      timestamp?: number;
      data: T;
    }
  | {
      msg: string | null;
      status: "fail";
      timestamp?: number;
      data: null;
    };

type ActivityStatus =
  | "NOT_START"
  | "STARTED"
  | "EXPIRED"
  | "CLOSED"
  | "TEMP"
  | "DRAFT"
  | "AUDIT"
  | "REJECTED";

type ID = string | number;

interface Prize {
  id: ID;
  number: number;
  name: string;
  imgUrl: string;
  prizeType: number;
  prizeTypeDesc: string;
  totalCount: number;
  sentCount: number;
  useCount: number;
  releaseAmount: number;
  activityNumber: ID | null;
}

interface Activity {
  activityNumber: ID;
  activityName: string;
  startTime: number;
  endTime: number;
  status: ActivityStatus;
  prizes: Prize[] | null;
  description: string;
  shareTitle: string;
  shareImageUrl: string;
  shareContent: string;
  featureJson: string;
}
