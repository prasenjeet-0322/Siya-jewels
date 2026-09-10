"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Sparkles, 
  Grid2X2, 
  Grid3X3,
  Search,
  Check
} from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";
import { Product, JewelleryCategory, MetalType, GoldPurity } from "@/types/product";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES: (JewelleryCategory | "All")[] = [
  "All",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Chains",
  "Solitaires",
  "Bridal",
];

const METALS: MetalType[] = [
  "Yellow Gold",
  "Rose Gold",
  "White Gold",
  "Platinum",
];

const PURITIES: GoldPurity[] = [
  "22K (91.6%)",
  "18K (75.0%)",
  "24K (99.9%)",
  "950 Platinum",
];

export function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMetal, setSelectedMetal] = useState<string>("All");
  const [selectedPurity, setSelectedPurity] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedMetal("All");
    setSelectedPurity("All");
    setMaxPrice(300000);
    setSortBy("popular");
    setInStockOnly(false);
    setSearchQuery("");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      // Metal
      if (selectedMetal !== "All" && product.material !== selectedMetal) {
        return false;
      }
      // Purity
      if (selectedPurity !== "All" && product.purity !== selectedPurity) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }
      // In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.reviewsCount || 0) - (a.reviewsCount || 0); // popular default
    });
  }, [selectedCategory, selectedMetal, selectedPurity, maxPrice, sortBy, inStockOnly, searchQuery]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedMetal !== "All" ? 1 : 0) +
    (selectedPurity !== "All" ? 1 : 0) +
    (maxPrice < 300000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Banner */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1 text-xs text-neutral-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#B58E22] font-semibold">Fine Jewellery Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            {selectedCategory === "All" ? "All Fine Jewellery" : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Explore 100% BIS Hallmarked gold, IGI certified natural solitaires, and heirloom bridal jewels.
          </p>
        </div>

        {/* Quick Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#171510] text-[#D4AF37] border border-[#D4AF37] shadow-sm"
                  : "bg-[#FCF9F4] text-neutral-700 border border-amber-200/60 hover:border-[#D4AF37] hover:bg-amber-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Control Bar: Mobile Filter Toggle, Search, Sort & Grid Views */}
        <div className="bg-[#FCF9F4] p-3 sm:p-4 rounded-2xl border border-amber-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Product Count */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-amber-200 text-xs font-semibold text-neutral-800 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <span className="text-xs font-medium text-neutral-600">
              Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> master creations
            </span>
          </div>

          {/* Right: Search, Sort Dropdown & Layout */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products by"
              className="px-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="popular">Sort: Featured & Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>

            {/* Desktop Grid Switcher */}
            <div className="hidden sm:flex items-center border border-neutral-200 rounded-xl bg-white p-0.5">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition ${
                  gridCols === 3 ? "bg-amber-100 text-amber-900" : "text-neutral-400 hover:text-neutral-700"
                }`}
                title="3 Column Grid"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition ${
                  gridCols === 4 ? "bg-amber-100 text-amber-900" : "text-neutral-400 hover:text-neutral-700"
                }`}
                title="4 Column Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout: Filter Sidebar + Product Grid */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="bg-[#FCF9F4] rounded-2xl p-5 border border-amber-100 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                <h3 className="font-serif text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Filter By
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-amber-700 hover:text-amber-900 flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Metal / Material */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Metal / Alloy
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedMetal("All")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                      selectedMetal === "All"
                        ? "bg-amber-100/80 text-amber-900 font-semibold"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <span>All Metals</span>
                    {selectedMetal === "All" && <Check className="w-3 h-3 text-[#D4AF37]" />}
                  </button>
                  {METALS.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                        selectedMetal === metal
                          ? "bg-amber-100/80 text-amber-900 font-semibold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <span>{metal}</span>
                      {selectedMetal === metal && <Check className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purity */}
              <div className="space-y-2 pt-3 border-t border-amber-200/50">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Gold & Platinum Purity
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedPurity("All")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                      selectedPurity === "All"
                        ? "bg-amber-100/80 text-amber-900 font-semibold"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <span>All Purities</span>
                    {selectedPurity === "All" && <Check className="w-3 h-3 text-[#D4AF37]" />}
                  </button>
                  {PURITIES.map((purity) => (
                    <button
                      key={purity}
                      onClick={() => setSelectedPurity(purity)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                        selectedPurity === purity
                          ? "bg-amber-100/80 text-amber-900 font-semibold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <span>{purity}</span>
                      {selectedPurity === purity && <Check className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2 pt-3 border-t border-amber-200/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold uppercase tracking-wider text-neutral-700">Max Budget</span>
                  <span className="font-bold text-[#D4AF37]">{formatCurrency(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="300000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>₹20,000</span>
                  <span>₹3,00,000+</span>
                </div>
              </div>

              {/* Stock toggle */}
              <div className="pt-3 border-t border-amber-200/50">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#D4AF37] focus:ring-amber-500 w-4 h-4 accent-[#D4AF37]"
                  />
                  <span>Ready to Ship Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#FCF9F4] rounded-3xl border border-amber-100 p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D4AF37] mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  No fine pieces found with chosen filters
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your price range, metal type, or clear search queries to discover our full catalogue.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white text-xs font-semibold uppercase tracking-wider transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 4 ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-3"
                } gap-4 sm:gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Filter By</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          selectedCategory === cat
                            ? "bg-amber-100 border-[#D4AF37] text-amber-900 font-semibold"
                            : "border-neutral-200 text-neutral-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metal */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    Metal
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["All", ...METALS].map((metal) => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          selectedMetal === metal
                            ? "bg-amber-100 border-[#D4AF37] text-amber-900 font-semibold"
                            : "border-neutral-200 text-neutral-700"
                        }`}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">Max Price</span>
                    <span className="font-bold text-[#D4AF37]">{formatCurrency(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="300000"
                    step="5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Bottom Apply button */}
              <div className="pt-4 border-t border-neutral-100 space-y-2">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 text-center text-xs text-neutral-500 hover:text-neutral-900"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
