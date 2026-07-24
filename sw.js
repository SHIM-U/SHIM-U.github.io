// 小崔的个人博客 —— Service Worker（离线缓存核心资源，提升手机端打开速度）
const CACHE = 'blog-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/themes.css',
  './css/base.css',
  './css/animations.css',
  './css/layout.css',
  './js/theme.js',
  './js/main.js',
  './js/animations.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/images/aichat.svg',
  './assets/images/snake-game.png',
  './assets/images/snake-menu.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // 跨域外链（如 AI Chat Hub）与大型下载走网络优先，不缓存
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
