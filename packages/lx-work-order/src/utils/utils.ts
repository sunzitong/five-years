// url参数获取(特殊字符不转义)
export function getQueryString(url: string, name: string) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = url.substr(1).match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
}
