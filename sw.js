const staticCache ='my-cache-5';

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          // remove other caches except my current ch
          return cacheName.startsWith('my-')&& cacheName !== staticCache

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCache).then(function(cache) {
      return cache.addAll(
        [ 
          './',
          'https://cdn.jsdelivr.net/npm/sweetalert2@7.28.8/dist/sweetalert2.all.min.js',
          'index.html',
          'app.js',
          'style.css',
          'icons.css', 
          'dice-1.png',
          'dice-2.png',
          'dice-3.png',
          'dice-4.png',
          'dice-5.png',
          'dice-6.png',
          'back.jpg'
        ]
      );
    })
  );
});

self.addEventListener('fetch',function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log(event.request)
      return response || fetch(event.request)
    })
  );
});
