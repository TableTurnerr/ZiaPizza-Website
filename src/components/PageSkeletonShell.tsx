import React from "react";
import Skeleton from "./Skeleton";

export default function PageSkeletonShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-[10px] pb-[120px]">
      <div
        className="fixed top-[10px] left-[10px] right-[10px] h-[55px] sm:h-[70px] z-[40] flex items-center justify-between px-[16px] sm:px-[24px]"
        style={{ background: "rgba(13,13,13,0.6)", backdropFilter: "blur(10px)", borderRadius: 14 }}
        aria-hidden
      >
        <Skeleton style={{ height: 28, width: 110 }} rounded="md" />
        <div className="hidden md:flex gap-[18px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} style={{ height: 12, width: 56 }} />
          ))}
        </div>
        <Skeleton style={{ height: 36, width: 120 }} rounded="full" />
      </div>
      <div className="h-[65px] sm:h-[80px]" />
      {children}
    </div>
  );
}
