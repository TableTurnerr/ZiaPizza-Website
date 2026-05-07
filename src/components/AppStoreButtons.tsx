import React from "react";
import { site } from "@/data/site";

type Props = {
  className?: string;
};

const baseBtn =
  "group inline-flex items-center gap-3 bg-black border border-white/20 hover:border-white/50 hover:bg-white/[0.04] text-white px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.45)]";

export default function AppStoreButtons({ className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={site.loyalty.appStoreUrl}
        aria-label="Download on the App Store"
        className={baseBtn}
      >
        <svg
          viewBox="0 0 384 512"
          aria-hidden="true"
          className="w-7 h-7 fill-white shrink-0"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM256.4 84.5c30.1-35.7 27.4-68.2 26.5-79.9-26.6 1.5-57.4 18.1-74.9 38.5-19.3 21.8-30.7 48.8-28.2 78.7 28.8 2.2 55.1-12.6 76.6-37.3z" />
        </svg>
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wider text-white/70">
            Download on the
          </span>
          <span className="text-[17px] font-semibold -mt-0.5">App Store</span>
        </span>
      </a>

      <a
        href={site.loyalty.playStoreUrl}
        aria-label="Get it on Google Play"
        className={baseBtn}
      >
        <svg
          viewBox="0 0 27.5 30.6"
          aria-hidden="true"
          className="w-8 h-8 shrink-0"
        >
          <defs>
            <linearGradient id="gp-g1" gradientUnits="userSpaceOnUse" x1="14.09" y1="1.87" x2="-5.9" y2="21.86">
              <stop offset="0" stopColor="#008eff" />
              <stop offset=".01" stopColor="#008fff" />
              <stop offset=".26" stopColor="#00acff" />
              <stop offset=".51" stopColor="#00c0ff" />
              <stop offset=".76" stopColor="#00cdff" />
              <stop offset="1" stopColor="#00d1ff" />
            </linearGradient>
            <linearGradient id="gp-g2" gradientUnits="userSpaceOnUse" x1="26.45" y1="15.32" x2="-2.37" y2="15.32">
              <stop offset="0" stopColor="#ffd800" />
              <stop offset="1" stopColor="#ff8a00" />
            </linearGradient>
            <linearGradient id="gp-g3" gradientUnits="userSpaceOnUse" x1="17.69" y1="18.05" x2="-9.41" y2="45.15">
              <stop offset="0" stopColor="#ff3a44" />
              <stop offset="1" stopColor="#b11162" />
            </linearGradient>
            <linearGradient id="gp-g4" gradientUnits="userSpaceOnUse" x1="-3.19" y1="-8.29" x2="8.92" y2="3.81">
              <stop offset="0" stopColor="#328e71" />
              <stop offset=".07" stopColor="#2d9571" />
              <stop offset=".48" stopColor="#15bd74" />
              <stop offset=".8" stopColor="#06d575" />
              <stop offset="1" stopColor="#00de76" />
            </linearGradient>
          </defs>
          <path d="M.55.48A2.39 2.39 0 000 2.15v26.34a2.41 2.41 0 00.55 1.67l.09.09 14.75-14.76v-.35L.64.39z" fill="url(#gp-g1)" />
          <path d="M20.31 20.41l-4.92-4.92v-.35l4.92-4.91.11.06 5.83 3.31c1.67.94 1.67 2.49 0 3.44l-5.83 3.31z" fill="url(#gp-g2)" />
          <path d="M20.42 20.35l-5-5L.55 30.16a2 2 0 002.45.07l17.39-9.88" fill="url(#gp-g3)" />
          <path d="M20.42 10.29L3 .4A1.93 1.93 0 00.55.48l14.84 14.84z" fill="url(#gp-g4)" />
        </svg>
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wider text-white/70">
            Get it on
          </span>
          <span className="text-[17px] font-semibold -mt-0.5">Google Play</span>
        </span>
      </a>
    </div>
  );
}
