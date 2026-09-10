"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<"bestsellers" | "new" | "bridal">("bestsellers");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bridal = products.filter((p) => p.category === "Bridal" || p.tags.includes("kundan")).slice(0, 4);

  const displayedProducts =
    activeTab === "bestsellers"
      ? bestSellers.length ? bestSellers : products.slice(0, 4)
      : activeTab === "new"
      ? newArrivals.length ? newArrivals : products.slice(4, 8)
      : bridal.length ? bridal : products.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#FCF9F4] border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Timeless Craftsmanship</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Featured Jewellery Showcase
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white rounded-full border border-amber-200 shadow-xs self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition whitespace-nowrap ${
                activeTab === "bestsellers"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:text-amber-800"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition whitespace-nowrap ${
                activeTab === "new"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:text-amber-800"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("bridal")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition whitespace-nowrap ${
                activeTab === "bridal"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:text-amber-800"
              }`}
            >
              Royal Bridal
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition group"
          >
            <span>Explore All 100+ Masterpieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
