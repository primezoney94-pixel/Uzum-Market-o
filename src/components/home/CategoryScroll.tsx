"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { cn } from "@/utils";

interface CategoryScrollProps {
  activeId?: string;
}

export default function CategoryScroll({ activeId }: CategoryScrollProps) {
  return (
    <div className="overflow-x-auto no-scrollbar px-4">
      <div className="flex gap-3 w-max pb-1">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              href={`/catalog?category=${cat.id}`}
              className="flex flex-col items-center gap-1.5 min-w-[64px] touch-feedback"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200",
                  activeId === cat.id
                    ? "shadow-lg scale-105 ring-2"
                    : "shadow-sm"
                )}
                style={{
                  backgroundColor: activeId === cat.id ? cat.color : cat.bgColor,
                  outline: activeId === cat.id ? `2px solid ${cat.color}` : "none",
                }}
              >
                {cat.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-600 text-center leading-tight max-w-[64px] line-clamp-2">
                {cat.nameUz}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
