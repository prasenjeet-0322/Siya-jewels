"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";
import { formatCurrency } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = [
  "Solitaire Ring",
  "Kundan Choker",
  "22K Gold Bangles",
  "Tennis Bracelet",
  "Emerald Earrings",
  "Mangalsutra",
  "Temple Jewellery",
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.purity.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b border-amber-200 shadow-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Top Search Bar */}
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-6 h-6 text-amber-600 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for Rings, Necklaces, Solitaires, 22K Gold, Polki..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full text-base sm:text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="p-1 rounded-full text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-400 transition"
                >
                  ESC / Close
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="py-6">
                {query.trim() === "" ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Trending Collections
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-4 py-2 rounded-full bg-amber-50/70 border border-amber-200/60 text-xs text-neutral-800 hover:bg-amber-100/70 hover:border-amber-400 transition flex items-center gap-1.5 group"
                        >
                          <span>{item}</span>
                          <ArrowUpRight className="w-3 h-3 text-amber-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                        Matching Jewels ({filteredProducts.length})
                      </p>
                      <Link
                        href={`/shop?q=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
                      >
                        View all in Shop
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-100 hover:border-amber-300 hover:bg-amber-50/30 transition group"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-amber-100">
                            <Image
                              src={product.images[0]}
                              alt={product.title}
                              fill
                              sizes="64px"
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-neutral-900 truncate group-hover:text-amber-700">
                              {product.title}
                            </p>
                            <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 mt-0.5 inline-block">
                              {product.purity}
                            </span>
                            <p className="text-xs font-semibold text-neutral-900 mt-1">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-neutral-500 text-sm">
                      No jewellery pieces found matching &ldquo;<strong>{query}</strong>&rdquo;.
                    </p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-medium hover:brightness-110 shadow-md"
                    >
                      Browse Entire Fine Collection
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex-1" onClick={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}
