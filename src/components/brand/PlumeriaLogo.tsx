import React from 'react';
import { PlumeriaSymbolLogo } from './PlumeriaSymbolLogo';

interface FullLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'white';
  compact?: boolean;
  layout?: 'horizontal' | 'stacked';
}

export const PlumeriaLogo: React.FC<FullLogoProps> = ({
  className = '',
  variant = 'dark',
  compact = false,
  layout = 'horizontal',
}) => {
  const isLightOrWhite = variant === 'light' || variant === 'white';
  const textColor = isLightOrWhite ? 'text-white' : 'text-[#1A3B34]';
  const goldColor = isLightOrWhite ? 'text-[#F6E7A7]' : 'text-[#C59B4B]';
  const lineBg = isLightOrWhite ? 'bg-[#F6E7A7]/70' : 'bg-[#C59B4B]';

  // 1. Stacked Layout - (Arch/Emblem above, PLUMERIA text, and VACATION RENTALS below)
  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        <PlumeriaSymbolLogo
          variant={variant}
          className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Main Brand Name */}
        <h2 className={`font-serif text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] mt-3 ${textColor}`}>
          Plumeria
        </h2>

        {/* Subtitle with subtle flanking gold rules */}
        <div className="flex items-center gap-2 mt-1 w-full max-w-[200px] justify-center">
          <span className={`h-[1px] flex-1 ${lineBg}`} />
          <span className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap ${goldColor}`}>
            Vacation Rentals
          </span>
          <span className={`h-[1px] flex-1 ${lineBg}`} />
        </div>
      </div>
    );
  }

  // 2. Compact Horizontal Layout (Mobile viewports)
  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <PlumeriaSymbolLogo
          variant={variant}
          className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex flex-col justify-center">
          <span
            className={`font-serif text-[17px] leading-tight font-bold uppercase tracking-[0.12em] ${textColor}`}
          >
            Plumeria
          </span>
          <span
            className={`text-[8.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap mt-0.5 ${goldColor}`}
          >
            Vacation Rentals
          </span>
        </div>
      </div>
    );
  }

  // 3. Standard Horizontal Layout (Desktop Header & navigation bar)
  return (
    <div className={`flex items-center gap-3.5 group ${className}`}>
      <PlumeriaSymbolLogo
        variant={variant}
        className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif text-[19px] sm:text-[21px] leading-none font-bold uppercase tracking-[0.14em] ${textColor}`}
        >
          Plumeria
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap mt-1 ${goldColor}`}
        >
          Vacation Rentals
        </span>
      </div>
    </div>
  );
};
