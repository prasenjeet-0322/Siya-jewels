import React from "react";
import { notFound } from "next/navigation";
import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.id === resolvedParams.id || p.slug === resolvedParams.id);
  if (!product) {
    return { title: "Product Not Found | Siya Jewels" };
  }
  return {
    title: `${product.title} - ${product.purity} Gold & Diamonds | Siya Jewels`,
    description: product.description,
    alternates: {
      canonical: `https://siyajewels.com/product/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | Siya Jewels`,
      description: product.description,
      url: `https://siyajewels.com/product/${product.id}`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.id === resolvedParams.id || p.slug === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.material === product.material)
  ).slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
