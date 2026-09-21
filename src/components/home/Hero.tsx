import React from 'react';
import { Compass, Calendar, MapPin, Car, ExternalLink, Mountain, Maximize2, Award, Sparkles } from 'lucide-react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { AppImage } from '../common/AppImage';
import { SITE_CONFIG } from '../../config/site';

interface HeroProps {
  onExploreRentals: () => void;
  onBookStay: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRentals, onBookStay }) => {
  return (
    <section className="relative min-h-0 sm:min-h-screen flex items-center justify-center pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#F4F9F9]">
      {/* Background Image: Original Waikiki ocean & sky in full natural light & high clarity */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90"
          alt="Waikiki Beach turquoise Pacific ocean during golden morning light"
          className="w-full h-full object-cover object-center"
        />
        {/* Daylight gradient scrim - smooth even scrim on mobile, subtle radial backdrop on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/50 to-[#F9F7F2]/95 sm:from-white/45 sm:via-white/20 sm:to-[#F9F7F2]/95" />
        
        {/* Luminous focal backdrop on desktop only to avoid harsh egg-shape on portrait mobile */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl h-[560px] rounded-full [background:radial-gradient(ellipse_at_center,_rgba(255,255,255,0.85)_0%,_rgba(255,255,255,0.55)_45%,_rgba(255,255,255,0)_75%)] pointer-events-none" />
      </div>

      {/* Main Hero Content - Clean, elegant, high-contrast aesthetic with balanced vertical rhythm */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#1A3B34] space-y-3.5 sm:space-y-5">
        {/* Single Refined Eyebrow with Free Parking Highlight - Compact single line on mobile */}
        <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-md border border-[#C59B4B]/40 rounded-full text-xs text-[#1A3B34] shadow-xs">
          <div className="inline-flex items-center gap-1.5 shrink-0">
            <PlumeriaSymbolLogo variant="gold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px] sm:text-[11px] text-[#1A3B34]">Waikiki Banyan</span>
          </div>
          <span className="text-[#C59B4B]">·</span>
          <div className="inline-flex items-center gap-1 font-semibold text-[10.5px] sm:text-xs text-[#1A3B34] shrink-0">
            <Car className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
            <span>Free Covered Parking</span>
          </div>
          <span className="text-[#C59B4B] hidden md:inline">·</span>
          <span className="text-[#1A3B34]/75 hidden md:inline text-xs">1 Block to Beach</span>
        </div>

        {/* Main Headline - High-contrast botanical green with crisp readability */}
        <h1 className="font-serif text-[28px] xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1A3B34] leading-[1.18] sm:leading-[1.14] max-w-3xl mx-auto [text-shadow:_0_1px_3px_rgba(255,255,255,0.95),_0_2px_14px_rgba(255,255,255,0.9)]">
          Why Waikiki Banyan is <br className="hidden sm:inline" />
          <span className="italic font-medium text-[#1A3B34]">
            the better way to stay.
          </span>
        </h1>

        {/* Clean Supporting Copy with crisp text-shadow */}
        <p className="max-w-2xl mx-auto text-[13.5px] sm:text-lg text-[#1A3B34] font-medium leading-relaxed [text-shadow:_0_1px_3px_rgba(255,255,255,0.95),_0_2px_10px_rgba(255,255,255,0.85)] px-1 sm:px-0">
          Spacious 1-bedroom condo suites with Full kitchens, private lanais, and free covered garage parking—just 1 block to calm Kuhio Beach with $0 resort fees.
        </p>

        {/* Mobile View: Balanced 2x2 Bento Highlight Grid with full text fit */}
        <div className="grid grid-cols-2 gap-2 sm:hidden max-w-[340px] xs:max-w-sm mx-auto w-full pt-1">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/95 backdrop-blur-md border border-[#E8DCC6] rounded-xl text-left shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-[#7FB6D9]/20 text-[#1A3B34] flex items-center justify-center shrink-0 border border-[#7FB6D9]/40">
              <Mountain className="w-3 h-3 text-[#1A3B34]" />
            </div>
            <span className="font-serif font-bold text-[10.5px] xs:text-[11px] text-[#1A3B34] leading-tight whitespace-nowrap">
              180° Mountain View
            </span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/95 backdrop-blur-md border border-[#C59B4B]/40 rounded-xl text-left shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center shrink-0 border border-[#C59B4B]/40">
              <Maximize2 className="w-3 h-3 text-[#C59B4B]" />
            </div>
            <span className="font-serif font-bold text-[10.5px] xs:text-[11px] text-[#1A3B34] leading-tight whitespace-nowrap">
              600+ Sq. Ft. Suite
            </span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/95 backdrop-blur-md border border-[#E8DCC6] rounded-xl text-left shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-[#8CA58A]/20 text-[#1A3B34] flex items-center justify-center shrink-0 border border-[#8CA58A]/40">
              <Award className="w-3 h-3 text-[#1A3B34]" />
            </div>
            <span className="font-serif font-bold text-[10.5px] xs:text-[11px] text-[#1A3B34] leading-tight whitespace-nowrap">
              $0 Resort Fees
            </span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#1A3B34] border border-[#C59B4B]/50 rounded-xl text-left shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-[#C59B4B]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3 text-[#F6E7A7]" />
            </div>
            <span className="font-serif font-bold text-[10.5px] xs:text-[11px] text-[#F6E7A7] leading-tight whitespace-nowrap">
              $199 Promo Rate
            </span>
          </div>
        </div>

        {/* Desktop View: Horizontal Chips Row */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto pt-0.5 w-full">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md border border-[#E8DCC6] rounded-full text-xs text-[#1A3B34] shadow-xs">
            <div className="w-4 h-4 rounded-sm bg-[#7FB6D9]/20 text-[#1A3B34] flex items-center justify-center shrink-0 border border-[#7FB6D9]/40">
              <Mountain className="w-2.5 h-2.5 text-[#1A3B34]" />
            </div>
            <span className="font-serif font-bold text-[#1A3B34] tracking-tight whitespace-nowrap">
              180° Mountain View
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md border border-[#C59B4B]/40 rounded-full text-xs text-[#1A3B34] shadow-xs bg-gradient-to-b from-white to-[#FDFBF7]">
            <div className="w-4 h-4 rounded-sm bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center shrink-0 border border-[#C59B4B]/40">
              <Maximize2 className="w-2.5 h-2.5 text-[#C59B4B]" />
            </div>
            <span className="font-serif font-bold text-[#1A3B34] tracking-tight whitespace-nowrap">
              600+ Sq. Ft. in Total
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md border border-[#E8DCC6] rounded-full text-xs text-[#1A3B34] shadow-xs">
            <div className="w-4 h-4 rounded-sm bg-[#8CA58A]/20 text-[#1A3B34] flex items-center justify-center shrink-0 border border-[#8CA58A]/40">
              <Award className="w-2.5 h-2.5 text-[#1A3B34]" />
            </div>
            <span className="font-serif font-bold text-[#1A3B34] tracking-tight whitespace-nowrap">
              Best Value vs Hotels
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1A3B34] border border-[#C59B4B]/50 rounded-full text-xs text-[#F6E7A7] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#F6E7A7] shrink-0" />
            <span className="font-serif font-bold tracking-tight whitespace-nowrap">
              $199 Promo · $0 Resort Fees
            </span>
          </div>
        </div>

        {/* CTA Actions: Mobile optimized 2-tier layout, Desktop horizontal row */}
        <div className="pt-1.5 max-w-sm sm:max-w-none mx-auto w-full">
          {/* Mobile CTAs: Primary top button + 2-col secondary actions */}
          <div className="sm:hidden space-y-2">
            <button
              id="hero-explore-rentals-mobile-btn"
              onClick={onExploreRentals}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] py-3 rounded-full font-bold text-sm tracking-wide shadow-md shadow-[#C59B4B]/20 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#1A3B34]" />
              <span>Explore Our Rentals</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                id="hero-airbnb-link-mobile-btn"
                href={SITE_CONFIG.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#FF385C] hover:bg-[#E00B41] text-white py-2.5 px-3 rounded-full font-bold text-xs shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span>Airbnb</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                id="hero-book-stay-mobile-btn"
                onClick={onBookStay}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#F9F7F2] border border-[#C59B4B] text-[#1A3B34] py-2.5 px-2 rounded-full font-bold text-xs shadow-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
                <span>Direct Inquiry</span>
              </button>
            </div>
          </div>

          {/* Desktop CTAs: 3 side-by-side elegant pills */}
          <div className="hidden sm:flex flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-explore-rentals-btn"
              onClick={onExploreRentals}
              className="inline-flex items-center justify-center gap-2.5 bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-md shadow-[#C59B4B]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#1A3B34]" />
              <span>Explore Our Rentals</span>
            </button>

            <a
              id="hero-airbnb-link-btn"
              href={SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FF385C] hover:bg-[#E00B41] text-white px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book on Airbnb</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              id="hero-book-stay-btn"
              onClick={onBookStay}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F9F7F2] border border-[#1A3B34]/20 text-[#1A3B34] px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm tracking-wide shadow-xs transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C59B4B]" />
              <span>Direct Booking Inquiry</span>
            </button>
          </div>
        </div>

        {/* Subtle Location Marker in a clean white glass pill */}
        <div className="pt-1 sm:pt-2 flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8DCC6] text-[11px] sm:text-[13px] text-[#1A3B34] font-medium shadow-xs">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59B4B] shrink-0" />
            <span className="sm:hidden">201 ʻOhua Ave · 1 Block to Waikiki Beach</span>
            <span className="hidden sm:inline">201 ʻOhua Avenue · Waikiki, Honolulu, Hawaiʻi</span>
          </div>
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


