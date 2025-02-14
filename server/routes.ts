import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

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
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      description: "Advanced smartwatch with health tracking"
    },
    {
      id: 5,
      name: "Gaming Mouse",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      description: "Precision gaming mouse with customizable buttons"
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500",
      description: "Premium mechanical keyboard with RGB lighting"
    },
    {
      id: 7,
      name: "4K Monitor",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
      description: "Ultra-wide 4K monitor for immersive viewing"
    },
    {
      id: 8,
      name: "Wireless Earbuds",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      description: "True wireless earbuds with premium sound"
    }
  ];

  const onSaleProducts = products.map(product => ({
    ...product,
    price: Number((product.price * 0.8).toFixed(2)), // 20% off
    onSale: true
  })).slice(0, 4); // Only first 4 products on sale

  app.get("/api/products", (_req, res) => {
    res.json(products);
  });

  app.get("/api/products/sales", (_req, res) => {
    res.json(onSaleProducts);
  });

  let wishlistItems: number[] = [];

  app.get("/api/products/wishlist", (_req, res) => {
    const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));
    res.json(wishlistProducts);
  });

  app.post("/api/wishlist/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!wishlistItems.includes(id)) {
      wishlistItems.push(id);
    }
    res.sendStatus(200);
  });

  app.delete("/api/wishlist/:id", (req, res) => {
    const id = Number(req.params.id);
    wishlistItems = wishlistItems.filter(item => item !== id);
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}