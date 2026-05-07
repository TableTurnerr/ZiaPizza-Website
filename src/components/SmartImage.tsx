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
  style,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

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
