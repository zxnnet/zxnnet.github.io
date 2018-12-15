function registerServiceWorker() {
  // register sw script in supporting browsers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {
      scope: '/'
    }).then(() => {
      console.log('Service Worker registered successfully.');
    }).catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  }
}

// sw.js
self.addEventListener('install', e => {
  e.waitUntil(
    // after the service worker is installed,
    // open a new cache
    caches.open('my-pwa-cache').then(cache => {
      // add all URLs of resources we want to cache
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/assets/images/logo/logo.png',
        '/assets/css/main.scss',
        '/assets/android-chrome-192x192.png',
        '/assets/images/logo/logo.svg',
        '/assets/android-chrome-512x512.png',
        '/assets/apple-touch-icon.png',
        '/assets/browserconfig.xml',
        '/assets/favicon-16x16.png',
        '/assets/favicon.ico'
      ]);
    })
  );
});