import { MetadataRoute } from "next";
import { SAMPLE_PRODUCTS, CATEGORIES_DATA } from "@/lib/sampleProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://siyajewels.com";

  // Static routes
  const routes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/wishlist",
    "/cart",
    "/account",
    "/auth",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Category routes
  const categoryRoutes = CATEGORIES_DATA.map((cat) => ({
    url: `${baseUrl}/shop?category=${encodeURIComponent(cat.name)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Product routes
  const productRoutes = SAMPLE_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/product/${prod.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes];
}
