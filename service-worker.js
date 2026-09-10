const CACHE_NAME="renoweet-focus-hub-v2-6";
const APP_SHELL=[
  "./","./index.html","./styles.css","./app.js","./manifest.webmanifest",
  "./icons/icon.svg","./icons/apple-touch-icon.png",
  "./Renoweet-OS-Drive-v2.2.html","./Renoweet-Bookkeeping-Drive-v2.2.html","./Renoweet-BOD-Drive-v2.2.html",
  "./renoweet-drive-core-v2.7.js","./renoweet-os-drive-adapter-v2.js",
  "./renoweet-bookkeeping-drive-adapter-v2.js","./renoweet-bod-drive-adapter-v2.js"
];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html"))))});
