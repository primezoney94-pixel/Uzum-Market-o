"use client";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantityControlProps) {
  const sizes = {
    sm: { btn: "w-6 h-6", icon: 12, text: "text-xs", gap: "gap-1" },
    md: { btn: "w-8 h-8", icon: 14, text: "text-sm", gap: "gap-2" },
    lg: { btn: "w-10 h-10", icon: 16, text: "text-base", gap: "gap-3" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={cn(
          s.btn,
          "rounded-full flex items-center justify-center transition-all touch-feedback",
          quantity <= min
            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
            : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
        )}
      >
        <Minus size={s.icon} strokeWidth={2.5} />
      </button>

      <motion.span
        key={quantity}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn("font-bold text-gray-900 min-w-[24px] text-center tabular-nums", s.text)}
      >
        {quantity}
      </motion.span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={cn(
          s.btn,
          "rounded-full flex items-center justify-center transition-all touch-feedback",
          quantity >= max
            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/90 shadow-sm"
        )}
      >
        <Plus size={s.icon} strokeWidth={2.5} />
      </button>
    </div>
  );
}
