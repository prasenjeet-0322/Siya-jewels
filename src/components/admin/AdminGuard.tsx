"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAdmin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAdmin, loading, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#12110E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
          <p className="text-xs font-serif tracking-widest text-[#D4AF37] uppercase">Verifying Admin Permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#12110E] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-5 bg-[#1C1811] p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#2B2315] border border-amber-500/40 flex items-center justify-center text-[#D4AF37] mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">
              Restricted Portal
            </span>
            <h2 className="font-serif text-2xl font-bold mt-1 text-white">Administrator Access Required</h2>
            <p className="text-xs text-neutral-400 mt-2">
              This section is reserved for Siya Jewels executive management and store managers.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/admin/login"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <span>Sign In with Admin Credentials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 rounded-xl border border-neutral-700 text-xs text-neutral-400 hover:text-white"
            >
              Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
