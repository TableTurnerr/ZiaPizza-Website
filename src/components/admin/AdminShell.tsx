"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/site", label: "Site Copy" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: "var(--tt-bg-color)" }}>
      <aside className="lg:w-[240px] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex lg:flex-col gap-4 lg:gap-2">
        <div className="lg:mb-6">
          <div className="text-accent text-[11px] tracking-[0.22em] uppercase font-bold">Zia Pizza</div>
          <div className="text-h5 text-white italic">Admin</div>
        </div>
        <nav className="flex lg:flex-col gap-1 flex-1 overflow-x-auto">
          {NAV.map((n) => {
            const active = n.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`block px-3 py-2 rounded-lg text-normal3 whitespace-nowrap transition-colors ${
                  active
                    ? "bg-primary/15 text-white border border-primary/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="lg:mt-auto flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-normal4 underline"
            style={{ color: "var(--tt-color-text-gray)" }}
          >
            View site
          </Link>
          <span className="text-white/20">·</span>
          <button
            type="button"
            onClick={logout}
            className="text-normal4 underline text-white/70 hover:text-white"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-5 sm:p-8 max-w-6xl w-full">{children}</main>
    </div>
  );
}
