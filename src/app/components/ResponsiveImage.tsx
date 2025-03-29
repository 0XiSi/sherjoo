'use cache'

import Image from 'next/image';
import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default async function ResponsiveImage({ src, alt, className, priority }: ResponsiveImageProps) {
  return (
    <div className={`w-full h-auto ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={700} // Set a default width (can be any value)
        height={700} // Set a default height (can be any value)
        priority={priority}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}