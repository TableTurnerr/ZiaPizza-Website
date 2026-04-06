import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import BrandPillars from "@/components/BrandPillars";
import LocationFinder from "@/components/LocationFinder";
import SignatureDishes from "@/components/SignatureDishes";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <BrandPillars />
      <LocationFinder />
      <SignatureDishes />
      <CTASection />
      <Footer />
    </div>
  );
}
