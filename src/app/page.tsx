import { SAMPLE_PRODUCTS } from "@/lib/sampleProducts";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TrustBadges } from "@/components/home/TrustBadges";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Carousel */}
      <HeroSlider />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* Featured / Best Sellers Showcase */}
      <FeaturedProducts products={SAMPLE_PRODUCTS} />

      {/* About Us & Founder Story Preview */}
      <AboutPreview />

      {/* Trust & Heritage Badges */}
      <TrustBadges />

      {/* Customer Testimonials Carousel */}
      <Testimonials />

      {/* Newsletter / Royal Club */}
      <NewsletterSection />
    </div>
  );
}
