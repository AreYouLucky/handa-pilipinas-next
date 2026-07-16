"use client";

import Image from "next/image";
import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { ImSpinner } from "react-icons/im";

type Props = {
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
  unoptimized?: boolean;
  autoUnoptimizedAfterMs?: number;
  priority?: boolean;
  sizes?: string;
};

const baseURL = (
  process.env.NEXT_PUBLIC_URL || "https://yxbpy2fsbgvy.dostv.ph"
).replace(/\/$/, "");

function resolveImageSrc(src: string): string {
  if (!src) {
    return "";
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `${baseURL}${src.startsWith("/") ? src : `/${src}`}`;
}

export default function ImageLoader({
  src,
  alt = "image",
  height,
  width,
  className,
  unoptimized = false,
  autoUnoptimizedAfterMs = 0,
  priority = false,
  sizes,
}: Props): JSX.Element {
  const imageSrc = useMemo(() => resolveImageSrc(src), [src]);

  return (
    <ImageLoaderContent
      key={imageSrc}
      imageSrc={imageSrc}
      alt={alt}
      height={height}
      width={width}
      className={className}
      unoptimized={unoptimized}
      autoUnoptimizedAfterMs={autoUnoptimizedAfterMs}
      priority={priority}
      sizes={sizes}
    />
  );
}

type ImageLoaderContentProps = Omit<Props, "src"> & {
  imageSrc: string;
};

function ImageLoaderContent({
  imageSrc,
  alt = "image",
  height,
  width,
  className,
  unoptimized = false,
  autoUnoptimizedAfterMs = 0,
  priority = false,
  sizes,
}: ImageLoaderContentProps): JSX.Element {
  const [loading, setLoading] = useState(Boolean(imageSrc));
  const [isAutoUnoptimized, setIsAutoUnoptimized] = useState(false);
  const isUnoptimized = unoptimized || isAutoUnoptimized;

  useEffect(() => {
    if (!imageSrc || !loading || isUnoptimized || autoUnoptimizedAfterMs <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsAutoUnoptimized(true);
    }, autoUnoptimizedAfterMs);

    return () => window.clearTimeout(timeout);
  }, [autoUnoptimizedAfterMs, imageSrc, isUnoptimized, loading]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
          <ImSpinner className="text-white/80 text-xl animate-spin" />
        </div>
      )}

      {imageSrc ? (
        <Image
          key={`${imageSrc}-${isUnoptimized ? "raw" : "optimized"}`}
          src={imageSrc}
          alt={alt}
          title={alt}
          width={width ?? 150}
          height={height ?? 150}
          onLoad={() => setLoading(false)}
          onError={() => {
            if (!isUnoptimized) {
              setIsAutoUnoptimized(true);
              return;
            }

            setLoading(false);
          }}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes={sizes}
          unoptimized={isUnoptimized}
          className={`${className ?? ""} ${
            loading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        />
      ) : null}
    </div>
  );
}
