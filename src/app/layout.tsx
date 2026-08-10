import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";
import BookingProvider from "@/components/BookingProvider";
import StickyOrderBar from "@/components/StickyOrderBar";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zia Pizza | Authentic Stone-Baked Italian Pizza",
    template: "%s | Zia Pizza",
  },
  description:
    "Zia Pizza serves stone-baked Italian pizza in Salisbury and Westbury for dine-in, takeaway and delivery.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="antialiased"
        style={{ background: "var(--tt-bg-color)" }}
      >
        <BookingProvider>
          {children}
          <StickyOrderBar />
        </BookingProvider>
      </body>
    </html>
  );
}
