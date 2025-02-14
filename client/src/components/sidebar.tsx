import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, TagIcon } from "lucide-react";
import { useLocation } from "wouter";

const menuItems = [
  {
    title: "Sales",
    icon: TagIcon,
    href: "/sales"
  },
  {
    title: "Wishlist",
    icon: Heart,
    href: "/wishlist"
  }
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="pb-12 w-64 border-r">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant={location === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  location === item.href && "bg-secondary"
                )}
                onClick={() => {
                  // TODO: Implement navigation
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
