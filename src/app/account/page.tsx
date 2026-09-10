"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  User, 
  Package, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  ShoppingBag
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types/order";
import { getUserOrders } from "@/lib/firestoreService";
import { formatCurrency } from "@/lib/utils";

export default function AccountPage() {
  const { user, profile, logout, demoLogin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "certificates">("orders");

  const emailOrUid = profile?.email || user?.email || profile?.uid || "guest";

  useEffect(() => {
    async function load() {
      setLoadingOrders(true);
      const res = await getUserOrders(emailOrUid);
      setOrders(res);
      setLoadingOrders(false);
    }
    load();
  }, [emailOrUid]);

  if (!user && !profile) {
    return (
      <div className="min-h-[70vh] bg-[#FFFFFF] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FCF9F4] border border-amber-200 flex items-center justify-center text-[#D4AF37] mx-auto shadow-sm">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Sign In to Your Patron Portal
            </h1>
            <p className="text-xs text-neutral-500 mt-2">
              Access your order history, track live shipments, and review digital authenticity certificates.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth?mode=login"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition"
            >
              Sign In with Email / Google
            </Link>
            <button
              onClick={() => demoLogin("customer")}
              className="w-full py-3 rounded-full bg-[#FCF9F4] border border-amber-200 text-[#7A5B0B] text-xs font-semibold hover:bg-amber-100 transition"
            >
              One-Click Demo Sign In (Aanya Patel)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-[#FCF9F4] rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-neutral-900 to-amber-950 border-2 border-[#D4AF37] text-white flex items-center justify-center text-xl font-serif font-bold shadow-md">
              {profile?.displayName?.charAt(0).toUpperCase() || "S"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                  {profile?.displayName || user?.displayName || "Valued Patron"}
                </h1>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  Royal Member
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">{profile?.email || user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-100 text-xs text-rose-600 font-semibold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-amber-200">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-[#D4AF37] text-amber-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Shipments ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
              activeTab === "addresses"
                ? "border-[#D4AF37] text-amber-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
              activeTab === "certificates"
                ? "border-[#D4AF37] text-amber-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>BIS Hallmark Vault</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-4">
          {activeTab === "orders" && (
            <div className="space-y-6">
              {loadingOrders ? (
                <div className="text-center py-12 text-xs text-neutral-400">Loading your fine orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-[#FCF9F4] rounded-3xl border border-amber-100 p-8 space-y-4">
                  <Package className="w-10 h-10 text-neutral-400 mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-neutral-900">No Past Orders Found</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    When you place an order with Siya Jewels, it will appear here with live tracking updates.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#FCF9F4] rounded-3xl border border-amber-200 overflow-hidden shadow-sm"
                  >
                    {/* Order Top Bar */}
                    <div className="bg-white p-4 sm:p-5 border-b border-amber-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold">Order Reference</span>
                        <p className="font-mono font-bold text-neutral-900">{order.id}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold">Date Placed</span>
                        <p className="text-neutral-700">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold">Total Amount</span>
                        <p className="font-bold text-[#B58E22]">{formatCurrency(order.totalAmount)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold">Status</span>
                        <span className="block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {order.orderStatus}
                        </span>
                      </div>
                      <Link
                        href={`/order-success/${order.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <span>Receipt</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 sm:p-6 space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-neutral-100 text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-50 shrink-0 border border-neutral-200">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-neutral-900 truncate">{item.product.title}</p>
                              <p className="text-[11px] text-neutral-500">
                                {item.product.purity} • Qty: {item.quantity} {item.selectedSize && `• Size ${item.selectedSize}`}
                              </p>
                            </div>
                          </div>
                          <span className="font-bold text-neutral-900 shrink-0">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Footer */}
                    <div className="bg-[#FAF6EE] px-6 py-3 border-t border-amber-200 flex items-center justify-between text-xs text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#D4AF37]" />
                        Estimated Insured Delivery: <strong>{order.estimatedDeliveryDate}</strong>
                      </span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> 100% Insured Transit
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="bg-[#FCF9F4] rounded-3xl p-6 sm:p-8 border border-amber-100 space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-900">Default Delivery Address</h3>
              {profile?.addresses && profile.addresses.length > 0 ? (
                <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-1 text-xs max-w-md">
                  <div className="flex justify-between font-bold text-neutral-900">
                    <span>{profile.addresses[0].fullName}</span>
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]">
                      {profile.addresses[0].addressType}
                    </span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {profile.addresses[0].addressLine1}, {profile.addresses[0].addressLine2}<br />
                    {profile.addresses[0].city}, {profile.addresses[0].state} - {profile.addresses[0].pincode}
                  </p>
                  <p className="text-neutral-500 pt-1">Phone: {profile.addresses[0].phone}</p>
                </div>
              ) : (
                <p className="text-xs text-neutral-500">No saved addresses yet.</p>
              )}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="bg-[#FCF9F4] rounded-3xl p-6 sm:p-8 border border-amber-100 space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-neutral-900">
                  Government BIS Hallmark & Laboratory Vault
                </h3>
                <p className="text-xs text-neutral-500">
                  All pieces ordered through Siya Jewels are recorded in our digital purity ledger.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-amber-100 space-y-2">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <span>BIS 916 / 750 Gold Assaying</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    Every item is laser engraved with a unique 6-digit HUID code verifiable on the official BIS Care App.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-amber-100 space-y-2">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                    <Sparkles className="w-5 h-5" />
                    <span>IGI / GIA Solitaire Grading</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-[11px]">
                    Diamond rings and solitaires include a physical laminated certificate card specifying 4Cs criteria.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
