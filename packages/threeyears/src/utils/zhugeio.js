const zhugeio = () => {
  // 正式
  let jsSrc = 'https://datain.longfor.com/zhuge.js?v=';
  let appKey = '05f3c3ed704142b58a27800c0f253ad4';
  // 测试
  if (process.env.GUANYU_ENV === 'test') {
    jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
    appKey = 'c43b19418a12482e860edc085b93797e';
  }
  window.zhuge = window.zhuge || [];
  window.zhuge.methods = '_init identify track getDid getSid getKey setSuperProperty setUserProperties setPlatform'.split(' ');
  window.zhuge.factory = (b) => {
    return (...args) => {
      const a = Array.prototype.slice.call(args);
      a.unshift(b);
      window.zhuge.push(a);
      return window.zhuge;
    };
  };
  for (let i = 0; i < window.zhuge.methods.length; i += 1) {
    const key = window.zhuge.methods[i];
    window.zhuge[key] = window.zhuge.factory(key);
  }
  window.zhuge.load = (b, x) => {
    if (!document.getElementById('zhuge-js')) {
      const a = document.createElement('script');
      const verDate = new Date();
      const verStr = verDate.getFullYear().toString() + verDate.getMonth().toString()
        + verDate.getDate().toString();

      a.type = 'text/javascript';
      a.id = 'zhuge-js';
      a.async = !0;
      a.src = jsSrc + verStr;
      a.onerror = () => {
        // eslint-disable-next-line no-multi-assign
        window.zhuge.identify = window.zhuge.track = (ename, props, callback) => {
          if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
            callback();
          } else if (Object.prototype.toString.call(props) === '[object Function]') {
            props();
          }
        };
      };
      const c = document.getElementsByTagName('script')[0];
      c.parentNode.insertBefore(a, c);
      const { _init: init } = window.zhuge;
      init(b, x);
    }
  };
  window.zhuge.load(appKey, { // 配置应用的AppKey
    superProperty: { // 全局的事件属性(选填)
      平台名称: 'wap',
    },
    debug: true,
    autoTrack: true,
    // 启用全埋点采集（选填，默认false）
    singlePage: true, // 是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
  });
  window.zhuge.track('wap访问');
};
export default zhugeio;
