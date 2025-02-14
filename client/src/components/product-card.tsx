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
    <Card className="overflow-hidden group">
      <CardContent className="p-0 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${
            isWishlisted ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
        </Button>
      </CardContent>
      <CardFooter className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground">${product.price}</p>
        </div>
        <Button
          className="w-full transition-colors"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
