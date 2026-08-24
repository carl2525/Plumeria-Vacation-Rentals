import React from 'react';
import { PlumeriaSymbolLogo } from './PlumeriaSymbolLogo';

interface FullLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'white';
  compact?: boolean;
}

export const PlumeriaLogo: React.FC<FullLogoProps> = ({
  className = '',
  variant = 'dark',
  compact = false,
}) => {
  const isLightOrWhite = variant === 'light' || variant === 'white';
  const textColor = isLightOrWhite ? 'text-white' : 'text-[#0D274D]';
  const subtextColor = isLightOrWhite ? 'text-[#D4F2F5]' : 'text-[#0D274D]/80';

  if (compact) {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <PlumeriaSymbolLogo
          variant={variant}
          className="w-11 h-11 shrink-0 drop-shadow-md"
        />
        <div className="flex flex-col">
          <span
            className={`font-serif text-xl leading-tight font-bold tracking-tight ${textColor}`}
          >
            Plumeria
          </span>
          <span
            className={`text-[9px] font-bold tracking-[0.24em] uppercase ${subtextColor}`}
          >
            Vacation Rentals
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <PlumeriaSymbolLogo
        variant={variant}
        className="w-13 h-13 sm:w-15 sm:h-15 shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif text-2xl sm:text-3xl leading-none font-bold tracking-tight ${textColor}`}
        >
          Plumeria
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.26em] uppercase mt-1 ${subtextColor}`}
        >
          Vacation Rentals
        </span>
      </div>
    </div>
  );
};
