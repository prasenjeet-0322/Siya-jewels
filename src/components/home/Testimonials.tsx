"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    name: "Radhika & Siddharth Roy",
    city: "Mumbai",
    occasion: "Bridal Jewellery Suite",
    rating: 5,
    text: "Choosing Siya Jewels for our wedding was the best decision. The 22K Kundan Choker and matching jhumkas looked extraordinarily royal. The BIS hallmark and certification gave us complete peace of mind.",
  },
  {
    id: 2,
    name: "Dr. Ananya Sengupta",
    city: "Bengaluru",
    occasion: "Solitaire Diamond Engagement Ring",
    rating: 5,
    text: "The brilliance of the solitaire diamond is unmatched! I visited their virtual lounge for a custom ring sizing session, and the team was impeccably helpful. Delivered in tamper-proof luxury packaging within 3 days.",
  },
  {
    id: 3,
    name: "Kavita Singhania",
    city: "New Delhi",
    occasion: "22K Filigree Gold Kadas",
    rating: 5,
    text: "The intricate Nakshi and filigree work on the bangles is reminiscent of ancestral royal jewellery. Exceptional finishing and true to the gram weight as stated. Highly recommend Siya Jewels!",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((prev) => (prev + 1) % REVIEWS.length);

  const review = REVIEWS[current];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#181611] to-[#100F0C] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtitle */}
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          Stories of Elegance
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight mt-2 text-white">
          Loved by Connoisseurs of Fine Jewellery
        </h2>
        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-3" />

        {/* Carousel */}
        <div className="mt-10 sm:mt-14 relative min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37]/30 mx-auto" />

              <p className="font-serif text-lg sm:text-2xl text-neutral-200 italic leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Author */}
              <div>
                <h4 className="font-serif text-base sm:text-lg font-semibold text-white">
                  {review.name}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs text-neutral-400">
                  <span>{review.city}</span>
                  <span>•</span>
                  <span className="text-[#D4AF37]">{review.occasion}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Patron
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i ? "w-6 bg-[#D4AF37]" : "w-2 bg-neutral-700"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
