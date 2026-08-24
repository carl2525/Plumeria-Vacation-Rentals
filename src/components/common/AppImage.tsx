import React, { useState } from 'react';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80';

export const AppImage: React.FC<AppImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || 'Plumeria Vacation Rentals'}
      className={className}
      referrerPolicy="no-referrer"
      onError={handleError}
      loading={props.loading || 'lazy'}
      {...props}
    />
  );
};
