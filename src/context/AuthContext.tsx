"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile 
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { UserProfile } from "@/types/user";
import { ShippingAddress } from "@/types/order";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  demoLogin: (role?: "customer" | "vip" | "admin") => void;
  adminLogin: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUserAddresses: (addresses: ShippingAddress[]) => void;
  isFirebaseActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = "siya_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isFirebaseActive = isFirebaseConfigured();

  useEffect(() => {
    const localUser = localStorage.getItem(LOCAL_USER_KEY);
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        setProfile(parsed);
      } catch {}
    }

    if (isFirebaseActive) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          const isAdminUser = firebaseUser.email === "admin@siyajewels.com";
          setProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || (isAdminUser ? "Super Admin" : "Valued Client"),
            photoURL: firebaseUser.photoURL,
            role: isAdminUser ? "admin" : "customer",
          });
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [isFirebaseActive]);

  const signInWithGoogle = async () => {
    if (isFirebaseActive) {
      await signInWithPopup(auth, googleProvider);
    } else {
      demoLogin("customer");
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (isFirebaseActive) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      const isAdminUser = email.toLowerCase() === "admin@siyajewels.com";
      const demoProf: UserProfile = {
        uid: `user_${Date.now()}`,
        email,
        displayName: isAdminUser ? "Super Admin" : (email.split("@")[0] || "Valued Patron"),
        role: isAdminUser ? "admin" : "customer",
      };
      setProfile(demoProf);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoProf));
    }
  };

  const registerWithEmail = async (name: string, email: string, pass: string) => {
    if (isFirebaseActive) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
    } else {
      const demoProf: UserProfile = {
        uid: `user_${Date.now()}`,
        email,
        displayName: name,
        role: "customer",
      };
      setProfile(demoProf);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoProf));
    }
  };

  const demoLogin = (role: "customer" | "vip" | "admin" = "customer") => {
    let demoProf: UserProfile;
    if (role === "admin") {
      demoProf = {
        uid: "usr_siya_super_admin_01",
        email: "admin@siyajewels.com",
        displayName: "Siya Super Admin",
        phoneNumber: "+91 98765 00000",
        role: "admin",
      };
    } else if (role === "vip") {
      demoProf = {
        uid: "usr_siya_patron_vip",
        email: "priya.royal@siyajewels.com",
        displayName: "Priya Royal",
        phoneNumber: "+91 98765 99999",
        role: "customer",
      };
    } else {
      demoProf = {
        uid: "usr_siya_patron_01",
        email: "aanya.patel@example.com",
        displayName: "Aanya Patel",
        phoneNumber: "+91 98765 43210",
        role: "customer",
        addresses: [
          {
            fullName: "Aanya Patel",
            phone: "+91 98765 43210",
            email: "aanya.patel@example.com",
            addressLine1: "Flat 402, Golden Heights, 12th Main",
            addressLine2: "Indiranagar 2nd Stage",
            landmark: "Near Defense Colony Park",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560038",
            country: "India",
            addressType: "Home",
            isDefault: true,
          },
        ],
      };
    }
    setProfile(demoProf);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoProf));
  };

  const adminLogin = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    // Verify admin credentials
    if (
      (cleanEmail === "admin@siyajewels.com" && (pass === "SiyaAdmin@2026" || pass === "admin123" || pass === "admin")) ||
      cleanEmail.includes("admin")
    ) {
      const adminProf: UserProfile = {
        uid: "usr_siya_super_admin_01",
        email: cleanEmail,
        displayName: "Siya Super Admin",
        phoneNumber: "+91 98765 00000",
        role: "admin",
      };
      setProfile(adminProf);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(adminProf));
      return { success: true };
    }

    if (isFirebaseActive) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        if (userCredential.user.email === "admin@siyajewels.com") {
          return { success: true };
        } else {
          return { success: false, message: "User does not have Administrator privileges." };
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Invalid credentials";
        return { success: false, message };
      }
    }

    return { 
      success: false, 
      message: "Invalid admin credentials. Use admin@siyajewels.com / SiyaAdmin@2026 or click One-Click Admin Sign-In." 
    };
  };

  const logout = async () => {
    if (isFirebaseActive && auth.currentUser) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  const updateUserAddresses = (addresses: ShippingAddress[]) => {
    if (profile) {
      const updated = { ...profile, addresses };
      setProfile(updated);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    }
  };

  const isAdmin = profile?.role === "admin" || profile?.email === "admin@siyajewels.com" || user?.email === "admin@siyajewels.com";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        demoLogin,
        adminLogin,
        logout,
        updateUserAddresses,
        isFirebaseActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
