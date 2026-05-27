import { cn } from "@/utils";

export function ProductCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card">
      <div className={cn("skeleton aspect-square")} />
      <div className={cn("p-3", compact && "p-2")}>
        <div className="skeleton h-4 w-3/4 rounded-md mb-1" />
        <div className="skeleton h-3 w-full rounded-md mb-1" />
        <div className="skeleton h-3 w-2/3 rounded-md mb-2" />
        <div className="skeleton h-8 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function BannerSkeleton() {
  return <div className="skeleton w-full h-40 rounded-2xl" />;
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="skeleton w-14 h-14 rounded-2xl" />
      <div className="skeleton h-3 w-12 rounded-md" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="skeleton aspect-square w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-6 w-3/4 rounded-lg" />
        <div className="skeleton h-5 w-1/2 rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-2/3 rounded-lg" />
      </div>
    </div>
  );
}
