import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";
import BookingProvider from "@/components/BookingProvider";
import StickyOrderBar from "@/components/StickyOrderBar";
import SmoothScroll from "@/components/SmoothScroll";
// import FloatingVideo from "@/components/FloatingVideo";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://ziapizza.co.uk"),
  title: "Zia Pizza | Authentic Stone-Baked Italian Pizza in Salisbury & Westbury",
  description:
    "Zia Pizza — authentic hand-stretched, stone-baked Italian pizza in Salisbury and Westbury. Dine-in, takeaway, or delivery. A slice above the rest.",
  keywords: [
    "Zia Pizza", "Italian pizza Salisbury", "Italian pizza Westbury",
    "stone baked pizza", "pizza delivery Wiltshire", "Italian restaurant Wiltshire",
    "authentic Italian pizza", "pizza takeaway Salisbury", "pizza takeaway Westbury",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://ziapizza.co.uk/" },
  openGraph: {
    title: "Zia Pizza | A Slice Above The Rest",
    description:
      "Authentic Italian pizza made fresh daily. Stone-baked with love across Wiltshire.",
    url: "https://ziapizza.co.uk/",
    siteName: "Zia Pizza",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Zia Pizza — Stone-baked Italian pizza" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ziapizza",
    title: "Zia Pizza | A Slice Above The Rest",
    description:
      "Authentic Italian pizza made fresh daily. Stone-baked with love across Wiltshire.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" as="image" href="/logo.webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "Zia Pizza",
              url: "https://ziapizza.co.uk",
              image: "https://ziapizza.co.uk/og-image.jpg",
              servesCuisine: ["Italian", "Pizza", "Pasta"],
              priceRange: "££",
              sameAs: [
                "https://instagram.com/ziapizza.salisbury",
                "https://instagram.com/ziapizzaexpress_westbury",
                "https://www.facebook.com/share/19tVr2C1Gy/",
                "https://www.facebook.com/share/1CkvTGuMtM/",
              ],
            }),
          }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}.splash{display:none!important}`}</style>
        </noscript>
      </head>
      <body
        className="antialiased"
        style={{ background: "var(--tt-bg-color)" }}
      >
        <SplashScreen />
        <SmoothScroll />
        <BookingProvider>
          {children}
          <StickyOrderBar />
          {/* <FloatingVideo /> */}
        </BookingProvider>
      </body>
    </html>
  );
}
