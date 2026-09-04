import type { Metadata } from "next";
import OrderPageClient from "@/components/OrderPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Order Online",
  description: "Choose your Zia Pizza location to order online for collection or delivery.",
  pathname: "/order",
});

export default function OrderPage() {
  return <OrderPageClient />;
}
