var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/',
    '/css/style.css',
    '/src/game.js'
];

// インストール処理
self.addEventListener('install', function(event) {
    console.log("install");
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    console.log("fetch");
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});