import express from "express";
import { type HmrOptions } from "vite";
import ApiController from "./controllers/ApiController.ts";

const app = express();

// Apply the API controller to the /api route.
// The API is responsible for serving JSON data for the headless CMS.
app.use("/api", ApiController.router);

// Check arguments
const args = process.argv;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--env") {
    process.env.NODE_ENV = args[i + 1];
    args.splice(i, 2);
    i--;
  }
} 

if (process.env.NODE_ENV === "production") {
  await serveWebApp(app);
  app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000 in ${process.env.NODE_ENV} mode`);
  });
}
else {
  const vite = await serveViteServer(app);
  app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000 in ${process.env.NODE_ENV} mode`);
    console.log(`Server websocket at ws://localhost:${(vite.config.server.hmr as HmrOptions)?.port}`);
  });
}





async function serveWebApp(app: express.Application) {
  app.use(express.static("dist"));
}

async function serveViteServer(app: express.Application) {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: {
      middlewareMode: true,
      host: "0.0.0.0",
      port: 3000,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 24678
      }
    }
  });
  app.use(vite.middlewares);

  return vite;
}