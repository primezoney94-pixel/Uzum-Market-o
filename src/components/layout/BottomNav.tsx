"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/store";
import { cn } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Bosh sahifa" },
  { href: "/catalog", icon: Grid3X3, label: "Katalog" },
  { href: "/cart", icon: ShoppingCart, label: "Savat", badge: true },
  { href: "/wishlist", icon: Heart, label: "Sevimlilar", badgeWishlist: true },
  { href: "/profile", icon: User, label: "Profil" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-nav pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ href, icon: Icon, label, badge, badgeWishlist }) => {
          const isActive = pathname === href;
          const count = badge ? totalItems : badgeWishlist ? wishlistCount : 0;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 relative min-w-[56px] py-1 touch-feedback"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-primary" : "text-gray-400"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5"
                    >
                      {count > 99 ? "99+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-gray-400"
                )}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
