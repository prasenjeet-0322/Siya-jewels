"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { Product } from "@/types/product";

export default function WishlistPage() {
  const { wishlist, wishlistCount, clearWishlist } = useWishlist();
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
    setIsCartDrawerOpen(true);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FFFFFF] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-[#FCF9F4] border border-amber-200 flex items-center justify-center text-rose-500 mx-auto shadow-sm">
            <Heart className="w-10 h-10 fill-rose-100" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Your Wishlist is Empty
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
              Save your favorite gold ornaments, solitaires, and bridal jewellery to revisit anytime.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition"
          >
            <span>Discover Fine Jewels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personal Curation</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              My Saved Jewels ({wishlistCount})
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={handleMoveAllToBag}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Move All to Bag</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-rose-600 hover:bg-rose-50 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
