import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/product-card";
import { CartSheet } from "@/components/cart-sheet";

export default function HomePage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <section className="mb-8">
          <div className="rounded-lg bg-card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2">Special Offers!</h2>
            <p className="text-muted-foreground">
              Get 20% off on all wireless devices with code SUMMER20
            </p>
            <p className="text-muted-foreground">
              Buy any 2 items and get 1 free with code BUNDLE2GET1
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          {isLoading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-[350px] rounded-lg bg-card animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
      <CartSheet />
    </div>
  );
}
