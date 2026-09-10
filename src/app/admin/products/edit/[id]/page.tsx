import React from "react";
import { EditProductClient } from "./EditProductClient";
import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export const metadata = {
  title: "Edit Fine Jewellery Product | Siya Jewels Admin",
};

export default async function EditProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <EditProductClient productId={resolvedParams.id} />;
}
