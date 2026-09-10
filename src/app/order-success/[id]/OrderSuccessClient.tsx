"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ShieldCheck, 
  Printer, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CreditCard 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

interface OrderSuccessClientProps {
  order: Order | null;
  orderId: string;
}

export function OrderSuccessClient({ order, orderId }: OrderSuccessClientProps) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#C59B27", "#F3E8D2", "#1A1A1A"],
      });
    } catch {}
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B58E22]">
              Order Confirmed & Certified
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-1">
              Thank You for Your Patronage
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-md mx-auto">
              Your order <strong className="text-neutral-900">{orderId}</strong> is confirmed. A receipt and certificate dossier have been dispatched to your email.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            <span>
              Estimated Insured Delivery: <strong>{order?.estimatedDeliveryDate || "In 3-4 Business Days"}</strong>
            </span>
          </div>
        </div>

        {/* Order Status Stepper */}
        <div className="bg-[#FCF9F4] p-6 rounded-3xl border border-amber-100 mb-8">
          <h3 className="font-serif text-sm font-bold text-neutral-900 mb-6">Delivery Progress</h3>
          <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
            <div className="space-y-1.5 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-semibold text-neutral-900 text-[11px]">Payment Received</span>
            </div>

            <div className="space-y-1.5 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold">
                2
              </div>
              <span className="font-semibold text-neutral-900 text-[11px]">Assaying & Hallmark</span>
            </div>

            <div className="space-y-1.5 flex flex-col items-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center font-bold">
                3
              </div>
              <span className="font-medium text-neutral-600 text-[11px]">Insured Dispatch</span>
            </div>

            <div className="space-y-1.5 flex flex-col items-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center font-bold">
                4
              </div>
              <span className="font-medium text-neutral-600 text-[11px]">Delivered</span>
            </div>
          </div>
        </div>

        {/* Order Summary Receipt Box */}
        <div className="bg-[#FCF9F4] p-6 sm:p-8 rounded-3xl border border-amber-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-200/80 gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400">Order Reference</span>
              <p className="font-mono text-sm font-bold text-neutral-900">{orderId}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>

          {/* Items Table */}
          {order?.items && order.items.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-neutral-900">Purchased Masterpieces</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-2xl border border-amber-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{item.product.title}</p>
                        <p className="text-neutral-500 text-[11px]">
                          {item.product.purity} • Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping & Payment summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-1.5">
              <h5 className="font-bold text-neutral-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" /> Shipping Address
              </h5>
              <p className="font-semibold text-neutral-800">{order?.shippingAddress.fullName}</p>
              <p className="text-neutral-600 leading-relaxed">
                {order?.shippingAddress.addressLine1}, {order?.shippingAddress.addressLine2 && `${order.shippingAddress.addressLine2}, `}
                {order?.shippingAddress.city}, {order?.shippingAddress.state} - {order?.shippingAddress.pincode}
              </p>
              <p className="text-neutral-500">Phone: {order?.shippingAddress.phone}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-1.5">
              <h5 className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Payment & Certification
              </h5>
              <div className="flex justify-between text-neutral-600">
                <span>Payment Status</span>
                <span className="text-emerald-700 font-bold">Paid (Razorpay)</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Payment Method</span>
                <span>{order?.paymentMethod || "Razorpay Gateway"}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Govt. Hallmark</span>
                <span className="text-[#B58E22] font-semibold">100% BIS 916 HUID</span>
              </div>
              <div className="flex justify-between text-neutral-900 font-bold pt-1 border-t border-neutral-100">
                <span>Total Amount Paid</span>
                <span className="text-[#B58E22]">{formatCurrency(order?.totalAmount || 0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/account"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition text-center"
          >
            View Order in My Account
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 transition text-center flex items-center justify-center gap-1.5"
          >
            <span>Continue Exploring Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
