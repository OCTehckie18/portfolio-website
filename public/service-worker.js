// Service Worker for offline support and multi-layer caching
const CACHE_VERSIONS = {
  static: 'omkaar-portfolio-static-v1',
  dynamic: 'omkaar-portfolio-dynamic-v1',
  images: 'omkaar-portfolio-images-v1',
};

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/manifest.json',
];

const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_VERSIONS.static)
        .then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(CACHE_VERSIONS.dynamic),
      caches.open(CACHE_VERSIONS.images),
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          const isValid = Object.values(CACHE_VERSIONS).includes(cacheName);
          if (!isValid) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const { request } = event;
  const url = new URL(request.url);

  // Strategy based on asset type
  if (request.method === 'GET') {
    if (isImage(url)) {
      event.respondWith(imageStrategy(request));
    } else if (isStatic(url)) {
      event.respondWith(staticStrategy(request));
    } else {
      event.respondWith(dynamicStrategy(request));
    }
  }
});

function isImage(url) {
  return /\.(webp|png|jpg|jpeg|svg|gif)$/i.test(url.pathname);
}

function isStatic(url) {
  return /\.(js|css|woff2?)$/i.test(url.pathname);
}

// Cache first, fallback to network (for static assets)
function staticStrategy(request) {
  return caches.match(request)
    .then((response) => {
      if (response) return response;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const cache = caches.open(CACHE_VERSIONS.static);
        cache.then((c) => c.put(request, response.clone()));
        return response;
      });
    })
    .catch(() => caches.match('/index.html'));
}

// Network first, fallback to cache (for dynamic content)
function dynamicStrategy(request) {
  return fetch(request)
    .then((response) => {
      if (!response || response.status !== 200) return response;
      const cache = caches.open(CACHE_VERSIONS.dynamic);
      cache.then((c) => c.put(request, response.clone()));
      return response;
    })
    .catch(() => {
      return caches.match(request)
        .then((response) => response || caches.match('/index.html'));
    });
}

// Cache first, with age checking (for images)
function imageStrategy(request) {
  return caches.match(request)
    .then((response) => {
      if (response) {
        // Check if cached response is still fresh
        const cacheDate = response.headers.get('sw-date');
        if (cacheDate && Date.now() - parseInt(cacheDate) < CACHE_MAX_AGE) {
          return response;
        }
      }
      // Fetch fresh image
      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const responseClone = response.clone();
        const headers = new Headers(responseClone.headers);
        headers.set('sw-date', Date.now());
        const newResponse = new Response(responseClone.body, {
          status: responseClone.status,
          statusText: responseClone.statusText,
          headers: headers,
        });
        caches.open(CACHE_VERSIONS.images).then((c) => c.put(request, newResponse));
        return response;
      }).catch(() => caches.match(request) || placeholderImage());
    });
}

// Placeholder for missing images
function placeholderImage() {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#333" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="#999" font-size="12">Offline</text></svg>';
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
