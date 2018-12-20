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
 

          'pig_game/dice-1.png',
          'pig_game/dice-2.png',
          'pig_game/dice-3.png',
          'pig_game/dice-4.png',
          'pig_game/dice-5.png',
          'pig_game/dice-6.png'
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
