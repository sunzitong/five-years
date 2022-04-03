self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
        cache.addAll([
          '/',
          // 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js',
          '/js/chunk-vendors.js',
          '/js/app.js',
          // 'https://dataintest.longfor.com/zhuge.js?v=202233',
          '/js/1.js',
          '/js/2.js',
          '/js/3.js',
          // 'https://goyoo-assets.longfor.com/prod/app/55cC0WCB5wQTFc_JA5p0EQ.png',
          // 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/_FE2SpPV8jrhx7gKYyeXPQ.png',
          // 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/OO0AfvTKMewa5qeOrcx6rA.png',
        ]);
      })
  );
});

self.addEventListener('activate', function () {
  console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});