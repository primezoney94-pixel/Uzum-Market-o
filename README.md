# Uzum Market Clone - Next.js Front-End Project

Ushbu loyiha Next.js 14 (App Router), TypeScript va Tailwind CSS texnologiyalari yordamida Uzum Market platformasining front-end qismi sifatida ishlab chiqildi. Loyiha to'liq mobil-adaptiv (responsive) va ishlab chiqarishga tayyor (production-ready) holatda.

## 🚀 Texnologiyalar tarkibi
- **Framework:** Next.js 14 (App Router)
- **Til:** TypeScript
- **Dizayn:** Tailwind CSS (Mobile-first yondashuv)
- **State Management:** Zustand (Savat va Sevimlilar uchun)
- **Animatsiyalar:** Framer Motion

---

## 📂 Loyiha tuzilmasi
```text
uzum-market/
├── src/
│   ├── app/              # 6 ta asosiy sahifa (Bosh sahifa, Katalog, Detail, Savat, Wishlist, Profil)
│   ├── components/       # Qayta ishlatiladigan UI komponentlar
│   ├── data/             # Mock (Dummy) mahsulotlar bazasi (12 ta mahsulot)
│   ├── store/            # Zustand state (Savat + Wishlist logikasi)
│   ├── types/            # TypeScript interfeyslari
│   └── utils/            # Valyuta formatlash va yordamchi funksiyalar