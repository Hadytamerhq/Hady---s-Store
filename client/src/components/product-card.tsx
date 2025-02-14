import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="overflow-hidden group border-0 bg-white/10 hover:bg-white/20 transition-colors">
      <CardContent className="p-0 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[4/3] object-cover transition-transform group-hover:scale-105"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart 
            className="h-4 w-4" 
            fill={isWishlisted ? "currentColor" : "none"}
            color={isWishlisted ? "white" : "white"}
          />
        </Button>
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div>
          <h3 className="font-medium text-sm line-clamp-2 text-white">{product.name}</h3>
          <p className="text-sm text-white/70">${product.price}</p>
        </div>
        <Button
          size="sm"
          className="w-full transition-colors"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}