'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getDefaultAvatar, getInitials } from '@/lib/utils/avatar';

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

export default function Avatar({ src, name, size = 48, className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const initials = getInitials(name);
  const colors = [
    { bg: '#d4c2a8', text: '#fff' },
    { bg: '#b89d7a', text: '#fff' },
    { bg: '#8b6f4f', text: '#fff' },
    { bg: '#735a42', text: '#fff' },
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  useEffect(() => {
    if (src && !src.startsWith('data:')) {
      setImageSrc(src);
      setImageError(false);
    } else {
      setImageSrc(null);
    }
  }, [src]);

  const handleError = () => {
    setImageError(true);
    setImageSrc(null);
  };

  // If no src, error occurred, or using data URI, show default avatar
  if (!imageSrc || imageError || imageSrc.startsWith('data:')) {
    const displaySrc =
      imageSrc && imageSrc.startsWith('data:') ? imageSrc : getDefaultAvatar(name, size);

    if (displaySrc.startsWith('data:')) {
      return (
        <div
          className={`rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${className}`}
          style={{
            width: size,
            height: size,
            backgroundColor: color.bg,
            fontSize: size * 0.4,
          }}
        >
          {initials}
        </div>
      );
    }
  }

  // Try to load external image with fallback
  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 bg-gray-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={imageSrc || getDefaultAvatar(name, size)}
        alt={name}
        fill
        className='object-cover'
        sizes={`${size}px`}
        onError={handleError}
        unoptimized={imageSrc?.startsWith('https://ui-avatars.com')}
      />
      {imageError && (
        <div
          className='absolute inset-0 flex items-center justify-center font-bold text-white'
          style={{
            backgroundColor: color.bg,
            fontSize: size * 0.4,
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
