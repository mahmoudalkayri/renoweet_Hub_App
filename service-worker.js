const CACHE = 'renoweet-hub-v2.3';
const SHELL = [
  './',
  './index.html',
  './hub-styles.css',
  './hub.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/apple-touch-icon.png',
  './Renoweet-OS-Drive-v2.2.html',
  './Renoweet-Bookkeeping-Drive-v2.2.html',
  './Renoweet-BOD-Drive-v2.2.html',
  './renoweet-drive-core-v2.2.js',
  './renoweet-os-drive-adapter-v2.js',
  './renoweet-bookkeeping-drive-adapter-v2.js',
  './renoweet-bod-drive-adapter-v2.js'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html'))));
});
