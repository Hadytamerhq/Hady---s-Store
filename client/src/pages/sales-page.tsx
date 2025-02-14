import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/product-card";
import { CartSheet } from "@/components/cart-sheet";

export default function SalesPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/sales"],
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900/90 to-purple-800/90">
      <SiteHeader />
      <main className="flex-1 p-8">
        <section>
          <div className="rounded-lg bg-white/20 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">Special Offers!</h2>
            <p className="text-white/70">
              Get 20% off on all wireless devices with code SUMMER20
            </p>
            <p className="text-white/70">
              Buy any 2 items and get 1 free with code BUNDLE2GET1
            </p>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-[280px] rounded-lg bg-card animate-pulse"
                />
              ))
            ) : (
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>
      </main>
      <CartSheet />
    </div>
  );
}
