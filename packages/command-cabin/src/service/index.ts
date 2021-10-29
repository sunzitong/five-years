import jsFileDownload from "js-file-download";
import { AxiosResponse } from "axios";

/**
 * 保存下载文件
 * @param response
 * @param filename
 */
export const fileDownload = (
  response: AxiosResponse | string | ArrayBuffer | Blob,
  filename?: string
) => {
  const isResponse = !(
    response instanceof ArrayBuffer ||
    response instanceof Blob ||
    typeof response === "string"
  );
  if (!filename && isResponse) {
    const disposition: string = response.headers["content-disposition"];
    if (disposition.includes("attachment")) {
      filename = decodeURIComponent(disposition.split("=")[1]);
    } else {
      filename = decodeURIComponent(disposition);
    }
  }
  filename = filename || "download";
  if (isResponse) {
    jsFileDownload(response?.data, filename);
  } else {
    jsFileDownload(response, filename);
  }
};
