import React, { useState, useEffect } from 'react';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const DEFAULT_FALLBACK = '/images/banyan/banyan-amenity-01.webp';

/**
 * Universal Asset URL resolver:
 * Ensures image paths are 100% reusable across GitHub Pages (subpath repositories),
 * Vercel (root domains), and custom domains without broken images.
 * Also safely URL-encodes spaces and special characters like '#' in filenames.
 */
export function resolveAssetUrl(url?: string): string {
  if (!url) return '';
  // External or inline URLs
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  // Safely encode special characters (especially '#' and spaces in file paths)
  const segments = url.split('/');
  const encodedSegments = segments.map((seg) => {
    // If segment already has %23 or %20, don't double encode
    try {
      return encodeURIComponent(decodeURIComponent(seg))
        .replace(/%2F/gi, '/');
    } catch {
      return seg.replace(/#/g, '%23').replace(/ /g, '%20');
    }
  });
  const encodedUrl = encodedSegments.join('/');

  // Prepend base URL for GitHub Pages / Vercel compatibility
  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } })?.env;
  const base = metaEnv?.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = encodedUrl.startsWith('/') ? encodedUrl : `/${encodedUrl}`;
  return `${cleanBase}${cleanPath}`;
}

export const AppImage: React.FC<AppImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const resolvedInitial = resolveAssetUrl(src);
  const [imgSrc, setImgSrc] = useState<string | undefined>(resolvedInitial);
  const [hasError, setHasError] = useState(false);

  const [attemptedAlt, setAttemptedAlt] = useState(false);

  // Sync state if src prop changes
  useEffect(() => {
    const nextUrl = resolveAssetUrl(src);
    setImgSrc(nextUrl);
    setHasError(false);
    setAttemptedAlt(false);
  }, [src]);

  const handleError = () => {
    // If standard unit-3205-XX.webp failed, attempt the original camera upload name Waikiki Banyan T2 -#3205 (X).webp
    if (!attemptedAlt && imgSrc) {
      const unitMatch = imgSrc.match(/unit-3205-0?(\d+)\.webp/i);
      if (unitMatch && unitMatch[1]) {
        const num = parseInt(unitMatch[1], 10);
        const altFilename = `Waikiki Banyan T2 -#3205 (${num}).webp`;
        const altUrl = imgSrc.replace(/unit-3205-0?\d+\.webp/i, altFilename);
        setAttemptedAlt(true);
        setImgSrc(resolveAssetUrl(altUrl));
        return;
      }

      // If standard banyan-amenity-XX.webp failed, attempt the original camera upload name Waikiki Banyan T2 Building and Ammenities (X).webp
      const amenityMatch = imgSrc.match(/banyan-amenity-0?(\d+)\.webp/i);
      if (amenityMatch && amenityMatch[1]) {
        const num = parseInt(amenityMatch[1], 10);
        const altFilename = `Waikiki Banyan T2 Building and Ammenities (${num}).webp`;
        const altUrl = imgSrc.replace(/banyan-amenity-0?\d+\.webp/i, altFilename);
        setAttemptedAlt(true);
        setImgSrc(resolveAssetUrl(altUrl));
        return;
      }

      // Conversely, if original upload name failed, attempt standard name
      const reverseAmenityMatch = imgSrc.match(/Waikiki%20Banyan%20T2%20Building%20and%20Ammenities%20\((\d+)\)\.webp/i) ||
                                  imgSrc.match(/Waikiki Banyan T2 Building and Ammenities \((\d+)\)\.webp/i);
      if (reverseAmenityMatch && reverseAmenityMatch[1]) {
        const num = parseInt(reverseAmenityMatch[1], 10);
        const formattedNum = num < 10 ? `0${num}` : `${num}`;
        const altFilename = `banyan-amenity-${formattedNum}.webp`;
        const altUrl = imgSrc.replace(/Waikiki(%20| )Banyan(%20| )T2(%20| )Building(%20| )and(%20| )Ammenities(%20| )\(\d+\)\.webp/i, altFilename);
        setAttemptedAlt(true);
        setImgSrc(resolveAssetUrl(altUrl));
        return;
      }
    }

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

