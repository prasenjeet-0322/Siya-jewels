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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#12110E]/95 backdrop-blur-xl border-t border-[#D4AF37]/35 shadow-[0_-8px_25px_rgba(0,0,0,0.35)] px-3 pt-2 pb-3 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-0.5 px-2 relative transition-all duration-200 ${
                isActive ? "text-[#D4AF37] font-semibold" : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "text-[#D4AF37] stroke-[2.2] scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" : "text-neutral-400 stroke-[1.7]"
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-1 bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 text-[9px] font-black rounded-full flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
