const CACHE_NAME = 'golf-log-v2';
const ASSETS_TO_CACHE = [
  './',                  // インデックス
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-round.svg',
  'https://cdn.tailwindcss.com'
];

// インストール：全ファイルを保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 有効化：古いキャッシュを掃除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 取得：通信よりキャッシュを最優先（オフライン起動の核）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});