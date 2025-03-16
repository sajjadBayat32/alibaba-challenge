import { defineConfig } from "vitest/config";
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
            src: "icons/favicon-144x144.png",
            sizes: "144x144",
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
        ],
      },
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
  },
});
