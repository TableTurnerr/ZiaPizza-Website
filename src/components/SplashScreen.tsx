"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen brand splash shown on the initial load of the site.
 *
 * Rendered in the server HTML (it's the first thing painted), then dismissed
 * once the page has finished loading and a short minimum has elapsed so the
 * intro animation can play out. App Router keeps the root layout mounted across
 * client navigations, so this only appears on real page loads / refreshes.
 */
export default function SplashScreen() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("splash-active");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN_VISIBLE = reduce ? 450 : 1200; // let the reveal breathe
    const EXIT_MS = reduce ? 260 : 640;
    const startedAt = Date.now();

    let exitTimer = 0;
    let doneTimer = 0;
    let triggered = false;

    const finish = () => {
      if (triggered) return;
      triggered = true;
      const wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      exitTimer = window.setTimeout(() => {
        root.classList.remove("splash-active");
        setExiting(true);
        doneTimer = window.setTimeout(() => setDone(true), EXIT_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    // Safety net: never let the splash hang if `load` is delayed.
    const fallback = window.setTimeout(finish, 4000);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(fallback);
      root.classList.remove("splash-active");
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`splash${exiting ? " splash--exit" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <span className="splash__glow" />
      <span className="splash__logo">
        {/* Plain <img>: a static asset that needs to paint the instant the
            overlay does, with no optimization pipeline in the way. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.webp"
          alt="Zia Pizza"
          width={1665}
          height={304}
          className="splash__logo-img"
          fetchPriority="high"
          decoding="async"
        />
        <span className="splash__shine" />
      </span>
      <span className="splash__bar">
        <span className="splash__bar-fill" />
      </span>
    </div>
  );
}
