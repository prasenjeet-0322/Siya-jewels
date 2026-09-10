"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Gem, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, profile, loginWithEmail, registerWithEmail, signInWithGoogle, demoLogin } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (user || profile) {
      router.push("/account");
    }
  }, [user, profile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    if (mode === "register" && !name) {
      toast.error("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        toast.success("Welcome back!", "Successfully signed in to Siya Jewels.");
      } else {
        await registerWithEmail(name, email, password);
        toast.success("Account Created!", "Welcome to Siya Jewels Royal Circle.");
      }
      router.push("/account");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error";
      toast.error("Authentication Failed", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google", "Welcome to Siya Jewels.");
      router.push("/account");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in error";
      toast.error("Google Sign-in Failed", msg);
    }
  };

  const handleDemoSignIn = (role: "customer" | "vip") => {
    demoLogin(role);
    toast.success("Demo Login Active", `Signed in as ${role === "vip" ? "Priya Royal (VIP)" : "Aanya Patel"}`);
    router.push("/account");
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12 sm:py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Card */}
        <div className="bg-[#FCF9F4] rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex flex-col items-center group">
              <div className="flex items-center gap-1.5">
                <Gem className="w-6 h-6 text-[#D4AF37]" />
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-neutral-900">
                  SIYA
                </span>
              </div>
              <span className="text-[9px] tracking-[0.35em] text-[#B58E22] font-medium uppercase">
                Jewels &bull; Luxe
              </span>
            </Link>

            <h1 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-2">
              {mode === "login" ? "Welcome Back to Siya Jewels" : "Join The Royal Circle"}
            </h1>
            <p className="text-xs text-neutral-500">
              {mode === "login"
                ? "Sign in to track orders, manage wishlists, and view certificates."
                : "Create an account for bespoke perks, private previews, and orders."}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex bg-white p-1 rounded-xl border border-amber-200 text-xs font-semibold">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === "login" ? "bg-neutral-900 text-white shadow-xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-lg transition ${
                mode === "register" ? "bg-neutral-900 text-white shadow-xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === "register" && (
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Aanya Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="patron@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#A88118] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-md transition flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === "login" ? "Sign In" : "Register Now"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Or Divider */}
          <div className="flex items-center gap-3 text-neutral-400 text-xs">
            <div className="h-px bg-amber-200 flex-1" />
            <span>OR</span>
            <div className="h-px bg-amber-200 flex-1" />
          </div>

          {/* Social / Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center justify-center gap-2 shadow-xs transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Instant Demo Sandbox Access */}
          <div className="pt-3 border-t border-amber-200/60 space-y-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block text-center">
              Instant One-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoSignIn("customer")}
                className="py-2 px-3 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-[#7A5B0B] text-xs font-semibold text-center transition"
              >
                Sign In as Patron
              </button>
              <button
                onClick={() => handleDemoSignIn("vip")}
                className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-black text-[#D4AF37] text-xs font-semibold text-center transition border border-[#D4AF37]/40"
              >
                Sign In as VIP Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
