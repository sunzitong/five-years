import { readFile, writeFile, mkdirSync, existsSync } from "fs";
import { join, basename, dirname } from "path";

/**
 * 读取文件
 * @param _fullPath 文件完整路径
 */
export const read = async (_fullPath: string) => {
  return new Promise<string | void>((resolve, reject) => {
    readFile(_fullPath, function(error, data) {
      if (error) {
        console.warn(`未找到${_fullPath}`);
        resolve();
      } else {
        resolve(data.toString());
      }
    });
  });
};

/**
 * 写入文件
 * @param _fullPath 文件完整路径
 * @param _text 写入内容
 */
export const write = async (_fullPath: string, _text: string) => {
  const dir = dirname(_fullPath);
  const file = basename(_fullPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return new Promise<void>((resolve, reject) => {
    writeFile(join(dir, file), _text, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
