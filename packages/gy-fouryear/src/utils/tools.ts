// 根据需要自行添加删减
// lodash qs uuid day moment

export function cloneJSON(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
export function swapItems(arr: Array<any>, index1: number, index2: number) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}
export function uuid(len: number, radix: number) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  const uuid = [];
  let i: number;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r: number;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
/**
 * 格式化时间 默认返回秒
 * @param date 时间
 * @param fmt y M d h m s 或 'time' 或 默认空返回秒
 */
export function formatDate(date?: Date | number | string, fmt?: string) {
  if (null == date) return "";
  let fData: Date;
  if (isNaN(date as number)) {
    // 字符串或者Date
    fData = new Date(date);
  } else if (date.toString().length === 10) {
    // 秒
    fData = new Date((date as number) * 1000);
  } else {
    // 毫秒
    fData = new Date(+date);
  }
  // 转换失败
  if (isNaN(fData.getTime())) {
    return date;
  }
  // 默认返回秒
  if (!fmt) {
    return parseInt((fData.getTime() / 1000).toString());
  }
  // 返回毫秒
  if (fmt === "time") {
    return fData.getTime();
  }
  // 格式化
  const o: Dictionary<any> = {
    "M+": fData.getMonth() + 1, //month
    "d+": fData.getDate(),
    "h+": fData.getHours(),
    "m+": fData.getMinutes(), //minutes
    "s+": fData.getSeconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (fData.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
// 判断空对象 用lodash
// export function isEmpty(obj: Array<any> | Dictionary<any>) {
//   if (!obj) return true;
//   let k;
//   for (let k in obj) {
//     return false;
//   }
//   return true;
// }
// 获取随机数
export function random(min: number, max: number) {
  return parseInt((Math.random() * (max - min + 1)).toString()) + min;
}
// 判断字段是否存在
export function isExistKey(target: Dictionary<any>, path: string) {
  const arr = path.split(/[.[\]]/).filter((a) => a);
  let o = target;
  for (const k of arr) {
    o = o[k];
    if (o === undefined) {
      return false;
    }
  }
  return true;
}

export const noop = () => {
  /* catch */
  /* eslint */
};
