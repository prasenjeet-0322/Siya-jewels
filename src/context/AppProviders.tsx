"use client";

import React from "react";
import { ToastProvider } from "./ToastContext";
import { AuthProvider } from "./AuthContext";
import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "./CartContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
