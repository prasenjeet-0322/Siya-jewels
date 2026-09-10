"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles, 
  Gem, 
  ChevronDown,
  LogOut,
  Package,
  ShieldCheck,
  PhoneCall
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchOverlay } from "./SearchOverlay";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "All Jewellery", href: "/shop" },
  { name: "Rings", href: "/shop?category=Rings" },
  { name: "Necklaces", href: "/shop?category=Necklaces" },
  { name: "Earrings", href: "/shop?category=Earrings" },
  { name: "Bangles", href: "/shop?category=Bangles" },
  { name: "Solitaires", href: "/shop?category=Solitaires" },
  { name: "Bridal", href: "/shop?category=Bridal" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const { cartCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#171510] via-[#2A2315] to-[#171510] text-[#E8D7B0] text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center justify-center gap-1.5 mx-auto md:mx-0 text-center w-full md:w-auto">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse shrink-0" />
            <span className="tracking-wide sm:tracking-wider font-medium">
              <span className="hidden sm:inline">BIS Hallmarked 916 Gold & 100% Certified Natural Diamonds • </span>
              <span className="sm:hidden">BIS 916 Gold & Certified Diamonds • </span>
              Complimentary Insured Shipping
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px]">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" /> 15-Day Guaranteed Exchange
            </span>
            <span className="text-neutral-500">|</span>
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-white transition">
              <PhoneCall className="w-3 h-3 text-[#D4AF37]" /> +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          isScrolled
            ? "shadow-md border-b border-amber-300/60 py-2.5"
            : "border-b border-amber-100 py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-800 hover:text-amber-700 transition"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-800 hover:text-amber-700 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Logo */}
          <Link href="/" className="flex flex-col items-center group text-center">
            <div className="flex items-center gap-1.5">
              <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.2em] text-neutral-900 group-hover:text-amber-700 transition">
                SIYA
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#B58E22] font-medium -mt-1 uppercase">
              Jewels &bull; Luxe
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-medium uppercase tracking-wider text-neutral-700">
            {NAV_LINKS.slice(0, 8).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-amber-700 ${
                    isActive ? "text-amber-700 font-semibold" : ""
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-amber-50 border border-neutral-200 hover:border-amber-300 text-xs text-neutral-500 hover:text-amber-900 transition"
            >
              <Search className="w-4 h-4 text-amber-600" />
              <span>Search fine jewels...</span>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-neutral-800 hover:text-amber-700 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-neutral-800 hover:text-amber-700 transition"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1 p-1.5 rounded-full hover:bg-neutral-100 transition text-neutral-800"
                aria-label="User Account"
              >
                <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 text-xs font-semibold">
                  {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-amber-200 py-2 z-50 text-xs"
                  >
                    {profile || user ? (
                      <>
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="font-semibold text-neutral-900 truncate">
                            {profile?.displayName || user?.displayName || "Valued Client"}
                          </p>
                          <p className="text-neutral-500 text-[11px] truncate">
                            {profile?.email || user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-amber-50 hover:text-amber-800"
                        >
                          <Package className="w-4 h-4 text-amber-600" />
                          <span>My Orders & Profile</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-amber-50 hover:text-amber-800"
                        >
                          <Heart className="w-4 h-4 text-amber-600" />
                          <span>My Wishlist ({wishlistCount})</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left border-t border-neutral-100 mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="font-serif font-semibold text-neutral-900">Welcome to Siya Jewels</p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            Sign in to track orders & view your bespoke wishlist.
                          </p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link
                            href="/auth?mode=login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block w-full py-2 text-center rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold hover:brightness-110 shadow-sm"
                          >
                            Sign In / Register
                          </Link>
                          <Link
                            href="/account"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block w-full py-1.5 text-center rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                          >
                            Order Tracking
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-amber-100 overflow-hidden"
            >
              <div className="px-5 py-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-neutral-800 hover:text-amber-700 border-b border-neutral-100/60"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-xs font-semibold bg-neutral-900 text-white rounded-xl"
                  >
                    My Account & Orders
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Live Search Modal */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
