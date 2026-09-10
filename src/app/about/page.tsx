import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Heart, 
  Gem, 
  ArrowRight, 
  Target, 
  Eye, 
  Compass, 
  Quote, 
  CheckCircle2,
  Calendar,
  Building2
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Mission, Vision & Master Karigari | Siya Jewels",
  description: "Discover the heritage of Siya Jewels, our mission to deliver BIS 916 hallmarked purity, vision for sustainable luxury, and a personal message from our founding leadership.",
  alternates: {
    canonical: "https://siyajewels.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The House of Siya Jewels</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
            Crafting Eternal Brilliance for Generations
          </h1>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto my-3" />
          <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
            Founded with an unyielding devotion to authentic Indian Karigari, Siya Jewels celebrates timeless artistry through pure 22K hallmarked gold, uncut Polki Jadau, and ethically certified solitaire diamonds.
          </p>
        </div>

        {/* Mission, Vision & Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FCF9F4] border border-amber-200/80 hover:border-[#D4AF37] transition-all shadow-xs hover:shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-900 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-[#B58E22]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B58E22]">Our Purpose</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                Our Mission
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                To sculpt eternal, 100% BIS 916 hallmarked heirlooms that celebrate the sacred vows and personal milestones of every patron with zero purity compromise, transparent pricing, and master-level karigari.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-200/50 flex items-center gap-2 text-xs text-amber-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Certified 916 Hallmark & Conflict-Free</span>
            </div>
          </div>

          {/* Vision */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#171510] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all shadow-xl text-white group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black/60 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">Our Destination</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                Our Vision
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                To stand as India’s most revered haute joaillerie maison, seamlessly marrying royal heritage with modern daily luxe, while setting the benchmark for ethical diamond sourcing and lifetime customer stewardship.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Bridging Royal Heritage & Modern Luxe</span>
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FCF9F4] border border-amber-200/80 hover:border-[#D4AF37] transition-all shadow-xs hover:shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-900 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-[#B58E22]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B58E22]">Our Guiding Ethos</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                Core Philosophy
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Purity as our sacred promise, artistry as our devotion, and honest transparency as the heirloom we pass down to every family that honours us with their trust.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-200/50 flex items-center gap-2 text-xs text-amber-900 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Lifetime Buyback & Assayed Purity</span>
            </div>
          </div>
        </div>

        {/* Leadership Spotlight / Founder Message */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F4EEE2] border border-amber-200/80 p-6 sm:p-12 lg:p-16 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Founder Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 group">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                  alt="Siya Singhania - Founder & Chief Creative Director"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block">
                    Leadership Spotlight
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">Siya Singhania</h3>
                  <p className="text-xs text-neutral-300">Founder & Chief Creative Director</p>
                </div>
              </div>
            </div>

            {/* Founder Message & Note */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5 text-[#B58E22]" />
                <span>Founder&apos;s Note</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                &ldquo;Jewellery is never merely gold and gemstones; it is an intimate heirloom of your most sacred memories.&rdquo;
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <p>
                  Growing up surrounded by the rhythmic chimes of goldsmiths in our ancestral Jaipur ateliers, I realized that true jewellery transcends fashion. It carries the whisper of wedding vows, the pride of a hard-won promotion, and the eternal bond of maternal love handed down through generations.
                </p>
                <p>
                  When we established <strong>Siya Jewels</strong>, our goal was singularly clear: to dismantle the opacity of traditional jewellery retail. We ensure every single client knows the precise gold purity down to the second decimal, the exact diamond clarity, and the honest making charge.
                </p>
                <p>
                  Every piece we curate is meticulously inspected by certified gemologists, stamped with the Bureau of Indian Standards HUID hallmark, and delivered to your doorstep with total peace of mind.
                </p>
              </div>

              {/* Founder Sign-off & Credentials */}
              <div className="pt-4 border-t border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold text-neutral-900">Siya & Rajesh Singhania</p>
                  <p className="text-xs text-[#B58E22] font-medium">Founders, Siya Jewels & Luxe Atelier</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>Est. 2008</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Jaipur & Mumbai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Karigari Atelier Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-neutral-700 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B58E22]">Our Master Craft</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Where Century-Old Karigari Meets Modern Precision
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Every creation at Siya Jewels begins with hand sketches drawn by our in-house design atelier. From there, our master karigars from Rajasthan and Bengal invest upwards of 60 painstaking hours in setting uncut Polki diamonds in pure 24K gold foil and hand-enameling delicate Meenakari reverses.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              By uniting age-old techniques with microscopic laser diamond setting, we achieve featherweight strength without ever diluting gold purity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FCF9F4] border border-amber-100">
                <span className="font-serif text-2xl font-bold text-[#B58E22] block">100%</span>
                <span className="text-xs text-neutral-600">Govt. BIS HUID Hallmarked</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FCF9F4] border border-amber-100">
                <span className="font-serif text-2xl font-bold text-[#B58E22] block">50,000+</span>
                <span className="text-xs text-neutral-600">Heirlooms Delivered</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-amber-200 order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
              alt="Master Artisan Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Rajasthan & Kolkata Ateliers
              </span>
              <h3 className="font-serif text-xl font-bold">Uncut Polki & Solitaire Masters</h3>
            </div>
          </div>
        </div>

        {/* The 4 Pillars of Integrity */}
        <div className="bg-[#FCF9F4] p-6 sm:p-14 rounded-3xl border border-amber-200">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B58E22]">Uncompromising Trust</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
              The Four Pillars of Siya Jewels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Assayed Purity</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Zero tolerance for impurities. Every piece is stamped with the permanent 6-digit alphanumeric BIS HUID hallmark.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <Gem className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Certified Solitaires</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Conflict-free diamonds adhering strictly to the Kimberley Process, graded by IGI and GIA gemologists.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <Award className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Honest Pricing</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Complete transparency on gold weight, making charges, and solitaire caratage printed clearly on every invoice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100 space-y-3">
              <Heart className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif text-base font-bold text-neutral-900">Lifetime Bond</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Lifetime buyback guarantees, complimentary annual ultrasonic cleaning, and complimentary ring resizing for life.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center space-y-4 pt-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Experience the Regal Charm of Siya Jewels
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
            Browse our online boutique catalog or book a bespoke consultation with our senior diamond specialist.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition"
            >
              Schedule Atelier Consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
