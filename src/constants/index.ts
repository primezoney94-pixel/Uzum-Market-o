export const APP_NAME = "Uzum Market";
export const CURRENCY = "UZS";
export const CURRENCY_SYMBOL = "UZS";

export const SORT_OPTIONS = [
  { value: "popular", labelUz: "Mashhurlik bo'yicha" },
  { value: "price_asc", labelUz: "Narx: arzondan qimmatga" },
  { value: "price_desc", labelUz: "Narx: qimmatdan arzonga" },
  { value: "rating", labelUz: "Reyting bo'yicha" },
  { value: "new", labelUz: "Yangilar birinchi" },
  { value: "discount", labelUz: "Chegirma bo'yicha" },
];

export const PAYMENT_METHODS = [
  { value: "payme", label: "Payme", icon: "/icons/payme.svg" },
  { value: "click", label: "Click", icon: "/icons/click.svg" },
  { value: "uzcard", label: "UzCard", icon: "/icons/uzcard.svg" },
  { value: "card", label: "Bank kartasi", icon: "/icons/card.svg" },
  { value: "cash", label: "Naqd pul", icon: "/icons/cash.svg" },
];

export const ORDER_STATUSES: Record<string, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlangan",
  processing: "Tayyorlanmoqda",
  shipped: "Yo'lda",
  delivered: "Yetkazildi",
  cancelled: "Bekor qilingan",
};

export const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand viloyati",
  "Buxoro viloyati",
  "Andijon viloyati",
  "Farg'ona viloyati",
  "Namangan viloyati",
  "Qashqadaryo viloyati",
  "Surxondaryo viloyati",
  "Xorazm viloyati",
  "Navoiy viloyati",
  "Jizzax viloyati",
  "Sirdaryo viloyati",
  "Qoraqalpog'iston Respublikasi",
];

export const FREE_SHIPPING_THRESHOLD = 200000;
export const ITEMS_PER_PAGE = 20;
