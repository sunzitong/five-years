export const createDingXiang = (success, fail) => {
  const getEnvHost = () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.NODE_ENV;
    } else {
      const marr = window.location.hostname.match(/m.(.*).iguanyu.com/);
      return marr ? marr[1] : 'production';
    }
  };


  // 默认正式环境
  let dingXiangId = 'c605ed962e05aaff66b5de1be78f991c';
  let baseDingXiang = 'https://ly-sta.longhu.net';

  const env = getEnvHost();

  // 非正式环境用顶象测试配置
  if (env !== 'production') {
    dingXiangId = '71a52beac64308c7468f7839d5df571e';
    baseDingXiang = 'https://ly-test.longhu.net';
  }

  const VUE_APP_dingxiangOptions = {
    dingXiangId,
    dingXiangUrl: baseDingXiang,
    dingXiangIDServer: `${baseDingXiang}/udid/c1`,
    dingXiangIDJs: `${baseDingXiang}/dx-captcha/libs/const-id.js`,
    dingXiangUaJs: `${baseDingXiang}/dx-captcha/libs/greenseer.js`,
    dingXiangBgSrc: `${baseDingXiang}/dx-captcha/pic.jpg`,
    dingXiangLog: `${baseDingXiang}/logo`,
  };

  const dingxiangDiv = document.createElement('div');
  dingxiangDiv.id = 'dingxiang';
  document.body.appendChild(dingxiangDiv);
  const isHttps = window.location.protocol.indexOf('https') > -1;
  return window._dx.Captcha(dingxiangDiv, {
    apiServer: VUE_APP_dingxiangOptions.dingXiangUrl,
    constIDServer: VUE_APP_dingxiangOptions.dingXiangIDServer,
    ua_js: VUE_APP_dingxiangOptions.dingXiangUaJs,
    constID_js: VUE_APP_dingxiangOptions.dingXiangIDJs,
    serverlessBgSrc: VUE_APP_dingxiangOptions.dingXiangBgSrc,
    appId: VUE_APP_dingxiangOptions.dingXiangId,
    protocol: isHttps,
    style: 'popup',
    width: 300,
    success,
    fail,
  });
};
