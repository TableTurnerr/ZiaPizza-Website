import React from "react";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
};

const radiusMap = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "20px",
  "2xl": "28px",
  full: "9999px",
};

export default function Skeleton({
  className = "",
  style,
  rounded = "md",
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`skeleton ${className}`}
      style={{ borderRadius: radiusMap[rounded], ...style }}
      {...rest}
    />
  );
}

export function SkeletonText({
  lines = 3,
  lastWidth = "60%",
  className = "",
}: {
  lines?: number;
  lastWidth?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[10px] ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          style={{
            height: "12px",
            width: i === lines - 1 ? lastWidth : "100%",
          }}
        />
      ))}
    </div>
  );
}
