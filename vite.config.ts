import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Alibaba Challenge",
				short_name: "Alibaba PWA",
				description: "Find the best hotels in Tehran!",
				theme_color: "#ffffff",
				display: "standalone",
				icons: [
					{
						src: "icons/favicon-16x16.png",
						sizes: "16x16",
						type: "image/png",
					},
					{
						src: "icons/favicon-32x32.png",
						sizes: "32x32",
						type: "image/png",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
				runtimeCaching: [
					{
						urlPattern: /^http:\/\/localhost:3001\/hotels/,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
							},
							cacheableResponse: {
								statuses: [200],
							},
						},
					},
				],
			},
		}),
		tailwindcss(),
	],
});
