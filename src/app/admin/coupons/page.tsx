"use client";

import React, { useState, useEffect } from "react";
import { 
  Tag, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Percent, 
  IndianRupee 
} from "lucide-react";
import { getCouponsAdmin, saveCoupon, deleteCoupon } from "@/lib/firestoreService";
import { CouponDiscount } from "@/types/cart";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponDiscount[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(20000);
  const [description, setDescription] = useState("");

  const toast = useToast();

  const loadCoupons = async () => {
    setLoading(true);
    const data = await getCouponsAdmin();
    setCoupons(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleOpenAdd = () => {
    setCode("");
    setDiscountType("percentage");
    setDiscountValue(10);
    setMinOrderValue(25000);
    setDescription("");
    setIsModalOpen(true);
  };

  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) {
      toast.error("Please fill in coupon code and discount value.");
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    const newCoupon: CouponDiscount = {
      code: cleanCode,
      discountPercentage: discountType === "percentage" ? Number(discountValue) : undefined,
      fixedDiscount: discountType === "fixed" ? Number(discountValue) : undefined,
      minOrderValue: Number(minOrderValue),
      description:
        description.trim() ||
        (discountType === "percentage"
          ? `${discountValue}% Off on fine orders above ${formatCurrency(minOrderValue)}`
          : `Flat ${formatCurrency(discountValue)} Off on fine orders above ${formatCurrency(minOrderValue)}`),
    };

    await saveCoupon(newCoupon);
    toast.success("Coupon Created", `Promo code ${newCoupon.code} is now active.`);
    setIsModalOpen(false);
    loadCoupons();
  };

  const handleDeleteCoupon = async (codeToDelete: string) => {
    if (confirm(`Delete promo code ${codeToDelete}?`)) {
      await deleteCoupon(codeToDelete);
      toast.success("Coupon Deleted");
      loadCoupons();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
            Festive Promotions
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Privilege Coupons & Discounts ({coupons.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-16 text-xs text-neutral-400">
            Loading promotional coupons...
          </div>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="font-mono text-lg font-bold text-[#7A5B0B] bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl inline-block">
                    {coupon.code}
                  </span>
                  <p className="text-xs text-neutral-700 font-medium pt-1">
                    {coupon.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteCoupon(coupon.code)}
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <div>
                  <span className="text-[10px] uppercase font-bold block text-neutral-400">Benefit</span>
                  <span className="font-bold text-neutral-900">
                    {coupon.discountPercentage ? `${coupon.discountPercentage}% Discount` : formatCurrency(coupon.fixedDiscount || 0)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold block text-neutral-400">Min. Order</span>
                  <span className="font-bold text-neutral-900">{formatCurrency(coupon.minOrderValue)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#D4AF37]" /> Create Privilege Coupon
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ROYAL20 or FESTIVE5000"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 font-mono uppercase font-bold text-neutral-900 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Discount Type
                </label>
                <div className="flex bg-[#FCF9F4] p-1 rounded-xl border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => setDiscountType("percentage")}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
                      discountType === "percentage" ? "bg-neutral-900 text-white" : "text-neutral-600"
                    }`}
                  >
                    Percentage (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType("fixed")}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
                      discountType === "fixed" ? "bg-neutral-900 text-white" : "text-neutral-600"
                    }`}
                  >
                    Flat Discount (₹)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    {discountType === "percentage" ? "Discount Percentage (%)" : "Flat Amount (₹)"}
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    min={1}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 font-bold focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Min. Order Value (₹)
                  </label>
                  <input
                    type="number"
                    value={minOrderValue}
                    min={0}
                    step={1000}
                    onChange={(e) => setMinOrderValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 font-bold focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Description / Subtitle
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 15% Instant Off on Orders above ₹25,000"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
