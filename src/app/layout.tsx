import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dancingScript.variable} antialiased`}
        style={{ background: "var(--tt-bg-color)" }}
      >
        {children}
      </body>
    </html>
  );
}
