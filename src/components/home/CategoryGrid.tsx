"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CATEGORIES_DATA } from "@/lib/sampleProducts";

export function CategoryGrid() {
  return (
    <section className="py-10 sm:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-2.5">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
            <span>Curated Ateliers</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Shop by Regal Category
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-[#D4AF37] mx-auto my-2.5 sm:my-3" />
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed px-2">
            Explore meticulously hallmarked gold and certified diamonds curated across timeless jewellery categories.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden bg-[#FAF7F2] border border-amber-100 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col aspect-[4/5]"
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90 transition-colors" />
              </div>

              {/* Bottom Card Info */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 flex items-end justify-between text-white z-10">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-amber-300 uppercase tracking-wider font-semibold block">
                    {cat.itemCount}+ Designs
                  </span>
                  <h3 className="font-serif text-base sm:text-xl font-bold text-white group-hover:text-amber-200 transition leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5 hidden sm:block">
                    {cat.description}
                  </p>
                </div>

                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
