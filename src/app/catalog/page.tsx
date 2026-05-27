"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/Skeletons";
import { products, categories, getSortedProducts, searchProducts, getProductsByCategory } from "@/data/products";
import { SORT_OPTIONS } from "@/constants";
import { formatPrice, cn } from "@/utils";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const categoryId = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "popular";

  const [searchQuery, setSearchQuery] = useState(q);
  const [activeSort, setActiveSort] = useState(sortParam);
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000000);
  const [minRating, setMinRating] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const activeCategory = categories.find((c) => c.id === categoryId);

  const filteredProducts = useMemo(() => {
    let list = q ? searchProducts(q) : categoryId ? getProductsByCategory(categoryId) : [...products];
    if (searchQuery && searchQuery !== q) {
      list = searchProducts(searchQuery);
    }
    if (minPrice > 0) list = list.filter((p) => p.price >= minPrice);
    if (maxPrice < 20000000) list = list.filter((p) => p.price <= maxPrice);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (freeShipping) list = list.filter((p) => p.freeShipping);
    if (inStock) list = list.filter((p) => p.stock > 0);
    return getSortedProducts(list, activeSort);
  }, [q, categoryId, searchQuery, activeSort, minPrice, maxPrice, minRating, freeShipping, inStock]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/catalog?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 py-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}><X size={14} className="text-gray-400" /></button>
            )}
          </form>
        </div>

        {/* Sort & Filter bar */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 shrink-0 touch-feedback"
          >
            <SlidersHorizontal size={13} /> Filtr
          </button>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveSort(opt.value)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 touch-feedback whitespace-nowrap transition-colors",
                activeSort === opt.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {opt.labelUz}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900 font-display text-base">
            {activeCategory ? activeCategory.nameUz : q ? `"${q}" natijalari` : "Barcha mahsulotlar"}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{filteredProducts.length} ta mahsulot topildi</p>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 px-4">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <span className="text-6xl mb-4">🔍</span>
          <h2 className="font-bold text-gray-800 text-lg mb-2">Mahsulot topilmadi</h2>
          <p className="text-gray-400 text-sm">Boshqa kalit so'z bilan qidiring</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-3 px-4"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Filter Drawer */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setShowFilter(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">Filtrlar</h3>
                  <button onClick={() => setShowFilter(false)}>
                    <X size={22} className="text-gray-500" />
                  </button>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">Narx oralig'i</h4>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Dan (UZS)</label>
                      <input
                        type="number"
                        value={minPrice || ""}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        placeholder="0"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Gacha (UZS)</label>
                      <input
                        type="number"
                        value={maxPrice === 20000000 ? "" : maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value) || 20000000)}
                        placeholder="20,000,000"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">Minimal reyting</h4>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors touch-feedback",
                          minRating === r ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-600 border-gray-200"
                        )}
                      >
                        {r === 0 ? "Barchasi" : `${r}★+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Bepul yetkazib berish", state: freeShipping, set: setFreeShipping },
                    { label: "Mavjud mahsulotlar", state: inStock, set: setInStock },
                  ].map(({ label, state, set }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 font-medium">{label}</span>
                      <button
                        onClick={() => set(!state)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative",
                          state ? "bg-primary" : "bg-gray-200"
                        )}
                      >
                        <div className={cn(
                          "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all",
                          state ? "left-6" : "left-0.5"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setMinPrice(0); setMaxPrice(20000000); setMinRating(0); setFreeShipping(false); setInStock(false); }}
                    className="flex-1 py-3 border-2 border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 touch-feedback"
                  >
                    Tozalash
                  </button>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="flex-1 py-3 bg-primary text-white rounded-2xl text-sm font-semibold shadow-primary touch-feedback"
                  >
                    Qo'llash
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CatalogContent />
    </Suspense>
  );
}
