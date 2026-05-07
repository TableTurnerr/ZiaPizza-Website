"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function FloatingVideo() {
  const pathname = usePathname();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [closed, setClosed] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
  }, []);

  if (pathname?.startsWith("/admin") || closed) return null;

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  const toggleExpand = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpanded((s) => !s);
  };

  const close = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClosed(true);
  };

  return (
    <>
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
          style={{ animation: "fadeIn 200ms ease-out" }}
        />
      )}
      <div
        className={
          expanded
            ? "fixed z-[80] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,480px)] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
            : "fixed z-[55] bottom-20 right-3 md:bottom-5 md:right-5 w-[160px] md:w-[200px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl cursor-pointer"
        }
        style={{
          border: "2px solid rgba(255,255,255,0.15)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={() => !expanded && setExpanded(true)}
      >
        <video
          ref={videoRef}
          src="/review-video.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-full object-cover bg-black"
        />

        <div className="absolute top-1.5 right-1.5 flex gap-1.5">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 010 7.07" />
                <path d="M19.07 4.93a10 10 0 010 14.14" />
              </svg>
            )}
          </button>
          {expanded && (
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {!expanded && (
          <button
            type="button"
            onClick={toggleExpand}
            aria-label="Expand"
            className="absolute bottom-1.5 right-1.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        )}

        {!expanded && (
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-1.5 left-1.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
