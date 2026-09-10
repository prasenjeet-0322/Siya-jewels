"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Gem, 
  Layers, 
  ShoppingBag, 
  Users, 
  Tag, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { useAuth } from "@/context/AuthContext";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Gem },
  { name: "Categories", href: "/admin/categories", icon: Layers },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on login page, render children directly
  if (pathname === "/admin/login") {
    return <AdminGuard>{children}</AdminGuard>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8F6F0] text-neutral-900 flex flex-col lg:flex-row">
        {/* Desktop Sidebar (Fixed Left) */}
        <aside className="hidden lg:flex w-64 bg-[#14120E] text-white flex-col justify-between shrink-0 border-r border-[#D4AF37]/30 min-h-screen sticky top-0">
          <div>
            {/* Admin Brand Logo */}
            <div className="p-6 border-b border-neutral-800">
              <Link href="/admin" className="flex flex-col group">
                <div className="flex items-center gap-2">
                  <Gem className="w-6 h-6 text-[#D4AF37]" />
                  <span className="font-serif text-xl font-bold tracking-[0.2em] text-white">
                    SIYA
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-semibold uppercase mt-0.5">
                  Admin Control Panel
                </span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="p-4 space-y-1.5">
              {ADMIN_NAV.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold shadow-md"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Profile & Store Link */}
          <div className="p-4 border-t border-neutral-800 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold transition"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Visit Storefront</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-neutral-950 font-serif font-bold text-xs flex items-center justify-center shrink-0">
                  SA
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">Super Admin</p>
                  <p className="text-[10px] text-neutral-400 truncate">admin@siyajewels.com</p>
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden bg-[#14120E] text-white p-4 flex items-center justify-between sticky top-0 z-30 border-b border-[#D4AF37]/30">
          <Link href="/admin" className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif text-lg font-bold text-white tracking-widest">
              SIYA ADMIN
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 text-neutral-300 hover:text-white"
              title="Storefront"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#14120E] text-white border-b border-neutral-800 p-4 space-y-1.5 z-20">
            {ADMIN_NAV.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive ? "bg-[#D4AF37] text-neutral-950 font-bold" : "text-neutral-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-neutral-800 flex justify-between items-center px-2">
              <span className="text-xs text-neutral-400">admin@siyajewels.com</span>
              <button
                onClick={() => logout()}
                className="text-xs text-rose-400 font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Desktop Bar */}
          <div className="bg-white border-b border-amber-200/70 py-3.5 px-6 hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Executive Authenticated Session (Role: Administrator)</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Quick admin search..."
                  className="pl-8 pr-3 py-1.5 bg-[#FCF9F4] rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#D4AF37] w-56"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2" />
              </div>

              <span className="w-px h-5 bg-neutral-200" />

              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Store Database Live</span>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
