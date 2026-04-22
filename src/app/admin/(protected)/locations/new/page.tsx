import React from "react";
import LocationForm from "@/components/admin/LocationForm";
import type { LocationRecord } from "@/lib/content";

const EMPTY: LocationRecord = {
  slug: "",
  name: "",
  type: "zia-pizza",
  city: "",
  postcode: "",
  postcodePrefixes: [],
  address: "",
  phone: "",
  email: "",
  hours: "",
  openTime: "12:00",
  closeTime: "22:00",
  description: "",
  image: "",
  gallery: [],
  features: [],
  instagram: "",
  facebook: "",
  orderUrl: "",
  mapEmbed: "",
  deals: [],
};

export default function NewLocationPage() {
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-6">New location</h1>
      <LocationForm initial={EMPTY} mode="create" />
    </div>
  );
}
