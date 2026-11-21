import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function MapImage({ src, alt, title, className = '' }: MapImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#ebede8] text-[#525852] p-6 text-center ${className}`}
      >
        <MapPin className="w-7 h-7 mb-2 text-[#1b4d3e]" aria-hidden="true" />
        <p className="font-display text-sm font-bold text-[#161816]">
          {title || '그림지도 일러스트'}
        </p>
        <p className="mt-1 text-xs text-[#525852] max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
