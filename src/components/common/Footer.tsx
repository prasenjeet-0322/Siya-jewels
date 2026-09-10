"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Gem, 
  ShieldCheck, 
  Award, 
  Truck, 
  RotateCcw, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send,
  Sparkles
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Welcome to Siya Jewels Circle!", "Use code 'FIRSTGLOW' for 5% off your first luxury purchase.");
    setEmail("");
  };

  return (
    <footer className="bg-[#12110E] text-neutral-300 border-t border-[#D4AF37]/30 pt-16 pb-24 lg:pb-12 mt-20 relative overflow-hidden">
      {/* Subtle gold glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C59B27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-neutral-800 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#241F14] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">100% BIS Hallmarked</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Every gold jewel bears the sacred government 916/750 hallmark.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#241F14] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">Certified Diamonds</h5>
              <p className="text-xs text-neutral-400 mt-0.5">IGI & GIA certified conflict-free natural solitaire diamonds.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#241F14] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">100% Insured Delivery</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Tamper-evident luxury packaging with door-to-door transit insurance.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#241F14] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">15-Day Easy Exchange</h5>
              <p className="text-xs text-neutral-400 mt-0.5">Hassle-free exchanges and lifetime buyback valuation policy.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-neutral-800 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Gem className="w-6 h-6 text-[#D4AF37]" />
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                SIYA <span className="text-[#D4AF37] text-xs font-sans tracking-[0.3em] font-light">JEWELS</span>
              </span>
            </Link>
            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Crafting stories of regal grandeur and eternal purity. From heirloom bridal Jadau to everyday solitaire brilliance, each Siya Jewels creation is a testament to master Karigari.
            </p>
            <div className="pt-2 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#D4AF37] hover:text-black transition flex items-center justify-center text-neutral-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#D4AF37] hover:text-black transition flex items-center justify-center text-neutral-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#D4AF37] hover:text-black transition flex items-center justify-center text-neutral-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase">
              Collections
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/shop?category=Rings" className="hover:text-white transition">Solitaire Rings</Link>
              </li>
              <li>
                <Link href="/shop?category=Bridal" className="hover:text-white transition">Royal Bridal Sets</Link>
              </li>
              <li>
                <Link href="/shop?category=Necklaces" className="hover:text-white transition">Heritage Chokers</Link>
              </li>
              <li>
                <Link href="/shop?category=Bangles" className="hover:text-white transition">22K Gold Bangles & Kadas</Link>
              </li>
              <li>
                <Link href="/shop?category=Earrings" className="hover:text-white transition">Polki Chandbalis</Link>
              </li>
              <li>
                <Link href="/shop?category=Bracelets" className="hover:text-white transition">Tennis Diamond Bracelets</Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase">
              Client Care
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/account" className="hover:text-white transition">Track Your Order</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">The Siya Heritage Story</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Bespoke Jewellery Concierge</Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition">My Curated Wishlist</Link>
              </li>
              <li>
                <span className="text-neutral-500">BIS Hallmark ID: HM-916-2026</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> The Royal Circle
            </h5>
            <p className="text-neutral-400 leading-relaxed">
              Subscribe for VIP collection previews, gemstone forecasts, and exclusive festive savings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#D4AF37] text-neutral-950 hover:brightness-110 transition"
                  aria-label="Submit"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-neutral-500 block">
                Instant ₹1,000 welcome voucher upon subscription.
              </span>
            </form>
          </div>
        </div>

        {/* Flagship Boutique Contact */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Flagship Ateliers: Mumbai &bull; Delhi &bull; Bengaluru
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Phone className="w-4 h-4 text-[#D4AF37]" /> +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Mail className="w-4 h-4 text-[#D4AF37]" /> concierge@siyajewels.com
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-neutral-900 border border-[#D4AF37]/30 px-2.5 py-1 rounded text-amber-300 font-medium">
              Razorpay Secured Gateway
            </span>
            <span className="text-[11px] bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded text-neutral-300">
              UPI &bull; Cards &bull; NetBanking
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Siya Jewels Private Limited. All Rights Reserved.</p>
          <p className="text-neutral-500">Handcrafted with regal devotion in India.</p>
        </div>
      </div>
    </footer>
  );
}
