import service from "./service";
import isPlainObject from "lodash/isPlainObject";
import { ResponseData } from "@guanyu/shared";

const unify = <T>(url: string, obj: T) => {
  if (!isPlainObject(obj)) return url;
  return url.replace(/(\{.*?\})/g, ($1) => {
    const k = $1.replace(/\{|\}/g, "");
    const s = obj[k];
    delete obj[k];
    return s;
  });
};

const http = {
  get<T, P = unknown>(url: string, params?: P) {
    return service.get<unknown, ResponseData<T> | undefined>(
      unify(url, params),
      { params }
    );
  },
  post<T, P = unknown>(url: string, data?: P) {
    return service.post<unknown, ResponseData<T> | undefined>(
      unify(url, data),
      data
    );
  },
};

export default http;
