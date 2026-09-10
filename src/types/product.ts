export type JewelleryCategory = 
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bracelets"
  | "Bangles"
  | "Chains"
  | "Solitaires"
  | "Bridal";

export type MetalType = "Yellow Gold" | "Rose Gold" | "White Gold" | "Platinum" | "Sterling Silver";
export type GoldPurity = "24K (99.9%)" | "22K (91.6%)" | "18K (75.0%)" | "14K (58.5%)" | "950 Platinum";

export interface ProductReview {
  id: string;
  userName: string;
  userCity?: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  images?: string[];
}

export interface ProductSpecification {
  metal: MetalType;
  purity: GoldPurity;
  grossWeight: string; // e.g. "8.45 gm"
  netWeight?: string;
  diamondWeight?: string; // e.g. "0.45 ct"
  diamondClarity?: string; // e.g. "VVS-VS"
  diamondColor?: string; // e.g. "E-F"
  dimensions?: string;
  hallmark: string; // e.g. "BIS Hallmark 916"
  certification?: string; // e.g. "IGI Certified"
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: JewelleryCategory;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  description: string;
  shortDescription?: string;
  material: MetalType;
  purity: GoldPurity;
  weight: string;
  stock: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  sizes?: string[]; // e.g. ["12", "14", "16", "18"] for rings, ["2.4", "2.6", "2.8"] for bangles
  specifications: ProductSpecification;
  makingCharges?: number;
  gstRate?: number; // default 3%
  createdAt: string;
  reviews?: ProductReview[];
}

export interface FilterState {
  category: string;
  material: string;
  purity: string;
  priceRange: [number, number];
  weightRange: [number, number];
  sortBy: "popular" | "price-asc" | "price-desc" | "newest" | "rating";
  inStockOnly: boolean;
  searchQuery: string;
}
