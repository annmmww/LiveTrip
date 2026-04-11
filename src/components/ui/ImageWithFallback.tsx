'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback: string;
  [key: string]: any;
}
export default function ImageWithFallback({
  src,
  fallback,
  alt,
  width,
  height,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const isRemoteImage = /^https?:\/\//.test(imgSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      width={width}
      height={height}
      alt={alt}
      unoptimized={isRemoteImage}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
