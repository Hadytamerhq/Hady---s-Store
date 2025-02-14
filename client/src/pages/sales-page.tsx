import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { SiteHeader } from "@/components/site-header";
import ProductCard from "@/components/product-card";
import { CartSheet } from "@/components/cart-sheet";

interface SaleProduct extends Product {
  originalPrice: number;
  onSale: boolean;
}

export default function SalesPage() {
  const { data: products, isLoading } = useQuery<SaleProduct[]>({
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
              Limited time deals on premium gaming gear!
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
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                  <div className="absolute bottom-20 left-4 text-sm">
                    <span className="line-through text-white/60 mr-2">
                      ${product.originalPrice}
                    </span>
                    <span className="text-white font-bold">
                      ${product.price}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <CartSheet />
    </div>
  );
}