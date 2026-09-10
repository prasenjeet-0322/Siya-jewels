"use client";

import React from "react";
import { ShieldCheck, Award, Truck, Scale, RefreshCw, Video } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked",
    desc: "Every gold piece is certified with the HUID Hallmark by the Govt. of India.",
  },
  {
    icon: Award,
    title: "IGI & GIA Certified",
    desc: "100% conflict-free natural diamonds with international grading certificates.",
  },
  {
    icon: Truck,
    title: "Insured Transit",
    desc: "Tamper-proof sealed packaging delivered directly to your doorstep safely.",
  },
  {
    icon: Scale,
    title: "Transparent Pricing",
    desc: "Clear breakdown of gold weight, diamond carats, and making charges.",
  },
  {
    icon: RefreshCw,
    title: "15-Day Easy Exchange",
    desc: "Hassle-free exchanges and guaranteed lifetime buyback at prevailing rates.",
  },
  {
    icon: Video,
    title: "Virtual Jewellery Lounge",
    desc: "Schedule a 1-on-1 live video call with our certified jewellery stylists.",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B58E22]">
            The Siya Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-1.5">
            Purity, Trust & Timeless Assurance
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-neutral-500">
            For decades, our hallmark has stood for uncompromising purity and master craftsmanship.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FCF9F4] border border-amber-100 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors shrink-0 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-neutral-900 group-hover:text-amber-800 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
