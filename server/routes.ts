import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  const products = [
    {
      id: 1,
      name: "Pro Gaming Laptop",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
      description: "High-performance gaming laptop with RTX 4080"
    },
    {
      id: 2,
      name: "4K Curved Monitor",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
      description: "34-inch curved gaming monitor"
    },
    {
      id: 3,
      name: "Mechanical Gaming Keyboard",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500",
      description: "RGB mechanical keyboard with Cherry MX switches"
    },
    {
      id: 4,
      name: "Wireless Gaming Mouse",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      description: "Precision wireless gaming mouse"
    },
    {
      id: 5,
      name: "Gaming Headset",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      description: "Surround sound gaming headset"
    },
    {
      id: 6,
      name: "Gaming Chair",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1610295427330-2587d3c959ba?w=500",
      description: "Ergonomic gaming chair with lumbar support"
    },
    {
      id: 7,
      name: "Streaming Microphone",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
      description: "Professional USB streaming microphone"
    },
    {
      id: 8,
      name: "Webcam Pro",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500",
      description: "4K webcam for streaming"
    },
    {
      id: 9,
      name: "RGB LED Strip",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500",
      description: "Customizable RGB LED strip for setup"
    },
    {
      id: 10,
      name: "Gaming Mouse Pad",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1588495752527-77d65c21f7cd?w=500",
      description: "Extra large RGB gaming mouse pad"
    }
  ];

  // Completely different products for sale
  const saleProducts = [
    {
      id: 101,
      name: "VR Headset Pro",
      originalPrice: 599.99,
      price: 399.99,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500",
      description: "Premium VR headset for immersive gaming",
      onSale: true
    },
    {
      id: 102,
      name: "Gaming Console X",
      originalPrice: 499.99,
      price: 399.99,
      image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500",
      description: "Next-gen gaming console",
      onSale: true
    },
    {
      id: 103,
      name: "Portable SSD 2TB",
      originalPrice: 299.99,
      price: 199.99,
      image: "https://images.unsplash.com/photo-1597226401947-321aa406b34e?w=500",
      description: "Ultra-fast portable storage",
      onSale: true
    },
    {
      id: 104,
      name: "Wireless Controller",
      originalPrice: 69.99,
      price: 49.99,
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500",
      description: "Premium wireless game controller",
      onSale: true
    },
    {
      id: 105,
      name: "Gaming Router",
      originalPrice: 249.99,
      price: 179.99,
      image: "https://images.unsplash.com/photo-1648410557569-b8ff0598b100?w=500",
      description: "Low-latency gaming router",
      onSale: true
    }
  ];

  app.get("/api/products", (_req, res) => {
    res.json(products);
  });

  app.get("/api/products/sales", (_req, res) => {
    res.json(saleProducts);
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