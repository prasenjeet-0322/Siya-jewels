"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Ruler, 
  Share2, 
  MessageSquare,
  Award,
  ChevronRight,
  Info,
  MapPin
} from "lucide-react";
import { Product, ProductReview } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatCurrency, calculateEstimatedDeliveryDate } from "@/lib/utils";
import { ProductCard } from "@/components/shop/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "assurance" | "reviews">("specs");

  // Review submission state
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews || []);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const toast = useToast();

  const inWishlist = isInWishlist(product.id);

  // Zoom logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
      toast.error("Please enter a valid 6-digit Indian PIN code");
      return;
    }
    const est = calculateEstimatedDeliveryDate(3);
    setDeliveryEstimate(`Express Insured Delivery by ${est} to PIN ${pincode}`);
    toast.success("Delivery Available", `Insured delivery to PIN ${pincode}`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link Copied", "Product link copied to clipboard");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      toast.error("Please fill in all review fields");
      return;
    }
    setIsSubmittingReview(true);
    const newRev: ProductReview = {
      id: `rev_${Date.now()}`,
      userName: newReviewName.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().split("T")[0],
      verifiedPurchase: true,
    };
    setTimeout(() => {
      setReviews((prev) => [newRev, ...prev]);
      setNewReviewName("");
      setNewReviewComment("");
      setIsSubmittingReview(false);
      toast.success("Review Submitted", "Thank you for sharing your feedback!");
    }, 400);
  };

  return (
    <div className="bg-[#FFFFFF] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-neutral-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-neutral-900 transition">Fine Jewellery</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-neutral-900 transition">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-semibold truncate">{product.title}</span>
        </nav>

        {/* Top Product Section: Left Gallery, Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Gallery & Zoom (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image with Zoom */}
            <div
              className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FAF7F2] border border-amber-100 shadow-sm cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover object-center transition-transform duration-200 ${
                  isZoomed ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Magnified view on hover */}
              {isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[selectedImageIndex] || product.images[0]})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: "220%",
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="bg-[#171510] text-[#D4AF37] text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-md">
                  {product.purity}
                </span>
                {product.isBestSeller && (
                  <span className="bg-[#D4AF37] text-black text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Share & Wishlist in Image */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-neutral-700 hover:text-amber-700 flex items-center justify-center shadow-md transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition ${
                    inWishlist ? "bg-rose-500 text-white" : "bg-white/90 text-neutral-700 hover:text-rose-600"
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* Hover Instruction */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/80 pointer-events-none">
                Hover to magnify detail
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-[#FAF7F2] border-2 transition shrink-0 ${
                    selectedImageIndex === idx
                      ? "border-[#D4AF37] scale-105 shadow-md"
                      : "border-neutral-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications & Actions (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Category & Weight Pill */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B58E22] uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span>Gross Wt: {product.weight}</span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
                {product.title}
              </h1>

              {/* Subtitle */}
              {product.subtitle && (
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-500" : "fill-neutral-200 text-neutral-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-neutral-400">({reviews.length} Verified Customer Reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FCF9F4] border border-amber-200/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                    {product.discountPercentage}% Instant Saving
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
                <span>Includes 3% GST</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Free Insured Doorstep Delivery</span>
                <span>•</span>
                <span>Making Charges: {formatCurrency(product.makingCharges || 3500)}</span>
              </div>
            </div>

            {/* Purity & Metal details summary pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/50 text-center">
                <span className="text-[10px] text-neutral-400 block uppercase">Purity</span>
                <span className="text-xs font-bold text-neutral-900">{product.purity}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/50 text-center">
                <span className="text-[10px] text-neutral-400 block uppercase">Metal</span>
                <span className="text-xs font-bold text-neutral-900">{product.material}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/50 text-center">
                <span className="text-[10px] text-neutral-400 block uppercase">Gross Wt</span>
                <span className="text-xs font-bold text-neutral-900">{product.weight}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/50 text-center">
                <span className="text-[10px] text-neutral-400 block uppercase">Hallmark</span>
                <span className="text-xs font-bold text-[#B58E22]">Govt. HUID</span>
              </div>
            </div>

            {/* Size Selector (if available) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Select Size
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#B58E22] hover:text-[#D4AF37] flex items-center gap-1 font-semibold underline"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        selectedSize === s
                          ? "bg-[#171510] text-[#D4AF37] border border-[#D4AF37] shadow-sm"
                          : "bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-700"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-700"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#A88118] text-neutral-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/25 transition"
              >
                Instant Buy Now (Razorpay / UPI)
              </button>
            </div>

            {/* Pincode delivery estimator */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter 6-Digit Delivery Pincode"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-xs font-semibold shrink-0"
                >
                  Check
                </button>
              </form>
              {deliveryEstimate && (
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> {deliveryEstimate}
                </p>
              )}
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100 text-center text-[11px] text-neutral-600">
              <div className="flex flex-col items-center gap-1 p-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-semibold text-neutral-900">100% BIS Hallmarked</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <Truck className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-semibold text-neutral-900">Insured Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-semibold text-neutral-900">15-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Section: Specs, Hallmark Assurance, Reviews */}
        <div className="mt-16 sm:mt-24">
          <div className="flex border-b border-amber-200">
            <button
              onClick={() => setActiveTab("specs")}
              className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === "specs"
                  ? "border-[#D4AF37] text-amber-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab("assurance")}
              className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === "assurance"
                  ? "border-[#D4AF37] text-amber-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Purity & Certification
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === "reviews"
                  ? "border-[#D4AF37] text-amber-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          <div className="py-8">
            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCF9F4] p-6 sm:p-8 rounded-3xl border border-amber-100">
                <div className="space-y-3 text-xs">
                  <h4 className="font-serif text-sm font-bold text-neutral-900">Metal & Dimension Details</h4>
                  <div className="flex justify-between py-2 border-b border-amber-200/50">
                    <span className="text-neutral-500">Metal Type</span>
                    <span className="font-semibold text-neutral-900">{product.specifications.metal}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-amber-200/50">
                    <span className="text-neutral-500">Gold Purity</span>
                    <span className="font-semibold text-neutral-900">{product.specifications.purity}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-amber-200/50">
                    <span className="text-neutral-500">Gross Weight</span>
                    <span className="font-semibold text-neutral-900">{product.specifications.grossWeight}</span>
                  </div>
                  {product.specifications.netWeight && (
                    <div className="flex justify-between py-2 border-b border-amber-200/50">
                      <span className="text-neutral-500">Net Weight</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.netWeight}</span>
                    </div>
                  )}
                  {product.specifications.dimensions && (
                    <div className="flex justify-between py-2 border-b border-amber-200/50">
                      <span className="text-neutral-500">Dimensions</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.dimensions}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-xs">
                  <h4 className="font-serif text-sm font-bold text-neutral-900">Diamond & Gemstone Grading</h4>
                  {product.specifications.diamondWeight && (
                    <div className="flex justify-between py-2 border-b border-amber-200/50">
                      <span className="text-neutral-500">Diamond Total Weight</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.diamondWeight}</span>
                    </div>
                  )}
                  {product.specifications.diamondClarity && (
                    <div className="flex justify-between py-2 border-b border-amber-200/50">
                      <span className="text-neutral-500">Diamond Clarity</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.diamondClarity}</span>
                    </div>
                  )}
                  {product.specifications.diamondColor && (
                    <div className="flex justify-between py-2 border-b border-amber-200/50">
                      <span className="text-neutral-500">Diamond Color Grade</span>
                      <span className="font-semibold text-neutral-900">{product.specifications.diamondColor}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-amber-200/50">
                    <span className="text-neutral-500">Govt. Hallmark</span>
                    <span className="font-semibold text-[#B58E22]">{product.specifications.hallmark}</span>
                  </div>
                  {product.specifications.certification && (
                    <div className="flex justify-between py-2 border-b border-amber-200/50">
                      <span className="text-neutral-500">Laboratory Certificate</span>
                      <span className="font-semibold text-[#B58E22]">{product.specifications.certification}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Assurance Tab */}
            {activeTab === "assurance" && (
              <div className="p-6 sm:p-8 bg-[#FCF9F4] rounded-3xl border border-amber-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#D4AF37]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-neutral-900">BIS 916 / 750 Hallmarked</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Every piece of gold jewellery crafted by Siya Jewels carries the 6-digit alphanumeric HUID stamped by Bureau of Indian Standards assaying centers.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#D4AF37]">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-neutral-900">IGI Diamond Card Included</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Each diamond is individually verified for cut, color, clarity, and carat weight by International Gemological Institute (IGI).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#D4AF37]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-neutral-900">Lifetime Plating & Polish</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Enjoy complimentary lifetime professional ultrasonic cleaning, prong inspection, and gold polish at any of our flagship boutiques.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Review Form */}
                <div className="p-6 bg-[#FCF9F4] rounded-3xl border border-amber-100 max-w-2xl">
                  <h4 className="font-serif text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Write a Review
                  </h4>
                  <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Shalini Mehta"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Rating</label>
                      <div className="flex gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setNewReviewRating(s)}
                            className="p-1"
                          >
                            <Star className={`w-5 h-5 ${s <= newReviewRating ? "fill-amber-500" : "text-neutral-300"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Your Feedback & Experience</label>
                      <textarea
                        rows={3}
                        placeholder="Share details of the design, finishing, and packaging..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition"
                    >
                      {isSubmittingReview ? "Submitting..." : "Post Verified Review"}
                    </button>
                  </form>
                </div>

                {/* Existing Reviews List */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl border border-neutral-100 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-xs sm:text-sm text-neutral-900">{rev.userName}</h5>
                          <span className="text-[11px] text-neutral-400">{rev.userCity || "India"} • {rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-amber-100">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B58E22]">
                Complete The Royal Ensemble
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                You May Also Admire
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ring / Bangle Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-200 z-10 space-y-4">
            <h4 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#D4AF37]" /> Jewellery Sizing Guide
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Standard Indian ring sizing (10-18) and bangle sizing (2.4 to 2.8 inner diameter).
            </p>
            <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#FCF9F4] text-neutral-700 font-semibold border-b border-neutral-200">
                  <tr>
                    <th className="p-2.5">Indian Size</th>
                    <th className="p-2.5">Inner Diameter (mm)</th>
                    <th className="p-2.5">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-600">
                  <tr><td className="p-2.5 font-medium">10</td><td className="p-2.5">15.9 mm</td><td className="p-2.5">50.0 mm</td></tr>
                  <tr><td className="p-2.5 font-medium">12</td><td className="p-2.5">16.5 mm</td><td className="p-2.5">51.9 mm</td></tr>
                  <tr><td className="p-2.5 font-medium">14</td><td className="p-2.5">17.2 mm</td><td className="p-2.5">54.0 mm</td></tr>
                  <tr><td className="p-2.5 font-medium">16</td><td className="p-2.5">17.8 mm</td><td className="p-2.5">56.0 mm</td></tr>
                  <tr><td className="p-2.5 font-medium">18</td><td className="p-2.5">18.5 mm</td><td className="p-2.5">58.0 mm</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
