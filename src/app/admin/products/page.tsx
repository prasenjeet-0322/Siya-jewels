"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Sparkles, 
  Gem, 
  Filter, 
  Eye,
  AlertTriangle
} from "lucide-react";
import { getProducts, deleteProduct, saveProduct } from "@/lib/firestoreService";
import { Product, JewelleryCategory } from "@/types/product";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bangles", "Bracelets", "Chains", "Solitaires", "Bridal"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const toast = useToast();

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesPurity = p.purity.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesPurity) return false;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleToggleStatus = async (product: Product) => {
    const updated: Product = {
      ...product,
      inStock: !product.inStock,
    };
    await saveProduct(updated);
    setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
    toast.success(
      updated.inStock ? "Product Activated" : "Product Deactivated",
      `${product.title} status updated`
    );
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    toast.success("Product Deleted", "The fine jewellery piece was removed from catalog.");
  };

  // Bulk Actions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedProductIds.length} selected products?`)) {
      for (const id of selectedProductIds) {
        await deleteProduct(id);
      }
      setProducts((prev) => prev.filter((p) => !selectedProductIds.includes(p.id)));
      setSelectedProductIds([]);
      toast.success("Bulk Delete Complete", "Selected products were removed.");
    }
  };

  const handleBulkStatus = async (inStock: boolean) => {
    for (const id of selectedProductIds) {
      const prod = products.find((p) => p.id === id);
      if (prod) {
        await saveProduct({ ...prod, inStock });
      }
    }
    setProducts((prev) =>
      prev.map((p) => (selectedProductIds.includes(p.id) ? { ...p, inStock } : p))
    );
    setSelectedProductIds([]);
    toast.success("Bulk Status Updated", `Updated ${selectedProductIds.length} products.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
            Inventory & Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Product Management ({products.length})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Control Bar: Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search by title, purity or metal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#D4AF37]"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk Actions (when items are selected) */}
        {selectedProductIds.length > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 p-1.5 px-3 rounded-xl border border-amber-300 text-xs font-semibold text-amber-900 w-full md:w-auto justify-between md:justify-start">
            <span>{selectedProductIds.length} Selected</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleBulkStatus(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700 transition"
              >
                Set Active
              </button>
              <button
                onClick={() => handleBulkStatus(false)}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 text-white text-[11px] font-medium hover:bg-black transition"
              >
                Set Inactive
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-medium hover:bg-rose-700 transition flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF9F4] text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProductIds.length === filteredProducts.length
                    }
                    className="rounded accent-[#D4AF37]"
                  />
                </th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Purity & Metal</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-400">
                    Loading fine jewellery catalog...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-400">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-amber-50/30 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={() => handleToggleSelect(product.id)}
                        className="rounded accent-[#D4AF37]"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <span className="font-bold text-neutral-900 block truncate">
                            {product.title}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {product.isBestSeller && (
                              <span className="text-[9px] bg-neutral-900 text-[#D4AF37] px-1.5 py-0.5 rounded font-bold uppercase">
                                Best Seller
                              </span>
                            )}
                            {product.isNewArrival && (
                              <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold uppercase">
                                New Arrival
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-neutral-800">
                      {product.category}
                    </td>
                    <td className="p-4">
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200 text-[10px]">
                        {product.purity}
                      </span>
                      <span className="text-neutral-400 text-[11px] block mt-0.5">
                        {product.material} &bull; {product.weight}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-neutral-900 block">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-semibold ${
                          product.stock < 5 ? "text-rose-600 font-bold" : "text-neutral-800"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                          product.inStock
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                        }`}
                      >
                        {product.inStock ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/product/${product.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
                          title="View on Storefront"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-rose-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                Confirm Product Deletion
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to delete this piece? This action will remove it from the catalog and customer storefront.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Delete Piece
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
