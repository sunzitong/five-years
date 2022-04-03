self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
        cache.addAll([
          // '/',
          '/five-years/dist/css/chunk-vendors.60b51ea4.css',
          '/five-years/dist/css/app.c492647d.css',
          '/five-years/dist/css/chunk-28757ccf.b0e0b622.css',
          '/five-years/dist/js/chunk-vendors.7405a62e.js',
          '/five-years/dist/js/app.92403492.js',
          '/five-years/dist/js/chunk-2d0d43d7.156002df.js',
          '/five-years/dist/js/chunk-28757ccf.2ae267a4.js',
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