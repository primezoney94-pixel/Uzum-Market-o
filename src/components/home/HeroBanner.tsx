"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { banners } from "@/data/products";
import { ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[current];

  return (
    <div className="relative mx-4 rounded-3xl overflow-hidden h-44 shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${banner.bgColor}, ${banner.bgColor}cc)` }}
        >
          <Image
            src={banner.image}
            alt={banner.titleUz}
            fill
            className="object-cover mix-blend-overlay opacity-40"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-xs font-medium mb-1"
            >
              {banner.subtitleUz}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white text-2xl font-black font-display leading-tight mb-3"
            >
              {banner.titleUz}
            </motion.h2>
            <Link
              href={banner.link}
              className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit border border-white/30"
            >
              Ko'rish <ChevronRight size={12} />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
