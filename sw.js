// Nama cache yang digunakan untuk menyimpan file statis
const CACHE_NAME = 'cat-care-clinic-cache-v1';

// Daftar URL yang akan di-cache saat service worker di-install
const urlsToCache = [
  '/',
  '/index.html',
  '/pesan.html',
  '/ulasan.html',
  '/alamat.html',
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

// Event listener yang dijalankan saat service worker di-install pertama kali
self.addEventListener('install', (event) => {
  // Memaksa service worker untuk langsung aktif tanpa menunggu
  self.skipWaiting();
  // Menyimpan semua resource ke dalam cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Menambahkan semua URL ke cache
      return cache.addAll(urlsToCache);
    })
  );
});

// Event listener yang dijalankan saat service worker diaktifkan
self.addEventListener('activate', (event) => {
  // Menghapus cache lama jika nama cache tidak sama dengan CACHE_NAME terbaru
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // Hapus cache yang lama
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Event listener yang menangkap semua request fetch (permintaan resource)
self.addEventListener('fetch', (event) => {
  // Mencoba mencocokkan permintaan dengan cache
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        // Jika ditemukan di cache, kembalikan dari cache
        response ||
        // Jika tidak, ambil dari jaringan
        fetch(event.request).catch(() => {
          // Jika fetch gagal (misalnya offline), fallback ke index.html hanya untuk navigasi
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        })
      );
    })
  );
});
