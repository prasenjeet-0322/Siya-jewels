import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award, Heart, Gem, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Master Karigari & Heritage | Siya Jewels",
  description: "Learn about the heritage, craftsmanship, and pure BIS hallmarking standards of Siya Jewels.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Heritage of Purity</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
            Crafting Eternal Brilliance for Generations
          </h1>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto my-4" />
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Founded with an unyielding devotion to authentic Karigari, Siya Jewels celebrates Indian artistry through pure 22K hallmarked gold, uncut Polki Jadau, and ethically sourced solitaire diamonds.
          </p>
        </div>

        {/* Section 1: Story with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-amber-200">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Rajasthan & Kolkata Ateliers
              </span>
              <h3 className="font-serif text-xl font-bold">Heirloom Handcrafting</h3>
            </div>
          </div>

          <div className="space-y-6 text-neutral-700">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B58E22]">Our Genesis</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Where Royal Tradition Meets Modern Refinement
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Every creation at Siya Jewels begins with a sketch and centuries of inherited wisdom. Our master goldsmiths (Karigars) spend weeks perfecting the micro-setting of each solitaire and the hand-granulation of antique gold pieces.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              We bridge the gap between heavy traditional heirlooms and contemporary lightweight luxury, crafting pieces that empower the modern woman whether she is in a boardroom or a bridal mandap.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FCF9F4] border border-amber-100">
                <span className="font-serif text-2xl font-bold text-[#B58E22] block">100%</span>
                <span className="text-xs text-neutral-600">Govt. BIS Hallmarked Gold</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FCF9F4] border border-amber-100">
                <span className="font-serif text-2xl font-bold text-[#B58E22] block">50,000+</span>
                <span className="text-xs text-neutral-600">Happy Patrons across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Pillars of Integrity */}
        <div className="bg-[#FCF9F4] p-8 sm:p-14 rounded-3xl border border-amber-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B58E22]">Purity & Ethics</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
              The Four Pillars of Siya Jewels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Assayed Purity</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Zero compromise on purity. Tested in certified assaying labs with permanent laser HUID inscription.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <Gem className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Conflict-Free Solitaires</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Diamonds strictly compliant with the Kimberley Process, graded by IGI & GIA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Honest Pricing</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Transparent breakdown of gold weight, making charges, and diamond carats on every invoice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <Heart className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Lifetime Bond</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Lifetime buyback guarantees, free annual ultrasonic cleaning, and complimentary resizing.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Experience the Regal Charm of Siya Jewels
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
            Browse our online boutique or schedule a bespoke video consultation with our senior gemologist.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition"
            >
              Contact Our Ateliers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
