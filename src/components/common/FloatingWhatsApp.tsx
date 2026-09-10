"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "919876543210"; // Official Siya Jewels concierge

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim() || "Hello Siya Jewels Concierge, I would like to inquire about your fine jewellery collection.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-amber-950 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
                    SJ
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold flex items-center gap-1.5 text-amber-200">
                    Siya Jewels Concierge <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[11px] text-neutral-400">Certified Gemologist Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#FBF8F3] space-y-3 max-h-64 overflow-y-auto text-xs">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-amber-100 max-w-[85%]">
                <p className="text-neutral-800 leading-relaxed">
                  Namaste! Welcome to <strong>Siya Jewels</strong>. 💎
                </p>
                <p className="text-neutral-600 mt-1.5">
                  Looking for custom bridal jewellery, diamond purity certification, or video consultation? How may we assist you today?
                </p>
                <span className="text-[10px] text-neutral-400 mt-1 block text-right">Just now</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-amber-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask our jewellery stylist..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 text-xs px-3 py-2.5 bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl hover:brightness-110 transition shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center relative group border-2 border-white"
        aria-label="Chat with Siya Jewels on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </motion.button>
    </div>
  );
}
