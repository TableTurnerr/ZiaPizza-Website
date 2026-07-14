import React from "react";
import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdminPage } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage();
  return <AdminShell>{children}</AdminShell>;
}
