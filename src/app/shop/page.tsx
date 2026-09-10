import React, { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata = {
  title: "Fine Jewellery Shop | Rings, Solitaires, Necklaces & Bangles | Siya Jewels",
  description: "Browse our complete catalog of certified gold, platinum, and solitaire diamond jewellery. Filter by purity, metal, and price.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-200 border-t-[#D4AF37] animate-spin" />
            <p className="text-xs font-serif tracking-widest text-[#B58E22] uppercase">Loading Fine Jewels...</p>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
