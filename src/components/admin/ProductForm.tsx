"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Gem, 
  Upload, 
  Trash2, 
  Plus, 
  Check, 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Image as ImageIcon 
} from "lucide-react";
import { Product, JewelleryCategory, MetalType, GoldPurity } from "@/types/product";
import { saveProduct } from "@/lib/firestoreService";
import { useToast } from "@/context/ToastContext";

interface ProductFormProps {
  initialProduct?: Product;
  isEditing?: boolean;
}

const CATEGORIES: JewelleryCategory[] = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Chains",
  "Solitaires",
  "Bridal",
];

const METALS: MetalType[] = [
  "Yellow Gold",
  "Rose Gold",
  "White Gold",
  "Platinum",
  "Sterling Silver",
];

const PURITIES: GoldPurity[] = [
  "22K (91.6%)",
  "18K (75.0%)",
  "24K (99.9%)",
  "14K (58.5%)",
  "950 Platinum",
];

const LUXURY_PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
  "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000",
  "https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000",
];

export function ProductForm({ initialProduct, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const toast = useToast();

  const [title, setTitle] = useState(initialProduct?.title || "");
  const [subtitle, setSubtitle] = useState(initialProduct?.subtitle || "");
  const [sku, setSku] = useState(initialProduct?.id || `SJ-${Date.now().toString().slice(-6)}`);
  const [category, setCategory] = useState<JewelleryCategory>(initialProduct?.category || "Rings");
  const [material, setMaterial] = useState<MetalType>(initialProduct?.material || "Yellow Gold");
  const [purity, setPurity] = useState<GoldPurity>(initialProduct?.purity || "22K (91.6%)");
  const [grossWeight, setGrossWeight] = useState(initialProduct?.specifications?.grossWeight || "5.50 gm");
  const [netWeight, setNetWeight] = useState(initialProduct?.specifications?.netWeight || "");
  const [price, setPrice] = useState<number>(initialProduct?.price || 45000);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(initialProduct?.originalPrice);
  const [makingCharges, setMakingCharges] = useState<number>(initialProduct?.makingCharges || 3500);
  const [stock, setStock] = useState<number>(initialProduct?.stock || 10);
  const [inStock, setInStock] = useState<boolean>(initialProduct?.inStock ?? true);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProduct?.isFeatured || false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(initialProduct?.isNewArrival || true);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(initialProduct?.isBestSeller || false);
  const [description, setDescription] = useState(initialProduct?.description || "");
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription || "");
  const [sizesInput, setSizesInput] = useState<string>(initialProduct?.sizes ? initialProduct.sizes.join(", ") : "12, 14, 16");

  // Specifications
  const [diamondWeight, setDiamondWeight] = useState(initialProduct?.specifications?.diamondWeight || "");
  const [diamondClarity, setDiamondClarity] = useState(initialProduct?.specifications?.diamondClarity || "VVS-VS");
  const [diamondColor, setDiamondColor] = useState(initialProduct?.specifications?.diamondColor || "E-F");
  const [hallmark, setHallmark] = useState(initialProduct?.specifications?.hallmark || "BIS Hallmark 916");
  const [certification, setCertification] = useState(initialProduct?.specifications?.certification || "IGI Certified");

  // Images list
  const [images, setImages] = useState<string[]>(
    initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : [LUXURY_PRESET_IMAGES[0]]
  );
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add custom URL image
  const handleAddImageUrl = () => {
    if (!customImageUrl.trim()) return;
    setImages((prev) => [...prev, customImageUrl.trim()]);
    setCustomImageUrl("");
  };

  // Add sample preset image
  const handleAddPresetImage = (url: string) => {
    if (!images.includes(url)) {
      setImages((prev) => [...prev, url]);
      toast.success("Image added to gallery");
    }
  };

  // Upload local image via file reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
    toast.success("Image file(s) loaded");
  };

  // Reorder / remove images
  const handleRemoveImage = (index: number) => {
    if (images.length === 1) {
      toast.error("At least one product image is required.");
      return;
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetCoverImage = (index: number) => {
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    setImages([selected, ...rest]);
    toast.info("Cover image set");
  };

  // Discount calculation
  const discountPercentage =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || images.length === 0) {
      toast.error("Please fill in mandatory fields and provide at least one image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const sizes = sizesInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const productData: Product = {
        id: initialProduct?.id || sku.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        title: title.trim(),
        subtitle: subtitle.trim() || `${purity} • ${material}`,
        slug,
        category,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        discountPercentage,
        images,
        description: description.trim() || `${title} handcrafted in ${purity} ${material}. Certified with ${hallmark}.`,
        shortDescription: shortDescription.trim() || `Certified ${purity} ${material} piece.`,
        material,
        purity,
        weight: grossWeight,
        stock: Number(stock),
        inStock,
        isBestSeller,
        isNewArrival,
        isFeatured,
        rating: initialProduct?.rating || 5.0,
        reviewsCount: initialProduct?.reviewsCount || 1,
        tags: [category.toLowerCase(), material.toLowerCase().replace(" ", "-"), "hallmarked"],
        sizes: sizes.length > 0 ? sizes : undefined,
        specifications: {
          metal: material,
          purity,
          grossWeight,
          netWeight: netWeight || grossWeight,
          diamondWeight: diamondWeight || undefined,
          diamondClarity: diamondWeight ? diamondClarity : undefined,
          diamondColor: diamondWeight ? diamondColor : undefined,
          hallmark,
          certification,
        },
        makingCharges: Number(makingCharges),
        gstRate: 0.03,
        createdAt: initialProduct?.createdAt || new Date().toISOString(),
      };

      await saveProduct(productData);
      toast.success(
        isEditing ? "Product Updated" : "Product Created",
        `${productData.title} saved to catalog.`
      );
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Error saving product", "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-amber-200/70">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products List</span>
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>{isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Publish Product"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Basic Product Information
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aura of Solitaire Diamond Ring"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Subtitle / Highlight Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Solitaire Cut • 18K Yellow Gold"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">SKU / Code *</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JewelleryCategory)}
                    className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    min={0}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metal, Purity & Specifications */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Purity, Metal & Karigari Specs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Metal Type</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as MetalType)}
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                >
                  {METALS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Purity Grade</label>
                <select
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as GoldPurity)}
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                >
                  {PURITIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Gross Weight *</label>
                <input
                  type="text"
                  value={grossWeight}
                  onChange={(e) => setGrossWeight(e.target.value)}
                  placeholder="e.g. 8.45 gm"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Net Gold Weight</label>
                <input
                  type="text"
                  value={netWeight}
                  onChange={(e) => setNetWeight(e.target.value)}
                  placeholder="e.g. 7.90 gm"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Govt. Hallmark</label>
                <input
                  type="text"
                  value={hallmark}
                  onChange={(e) => setHallmark(e.target.value)}
                  placeholder="BIS Hallmark 916"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Diamond / Gemstone Info</label>
                <input
                  type="text"
                  value={diamondWeight}
                  onChange={(e) => setDiamondWeight(e.target.value)}
                  placeholder="e.g. 0.65 ct VVS Solitaire (Optional)"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Discounts */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Pricing & Making Charges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Sale Price (₹) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs font-bold text-neutral-900 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Original Price / MRP (₹)
                </label>
                <input
                  type="number"
                  value={originalPrice || ""}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 52000"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
                {discountPercentage !== undefined && discountPercentage > 0 && (
                  <span className="text-[10px] text-rose-600 font-bold mt-1 block">
                    ✨ {discountPercentage}% OFF badge will display
                  </span>
                )}
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Making Charges (₹)
                </label>
                <input
                  type="number"
                  value={makingCharges}
                  onChange={(e) => setMakingCharges(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Description & Sizes */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Description & Available Sizes
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Full Story & Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of craftsmanship, inspiration, and gemstone radiance..."
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Available Sizes (Comma separated)
                </label>
                <input
                  type="text"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="e.g. 10, 12, 14, 16, 18 or 2.4, 2.6, 2.8"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Form: Multi-Image Upload & Toggles (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Upload Gallery */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-neutral-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" /> Product Images ({images.length})
              </h3>
              <span className="text-[10px] text-neutral-400">First is Cover</span>
            </div>

            {/* Gallery Previews */}
            <div className="grid grid-cols-2 gap-2.5">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-neutral-50 group ${
                    idx === 0 ? "border-[#D4AF37] ring-2 ring-amber-300/50" : "border-neutral-200"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="120px" className="object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-[#171510] text-[#D4AF37] text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs">
                      Cover
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetCoverImage(idx)}
                        className="p-1 rounded bg-[#D4AF37] text-black text-[10px] font-bold"
                        title="Set as Cover"
                      >
                        Set Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 rounded bg-rose-600 text-white"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* File Upload Button */}
            <div>
              <label className="w-full py-2.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 hover:bg-amber-100/50 text-amber-900 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition">
                <Upload className="w-4 h-4 text-[#D4AF37]" />
                <span>Upload From Computer</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Custom URL Input */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-100">
              <label className="block text-[11px] font-semibold text-neutral-600">Or Paste Image URL</label>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  placeholder="https://..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-[#FCF9F4] rounded-lg border border-neutral-300 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Presets Quick Picker */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-100">
              <label className="block text-[11px] font-semibold text-neutral-600">
                Quick Luxury Presets
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {LUXURY_PRESET_IMAGES.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAddPresetImage(preset)}
                    className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-300 shrink-0 hover:border-[#D4AF37]"
                  >
                    <Image src={preset} alt="" fill sizes="40px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visibility & Badges Toggles */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Visibility & Section Placement
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-amber-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-neutral-900 block">Active in Storefront</span>
                  <span className="text-[11px] text-neutral-500">Visible for customer purchasing</span>
                </div>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-amber-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-neutral-900 block">Featured on Homepage</span>
                  <span className="text-[11px] text-neutral-500">Spotlight in Featured Showcase</span>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-amber-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-neutral-900 block">New Arrival Badge</span>
                  <span className="text-[11px] text-neutral-500">Show &ldquo;New Arrival&rdquo; gold ribbon</span>
                </div>
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-amber-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-neutral-900 block">Best Seller Badge</span>
                  <span className="text-[11px] text-neutral-500">Mark as trending connoisseur pick</span>
                </div>
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
