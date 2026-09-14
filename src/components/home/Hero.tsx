import React from 'react';
import { Compass, Calendar, MapPin, Car, ExternalLink, Mountain, Maximize2, Award } from 'lucide-react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { AppImage } from '../common/AppImage';
import { SITE_CONFIG } from '../../config/site';

interface HeroProps {
  onExploreRentals: () => void;
  onBookStay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRentals, onBookStay }) => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-[#F4F9F9]">
      {/* Background Image: Original Waikiki ocean & sky in full natural light & high clarity */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90"
          alt="Waikiki Beach turquoise Pacific ocean during golden morning light"
          className="w-full h-full object-cover object-center"
        />
        {/* Crisp daylight scrim - maintains lightness without blurring or hazing the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/15 to-[#F9F7F2]/95" />
      </div>

      {/* Main Hero Content - Clean, elegant, light aesthetic */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#1A3B34] space-y-4 sm:space-y-5 mt-2 sm:mt-4">
        {/* Single Refined Eyebrow with Free Parking Highlight (Mobile-friendly, no broken isolated lines) */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-md border border-[#C59B4B]/40 rounded-2xl sm:rounded-full text-xs text-[#1A3B34] shadow-sm min-h-[38px] sm:min-h-[40px]">
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <PlumeriaSymbolLogo variant="gold" className="w-4 h-4 shrink-0" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#1A3B34]">Waikiki Banyan</span>
          </div>
          <span className="text-[#C59B4B] hidden xs:inline">·</span>
          <div className="inline-flex items-center gap-1.5 font-bold whitespace-nowrap text-[11px] sm:text-xs text-[#1A3B34]">
            <Car className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
            <span>Free Covered Parking Included</span>
          </div>
          <span className="text-[#C59B4B] hidden md:inline">·</span>
          <span className="text-[#1A3B34]/75 hidden md:inline whitespace-nowrap text-[11px] sm:text-xs">1 Block to Beach</span>
        </div>

        {/* Main Headline - High-contrast botanical green with clear readability text-shadow */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1A3B34] leading-[1.14] max-w-3xl mx-auto [text-shadow:_0_1px_3px_rgba(255,255,255,0.95),_0_2px_14px_rgba(255,255,255,0.85)]">
          Why Waikiki Banyan is <br className="hidden sm:inline" />
          <span className="italic font-medium text-[#996D28] [text-shadow:_0_1px_2px_rgba(255,255,255,1),_0_2px_8px_rgba(255,255,255,0.95),_0_0_24px_rgba(255,255,255,0.95)]">
            the better way to stay.
          </span>
        </h1>

        {/* Clean Supporting Copy with crisp text-shadow */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#1A3B34] font-medium leading-relaxed [text-shadow:_0_1px_2px_rgba(255,255,255,0.95),_0_2px_10px_rgba(255,255,255,0.75)]">
          Spacious 1-bedroom condo suites with full chef kitchens, private lanais, and free covered garage parking—just 1 block to calm Kuhio Beach with $0 resort fees.
        </p>

        {/* 3 Separated Highlight Cards - Much smaller height and slim profile */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto pt-0.5 w-full">
          {/* Card 1: 180° Mountain View (sky-blue icon frame) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md border border-[#E8DCC6] rounded-full text-[11px] sm:text-xs text-[#1A3B34] shadow-2xs hover:shadow-xs transition-all duration-200">
            <div className="w-4 h-4 rounded-sm bg-[#7FB6D9]/20 text-[#1A3B34] flex items-center justify-center shrink-0 border border-[#7FB6D9]/40">
              <Mountain className="w-2.5 h-2.5 text-[#1A3B34]" />
            </div>
            <span className="font-serif font-bold text-[#1A3B34] tracking-tight whitespace-nowrap">
              180° Mountain View
            </span>
          </div>

          {/* Card 2: 600+ Sq. Ft. in Total (warm gold accent frame) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md border border-[#C59B4B]/40 rounded-full text-[11px] sm:text-xs text-[#1A3B34] shadow-2xs hover:shadow-xs transition-all duration-200 bg-gradient-to-b from-white to-[#FDFBF7]">
            <div className="w-4 h-4 rounded-sm bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center shrink-0 border border-[#C59B4B]/40">
              <Maximize2 className="w-2.5 h-2.5 text-[#C59B4B]" />
            </div>
            <span className="font-serif font-bold text-[#1A3B34] tracking-tight whitespace-nowrap">
              600+ Sq. Ft. in Total
            </span>
          </div>

          {/* Card 3: Best Value vs Hotels (sage green accent frame) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md border border-[#E8DCC6] rounded-full text-[11px] sm:text-xs text-[#1A3B34] shadow-2xs hover:shadow-xs transition-all duration-200">
            <div className="w-4 h-4 rounded-sm bg-[#8CA58A]/20 text-[#1A3B34] flex items-center justify-center shrink-0 border border-[#8CA58A]/40">
              <Award className="w-2.5 h-2.5 text-[#1A3B34]" />
            </div>
            <span className="font-serif font-bold text-[#1A3B34] tracking-tight whitespace-nowrap">
              Best Value vs Hotels
            </span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            id="hero-explore-rentals-btn"
            onClick={onExploreRentals}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-md shadow-[#C59B4B]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#1A3B34]" />
            <span>Explore Our Rentals</span>
          </button>

          <a
            id="hero-airbnb-link-btn"
            href={SITE_CONFIG.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF385C] hover:bg-[#E00B41] text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Book on Airbnb</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            id="hero-book-stay-btn"
            onClick={onBookStay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F9F7F2] border border-[#1A3B34]/20 text-[#1A3B34] px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-xs transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#C59B4B]" />
            <span>Direct Inquiry</span>
          </button>
        </div>

        {/* Subtle Location Marker (Clean inline, not a card) */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#1A3B34]/80 font-medium [text-shadow:_0_1px_2px_rgba(255,255,255,0.9)]">
          <MapPin className="w-3.5 h-3.5 text-[#C59B4B]" />
          <span>201 ʻOhua Avenue · Waikiki, Honolulu, Hawaiʻi</span>
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


