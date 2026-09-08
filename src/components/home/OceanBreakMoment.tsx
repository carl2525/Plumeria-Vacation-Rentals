import React from 'react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { AppImage } from '../common/AppImage';

export const OceanBreakMoment: React.FC = () => {
  return (
    <section className="relative min-h-[480px] sm:min-h-[560px] flex items-center justify-center overflow-hidden my-6">
      {/* Cinematic Full-Bleed Ocean Photo */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2200&q=85"
          alt="Surfers catching golden hour waves in Waikiki with turquoise Pacific waters"
          className="w-full h-full object-cover object-center scale-105"
          loading="lazy"
        />
        {/* Deep Pine & Ocean Teal Gradation */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3B34]/90 via-[#1A3B34]/50 to-[#1A3B34]/70" />
      </div>

      {/* Floating Minimal Copy */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center text-white space-y-5">
        <div className="w-12 h-12 mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center justify-center border border-[#C59B4B]/30">
          <PlumeriaSymbolLogo variant="white" className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
          Wake up in Waikiki.
        </h2>

        <p className="text-base sm:text-xl text-[#F6E7A7] font-light max-w-xl mx-auto leading-relaxed drop-shadow-sm">
          Ocean mornings. Sunset evenings. Everything in between is yours.
        </p>

        <div className="pt-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E8DCC6] font-semibold">
            One Block from the Ocean · Waikiki Banyan
          </span>
        </div>
      </div>
    </section>
  );
};

