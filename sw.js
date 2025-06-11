const CACHE_NAME = 'cat-care-clinic-cache-v1';
// Nama cache untuk mengelola versi cache agar mudah diperbarui di masa depan

const urlsToCache = [
  '/',
  '/index.html',
  '/pesan.html',
  '/style.css',
  'css/bootstrap.min.css',
  '/images/grooming1.jpg',
  '/images/grooming2.jpg',
  '/images/grooming3.jpg',
  '/images/grooming4.jpg',
  '/images/grooming5.jpg',
  '/images/grooming6.jpg',
  '/images/grooming7.jpg',
  '/images/grooming9.jpg',
  '/images/grooming10.jpg',
  '/images/grooming12.jpg',
  '/images/grooming13.jpg',
  '/images/grooming14.jpg',
  '/images/grooming15.jpg',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
];
// Daftar file statis yang akan disimpan dalam cache agar bisa diakses offline

// Event saat service worker diinstall
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache); // Menambahkan semua file ke cache
    })
  );
});

// Event saat service worker mengaktifkan dan membersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // Jika ada cache lama yang berbeda versi, hapus
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intersepsi semua permintaan jaringan (fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika permintaan cocok dengan cache, kembalikan dari cache
      if (response) {
        return response;
      }
      // Jika tidak cocok, ambil dari jaringan
      return fetch(event.request);
    })
  );
});
