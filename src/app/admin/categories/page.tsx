"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Layers, 
  Image as ImageIcon 
} from "lucide-react";
import { getCategoriesAdmin, saveCategory, deleteCategory, CategoryItem } from "@/lib/firestoreService";
import { useToast } from "@/context/ToastContext";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [itemCount, setItemCount] = useState(25);

  const toast = useToast();

  const loadCategories = async () => {
    setLoading(true);
    const data = await getCategoriesAdmin();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800");
    setItemCount(20);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setImage(cat.image);
    setItemCount(cat.itemCount);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image.trim()) {
      toast.error("Please fill in category name and image URL.");
      return;
    }

    const slug = editingCategory?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newCat: CategoryItem = {
      name: name.trim(),
      slug,
      description: description.trim() || `${name} luxury fine jewellery collection`,
      image: image.trim(),
      itemCount: Number(itemCount),
    };

    await saveCategory(newCat);
    toast.success(editingCategory ? "Category Updated" : "Category Created", newCat.name);
    setIsModalOpen(false);
    loadCategories();
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(slug);
      toast.success("Category Deleted");
      loadCategories();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
            Atelier Navigation
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Category Management ({categories.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-4 text-center py-16 text-xs text-neutral-400">
            Loading categories...
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-xs flex flex-col justify-between group hover:border-[#D4AF37] transition"
            >
              <div className="relative aspect-[4/3] w-full bg-neutral-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cat.itemCount}+ Pieces
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-neutral-400">/{cat.slug}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-50 transition"
                      title="Edit Category"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.slug)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D4AF37]" />
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Solitaires"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Certified GIA & IGI diamond marvels"
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Initial Piece Count
                </label>
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FCF9F4] rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
