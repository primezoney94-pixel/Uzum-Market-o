"use client";
import { useRouter } from "next/navigation";
import { Search, Bell, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import Image from "next/image";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showBack?: boolean;
  transparent?: boolean;
  className?: string;
}

export default function Header({
  title,
  showSearch = false,
  transparent = false,
  className,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        transparent ? "bg-transparent" : "bg-white border-b border-gray-100",
        className
      )}
    >
      <div className="px-4 py-3">
        {title ? (
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900 font-display">{title}</h1>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600">
              <Bell size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">U</span>
              </div>
              <span className="font-black text-lg text-gray-900 font-display">UZUM</span>
            </div>

            {/* Location */}
            <button className="flex items-center gap-1 flex-1 text-left overflow-hidden">
              <MapPin size={13} className="text-primary shrink-0" />
              <span className="text-xs text-gray-600 truncate">Toshkent shahri</span>
              <ChevronDown size={12} className="text-gray-400 shrink-0" />
            </button>

            {/* Notification */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 shrink-0 relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        )}

        {showSearch && (
          <button
            onClick={() => router.push("/catalog")}
            className="mt-3 w-full flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-left"
          >
            <Search size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">Mahsulot va kategoriyalarni qidiring...</span>
          </button>
        )}
      </div>
    </header>
  );
}
