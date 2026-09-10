"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Product } from "@/types/product";
import { CartItem, CartSummary, CouponDiscount } from "@/types/cart";
import { VALID_COUPONS } from "@/lib/sampleProducts";
import { useToast } from "./ToastContext";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: CouponDiscount | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  summary: CartSummary;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "siya_cart_items";
const COUPON_STORAGE_KEY = "siya_cart_coupon";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponDiscount | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    }
  }, [appliedCoupon, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    const itemId = `${product.id}-${selectedSize || "default"}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prevCart,
        {
          id: itemId,
          product,
          quantity,
          selectedSize: selectedSize || product.sizes?.[0],
          selectedPurity: product.purity,
        },
      ];
    });

    toast.success("Added to Bag", `${product.title} (${quantity})`);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    if (item) {
      toast.info("Item Removed", `${item.product.title} was removed from your bag.`);
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = VALID_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { success: false, message: "Invalid promo code. Try 'SIYA10' or 'GOLDEN2026'." };
    }

    const currentSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (currentSubtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue.toLocaleString("en-IN")}.`,
      };
    }

    setAppliedCoupon(coupon);
    toast.success("Promo Applied!", coupon.description);
    return { success: true, message: `Promo code ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Promo code removed");
  };

  const summary: CartSummary = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const originalSubtotal = cart.reduce(
      (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
      0
    );
    const catalogDiscount = originalSubtotal - subtotal;

    let couponDiscount = 0;
    if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountPercentage) {
        couponDiscount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
      } else if (appliedCoupon.fixedDiscount) {
        couponDiscount = appliedCoupon.fixedDiscount;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
    const tax = Math.round(discountedSubtotal * 0.03); // 3% GST on jewellery
    const shipping = 0; // Complimentary Insured Shipping
    const total = discountedSubtotal + tax + shipping;
    const savings = catalogDiscount + couponDiscount;

    return {
      subtotal,
      discount: catalogDiscount,
      couponDiscount,
      appliedCoupon: appliedCoupon || undefined,
      tax,
      shipping,
      total,
      savings,
    };
  }, [cart, appliedCoupon]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        summary,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
