import service from "./service";

const http = {
  get(url: string, data: any): Promise<ApiResponse> {
    return service.get(url, {
      params: data,
    });
  },
  post(url: string, data: any): Promise<ApiResponse> {
    return service.post(url, data);
  },
};

export default http;
