import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Alibaba Challenge",
				short_name: "Alibaba PWA",
				description: "Find the best hotels in Tehran!",
				theme_color: "#ffffff",
				icons: [
					{
						src: "/favicon-16x16.png",
						sizes: "16x16",
						type: "image/png",
					},
					{
						src: "/favicon-32x32.png",
						sizes: "32x32",
						type: "image/png",
					},
				],
			},
		}),
	],
});
