import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ziapizza.co.uk"),
  title: "Zia Pizza | A Slice Above The Rest",
  description:
    "Authentic Italian pizza made fresh daily. Stone-baked with love in Salisbury, Westbury, and Trowbridge. Dine in, takeaway, or delivery.",
  keywords: [
    "Zia Pizza",
    "Italian Pizza",
    "Salisbury",
    "Westbury",
    "Trowbridge",
    "Stone Baked Pizza",
    "Italian Restaurant",
    "Wiltshire",
    "Pizza Delivery",
    "Takeaway",
  ],
  openGraph: {
    title: "Zia Pizza | A Slice Above The Rest",
    description:
      "Authentic Italian pizza made fresh daily. Stone-baked with love across Wiltshire.",
    url: "https://ziapizza.co.uk",
    siteName: "Zia Pizza",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Zia Pizza",
              url: "https://ziapizza.co.uk",
              servesCuisine: ["Italian", "Pizza"],
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Salisbury",
                addressRegion: "Wiltshire",
                addressCountry: "GB",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-[family-name:var(--font-geist-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
