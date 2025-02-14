import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./assets/styles/scrollbar.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// Ensure we're running in the browser
const rootElement = document.getElementById("root");

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // If SSR already rendered, hydrate instead of re-rendering
    hydrateRoot(
      rootElement,
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  } else {
    // Otherwise, do a regular client-side render
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  }
}

// Register the service worker for PWA (Only in the browser)
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope,
        );
      })
      .catch(error => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
