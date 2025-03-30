import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Basic API endpoint to serve static content
  app.get('/api/status', (req, res) => {
    res.json({ status: 'online', message: 'Smart contract audit portfolio service is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
