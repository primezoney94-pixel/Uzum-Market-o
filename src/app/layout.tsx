import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Uzum Market — O'zbekistonning №1 online bozori",
  description: "Millionlab mahsulotlar, tez yetkazib berish, qulay to'lov. Uzum Market — eng yaxshi narxlar kafolati.",
  manifest: "/manifest.json",
  themeColor: "#ed2009",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
      </body>
    </html>
  );
}
