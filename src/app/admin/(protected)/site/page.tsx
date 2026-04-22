import React from "react";
import SiteForm from "@/components/admin/SiteForm";
import { getSite } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function AdminSitePage() {
  const site = getSite();
  return (
    <div>
      <h1 className="text-h3 italic text-white mb-2">Site copy</h1>
      <p className="text-normal3 mb-6" style={{ color: "var(--tt-color-text-gray)" }}>
        Edit the copy used across the homepage, loyalty page, about page and footer.
      </p>
      <SiteForm initial={site} />
    </div>
  );
}
