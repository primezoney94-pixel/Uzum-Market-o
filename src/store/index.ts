"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, WishlistItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

interface UIStore {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, color, size) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              { product, quantity, selectedColor: color, selectedSize: size },
            ],
          }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      isInCart: (productId) => get().items.some((i) => i.product.id === productId),
    }),
    { name: "uzum-cart" }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({
            items: [...state.items, { product, addedAt: new Date() }],
          }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) =>
        get().items.some((i) => i.product.id === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: "uzum-wishlist" }
  )
);

export const useUIStore = create<UIStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  activeCategory: null,
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  sortBy: "popular",
  setSortBy: (sort) => set({ sortBy: sort }),
}));
