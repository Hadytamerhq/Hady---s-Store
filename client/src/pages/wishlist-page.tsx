import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/product-card";
import { CartSheet } from "@/components/cart-sheet";

export default function WishlistPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/wishlist"],
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900/90 to-purple-800/90">
      <SiteHeader />
      <main className="flex-1 p-8">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">My Wishlist</h2>
          {products?.length === 0 ? (
            <p className="text-white/70">Your wishlist is empty</p>
          ) : (
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
          )}
        </section>
      </main>
      <CartSheet />
    </div>
  );
}
