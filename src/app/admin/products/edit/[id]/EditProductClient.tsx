"use client";

import React, { useEffect, useState } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/firestoreService";
import { Product } from "@/types/product";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditProductClientProps {
  productId: string;
}

export function EditProductClient({ productId }: EditProductClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
      setLoading(false);
    }
    load();
  }, [productId]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-neutral-400">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-serif text-xl font-bold text-neutral-900">Product Not Found</h2>
        <p className="text-xs text-neutral-500">The requested product ID does not exist.</p>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
          Modify Inventory
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Edit &ldquo;{product.title}&rdquo;
        </h1>
      </div>

      <ProductForm initialProduct={product} isEditing={true} />
    </div>
  );
}
