export default function getCookie(cname, strCookie = '') {
  const name = `${cname}=`;
  const ca = strCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}
