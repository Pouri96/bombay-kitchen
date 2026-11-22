/* Offline cache. The kitchen wifi is not the thing this should depend on. */
var CACHE = "bombay-kitchen-v5";
var CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
                               .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Cache first, so a cold kitchen tablet opens instantly and works with no signal.
   Fonts are picked up on the first online visit and served from cache after that. */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        return e.request.mode === "navigate" ? caches.match("./index.html") : undefined;
      });
    })
  );
});
