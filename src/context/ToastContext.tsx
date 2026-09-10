"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (title: string, options?: { type?: ToastType; message?: string; duration?: number }) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, options?: { type?: ToastType; message?: string; duration?: number }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const type = options?.type || "success";
      const duration = options?.duration || 3500;

      const newToast: Toast = {
        id,
        title,
        message: options?.message,
        type,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => {
    showToast(title, { type: "success", message });
  }, [showToast]);

  const error = useCallback((title: string, message?: string) => {
    showToast(title, { type: "error", message });
  }, [showToast]);

  const info = useCallback((title: string, message?: string) => {
    showToast(title, { type: "info", message });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-neutral-900/95 backdrop-blur-md text-white rounded-xl p-4 shadow-2xl border border-amber-500/40 flex items-start gap-3"
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {toast.type === "info" && <Info className="w-5 h-5 text-amber-300" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-neutral-100">{toast.title}</p>
                {toast.message && <p className="text-xs text-neutral-400 mt-0.5">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
