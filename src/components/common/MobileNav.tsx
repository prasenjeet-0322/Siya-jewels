"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function MobileNav() {
  const pathname = usePathname();
  const { cartCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: Sparkles },
    { label: "Wishlist", href: "/wishlist", icon: Heart, badge: wishlistCount },
    {
      label: "Bag",
      href: "/cart",
      icon: ShoppingBag,
      badge: cartCount,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsCartDrawerOpen(true);
      },
    },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-amber-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-1 px-3 relative transition-colors ${
                isActive ? "text-amber-700 font-semibold" : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-amber-600 stroke-[2.2]" : ""}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
