"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Gem, 
  Sparkles, 
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, demoLogin } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("admin@siyajewels.com");
  const [password, setPassword] = useState("SiyaAdmin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter admin email and password");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await adminLogin(email, password);
      if (res.success) {
        toast.success("Welcome, Super Admin!", "Administrator session initialized.");
        router.push("/admin");
      } else {
        toast.error("Access Denied", res.message || "Invalid admin credentials");
      }
    } catch {
      toast.error("Login failed", "Please verify credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDemoLogin = () => {
    demoLogin("admin");
    toast.success("Welcome, Super Admin!", "One-click administrator access granted.");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#12110E] via-[#1A1712] to-[#0A0A09] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Gold Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Card */}
        <div className="bg-[#1C1811]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex flex-col items-center group">
              <div className="flex items-center gap-1.5">
                <Gem className="w-6 h-6 text-[#D4AF37]" />
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                  SIYA <span className="text-[#D4AF37] text-xs font-sans tracking-[0.3em] font-light">ADMIN</span>
                </span>
              </div>
              <span className="text-[9px] tracking-[0.35em] text-[#D4AF37] font-medium uppercase">
                Executive Control Center
              </span>
            </Link>

            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white mt-3">
              Administrator Sign In
            </h1>
            <p className="text-xs text-neutral-400">
              Manage fine jewellery products, categories, orders, customers, and coupons.
            </p>
          </div>

          {/* Credentials Info Callout Box */}
          <div className="p-3.5 bg-[#2B2315]/80 rounded-2xl border border-[#D4AF37]/40 text-xs space-y-1">
            <div className="flex items-center justify-between text-[#D4AF37] font-semibold">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" /> Demo Admin Credentials:
              </span>
              <span className="text-[10px] bg-[#3D321D] px-2 py-0.5 rounded text-amber-200">
                Default
              </span>
            </div>
            <div className="text-[11px] text-neutral-300 font-mono space-y-0.5 pt-1">
              <div>Email: <strong className="text-white">admin@siyajewels.com</strong></div>
              <div>Password: <strong className="text-white">SiyaAdmin@2026</strong></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5">Admin Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@siyajewels.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-900/90 rounded-xl border border-neutral-700 text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-neutral-900/90 rounded-xl border border-neutral-700 text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#A88118] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Verifying Access...</span>
              ) : (
                <>
                  <span>Unlock Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Instant One-Click Super Admin Button */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <button
              type="button"
              onClick={handleInstantDemoLogin}
              className="w-full py-3 rounded-xl bg-[#2B2315] hover:bg-[#3D321D] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>One-Click Super Admin Access</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white underline transition"
            >
              Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
