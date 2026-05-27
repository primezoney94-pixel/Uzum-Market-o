"use client";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryScroll from "@/components/home/CategoryScroll";
import ProductCard from "@/components/product/ProductCard";
import SearchBar from "@/components/shared/SearchBar";
import { products, getFeaturedProducts, getNewProducts } from "@/data/products";
import { useRouter } from "next/navigation";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const router = useRouter();
  const featured = getFeaturedProducts();
  const newProducts = getNewProducts();
  const discountProducts = products.filter((p) => p.discount && p.discount >= 20);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showSearch={false} />

      {/* Search */}
      <div className="px-4 py-3">
        <SearchBar onSearch={(q) => router.push(`/catalog?q=${encodeURIComponent(q)}`)} />
      </div>

      {/* Banner */}
      <HeroBanner />

      {/* Categories */}
      <section className="mt-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-gray-900 font-display">Kategoriyalar</h2>
          <Link href="/catalog" className="text-xs text-primary font-semibold flex items-center gap-0.5">
            Barchasi <ChevronRight size={13} />
          </Link>
        </div>
        <CategoryScroll />
      </section>

      {/* Flash Sale */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Flame size={14} className="text-white" />
            </div>
            <h2 className="font-bold text-gray-900 font-display">Flash Sale</h2>
          </div>
          <Link href="/catalog?sort=discount" className="text-xs text-primary font-semibold flex items-center gap-0.5">
            Ko'rish <ChevronRight size={13} />
          </Link>
        </div>
        <div className="overflow-x-auto no-scrollbar px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex gap-3 w-max"
          >
            {discountProducts.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="w-40">
                <ProductCard product={p} compact />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
            <h2 className="font-bold text-gray-900 font-display">Tavsiya etiladi</h2>
          </div>
          <Link href="/catalog?sort=popular" className="text-xs text-primary font-semibold flex items-center gap-0.5">
            Hammasi <ChevronRight size={13} />
          </Link>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 px-4"
        >
          {featured.map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* New arrivals */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <h2 className="font-bold text-gray-900 font-display">Yangi keldi</h2>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex gap-3 w-max"
          >
            {newProducts.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="w-40">
                <ProductCard product={p} compact />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All products grid */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-bold text-gray-900 font-display">Barcha mahsulotlar</h2>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 px-4"
        >
          {products.slice(0, 8).map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
        <div className="px-4 mt-4">
          <Link
            href="/catalog"
            className="block w-full py-3 text-center bg-white border-2 border-primary text-primary font-bold rounded-2xl text-sm touch-feedback"
          >
            Barchasini ko'rish ({products.length}+ mahsulot)
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-4 mt-6 mb-2 bg-white rounded-2xl p-4 shadow-card">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "🚚", title: "Tez yetkazish", sub: "1-2 kun ichida" },
            { icon: "🔒", title: "Xavfsiz to'lov", sub: "100% kafolat" },
            { icon: "↩️", title: "Qaytarish", sub: "14 kun ichida" },
          ].map((b) => (
            <div key={b.title} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-xs font-bold text-gray-800">{b.title}</span>
              <span className="text-[10px] text-gray-400">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
