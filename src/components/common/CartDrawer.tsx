"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    cartCount,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    summary,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-amber-200"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-[#FCF9F4]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-lg font-semibold text-neutral-900">
                  Your Shopping Bag
                </h3>
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping & BIS Hallmark Assurance bar */}
            <div className="bg-amber-50/70 border-b border-amber-200/60 px-4 py-2 flex items-center justify-center gap-2 text-xs text-amber-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Complimentary 100% Insured Delivery across India</span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-neutral-900">
                      Your bag is currently empty
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                      Discover our exquisite hallmarked gold & certified diamond pieces crafted for timeless elegance.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-amber-700 text-white text-xs font-semibold tracking-wider uppercase transition shadow-md"
                  >
                    Explore Fine Jewellery
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-xl border border-neutral-100 bg-neutral-50/40 hover:border-amber-200 transition"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-neutral-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-medium text-neutral-900 line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-rose-600 p-0.5 transition"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-500">
                          <span>{item.product.purity}</span>
                          {item.selectedSize && (
                            <>
                              <span>•</span>
                              <span>Size: {item.selectedSize}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-200/50">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100 rounded-l text-neutral-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2 font-semibold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 rounded-r text-neutral-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-neutral-900">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-neutral-100 bg-[#FCF9F4] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(summary.subtotal)}</span>
                  </div>
                  {summary.couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount</span>
                      <span>-{formatCurrency(summary.couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated GST (3%)</span>
                    <span>{formatCurrency(summary.tax)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Insured Shipping</span>
                    <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-amber-200">
                    <span>Total Amount</span>
                    <span className="text-amber-700">{formatCurrency(summary.total)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-semibold hover:brightness-110 shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
