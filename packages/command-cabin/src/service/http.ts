import service from "./service";
import isPlainObject from "lodash/isPlainObject";
import { ResponseData } from "@guanyu/shared";
import { Notify } from "vant";

const unify = <T>(url: string, obj: T) => {
  if (!isPlainObject(obj)) return url;
  return url.replace(/(\{.*?\})/g, ($1) => {
    const k = $1.replace(/\{|\}/g, "");
    const s = obj[k];
    delete obj[k];
    return s;
  });
};
const loading = {
  count: 0,
};

export type ServiceOptions = { showLoading: boolean; headers?: any };

const mergeOptions = (partial?: Partial<ServiceOptions>): ServiceOptions => {
  return { showLoading: false, ...partial };
};

const before = (partial?: Partial<ServiceOptions>) => {
  const options = mergeOptions(partial);
  if (!options.showLoading) return;
  if (loading.count <= 0) {
    Notify({
      type: "primary",
      duration: 0,
      message: "加载中...",
      background: "rgba(25,137,250,.3)",
    });
  }
  loading.count++;
};

const after = (partial?: Partial<ServiceOptions>) => {
  const options = mergeOptions(partial);
  if (!options.showLoading) return;
  loading.count--;
  if (loading.count <= 0) {
    Notify.clear();
  }
};

const http = {
  async get<T, P = unknown>(
    url: string,
    params?: P,
    options?: Partial<ServiceOptions>
  ) {
    before(options);
    const res = await service.get<unknown, ResponseData<T> | undefined>(
      unify(url, params),
      { params, headers: options?.headers }
    );
    after(options);
    return res;
  },

  async post<T, P = unknown>(
    url: string,
    data?: P,
    options?: Partial<ServiceOptions>
  ) {
    before(options);
    const res = await service.post<unknown, ResponseData<T> | undefined>(
      unify(url, data),
      data,
      { headers: options?.headers }
    );
    after(options);
    return res;
  },
};

export default http;
