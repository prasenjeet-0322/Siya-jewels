import { Product } from "./product";

export interface CartItem {
  id: string; // unique item id (productId + selectedSize)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedPurity?: string;
}

export interface CouponDiscount {
  code: string;
  discountPercentage?: number;
  fixedDiscount?: number;
  minOrderValue: number;
  description: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  appliedCoupon?: CouponDiscount;
  tax: number; // 3% GST on jewellery in India
  shipping: number; // 0 for free insured shipping
  total: number;
  savings: number;
}
