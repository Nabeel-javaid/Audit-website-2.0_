import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Try multiple possible paths where static files might be
  const possiblePaths = [
    path.resolve(process.cwd(), "dist/public"),
    path.resolve(process.cwd(), "dist/client"),
    path.resolve(process.cwd(), "public"),
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "../public"),
    path.resolve(__dirname, "../client"),
    path.resolve(__dirname, "../../public"),
  ];

  // Log all possible paths we're checking
  console.log('Current directory:', process.cwd());
  console.log('__dirname:', __dirname);
  console.log('Checking the following paths for static files:');
  possiblePaths.forEach(p => console.log(`- ${p}`));

  // Find the first path that exists
  let staticPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      console.log(`Found static files at: ${p}`);
      staticPath = p;
      break;
    }
  }

  if (!staticPath) {
    console.error('Could not find static files in any of the checked paths!');
    console.error('Files in current directory:', fs.readdirSync(process.cwd()));
    if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
      console.error('Files in dist directory:', fs.readdirSync(path.resolve(process.cwd(), 'dist')));
    }

    // Use a default path to avoid crashing
    staticPath = path.resolve(process.cwd(), 'dist');
    console.log(`Falling back to default path: ${staticPath}`);
  }

  // Serve static files
  app.use(express.static(staticPath));

  // Create an index.html if it doesn't exist (for debugging only)
  const indexPath = path.resolve(staticPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log(`index.html not found, creating a basic one at ${indexPath}`);
    try {
      fs.writeFileSync(indexPath, `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Emergency Fallback Page</title>
        </head>
        <body>
          <h1>Emergency Fallback Page</h1>
          <p>The application is running but couldn't find the proper static files.</p>
          <p>This is a fallback page to prevent 404 errors.</p>
        </body>
        </html>
      `);
    } catch (e) {
      console.error('Failed to create fallback index.html:', e);
    }
  }

  // fall through to index.html
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}