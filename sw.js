/* AlurKit service worker
   Strategi: tampilkan dari cache (cepat & offline), sambil ambil versi terbaru di belakang.
   Versi baru terlihat saat aplikasi dibuka berikutnya.
   PENTING: naikkan nomor CACHE setiap kali merilis perubahan. */
const CACHE = 'alurkit-v1';
const FILES = [
  './', './index.html', './pwa.js',
  './kasir/', './kasir/index.html', './kasir/manifest.webmanifest',
  './hpp/', './hpp/index.html', './hpp/manifest.webmanifest',
  './icons/kasir-192.png', './icons/kasir-512.png', './icons/hpp-192.png', './icons/hpp-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('alurkit-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // link WhatsApp dll. tidak disentuh
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      const net = fetch(e.request).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
