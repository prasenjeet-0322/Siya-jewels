"use client";

import React, { useState } from "react";
import { Sparkles, Send, Gift, ShieldCheck } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Welcome to Siya Jewels Circle!", "Promo code 'FIRSTGLOW' applied for 5% off your first order.");
    setEmail("");
  };

  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1811] via-[#2B2315] to-[#14120D] text-white p-8 sm:p-12 border border-[#D4AF37]/40 shadow-2xl">
          {/* Subtle gold glow accents */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3D321D] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" />
              <span>Exclusive Patron Privilege</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Join The Siya Jewels Royal Circle
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg mx-auto">
              Receive private invitations to bridal trunk shows, early access to limited edition solitaires, and an instant ₹1,000 privilege voucher.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your personal email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-neutral-900/90 border border-neutral-700 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition flex items-center justify-center gap-2 shrink-0"
              >
                <span>Join Privileges</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Instant 5% Welcome Code
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Zero Spam Promise
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
