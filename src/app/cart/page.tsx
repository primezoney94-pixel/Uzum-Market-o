"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, ShoppingBag, Tag, Truck, ChevronRight, Shield } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import QuantityControl from "@/components/shared/QuantityControl";
import { useCartStore } from "@/store";
import { formatPrice, cn } from "@/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/constants";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25000;
  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal + shippingFee - discount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "UZUM10") {
      const d = Math.round(subtotal * 0.1);
      setPromoDiscount(d);
      setPromoApplied(true);
      toast.success("🎉 Promo kod qo'llandi! 10% chegirma");
    } else {
      toast.error("Noto'g'ri promo kod");
    }
  };

  const handleCheckout = () => {
    toast.success("✅ Buyurtma qabul qilindi!");
    clearCart();
    router.push("/profile");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
          <button onClick={() => router.back()} className="touch-feedback">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 font-display text-lg">Savat</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pb-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl mb-5"
          >
            🛒
          </motion.div>
          <h2 className="font-bold text-gray-800 text-xl mb-2">Savatingiz bo'sh</h2>
          <p className="text-gray-400 text-sm mb-6">Yoqtirgan mahsulotlaringizni savatga qo'shing</p>
          <Link
            href="/catalog"
            className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-primary touch-feedback"
          >
            Xarid qilish
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-36">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="touch-feedback">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-gray-900 font-display text-lg">Savat</h1>
          <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
        </div>
        <button
          onClick={() => { clearCart(); toast("🗑️ Savat tozalandi"); }}
          className="text-xs text-gray-400 font-medium touch-feedback"
        >
          Barchasini o'chirish
        </button>
      </div>

      {/* Shipping progress */}
      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <div className="mx-4 mt-3 bg-blue-50 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={15} className="text-blue-500" />
            <p className="text-xs text-blue-700 font-semibold">
              Bepul yetkazish uchun yana <strong>{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> qoldi
            </p>
          </div>
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <div className="mt-3 space-y-2 px-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="bg-white rounded-2xl p-3 shadow-card"
            >
              <div className="flex gap-3">
                <Link href={`/product/${item.product.id}`} className="shrink-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.nameUz}
                      width={80} height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">{item.product.brand}</p>
                  <Link href={`/product/${item.product.id}`}>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                      {item.product.nameUz}
                    </p>
                  </Link>
                  {(item.selectedColor || item.selectedSize) && (
                    <div className="flex gap-2 mt-1">
                      {item.selectedColor && (
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: item.selectedColor }} />
                      )}
                      {item.selectedSize && (
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                          {item.selectedSize}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-gray-900 text-sm">{formatPrice(item.product.price)}</span>
                    <QuantityControl
                      size="sm"
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                      max={item.product.stock}
                    />
                  </div>
                </div>
                <button
                  onClick={() => { removeItem(item.product.id); toast("🗑️ O'chirildi"); }}
                  className="self-start p-1 touch-feedback"
                >
                  <Trash2 size={15} className="text-gray-300" />
                </button>
              </div>
              {item.quantity > 1 && (
                <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between">
                  <span className="text-xs text-gray-400">{item.quantity} x {formatPrice(item.product.price)}</span>
                  <span className="text-xs font-bold text-gray-800">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Promo */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={16} className="text-primary" />
          <h3 className="font-semibold text-gray-800 text-sm">Promo kod</h3>
        </div>
        <div className="flex gap-2">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="UZUM10 kiriting"
            disabled={promoApplied}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary font-mono uppercase"
          />
          <button
            onClick={handlePromo}
            disabled={promoApplied || !promoCode}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-bold transition-colors touch-feedback",
              promoApplied
                ? "bg-emerald-100 text-emerald-700"
                : promoCode
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-400"
            )}
          >
            {promoApplied ? "✓" : "Qo'llash"}
          </button>
        </div>
        {promoApplied && (
          <p className="text-xs text-emerald-600 font-medium mt-2">🎉 Tejash: {formatPrice(promoDiscount)}</p>
        )}
      </div>

      {/* Order summary */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-card">
        <h3 className="font-bold text-gray-900 mb-3 font-display">Buyurtma xulosasi</h3>
        <div className="space-y-2.5">
          {[
            { label: `Mahsulotlar (${items.length} ta)`, value: formatPrice(subtotal) },
            { label: "Yetkazib berish", value: shippingFee === 0 ? "Bepul 🎉" : formatPrice(shippingFee) },
            ...(discount > 0 ? [{ label: "Promo chegirma", value: `-${formatPrice(discount)}`, green: true }] : []),
          ].map(({ label, value, green }: { label: string; value: string; green?: boolean }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{label}</span>
              <span className={cn("text-sm font-semibold", green ? "text-emerald-600" : "text-gray-800")}>{value}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center">
            <span className="font-bold text-gray-900">Jami</span>
            <span className="text-lg font-black text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Security badges */}
      <div className="mx-4 mt-3 flex items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Shield size={12} className="text-gray-300" />
          Xavfsiz to'lov
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Truck size={12} className="text-gray-300" />
          Tez yetkazish
        </div>
      </div>

      {/* Bottom checkout */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 py-3 shadow-nav">
        <button
          onClick={handleCheckout}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-primary touch-feedback"
        >
          <ShoppingBag size={18} />
          Buyurtma berish — {formatPrice(total)}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
