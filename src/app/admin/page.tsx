"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Gem, 
  ShoppingBag, 
  Clock, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  Layers,
  Tag,
  Users
} from "lucide-react";
import { getProducts, getAllOrdersAdmin } from "@/lib/firestoreService";
import { Product } from "@/types/product";
import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [prods, ords] = await Promise.all([getProducts(), getAllOrdersAdmin()]);
      setProducts(prods);
      setOrders(ords);
      setLoading(false);
    }
    loadData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === "Confirmed" || o.orderStatus === "Processing");
  const shippedOrders = orders.filter((o) => o.orderStatus === "Shipped" || o.orderStatus === "Quality Check");
  const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered");

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
            Store Intelligence
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Executive Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold hover:bg-neutral-50 transition"
          >
            All Orders
          </Link>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#FCF9F4] border border-amber-200 flex items-center justify-center text-[#D4AF37]">
              <Gem className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-neutral-900">
              {products.length}
            </span>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All BIS 916/750 Catalogued
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#FCF9F4] border border-amber-200 flex items-center justify-center text-[#D4AF37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-neutral-900">
              {orders.length}
            </span>
            <p className="text-[11px] text-neutral-500 mt-1">
              {deliveredOrders.length} Fulfilled &bull; {pendingOrders.length} In Progress
            </p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Pending Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-3xl font-bold text-amber-700">
              {pendingOrders.length}
            </span>
            <p className="text-[11px] text-amber-800 mt-1 font-medium">
              Requires Assaying & Dispatch
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#171510] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              {formatCurrency(totalRevenue)}
            </span>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">
              Verified Razorpay Collections
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/products"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#D4AF37] hover:shadow-md transition flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-neutral-900 block">Products</span>
            <span className="text-[11px] text-neutral-500">Manage Catalog</span>
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#D4AF37] hover:shadow-md transition flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-neutral-900 block">Categories</span>
            <span className="text-[11px] text-neutral-500">8 Collections</span>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#D4AF37] hover:shadow-md transition flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-neutral-900 block">Orders</span>
            <span className="text-[11px] text-neutral-500">Shipment Status</span>
          </div>
        </Link>

        <Link
          href="/admin/coupons"
          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#D4AF37] hover:shadow-md transition flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-neutral-900 block">Coupons</span>
            <span className="text-[11px] text-neutral-500">Promo Offers</span>
          </div>
        </Link>
      </div>

      {/* Recent Orders Table (Last 10) */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-neutral-900">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-neutral-500">
              Latest transactions placed across Razorpay UPI, Cards & Net Banking.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#B58E22] hover:text-[#D4AF37] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF9F4] text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-400">
                    Loading recent orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-400">
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="hover:bg-amber-50/30 transition">
                    <td className="p-4 font-mono font-bold text-neutral-900">
                      {order.id}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-neutral-900">
                        {order.shippingAddress?.fullName || "Valued Client"}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {order.userEmail}
                      </div>
                    </td>
                    <td className="p-4 text-neutral-600">
                      {order.items?.length || 1} {(order.items?.length || 1) === 1 ? "piece" : "pieces"}
                    </td>
                    <td className="p-4 font-bold text-neutral-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.orderStatus === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.orderStatus === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white text-[11px] font-semibold transition"
                      >
                        Manage Order
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
