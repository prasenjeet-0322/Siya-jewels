import React from "react";
import { Product } from "@/types/product";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Siya Jewels",
    url: "https://siyajewels.com",
    logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200",
    description: "Luxury fine jewellery atelier offering 100% BIS Hallmarked 22K/18K Gold, IGI Certified Solitaire Diamonds, and Bridal Polki Chokers.",
    telephone: "+91-98765-43210",
    email: "concierge@siyajewels.com",
    priceRange: "₹₹₹₹",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, NetBanking",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Siya Grand Arcade, Linking Road, Bandra West",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400050",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "20:30",
      },
    ],
    sameAs: [
      "https://www.instagram.com",
      "https://www.facebook.com",
      "https://www.youtube.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Siya Jewels",
    },
    offers: {
      "@type": "Offer",
      url: `https://siyajewels.com/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Siya Jewels",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
