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
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-32 sm:pt-38 pb-24 sm:pb-32 overflow-hidden bg-[#1A3B34]">
      {/* Background Image with subtle cinematic depth */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85"
          alt="Waikiki Beach turquoise Pacific ocean during golden morning light"
          className="w-full h-full object-cover object-center opacity-75"
        />
        {/* Layered Gradient Overlay for contrast & sleek atmosphere matching logo wave depths */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A3B34]/50 via-[#1A3B34]/65 to-[#1A3B34]/95" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-5 sm:space-y-6 mt-4 sm:mt-8">
        {/* Eyebrow badge with logo symbol */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-[#C59B4B]/50 rounded-full text-white text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg animate-fade-in">
          <PlumeriaSymbolLogo variant="white" className="w-5 h-5 shrink-0 drop-shadow-sm" />
          <span>Waikiki Vacation Rentals · Waikiki Banyan</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-2xl max-w-3xl mx-auto">
          Why Waikiki Banyan is <br className="hidden sm:inline" />
          <span className="italic font-light text-[#F6E7A7]">the better way to stay.</span>
        </h1>

        {/* Supporting Copy - Clean, concise & breathable */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 font-light leading-relaxed drop-shadow-sm">
          Spacious 1-bedroom condo suites with full kitchens, private lanais, and Oʻahu’s largest 1-acre resort deck—just 1 block to Kuhio Beach. Reserve on Airbnb or inquire direct with $0 resort fees.
        </p>

        {/* 3 Core Banyan Advantages Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold">
            ✦ 1-Acre 6th-Floor Resort Deck
          </span>
          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold">
            ✦ Full Chef-Ready Kitchen
          </span>
          <span className="px-3.5 py-1 rounded-full bg-[#C59B4B]/30 backdrop-blur-sm border border-[#C59B4B]/60 text-[#F6E7A7] text-xs font-semibold">
            ✦ Airbnb Listed · Inquire Direct
          </span>
        </div>

        {/* CTA Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            id="hero-explore-rentals-btn"
            onClick={onExploreRentals}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-[#C59B4B]/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#1A3B34]" />
            <span>Explore Our Rentals</span>
          </button>

          <button
            id="hero-book-stay-btn"
            onClick={onBookStay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md border border-[#8CA58A]/50 text-white hover:bg-white/20 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#F6E7A7]" />
            <span>Send Stay Inquiry</span>
          </button>
        </div>

        {/* Location Marker Pill */}
        <div className="pt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80 font-light">
          <MapPin className="w-4 h-4 text-[#C59B4B]" />
          <span>Waikiki Banyan · 201 ʻOhua Avenue · Honolulu, Oʻahu</span>
        </div>
      </div>

      {/* Wave transition base to #F9F7F2 (Ivory) */}
      <div className="absolute bottom-[-1px] left-0 right-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-16 text-[#F9F7F2]"
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

