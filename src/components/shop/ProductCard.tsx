"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-amber-100 hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.18)] transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F2]">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-[#171510] text-[#D4AF37] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-sm flex items-center gap-0.5 sm:gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#D4AF37] text-black text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
              New Arrival
            </span>
          )}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="bg-rose-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons: Wishlist & Quick View */}
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${
              inWishlist
                ? "bg-rose-500 text-white"
                : "bg-white/85 text-neutral-700 hover:text-rose-600 hover:bg-white"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? "fill-white" : ""}`} />
          </motion.button>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="w-8 h-8 rounded-full bg-white/85 backdrop-blur-md text-neutral-700 hover:text-[#D4AF37] hover:bg-white shadow-md hidden sm:flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Add To Bag overlay on hover (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-full py-2 px-3 rounded-xl bg-neutral-900/90 hover:bg-[#171510] text-amber-200 border border-[#D4AF37]/50 text-xs font-semibold tracking-wider uppercase backdrop-blur-md flex items-center justify-center gap-1.5 shadow-lg transition"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Purity & Category Pill */}
          <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px] mb-1">
            <span className="text-amber-800 bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded font-medium border border-amber-200/60">
              {product.purity}
            </span>
            <span className="text-neutral-400">{product.weight}</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-amber-700 transition">
            <h3 className="font-serif text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Short subtitle / description */}
          {product.subtitle && (
            <p className="text-[10px] sm:text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-neutral-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Mobile Add to Bag */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-xs sm:text-base text-neutral-900 truncate">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-neutral-400 line-through truncate hidden sm:inline">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-emerald-700 font-medium block truncate">
              Free Insured Delivery
            </span>
          </div>

          {/* Mobile direct add button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="sm:hidden p-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition shrink-0"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
