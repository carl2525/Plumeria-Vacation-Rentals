import React from 'react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { Sparkles, HeartHandshake, Waves, Rainbow, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { LogoWatermark } from '../components/brand/LogoWatermark';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Our Island Story</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#1A3B34] leading-tight">
            Rooted in the feeling of Hawaiʻi.
          </h1>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Plumeria Vacation Rentals was founded to offer travelers a more personal, relaxing, and authentic way to experience Waikiki. We specialize in boutique Waikiki vacation rentals and Waikiki Banyan condo rentals—just 1 block from the ocean with direct booking privileges.
          </p>
        </div>

        {/* Narrative & Visual Composite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DCC6] shadow-xs">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34]">
              Why We Chose Waikiki Banyan Above All Other Vacation Rentals
            </h2>

            <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed">
              When founding Plumeria Vacation Rentals, we scouted every condo building and resort property across Honolulu. Most Waikiki short term rentals and vacation rental options force guests to sacrifice: cramped 280 sq. ft. studio layouts, zero kitchen facilities, noisy street traffic, or tiny postage-stamp pools.
            </p>

            <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed">
              <strong className="text-[#1A3B34] font-semibold">Waikiki Banyan vacation rentals proved to be indisputably superior to any other rental in Honolulu.</strong> Where else can you get a true 557 sq. ft. 1-bedroom suite with a 67 sq. ft. private lanai (624 sq. ft. total) framing 180° Diamond Head and mountain views, full chef kitchen, paired with Oʻahu’s largest 1-acre 6th-floor resort deck (heated pool, 2 jet hot tubs, dry sauna, tennis & pickleball, 12 gas BBQs), just 1 short block to Kuhio Beach—all with zero mandatory resort fees?
            </p>

            <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed">
              Combined with our personalized Plumeria care, clean linens, keyless entry, and included beach equipment, it offers the highest-value, most relaxing stay anywhere on the island.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1A3B34]/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8CA58A]" />
                <span>Smart Lock Keyless Access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8CA58A]" />
                <span>Professional Cleaning Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8CA58A]" />
                <span>Full Kitchens in Every Suite</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8CA58A]" />
                <span>Included Beach Gear</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-[#F9F7F2] border border-[#E8DCC6] text-center space-y-4 max-w-sm">
              <PlumeriaSymbolLogo className="w-24 h-24 mx-auto" />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  Plumeria Vacation Rentals
                </h3>
                <p className="text-xs text-[#8CA58A] font-medium">
                  Waikiki Banyan, Honolulu, HI
                </p>
              </div>
              <p className="text-xs text-[#1A3B34]/70 font-light italic leading-relaxed">
                “Stay at Waikiki Banyan. Experience Waikiki with Plumeria.”
              </p>
            </div>
          </div>
        </div>

        {/* The 4 Brand Symbols Meaning */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8CA58A]">
              Our Identity
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A3B34]">
              The Four Symbols in Our Logo
            </h2>
            <p className="text-sm text-[#1A3B34]/75 font-light">
              Each quadrant of our brand mark represents a fundamental element of the island experience you enjoy with Plumeria Vacation Rentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE_CONFIG.brandValues.map((val) => (
              <div
                key={val.title}
                className="bg-white p-7 rounded-3xl border border-[#E8DCC6] shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 flex items-center justify-center text-[#1A3B34]">
                    {val.symbol === 'plumeria' && <Sparkles className="w-6 h-6 text-[#C59B4B]" />}
                    {val.symbol === 'ocean' && <Waves className="w-6 h-6 text-[#7FB6D9]" />}
                    {val.symbol === 'rainbow' && <Rainbow className="w-6 h-6 text-[#C59B4B]" />}
                    {val.symbol === 'surf' && <Compass className="w-6 h-6 text-[#8CA58A]" />}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8CA58A]">
                    {val.symbol}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#1A3B34] border border-[#C59B4B]/30 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">
              Let us welcome you to Waikiki.
            </h3>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              Explore our collection of suites at Waikiki Banyan or send us a note with your travel dates.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/rentals')}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] transition-all shadow-md cursor-pointer font-bold"
            >
              Browse Rentals
            </button>
            <button
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-[#8CA58A]/40 transition-all cursor-pointer"
            >
              Send Stay Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
