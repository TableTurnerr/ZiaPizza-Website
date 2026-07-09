import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import BookingProvider from "@/components/BookingProvider";
import StickyOrderBar from "@/components/StickyOrderBar";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingVideo from "@/components/FloatingVideo";
import SplashScreen from "@/components/SplashScreen";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ziapizza.co.uk"),
  title: "Zia Pizza | A Slice Above The Rest",
  description:
    "Authentic Italian pizza made fresh daily. Stone-baked with love in Salisbury and Westbury. Dine in, takeaway, or delivery.",
  keywords: [
    "Zia Pizza", "Italian Pizza", "Salisbury", "Westbury",
    "Stone Baked Pizza", "Italian Restaurant", "Wiltshire", "Pizza Delivery",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Zia Pizza | A Slice Above The Rest",
    description:
      "Authentic Italian pizza made fresh daily. Stone-baked with love across Wiltshire.",
    url: "https://ziapizza.co.uk/",
    siteName: "Zia Pizza",
    images: [{ url: "/logo/logo.png", width: 400, height: 400, alt: "Zia Pizza Logo" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://ziapizza.co.uk/",
    title: "Zia Pizza | A Slice Above The Rest",
    description:
      "Authentic Italian pizza made fresh daily. Stone-baked with love across Wiltshire.",
    images: ["/logo/logo.png"],
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
              "@type": "Restaurant",
              name: "Zia Pizza",
              image: "https://ziapizza.co.uk/logo/logo.png",
              url: "https://ziapizza.co.uk",
              telephone: "01722 433829",
              address: {
                "@type": "PostalAddress",
                streetAddress: "46 Silver St",
                addressLocality: "Salisbury",
                postalCode: "SP1 2NE",
                addressCountry: "GB",
              },
              servesCuisine: ["Italian", "Pizza", "Pasta"],
              priceRange: "$$",
            }),
          }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}.splash{display:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${cormorant.variable} ${montserrat.variable} ${manrope.variable} antialiased`}
        style={{ background: "var(--tt-bg-color)" }}
      >
        <SplashScreen />
        <SmoothScroll />
        <BookingProvider>
          {children}
          <StickyOrderBar />
          <FloatingVideo />
        </BookingProvider>
      </body>
    </html>
  );
}
