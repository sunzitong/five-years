
const zhugeio = () => {
  // 正式
  const jsSrc = 'https://datain.longfor.com/zhuge.js?v=';
  const appKey = '05f3c3ed704142b58a27800c0f253ad4';
  // 测试
  // const jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
  // const appKey = 'c43b19418a12482e860edc085b93797e';
  {
    window.zhuge = window.zhuge || [];
    window.zhuge.methods = '_init identify track getDid getSid getKey setSuperProperty setUserProperties setPlatform'.split(' ');
    window.zhuge.factory = function (b) {
      return function () {
        const a = Array.prototype.slice.call(arguments);
        a.unshift(b);
        window.zhuge.push(a);
        return window.zhuge;
      };
    };
    for (let i = 0; i < window.zhuge.methods.length; i++) {
      const key = window.zhuge.methods[i];
      window.zhuge[key] = window.zhuge.factory(key);
    }
    window.zhuge.load = function (b, x) {
      if (!document.getElementById('zhuge-js')) {
        const a = document.createElement('script');
        const verDate = new Date();
        const verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();

        a.type = 'text/javascript';
        a.id = 'zhuge-js';
        a.async = !0;
        a.src = jsSrc + verStr;
        a.onerror = function () {
          window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
            if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
              callback();
            } else if (Object.prototype.toString.call(props) === '[object Function]') {
              props();
            }
          };
        };
        const c = document.getElementsByTagName('script')[0];
        c.parentNode.insertBefore(a, c);
        window.zhuge._init(b, x);
      }
    };
    window.zhuge.load(appKey, { // 配置应用的AppKey
      superProperty: { // 全局的事件属性(选填)
        平台名称: 'wap',
      },
      autoTrack: false,
      // 启用全埋点采集（选填，默认false）
      singlePage: false, // 是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
    });
  }
  window.zhuge.track('wap访问');
};
export default zhugeio;
