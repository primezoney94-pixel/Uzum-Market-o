"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Trash2, ShoppingCart } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/product/ProductCard";
import { useWishlistStore, useCartStore } from "@/store";
import { formatPrice } from "@/utils";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
          <button onClick={() => router.back()} className="touch-feedback">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 font-display text-lg">Sevimlilar</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl mb-5"
          >
            💝
          </motion.div>
          <h2 className="font-bold text-gray-800 text-xl mb-2">Sevimlilar ro'yxati bo'sh</h2>
          <p className="text-gray-400 text-sm mb-6">Yoqtirgan mahsulotlaringizni yurakcha belgisi orqali saqlang</p>
          <Link
            href="/catalog"
            className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-primary touch-feedback"
          >
            Mahsulotlarni ko'rish
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="touch-feedback">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 font-display text-lg">Sevimlilar</h1>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
        </div>
        <button
          onClick={() => { clearWishlist(); toast("🗑️ Sevimlilar tozalandi"); }}
          className="text-xs text-gray-400 font-medium touch-feedback"
        >
          Barchasini o'chirish
        </button>
      </div>

      {/* Add all to cart */}
      <div className="px-4 py-3">
        <button
          onClick={() => {
            items.forEach((i) => addToCart(i.product));
            toast.success(`🛒 ${items.length} ta mahsulot savatga qo'shildi!`);
          }}
          className="w-full py-3 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-primary touch-feedback"
        >
          <ShoppingCart size={16} />
          Barchasini savatga qo'shish ({items.length} ta)
        </button>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 px-4"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        <AnimatePresence>
          {items.map(({ product }) => (
            <motion.div
              key={product.id}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <BottomNav />
    </div>
  );
}
