const CACHE_NAME = 'tx-explorer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css',
  'https://cdn.jsdelivr.net/npm/flatpickr'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // Always fetch fresh data from Google Scripts
  if (e.request.url.includes('script.google.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
