"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";

type SmartImageProps = ImageProps & {
  skeletonClassName?: string;
};

export default function SmartImage({
  skeletonClassName = "",
  className = "",
  onLoad,
  quality = 70,
  style,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);
  const hasSource =
    typeof props.src === "string" ? props.src.trim().length > 0 : Boolean(props.src);
  const isExternalSource =
    typeof props.src === "string" && /^https?:\/\//i.test(props.src);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  if (!hasSource) {
    return (
      <span
        aria-hidden="true"
        className={`image-placeholder absolute inset-0 ${skeletonClassName}`}
        style={{ borderRadius: "inherit" }}
      >
        <svg
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </span>
    );
  }

  return (
    <>
      {!loaded && (
        <span
          aria-hidden
          className={`skeleton absolute inset-0 ${skeletonClassName}`}
          style={{ borderRadius: "inherit", zIndex: 1 }}
        />
      )}
      <Image
        {...props}
        ref={ref}
        alt={props.alt ?? ""}
        quality={quality}
        unoptimized={props.unoptimized || isExternalSource}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 450ms ease",
        }}
      />
    </>
  );
}
