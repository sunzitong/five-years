import service from "./service";

const http = {
  get<T, P = unknown>(url: string, data?: P) {
    return service.get<unknown, ResponseData<T> | undefined>(url, {
      params: data,
    });
  },
  post<T, P = unknown>(url: string, data?: P) {
    return service.post<unknown, ResponseData<T> | undefined>(url, data);
  },
};

export default http;
