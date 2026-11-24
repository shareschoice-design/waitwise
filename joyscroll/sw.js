// Joyscroll service worker: appka jde spustit i bez signálu, zprávy se berou vždy čerstvé, když to jde.
const V = 'joyscroll-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Zprávy a stránka: nejdřív síť, bez signálu poslední uložená verze.
  if (sameOrigin && (url.pathname.endsWith('stories.json') || req.mode === 'navigate')) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(url.pathname.endsWith('stories.json') ? 'stories.json' : req, copy)); }
        return res;
      }).catch(() => caches.match(url.pathname.endsWith('stories.json') ? 'stories.json' : req, { ignoreSearch: true })
        .then(r => r || caches.match('index.html')))
    );
    return;
  }

  // Ikony, písma a ostatní: z mezipaměti, na pozadí obnovit.
  if (sameOrigin || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.open(V).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
