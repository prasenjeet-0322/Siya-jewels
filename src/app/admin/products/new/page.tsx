import React from "react";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = {
  title: "Add New Fine Jewellery Product | Siya Jewels Admin",
};

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
          Catalog Management
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Add New Fine Jewellery Piece
        </h1>
      </div>

      <ProductForm isEditing={false} />
    </div>
  );
}
