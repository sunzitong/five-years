import service from "./service";
import isPlainObject from "lodash/isPlainObject";
import { Nullable } from "@guanyu/shared";
import { Toast } from "vant";
import { VanToast } from "vant/types/toast";

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
  toast: null as Nullable<VanToast>,
  count: 0,
};

export type ServiceOptions = { showLoading: boolean };

const mergeOptions = (partial?: Partial<ServiceOptions>): ServiceOptions => {
  return { showLoading: true, ...partial };
};

const after = (partial?: Partial<ServiceOptions>) => {
  const options = mergeOptions(partial);
  if (!options.showLoading) return;
  if (loading.count <= 0 && !loading.toast) {
    loading.toast = Toast.loading({ duration: 0 });
  }
  loading.count++;
};

const before = (partial?: Partial<ServiceOptions>) => {
  const options = mergeOptions(partial);
  if (!options.showLoading) return;
  loading.count--;
  if (loading.count <= 0 && loading.toast) {
    loading.toast.clear();
    loading.toast = null;
  }
};

const http = {
  async get<T, P = unknown>(
    url: string,
    params?: P,
    options?: Partial<ServiceOptions>
  ) {
    after(options);
    const res = await service.get<unknown, ResponseData<T> | undefined>(
      unify(url, params),
      { params }
    );
    before(options);
    return res;
  },

  async post<T, P = unknown>(
    url: string,
    data?: P,
    options?: Partial<ServiceOptions>
  ) {
    after(options);
    const res = await service.post<unknown, ResponseData<T> | undefined>(
      unify(url, data),
      data
    );
    before(options);
    return res;
  },
};

export default http;
