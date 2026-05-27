"use client";
import { useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck,
  Shield, RotateCcw, ChevronRight, ChevronDown, Store, Zap
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import StarRating from "@/components/shared/StarRating";
import QuantityControl from "@/components/shared/QuantityControl";
import ProductCard from "@/components/product/ProductCard";
import { getProductById, products } from "@/data/products";
import { useCartStore, useWishlistStore } from "@/store";
import { formatPrice, getDeliveryText, cn } from "@/utils";
import toast from "react-hot-toast";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  const { addItem: addToCart, isInCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <span className="text-5xl mb-4">😕</span>
        <p className="font-bold text-gray-800 text-lg">Mahsulot topilmadi</p>
        <button onClick={() => router.back()} className="mt-4 text-primary font-semibold text-sm">
          Orqaga qaytish
        </button>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 6);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success("🛒 Savatga qo'shildi!");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* Floating header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 pt-4 pb-2 bg-gradient-to-b from-black/30 to-transparent pointer-events-none">
        <button
          onClick={() => router.back()}
          className="pointer-events-auto w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md touch-feedback"
        >
          <ArrowLeft size={18} className="text-gray-800" />
        </button>
        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={() => { toggleItem(product); toast(inWishlist ? "Olib tashlandi" : "❤️ Qo'shildi"); }}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md touch-feedback"
          >
            <Heart size={17} className={inWishlist ? "fill-red-500 text-red-500" : "text-gray-700"} />
          </button>
          <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md touch-feedback">
            <Share2 size={17} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="relative bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full aspect-square"
          >
            <Image
              src={product.images[activeImage]}
              alt={product.nameUz}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Image thumbs */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "rounded-full transition-all",
                  i === activeImage ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-gray-300"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumb strip */}
      {product.images.length > 1 && (
        <div className="flex gap-2 px-4 py-2 bg-white border-b border-gray-100">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                "w-14 h-14 rounded-xl overflow-hidden border-2 transition-colors shrink-0",
                i === activeImage ? "border-primary" : "border-transparent"
              )}
            >
              <Image src={img} alt="" width={56} height={56} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}

      {/* Info card */}
      <div className="bg-white mx-0 mt-2 px-4 py-4">
        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-2">
          {product.isNew && (
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">🆕 YANGI</span>
          )}
          {product.freeShipping && (
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">🚚 Bepul yetkazish</span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="bg-red-100 text-primary text-xs font-bold px-2 py-0.5 rounded-full">🔥 -{product.discount}% chegirma</span>
          )}
        </div>

        <h1 className="text-lg font-bold text-gray-900 font-display leading-snug mb-2">{product.nameUz}</h1>

        <StarRating rating={product.rating} showCount count={product.reviewCount} className="mb-3" />

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">Rang tanlang</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-9 h-9 rounded-full border-4 transition-all touch-feedback",
                    selectedColor === color ? "border-primary scale-110 shadow-md" : "border-gray-200"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">O'lcham</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl border-2 text-sm font-semibold transition-all touch-feedback",
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 text-gray-700"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-800">Miqdor</span>
          <div className="flex items-center gap-1">
            <QuantityControl
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
              max={product.stock}
            />
            <span className="text-xs text-gray-400 ml-2">({product.stock} mavjud)</span>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3 mb-4">
          <Truck size={18} className="text-blue-500 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-800">{getDeliveryText(product.deliveryDays)}</p>
            <p className="text-xs text-gray-400">Toshkent bo'ylab</p>
          </div>
        </div>

        {/* Guarantees */}
        <div className="flex gap-3 mb-2">
          {[
            { icon: Shield, label: "Kafolat", sub: "12 oy" },
            { icon: RotateCcw, label: "Qaytarish", sub: "14 kun" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex-1 bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
              <Icon size={16} className="text-primary" />
              <div>
                <p className="text-xs font-bold text-gray-800">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seller */}
      <div className="bg-white mt-2 px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
          <Store size={18} className="text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-gray-800 text-sm truncate">{product.seller.name}</p>
            {product.seller.isOfficial && (
              <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold shrink-0">Rasmiy</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-500">{product.seller.rating} · {product.seller.location}</span>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-400 shrink-0" />
      </div>

      {/* Tabs */}
      <div className="bg-white mt-2">
        <div className="flex border-b border-gray-100">
          {(["desc", "specs", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 text-xs font-semibold transition-colors",
                activeTab === tab ? "text-primary border-b-2 border-primary" : "text-gray-400"
              )}
            >
              {tab === "desc" ? "Tavsif" : tab === "specs" ? "Xususiyatlar" : `Sharhlar (${product.reviewCount})`}
            </button>
          ))}
        </div>

        <div className="px-4 py-4">
          {activeTab === "desc" && (
            <div>
              <p className={cn("text-sm text-gray-600 leading-relaxed", !showFullDesc && "line-clamp-4")}>
                {product.descriptionUz}
              </p>
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="flex items-center gap-1 text-primary text-sm font-semibold mt-2"
              >
                {showFullDesc ? "Yig'ish" : "Ko'proq o'qish"}
                <ChevronDown size={14} className={cn("transition-transform", showFullDesc && "rotate-180")} />
              </button>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500 font-medium">{key}</span>
                  <span className="text-xs text-gray-800 font-semibold text-right max-w-[55%]">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {product.reviewCount === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl block mb-2">💬</span>
                  <p className="text-sm text-gray-500">Hali sharh yo'q</p>
                  <p className="text-xs text-gray-400 mt-1">Birinchi bo'lib sharh qoldiring!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                    <span className="text-3xl font-black text-amber-500">{product.rating}</span>
                    <div>
                      <StarRating rating={product.rating} size={14} />
                      <p className="text-xs text-gray-500 mt-0.5">{product.reviewCount} ta sharh asosida</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-2 bg-white py-4">
          <h3 className="font-bold text-gray-900 px-4 mb-3 font-display">O'xshash mahsulotlar</h3>
          <div className="overflow-x-auto no-scrollbar px-4">
            <div className="flex gap-3 w-max">
              {relatedProducts.map((p) => (
                <div key={p.id} className="w-40">
                  <ProductCard product={p} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 py-3 shadow-nav">
        <div className="flex items-center gap-3">
          <div className="text-right shrink-0">
            <div className="text-[10px] text-gray-400">Jami</div>
            <div className="text-sm font-black text-gray-900">{formatPrice(product.price * quantity)}</div>
          </div>
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 touch-feedback",
              inCart ? "border-2 border-primary text-primary" : "bg-primary/10 text-primary"
            )}
          >
            <ShoppingCart size={16} />
            {inCart ? "Savatda bor" : "Savatga"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-primary touch-feedback"
          >
            <Zap size={16} />
            Sotib olish
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
