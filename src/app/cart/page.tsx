"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Check, 
  Sparkles,
  Truck
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    summary,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput("");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FFFFFF] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-[#FCF9F4] border border-amber-200 flex items-center justify-center text-[#D4AF37] mx-auto shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Your Bag is Currently Empty
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
              Explore our curated selection of BIS Hallmarked 22K/18K Gold, Polki Chokers, and certified Solitaire diamond masterpieces.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition"
          >
            <span>Explore Fine Jewellery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Shopping Bag ({cartCount} {cartCount === 1 ? "Item" : "Items"})
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Complimentary 100% Insured Delivery across India on all fine orders.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium self-start sm:self-auto"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Two Columns: Left Items, Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cart Items (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#FCF9F4] border border-amber-100 hover:border-amber-300 transition flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                {/* Image + Info */}
                <div className="flex gap-4 items-center min-w-0">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-neutral-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-semibold text-[#B58E22] uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.product.purity}
                    </span>
                    <Link
                      href={`/product/${item.product.id}`}
                      className="block font-serif text-sm sm:text-base font-semibold text-neutral-900 hover:text-amber-800 line-clamp-1"
                    >
                      {item.product.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      <span>Gross Wt: {item.product.weight}</span>
                      {item.selectedSize && (
                        <>
                          <span>•</span>
                          <span>Size: {item.selectedSize}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-bold text-sm text-neutral-900">
                        {formatCurrency(item.product.price)}
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          {formatCurrency(item.product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                  <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-sm sm:text-base text-neutral-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-rose-600 transition p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Guaranteed Badges in Cart */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-700">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 100% BIS Hallmarked 916/750 Purity
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#D4AF37]" /> Fully Insured Transit Packaging
              </span>
            </div>
          </div>

          {/* Right Column: Coupon & Price Summary (4/5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Promo Code Box */}
            <div className="p-5 rounded-2xl bg-[#FCF9F4] border border-amber-200/80 space-y-3">
              <h3 className="font-serif text-sm font-semibold text-neutral-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D4AF37]" /> Apply Privilege Promo Code
              </h3>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                    <p className="text-emerald-700 text-[11px]">{appliedCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-rose-600 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SIYA10 or GOLDEN2026"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3.5 py-2 bg-white rounded-xl border border-neutral-300 text-xs uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-xs ${couponMsg.isError ? "text-rose-600" : "text-emerald-700"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  <div className="text-[11px] text-neutral-500 pt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Try code <strong>SIYA10</strong> (10% off &gt; ₹20k)
                  </div>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="p-6 rounded-2xl bg-[#FCF9F4] border border-amber-200 space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-900 pb-3 border-b border-amber-200">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(summary.subtotal)}</span>
                </div>

                {summary.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Catalog Savings</span>
                    <span>-{formatCurrency(summary.discount)}</span>
                  </div>
                )}

                {summary.couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promo Code ({summary.appliedCoupon?.code})</span>
                    <span>-{formatCurrency(summary.couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Estimated GST (3%)</span>
                  <span>{formatCurrency(summary.tax)}</span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Insured Doorstep Shipping</span>
                  <span className="text-emerald-700 font-bold uppercase">Free</span>
                </div>

                <div className="pt-3 border-t border-amber-200 flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-neutral-900">Total Payable</span>
                  <span className="font-serif text-2xl font-bold text-neutral-900">
                    {formatCurrency(summary.total)}
                  </span>
                </div>
              </div>

              {summary.savings > 0 && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs font-semibold text-emerald-800">
                  ✨ You are saving {formatCurrency(summary.savings)} on this order!
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#A88118] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
