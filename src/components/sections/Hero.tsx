"use client";

import React, { useEffect, useRef, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeButton from "@/components/ThemeBtn";
import BookTableButton from "@/components/BookTableButton";
import { site } from "@/data/site";
import { findLocationByPostcode, locations } from "@/data/locations";

export default function HeroSection() {
  const router = useRouter();
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const start = () => setVideoSrc("/hero-video.mp4");
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
      return () => window.removeEventListener("load", start);
    }
  }, []);

  function findMyZia(e: React.FormEvent) {
    e.preventDefault();
    const match = findLocationByPostcode(postcode.trim());
    if (match) {
      setError(null);
      router.push(`/${match.type}/${match.slug}`);
    } else {
      setError(
        `We couldn't match "${postcode}" to a location yet. Try browsing all locations below.`
      );
    }
  }

  return (
    <section
      id="Home"
      className="min-h-[640px] lg:min-h-[720px] w-full relative flex items-center rounded-[20px] overflow-hidden"
    >
      <SmartImage
        src={site.hero.image}
        alt="Zia Pizza - stone baked pizza"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[38%_center] transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
      />
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => {
            videoRef.current?.play().catch(() => {});
            setVideoReady(true);
          }}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover object-[38%_center] transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/75 to-[#0D0D0D]/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-transparent to-[#0D0D0D]/70" />

      <div className="relative z-10 pl-6 sm:pl-12 lg:pl-20 pr-4 py-20 flex flex-col items-start gap-4 max-w-[600px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span
            className="text-[18px] sm:text-[20px]"
            style={{
              color: "var(--tt-color-text-orange)",
              fontFamily: "var(--font-script), 'Dancing Script', cursive",
            }}
          >
            {site.hero.eyebrow}
          </span>
        </div>

        <h1 className="text-white text-[40px] sm:text-h2 lg:text-h1 font-bold leading-[1.08] -mt-1">
          {site.hero.headline}
          <br />
          <span className="text-primary italic">{site.hero.headlineAccent}</span>
        </h1>

        <p
          className="text-[14px] sm:text-normal3 leading-[1.7] max-w-[440px]"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          {site.hero.subtext}
        </p>

        <form
          onSubmit={findMyZia}
          className="mt-2 w-full max-w-[440px] flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter your postcode (e.g. SP1 2NE)"
            className="flex-1 bg-white/10 border border-white/15 rounded-lg px-4 py-3 text-white text-normal3 placeholder-white/40 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white text-normal3 font-bold px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Find My Zia
          </button>
        </form>
        {error && (
          <p className="text-normal4 text-primary max-w-[440px]">{error}</p>
        )}
        <p className="text-normal4 max-w-[440px]" style={{ color: "var(--tt-color-text-gray)" }}>
          Serving {locations.map((l) => l.city).join(" & ")} — and growing.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-[14px] mt-3">
          <Link href="/order">
            <ThemeButton
              text="Order Now"
              textClassname="pr-[8px] pl-[14px] text-white"
              className="bg-primary-dark border-2 hover:bg-primary-dark/90 border-primary-dark hover:border-primary-dark/90 transition-colors"
            />
          </Link>
          <BookTableButton className="inline-flex items-center justify-center border-2 border-white/15 hover:border-primary bg-transparent hover:bg-primary text-white text-normal2 font-bold px-6 py-[11px] rounded-[9px] transition-colors min-w-[157px] min-h-[41px]">
            Book Table
          </BookTableButton>
        </div>
      </div>
    </section>
  );
}
