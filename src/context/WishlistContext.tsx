"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useToast } from "./ToastContext";

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "siya_wishlist_items";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const toast = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.info("Removed from Wishlist", product.title);
    } else {
      setWishlist((prev) => [product, ...prev]);
      toast.success("Added to Wishlist", product.title);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
