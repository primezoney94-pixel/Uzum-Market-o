"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { useCartStore, useWishlistStore } from "@/store";
import { formatPrice, cn } from "@/utils";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  className?: string;
  compact?: boolean;
}

export default function ProductCard({ product, className, compact = false }: ProductCardProps) {
  const { addItem: addToCart, isInCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast(
      inWishlist ? "Sevimlilardan olib tashlandi" : "❤️ Sevimlilarga qo'shildi",
      { icon: inWishlist ? "🗑️" : undefined }
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("🛒 Savatga qo'shildi!");
  };

  return (
    <Link href={`/product/${product.id}`} className={cn("block", className)}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200"
      >
        {/* Image */}
        <div className="relative bg-gray-50 aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.nameUz}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && product.discount > 0 && (
              <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                YANGI
              </span>
            )}
            {product.freeShipping && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                <Truck size={8} />
                BEPUL
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm touch-feedback"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={inWishlist ? "filled" : "empty"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Heart
                  size={15}
                  className={cn(
                    "transition-colors",
                    inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </button>

          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg text-center backdrop-blur-sm">
                <Zap size={9} className="inline mr-0.5" />
                Faqat {product.stock} ta qoldi!
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className={cn("p-2.5", compact ? "p-2" : "p-3")}>
          {/* Price */}
          <div className="mb-1">
            <div className="font-bold text-gray-900 text-sm leading-tight">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through leading-tight">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Name */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-tight mb-2">
            {product.nameUz}
          </p>

          {/* Rating */}
          {!compact && (
            <div className="flex items-center gap-1 mb-2">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
              {product.reviewCount > 0 && (
                <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
              )}
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200 touch-feedback flex items-center justify-center gap-1",
              inCart
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-primary text-white shadow-primary/30 shadow-sm"
            )}
          >
            <ShoppingCart size={12} />
            {inCart ? "Savatda bor" : "Savatga"}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
