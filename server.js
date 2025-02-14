import express from "express";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function createSSRServer() {
	const app = express();
	// Create Vite Development Server
	const vite = await createServer({
		server: { middlewareMode: "ssr" },
	});
	app.use(vite.middlewares);
	// :rocket: Prevent caching for SSR responses
	app.use((req, res, next) => {
		res.setHeader(
			"Cache-Control",
			"no-store, no-cache, must-revalidate, proxy-revalidate"
		);
		next();
	});
	// Serve static files (CSS, JS, Images) with caching
	app.use(
		"/assets",
		express.static(path.resolve(__dirname, "dist/assets"), {
			maxAge: "1y",
			immutable: true,
		})
	);
	app.get("*", async (req, res) => {
		try {
			// Load React entry point dynamically
			const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
			// Render the app to an HTML string
			const appHtml = renderToString(App());
			// Read the HTML template
			let template = fs.readFileSync(
				path.resolve(__dirname, "index.html"),
				"utf-8"
			);
			// Inject rendered content into the template
			template = template.replace("<!--ssr-outlet-->", appHtml);
			res.status(200).set({ "Content-Type": "text/html" }).send(template);
		} catch (err) {
			vite.ssrFixStacktrace(err);
			console.error(err);
			res.status(500).send("Server Error");
		}
	});
	app.listen(3000, () => {
		console.log("SSR server running at http://localhost:3000");
	});
}
createSSRServer();
