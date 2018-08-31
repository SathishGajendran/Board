self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('paint').then(function(cache) {
      return cache.addAll([
        '/Board/public/javascripts/canvas.js',
        '/Board/public/javascripts/main.js',
        '/Board/public/stylesheets/main.css',
        '/Board/assets/icons/paintbrush.png',
        '/Board/assets/icons/pen.cur',
        '/Board/assets/icons/eraser.cur'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  //   console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});