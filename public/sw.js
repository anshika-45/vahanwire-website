// Basic service worker for caching static assets
const CACHE_NAME = 'vahanwire-v1';
const urlsToCache = [
  '/',
  '/src/main.jsx',
  '/src/assets/HomeBanner.webp',
  '/src/assets/logo.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
