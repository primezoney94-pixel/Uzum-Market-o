import { Star } from "lucide-react";
import { cn } from "@/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export default function StarRating({
  rating,
  size = 14,
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-400">({count} ta sharh)</span>
      )}
    </div>
  );
}
