"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, ShieldCheck, Heart, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatCurrency } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const activeSize = selectedSize || product.sizes?.[0] || "";

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize);
    onClose();
    setIsCartDrawerOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-neutral-600 hover:text-neutral-900 flex items-center justify-center shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Images */}
          <div className="w-full md:w-1/2 p-5 bg-[#FCF9F4] flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-amber-100 shadow-sm">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? "border-[#D4AF37] scale-105" : "border-neutral-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Purity Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {product.purity}
                </span>
                <span className="text-xs text-neutral-500">• {product.weight}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </div>
                <span className="text-xs font-semibold text-neutral-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-neutral-400">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Inclusive of all taxes & 3% GST</p>

              {/* Description */}
              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Sizes if applicable */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          activeSize === s
                            ? "border-[#D4AF37] bg-amber-50 text-amber-900 font-semibold"
                            : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BIS Hallmark badge */}
              <div className="mt-4 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{product.specifications.hallmark} Guaranteed</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2.5">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition flex items-center justify-center ${
                    inWishlist
                      ? "border-rose-400 bg-rose-50 text-rose-600"
                      : "border-neutral-200 text-neutral-700 hover:border-rose-300"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-500" : ""}`} />
                </button>
              </div>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="w-full text-center py-2 text-xs font-medium text-amber-800 hover:text-amber-900 flex items-center justify-center gap-1 group"
              >
                <span>View Full Certificate & Specifications</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
