import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, TagIcon, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

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
  const [location, setLocation] = useLocation();
  const { logoutMutation } = useAuth();

  return (
    <div className="h-full py-6">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant={location === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  location === item.href && "bg-secondary"
                )}
                onClick={() => setLocation(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}