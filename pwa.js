/* AlurKit – skrip bersama untuk semua aplikasi:
   1) daftarkan service worker (offline), 2) minta penyimpanan permanen, 3) tombol "Install" */
(function () {
  var me = document.currentScript;
  var root = new URL('./', me.src); // folder tempat pwa.js berada = akar AlurKit

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(new URL('sw.js', root), { scope: root.pathname })
        .catch(function (e) { console.warn('SW gagal:', e); });
    });
  }

  // Minta browser tidak menghapus data saat memori HP penuh (tidak dijamin dikabulkan)
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persisted().then(function (p) { if (!p) navigator.storage.persist(); });
  }

  // Tombol install (Chrome/Android). iPhone: lewat Safari → Bagikan → Tambahkan ke Layar Utama.
  var deferred = null, bar = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (bar || sessionStorage.getItem('ak-install-x')) return;
    bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;left:10px;right:10px;bottom:72px;z-index:50;background:#111;color:#fff;border-radius:12px;padding:10px 12px;display:flex;gap:8px;align-items:center;font:14px system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.25)';
    bar.innerHTML = '<span style="flex:1">📲 Pasang aplikasi ini di HP</span>' +
      '<button id="ak-inst" style="border:0;border-radius:8px;padding:8px 12px;font-weight:700;background:#fff;color:#111">Install</button>' +
      '<button id="ak-x" style="border:0;background:none;color:#fff;font-size:18px">✕</button>';
    document.body.appendChild(bar);
    document.getElementById('ak-inst').onclick = function () {
      deferred.prompt(); deferred.userChoice.finally(function () { bar.remove(); });
    };
    document.getElementById('ak-x').onclick = function () { sessionStorage.setItem('ak-install-x', '1'); bar.remove(); };
  });
  window.addEventListener('appinstalled', function () { if (bar) bar.remove(); });
})();
