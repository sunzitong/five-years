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
  // FIXME ts4.4影响echarts
  const isResponse = !(
    response instanceof ArrayBuffer ||
    response instanceof Blob ||
    typeof response === "string"
  );
  if (!filename && isResponse) {
    const disposition: string = (response as any).headers[
      "content-disposition"
    ];
    if (disposition.includes("attachment")) {
      filename = decodeURIComponent(disposition.split("=")[1]);
    } else {
      filename = decodeURIComponent(disposition);
    }
  }
  filename = filename || "download";
  if (isResponse) {
    jsFileDownload((response as any)?.data, filename);
  } else {
    jsFileDownload(response as any, filename);
  }
};
