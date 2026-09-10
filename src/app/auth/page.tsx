import React, { Suspense } from "react";
import { AuthClient } from "./AuthClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal & Authentication | Siya Jewels",
  description: "Sign in to track your fine orders, manage wishlists, and view certified diamond certificates.",
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
      <AuthClient />
    </Suspense>
  );
}
