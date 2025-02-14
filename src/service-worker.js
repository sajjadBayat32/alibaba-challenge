self.addEventListener("install", (event) => {
	console.log("Service Worker installing...");
	event.waitUntil(
		caches.open("pwa-cache").then((cache) => {
			return cache.addAll([
				"/",
				"/index.html",
				"/manifest.json",
				"/icons/favicon-16x16.png",
				"/icons/favicon-32x32.png",
			]);
		})
	);
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
	const url = new URL(event.request.url);

	// Handle API requests (e.g., "/hotels")
	if (url.pathname.startsWith("/hotels")) {
		event.respondWith(
			caches.open("api-cache").then((cache) => {
				return cache.match(event.request).then((cachedResponse) => {
					if (cachedResponse) {
						console.log("Serving API from cache:", event.request.url);
						return cachedResponse;
					}

					return fetch(event.request)
						.then((networkResponse) => {
							if (!networkResponse || networkResponse.status !== 200) {
								return networkResponse;
							}
							cache.put(event.request, networkResponse.clone()); // Cache the response
							return networkResponse;
						})
						.catch((error) => {
							console.error("API fetch failed, no cache available:", error);
						});
				});
			})
		);
		return;
	}

	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
