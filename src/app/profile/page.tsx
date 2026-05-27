"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Package, Heart, MapPin, CreditCard, Bell, HelpCircle,
  ChevronRight, Star, LogOut, Shield, Phone, Gift, Settings,
  Edit2, Camera
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { useCartStore, useWishlistStore } from "@/store";
import { formatPrice, cn } from "@/utils";
import { ORDER_STATUSES } from "@/constants";

const mockOrders = [
  { id: "ORD-001", productName: "Samsung Galaxy A55 5G", price: 4850000, status: "shipped", date: "25 May 2025", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100" },
  { id: "ORD-002", productName: "Sony WH-1000XM5 quloqchinlar", price: 3200000, status: "delivered", date: "20 May 2025", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
  { id: "ORD-003", productName: "Nike Air Max 270", price: 850000, status: "confirmed", date: "27 May 2025", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" },
];

const statusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

const menuItems = [
  { icon: Package, label: "Buyurtmalarim", badge: "3", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Heart, label: "Sevimlilar", color: "text-red-500", bg: "bg-red-50" },
  { icon: MapPin, label: "Manzillarim", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: CreditCard, label: "To'lov usullari", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Gift, label: "Kuponlar va chegirmalar", badge: "2", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Bell, label: "Bildirishnomalar", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: Shield, label: "Xavfsizlik", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: HelpCircle, label: "Yordam markazi", color: "text-gray-500", bg: "bg-gray-50" },
  { icon: Settings, label: "Sozlamalar", color: "text-gray-500", bg: "bg-gray-50" },
];

export default function ProfilePage() {
  const [isLoggedIn] = useState(true);
  const totalCartItems = useCartStore((s) => s.getTotalItems());
  const totalWishlist = useWishlistStore((s) => s.items.length);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <h1 className="font-bold text-gray-900 font-display text-lg">Profil</h1>
        <button className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center">
          <Settings size={18} className="text-gray-500" />
        </button>
      </div>

      {/* User card */}
      <div className="mx-4 mt-4 bg-gradient-to-br from-primary to-red-700 rounded-3xl p-5 shadow-primary">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <User size={28} className="text-white" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <Camera size={12} className="text-primary" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="font-bold text-white text-base font-display">Akbar Toshmatov</h2>
              <button>
                <Edit2 size={13} className="text-white/60" />
              </button>
            </div>
            <p className="text-white/70 text-xs">+998 90 123 45 67</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} className="fill-amber-300 text-amber-300" />
              <span className="text-white/80 text-xs font-medium">Gold a'zo</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-4">
          {[
            { label: "Buyurtmalar", value: "12" },
            { label: "Savat", value: String(totalCartItems) },
            { label: "Sevimlilar", value: String(totalWishlist) },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 bg-white/15 rounded-2xl p-2.5 text-center backdrop-blur-sm">
              <div className="font-black text-white text-lg leading-none">{value}</div>
              <div className="text-white/60 text-[10px] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active orders */}
      <div className="mx-4 mt-4">
        <h3 className="font-bold text-gray-900 font-display mb-3">So'nggi buyurtmalar</h3>
        <div className="space-y-2">
          {mockOrders.map((order) => (
            <motion.div
              key={order.id}
              whileTap={{ scale: 0.99 }}
              className="bg-white rounded-2xl p-3 shadow-card flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <img src={order.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{order.productName}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.id} · {order.date}</p>
                <p className="text-xs font-bold text-gray-900 mt-0.5">{formatPrice(order.price)}</p>
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-full shrink-0",
                statusColors[order.status]
              )}>
                {ORDER_STATUSES[order.status]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promo banner */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-3xl">🎁</span>
        <div className="flex-1">
          <p className="font-bold text-white text-sm">Do'stlarni taklif qiling!</p>
          <p className="text-white/80 text-xs mt-0.5">Har bir do'st uchun 50,000 UZS bonus</p>
        </div>
        <ChevronRight size={16} className="text-white/70" />
      </div>

      {/* Menu */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-card overflow-hidden">
        {menuItems.map(({ icon: Icon, label, badge, color, bg }, i) => (
          <motion.button
            key={label}
            whileTap={{ backgroundColor: "#f9fafb" }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3.5 touch-feedback",
              i < menuItems.length - 1 && "border-b border-gray-50"
            )}
          >
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", bg)}>
              <Icon size={16} className={color} />
            </div>
            <span className="flex-1 text-sm font-medium text-gray-800 text-left">{label}</span>
            {badge && (
              <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1">
                {badge}
              </span>
            )}
            <ChevronRight size={15} className="text-gray-300" />
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-3 mb-2">
        <button className="w-full py-3.5 bg-red-50 text-red-500 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 touch-feedback border border-red-100">
          <LogOut size={16} />
          Chiqish
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-300 pb-4">Uzum Market v1.0.0 · © 2025</p>

      <BottomNav />
    </div>
  );
}
