"use client";
import { useState, useRef } from "react";
import { Search, X, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

const POPULAR_SEARCHES = [
  "iPhone 15", "Samsung Galaxy", "Nike krossovka", "Qalam", "Noutbuk",
  "Telfon qopqog'i", "Simsiz quloqchin", "Parfyum",
];

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder, className, autoFocus, onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/catalog?q=${encodeURIComponent(query)}`);
    }
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(value);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-2 bg-gray-50 border rounded-2xl px-4 py-3 transition-all duration-200",
          focused ? "border-primary bg-white shadow-sm" : "border-gray-200"
        )}
      >
        <Search size={17} className={cn("transition-colors", focused ? "text-primary" : "text-gray-400")} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Mahsulot va kategoriyalarni qidiring..."}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
        {value ? (
          <button onClick={() => setValue("")} className="text-gray-400 touch-feedback">
            <X size={15} />
          </button>
        ) : (
          <button className="text-gray-400 touch-feedback">
            <Mic size={15} />
          </button>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-400 mb-2 px-1">Mashhur qidiruvlar</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onMouseDown={() => { setValue(s); handleSearch(s); }}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium hover:bg-primary hover:text-white transition-colors touch-feedback"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
