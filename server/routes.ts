import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Add mock products endpoint
  app.get("/api/products", (_req, res) => {
    const products = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "High-quality wireless headphones with noise cancellation"
      },
      {
        id: 2,
        name: "Ultra HD Camera",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        description: "Professional grade camera for stunning photos"
      },
      {
        id: 3,
        name: "Portable Speaker",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        description: "Compact wireless speaker with amazing sound"
      }
    ];
    res.json(products);
  });

  const httpServer = createServer(app);
  return httpServer;
}
