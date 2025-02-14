import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

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
            urlPattern: /^http:\/\/localhost:3001/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /\.(?:js|css|html|png|svg|ico|json)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ["react", "react-dom"], // Ensures SSR compatibility
    external: ["@vitejs/plugin-react"], // Prevents unnecessary SSR bundling
  },
  server: {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
  },
});
