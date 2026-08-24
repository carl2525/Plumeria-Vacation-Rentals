import React from 'react';
import { Compass, Calendar, MapPin, Sparkles } from 'lucide-react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { AppImage } from '../common/AppImage';

interface HeroProps {
  onExploreRentals: () => void;
  onBookStay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRentals, onBookStay }) => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#0D274D]">
      {/* Background Image with subtle cinematic depth */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85"
          alt="Waikiki Beach turquoise Pacific ocean during golden morning light"
          className="w-full h-full object-cover object-center opacity-75"
        />
        {/* Layered Gradient Overlay for contrast & sleek atmosphere matching logo wave depths */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#0D274D]/50 to-[#0D274D]/95" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 sm:space-y-8 mt-6 sm:mt-10">
        {/* Eyebrow badge with logo symbol */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-[#4BB8C7]/40 rounded-full text-white text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg animate-fade-in">
          <PlumeriaSymbolLogo className="w-4 h-4 shrink-0 drop-shadow-sm" />
          <span>Vacation Rentals at Waikiki Banyan · Honolulu, Hawaiʻi</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
          Your Waikiki stay <br className="hidden sm:inline" />
          <span className="italic font-light text-[#8EE3ED]">begins here.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-sm">
          Experience boutique Hawaiian hospitality at Waikiki Banyan. Ocean breezes, golden sands, and the heart of Waikiki at your doorstep.
        </p>

        {/* CTA Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            id="hero-explore-rentals-btn"
            onClick={onExploreRentals}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F5B82E] hover:bg-[#FCD575] text-[#0D274D] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-[#F5B82E]/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#0D274D]" />
            <span>Explore Our Rentals</span>
          </button>

          <button
            id="hero-book-stay-btn"
            onClick={onBookStay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md border border-[#4BB8C7]/40 text-white hover:bg-white/20 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#F5B82E]" />
            <span>View Availability</span>
          </button>
        </div>

        {/* Location Marker Pill */}
        <div className="pt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80 font-light">
          <MapPin className="w-4 h-4 text-[#F78D74]" />
          <span>Waikiki Banyan · 201 ʻOhua Avenue · Honolulu, Oʻahu</span>
        </div>
      </div>

      {/* Wave transition base to #FAF9F5 */}
      <div className="absolute bottom-[-1px] left-0 right-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-16 text-[#FAF9F5]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

