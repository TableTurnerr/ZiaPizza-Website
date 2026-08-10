import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="p-[10px] pb-[80px] md:pb-[10px]">
      <Header />
      <main className="min-h-[65vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-accent text-normal3 font-semibold tracking-[0.18em] uppercase mb-3">404</p>
        <h1 className="text-h2 sm:text-h1 italic text-white mb-4">This slice is missing</h1>
        <p className="text-normal2 max-w-xl mb-8" style={{ color: "var(--tt-color-text-gray)" }}>
          The page you were looking for is no longer here. You can return home, browse the menu, or find your nearest Zia Pizza.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg transition-colors">Home</Link>
          <Link href="/menu" className="border border-white/20 hover:border-accent text-white font-bold px-6 py-3 rounded-lg transition-colors">Browse the menu</Link>
          <Link href="/locations" className="border border-white/20 hover:border-accent text-white font-bold px-6 py-3 rounded-lg transition-colors">Find a location</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
