const CACHE_NAME = 'golf-log-v1';
// キャッシュするファイルのリスト
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-round.svg',
  'https://cdn.tailwindcss.com' // デザイン用のプログラムも保存する
];

// インストール時にファイルをスマホに保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// オフライン時はスマホに保存したファイルを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});