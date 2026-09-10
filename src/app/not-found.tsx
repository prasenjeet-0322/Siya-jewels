import React from "react";
import Link from "next/link";
import { Gem, ArrowRight, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#FFFFFF] py-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FCF9F4] border border-amber-200 flex items-center justify-center text-[#D4AF37] mx-auto shadow-sm">
          <Gem className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B58E22]">
            404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            An Elusive Jewel
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
            The page you seek may have been moved, redesigned, or is currently reserved in our private vault.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition"
          >
            Return to Home
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition flex items-center justify-center gap-1.5"
          >
            <span>Explore Fine Jewels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
