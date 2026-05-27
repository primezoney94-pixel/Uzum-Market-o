export interface Product {
  id: string;
  name: string;
  nameUz: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categoryId: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  description: string;
  descriptionUz: string;
  specifications: Record<string, string>;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  freeShipping: boolean;
  deliveryDays: number;
  seller: Seller;
  colors?: string[];
  sizes?: string[];
  weight?: number;
  dimensions?: string;
}

export interface Seller {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  isOfficial: boolean;
  location: string;
}

export interface Category {
  id: string;
  name: string;
  nameUz: string;
  slug: string;
  icon: string;
  color: string;
  bgColor: string;
  productCount: number;
  image: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  nameUz: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: Address;
  orders: Order[];
  createdAt: Date;
}

export interface Address {
  id: string;
  title: string;
  region: string;
  city: string;
  street: string;
  apartment?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cash" | "card" | "payme" | "click" | "uzcard";

export interface FilterOptions {
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  brands?: string[];
  categories?: string[];
  freeShipping?: boolean;
  inStock?: boolean;
  discount?: boolean;
}

export interface SortOption {
  value: string;
  labelUz: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  images?: string[];
  helpful: number;
}

export interface Banner {
  id: string;
  title: string;
  titleUz: string;
  subtitle: string;
  subtitleUz: string;
  image: string;
  link: string;
  bgColor: string;
  textColor: string;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  success: boolean;
  message?: string;
}
