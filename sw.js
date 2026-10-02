const CACHE_NAME = 'optotype-va-v2';
const ASSETS = [
  './vision-compare.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install — files ko cache karo (offline ke liye)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ Caching app files');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — purana cache saaf karo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch — offline bhi kaam kare
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./vision-compare.html');
      });
    })
  );
});
