import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  fallbackClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  fallbackClassName = 'bg-neutral-200 text-neutral-600',
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 p-6 text-center ${fallbackClassName} ${className}`}
      >
        <ImageOff className="w-6 h-6 opacity-60" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide opacity-80">
          {fallbackLabel ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
