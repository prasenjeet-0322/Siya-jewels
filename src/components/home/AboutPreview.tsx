import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Award, Quote } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#FFFDF9] to-[#FFFFFF] border-y border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Founder & Atelier Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="Siya Singhania - Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  Leadership & Vision
                </span>
                <h3 className="font-serif text-xl font-bold">Siya Singhania</h3>
                <p className="text-xs text-neutral-300">Founder & Chief Creative Director</p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-3 sm:-bottom-6 sm:right-6 bg-white p-4 rounded-2xl border border-amber-200 shadow-xl max-w-[200px] hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-bold text-neutral-900">Est. 2008</span>
              </div>
              <p className="text-[10px] text-neutral-500">100% BIS 916 Hallmarked & IGI Solitaire Certified.</p>
            </div>
          </div>

          {/* Right: Mission, Values & Link to Full About Us */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 text-amber-900 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Our Heritage & Karigari</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
              A Legacy of Pure Gold & Ethical Solitaires
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              At <strong>Siya Jewels</strong>, every jewel is a wearable testament to master craftsmanship. From our ancestral Jaipur ateliers to the modern bride, our mission is to offer zero-compromise purity with transparent value pricing.
            </p>

            {/* Quote box */}
            <div className="p-4 rounded-2xl bg-[#FCF9F4] border-l-4 border-[#D4AF37] text-neutral-700 space-y-1">
              <Quote className="w-4 h-4 text-[#B58E22]" />
              <p className="text-xs italic leading-relaxed text-neutral-800">
                &ldquo;Jewellery is never merely gold and gemstones; it is an intimate heirloom of your life&apos;s most sacred memories.&rdquo;
              </p>
              <span className="text-[10px] font-bold text-[#B58E22] block uppercase tracking-wider">— Siya Singhania, Founder</span>
            </div>

            {/* Quick value counters */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-amber-100 shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">BIS HUID</span>
                  <span className="text-[10px] text-neutral-500">100% Assayed Gold</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-amber-100 shadow-2xs">
                <Award className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">50,000+</span>
                  <span className="text-[10px] text-neutral-500">Heirlooms Handcrafted</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-md shadow-amber-500/20 transition flex items-center gap-2"
              >
                <span>Read Our Full Story & Mission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition"
              >
                Contact Atelier
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
