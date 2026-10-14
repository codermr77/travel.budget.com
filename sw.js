/* Oflayn ishlash uchun oddiy kesh */
const V = "safar-v3";
const FILES = ["./", "index.html", "css/style.css", "manifest.webmanifest",
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "js/core.js", "js/pages.js", "js/account.js", "js/calc.js", "js/map.js", "js/expenses.js", "js/pack.js", "js/history.js", "js/ai.js", "js/theme.js", "js/main.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // Avval tarmoq (yangi fayllar ko'rinsin), tarmoq bo'lmasa kesh
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    caches.open(V).then(c => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request)));
});
