self.addEventListener("install", (event) => {
	console.log("Service Worker installing.");
	event.waitUntil(
		caches.open("pwa-cache").then((cache) => {
			return cache.addAll([
				"/",
				"/index.html",
				"/manifest.json",
				"/icons/icon-192x192.png",
				"/icons/icon-512x512.png",
			]);
		})
	);
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
	console.log("Fetching:", event.request.url);
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
