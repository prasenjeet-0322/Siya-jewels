"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    tagline: "The Royal Bridal Collection 2026",
    title: "Timeless Grandeur in Pure 22K Gold & Polki",
    description: "Handcrafted heirloom masterpieces sculpted by Rajasthan's master karigars for your unforgettable wedding day.",
    primaryBtnText: "Explore Bridal Edit",
    primaryBtnLink: "/shop?category=Bridal",
    secondaryBtnText: "Book Atelier Visit",
    secondaryBtnLink: "/contact",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1800&auto=format&fit=crop",
    badge: "Bespoke Royal Collection",
  },
  {
    id: 2,
    tagline: "IGI Certified Solitaires",
    title: "Eternal Fire. Solitaire Diamond Marvels",
    description: "Discover exceptional clarity and cut in 18K yellow, rose, and 950 platinum settings with lifetime diamond upgrade.",
    primaryBtnText: "Shop Solitaires",
    primaryBtnLink: "/shop?category=Solitaires",
    secondaryBtnText: "View Engagement Rings",
    secondaryBtnLink: "/shop?category=Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1800&auto=format&fit=crop",
    badge: "100% Conflict-Free Natural",
  },
  {
    id: 3,
    tagline: "Festive & Daily Luxe",
    title: "Artistry in Motion: Kadas & Tennis Bracelets",
    description: "Subtle opulence designed for everyday grace and grand celebratory evenings alike.",
    primaryBtnText: "Discover Bangles & Kadas",
    primaryBtnLink: "/shop?category=Bangles",
    secondaryBtnText: "Explore All Jewellery",
    secondaryBtnLink: "/shop",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1800&auto=format&fit=crop",
    badge: "BIS Hallmark 916 Guaranteed",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 280, damping: 30 },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 280, damping: 30 },
      opacity: { duration: 0.4 },
    },
  }),
};

export function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = ((page % SLIDES.length) + SLIDES.length) % SLIDES.length;
  const activeSlide = SLIDES[slideIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [paginate]);

  const handleDragEnd = (e: unknown, { offset, velocity }: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold || offset.x < -100) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 100) {
      paginate(-1);
    }
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] bg-neutral-950 overflow-hidden select-none">
      {/* Horizontal Carousel Slides with AnimatePresence */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.48]"
            />
            {/* Subtle luxury gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none" />
          </div>

          {/* Slide Text Content */}
          <div className="absolute inset-0 z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pointer-events-none pb-14 sm:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl space-y-3 sm:space-y-6 pointer-events-auto"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-widest uppercase shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
                <span>{activeSlide.badge}</span>
              </div>

              {/* Tagline */}
              <p className="text-[10px] sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.25em] text-[#E8D7B0] uppercase">
                {activeSlide.tagline}
              </p>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
                {activeSlide.title}
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
                {activeSlide.description}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4 w-full sm:w-auto">
                <Link
                  href={activeSlide.primaryBtnLink}
                  className="px-3 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#A88118] text-neutral-950 text-[11px] sm:text-sm font-bold tracking-wider uppercase hover:brightness-110 shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition flex items-center justify-center gap-1.5 group text-center"
                >
                  <span className="truncate">{activeSlide.primaryBtnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0 hidden sm:inline-block" />
                </Link>
                <Link
                  href={activeSlide.secondaryBtnLink}
                  className="px-3 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-[11px] sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition text-center truncate flex items-center justify-center"
                >
                  {activeSlide.secondaryBtnText}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Arrows */}
      <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-8 z-20 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => paginate(-1)}
          className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Dots Indicator */}
      <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-8 z-20 flex items-center gap-1.5 sm:gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const diff = idx - slideIndex;
              if (diff !== 0) {
                setPage([page + diff, diff > 0 ? 1 : -1]);
              }
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
              slideIndex === idx ? "w-7 sm:w-10 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
