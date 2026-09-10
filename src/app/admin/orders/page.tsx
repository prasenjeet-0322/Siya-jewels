"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  CheckCircle2, 
  Truck, 
  Clock, 
  Eye, 
  Printer, 
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { getAllOrdersAdmin, updateOrderStatus } from "@/lib/firestoreService";
import { Order, OrderStatus } from "@/types/order";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

const STATUSES: (OrderStatus | "All")[] = [
  "All",
  "Confirmed",
  "Processing",
  "Quality Check",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const toast = useToast();

  const loadOrders = async () => {
    setLoading(true);
    const data = await getAllOrdersAdmin();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    toast.success("Order Status Updated", `Order ${orderId} marked as ${newStatus}`);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.orderStatus !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = o.id.toLowerCase().includes(q);
        const matchesName = o.shippingAddress?.fullName?.toLowerCase().includes(q);
        const matchesEmail = o.userEmail?.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesEmail) return false;
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
            Sales & Logistics
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Order Management ({orders.length})
          </h1>
        </div>
      </div>

      {/* Control Bar: Search & Status Filter */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search by order ID, client name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#D4AF37]"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st === "All" ? "All Order Statuses" : st}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-medium text-neutral-500">
          Showing <strong>{filteredOrders.length}</strong> orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF9F4] text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Client Name & Address</th>
                <th className="p-4">Purchased Pieces</th>
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
                    Loading customer orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-400">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-50/30 transition">
                    <td className="p-4">
                      <span className="font-mono font-bold text-neutral-900 block">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-neutral-500 mt-0.5 block">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-neutral-900">
                        {order.shippingAddress?.fullName}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate max-w-xs">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {order.items?.slice(0, 2).map((item, i) => (
                          <div
                            key={i}
                            className="relative w-8 h-8 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200"
                            title={item.product?.title}
                          >
                            <Image
                              src={item.product?.images?.[0] || ""}
                              alt=""
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {(order.items?.length || 0) > 2 && (
                          <span className="text-[11px] text-neutral-500 font-semibold">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-neutral-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </span>
                      <span className="block text-[10px] text-neutral-400 mt-0.5">
                        {order.paymentMethod?.replace("Razorpay_", "Razorpay ")}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* Status Dropdown */}
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold uppercase rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          order.orderStatus === "Delivered"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : order.orderStatus === "Shipped"
                            ? "bg-blue-50 border-blue-300 text-blue-800"
                            : order.orderStatus === "Cancelled"
                            ? "bg-rose-50 border-rose-300 text-rose-800"
                            : "bg-amber-50 border-amber-300 text-amber-800"
                        }`}
                      >
                        {STATUSES.filter((s) => s !== "All").map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white text-[11px] font-semibold transition inline-block"
                      >
                        Manage
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
