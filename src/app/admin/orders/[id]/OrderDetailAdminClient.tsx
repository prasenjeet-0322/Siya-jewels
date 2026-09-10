"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Printer, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Check, 
  Clock,
  Phone,
  Mail,
  User,
  ExternalLink
} from "lucide-react";
import { getOrderById, updateOrderStatus } from "@/lib/firestoreService";
import { Order, OrderStatus } from "@/types/order";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

const STATUSES: OrderStatus[] = [
  "Confirmed",
  "Processing",
  "Quality Check",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export function OrderDetailAdminClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("Confirmed");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const toast = useToast();

  const loadOrder = async () => {
    setLoading(true);
    const data = await getOrderById(orderId);
    if (data) {
      setOrder(data);
      setSelectedStatus(data.orderStatus);
      setTrackingNumber(data.trackingNumber || "");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const handleUpdateStatus = async () => {
    if (!order) return;
    setIsUpdating(true);
    await updateOrderStatus(order.id, selectedStatus, trackingNumber);
    setOrder((prev) => (prev ? { ...prev, orderStatus: selectedStatus, trackingNumber } : null));
    setIsUpdating(false);
    toast.success("Order Updated", `Status changed to ${selectedStatus}`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-neutral-400">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-serif text-xl font-bold text-neutral-900">Order Not Found</h2>
        <p className="text-xs text-neutral-500">Order {orderId} does not exist in our database.</p>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200/70">
        <div className="space-y-1">
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Order Reference: <span className="font-mono text-[#B58E22]">{order.id}</span>
          </h1>
          <p className="text-xs text-neutral-500">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-700 flex items-center gap-1.5 shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice & Slip</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Items + Status, Right Customer & Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Status Controller */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#D4AF37]" />
              Fulfillment & Delivery Status
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Update Order Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 font-bold focus:outline-none focus:border-[#D4AF37]"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Courier / Insured Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. BLUEDART-INS-948210"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-110 transition"
            >
              {isUpdating ? "Saving Status..." : "Update Fulfillment Status"}
            </button>
          </div>

          {/* Ordered Products Table */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Purchased Masterpieces ({order.items.length})
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#FCF9F4] rounded-2xl border border-amber-100 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-neutral-200">
                      <Image
                        src={item.product?.images?.[0] || ""}
                        alt={item.product?.title || ""}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.product?.id}`}
                        target="_blank"
                        className="font-bold text-neutral-900 hover:text-amber-800 line-clamp-1 flex items-center gap-1"
                      >
                        <span>{item.product?.title}</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </Link>
                      <div className="text-[11px] text-neutral-500 mt-0.5 space-x-2">
                        <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-semibold">
                          {item.product?.purity}
                        </span>
                        <span>Gross Wt: {item.product?.weight}</span>
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                      <span className="text-[11px] text-neutral-600 block mt-1">
                        Unit: {formatCurrency(item.product?.price || 0)} &times; {item.quantity}
                      </span>
                    </div>
                  </div>

                  <span className="font-bold text-sm text-neutral-900 shrink-0">
                    {formatCurrency((item.product?.price || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Financials (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Address Card */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4AF37]" /> Customer Profile
            </h3>

            <div className="space-y-1.5 text-neutral-700">
              <p className="font-bold text-sm text-neutral-900">{order.shippingAddress?.fullName}</p>
              <p className="flex items-center gap-1.5 text-neutral-600">
                <Mail className="w-3.5 h-3.5 text-neutral-400" /> {order.shippingAddress?.email}
              </p>
              <p className="flex items-center gap-1.5 text-neutral-600">
                <Phone className="w-3.5 h-3.5 text-neutral-400" /> {order.shippingAddress?.phone}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-100 space-y-1">
              <span className="font-bold text-neutral-800 block">Shipping Destination:</span>
              <p className="text-neutral-600 leading-relaxed text-[11px]">
                {order.shippingAddress?.addressLine1}<br />
                {order.shippingAddress?.addressLine2 && `${order.shippingAddress.addressLine2}, `}
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </p>
            </div>
          </div>

          {/* Payment & Invoice Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Payment & Taxes
            </h3>

            <div className="space-y-2 text-neutral-600">
              <div className="flex justify-between">
                <span>Payment Status</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Paid (Razorpay)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex justify-between font-mono text-[11px]">
                  <span>Payment ID</span>
                  <span className="text-neutral-900">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2 text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon ({order.couponCode})</span>
                  <span>-{formatCurrency(order.couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (3%)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Shipping</span>
                <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-neutral-900 pt-2 border-t border-amber-200">
                <span>Total Amount Paid</span>
                <span className="text-[#B58E22]">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
