import React from 'react';
import { MapPin, Waves, Home, Compass, ArrowRight, Check } from 'lucide-react';
import { AppImage } from '../common/AppImage';
import { LogoWatermark } from '../brand/LogoWatermark';

interface WaikikiBanyanFeatureProps {
  onLearnMore: () => void;
}

export const WaikikiBanyanFeature: React.FC<WaikikiBanyanFeatureProps> = ({ onLearnMore }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] relative overflow-hidden">
      {/* Decorative background aura & watermark */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-at-tr from-[#E8DCC6]/40 via-transparent to-transparent pointer-events-none" />
      <LogoWatermark size="xl" position="top-left" opacity="opacity-[0.04] sm:opacity-[0.07]" />
      <LogoWatermark size="2xl" position="bottom-right" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/50 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <MapPin className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Waikiki Banyan Vacation Rentals · The Gold Standard</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#1A3B34] leading-tight">
            The Waikiki Banyan Advantage
          </h2>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Discover why savvy Hawaiian travelers choose our Waikiki Banyan rentals over cramped beachfront hotels and standard Waikiki vacation rentals.
          </p>
        </div>

        {/* Feature Grid: 4 Core Advantages over other rentals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 - 1-Acre Deck */}
          <div className="bg-white p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7FB6D9]/25 text-[#1A3B34] flex items-center justify-center">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                1-Acre Resort Oasis
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                While ordinary condos offer little or no pool, Banyan’s 6th-floor deck features a heated swimming pool, 2 jet hot tubs, dry sauna, tennis & pickleball, and 12 gas BBQs.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#1A3B34] pt-2 block">
              Unmatched on Oʻahu
            </span>
          </div>

          {/* Pillar 2 - Full Kitchen */}
          <div className="bg-white p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F6E7A7]/50 text-[#C59B4B] flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                Full Kitchen & Lanai
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                Hotels charge $400/night for mini-fridges. Banyan suites give you a full stove, oven, refrigerator, and private lanai—saving families $200+ each day on dining.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#C59B4B] pt-2 block">
              Save $1,000+ per stay
            </span>
          </div>

          {/* Pillar 3 - Prime Beach Proximity */}
          <div className="bg-white p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                1 Block to Kuhio Beach
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                Enjoy flat, 3-minute walking access to the calmest swimming waters in Waikiki, while being peacefully tucked away from late-night Kalākaua traffic noise.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#C59B4B] pt-2 block">
              201 ʻOhua Avenue, Waikiki
            </span>
          </div>

          {/* Pillar 4 - Zero Resort Fees */}
          <div className="bg-white p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8CA58A]/25 text-[#1A3B34] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                Book Direct · $0 Fees
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                Book direct in Waikiki with Plumeria Vacation Rentals. No surprise $45–$65 daily fees at checkout. All pool, hot tub, sauna, tennis, and beach gear are 100% included.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#8CA58A] pt-2 block">
              100% Transparent pricing
            </span>
          </div>
        </div>

        {/* Large Recreation Deck Spotlight Card */}
        <div className="bg-gradient-to-br from-[#1A3B34] via-[#1A3B34]/95 to-[#2A5D52] rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden relative border border-[#C59B4B]/30">
          {/* Subtle background glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F6E7A7]">
                6th Floor Resort Amenities
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                One of Oʻahu’s Largest Condo-Resort Recreation Decks
              </h3>
              <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
                Spanning almost an entire acre on the 6th floor between Tower 1 and Tower 2, the Waikiki Banyan recreation deck offers an oasis of leisure after a day on the beach.
              </p>

              {/* Verified Amenity Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0" />
                  <span>Large Heated Swimming Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0" />
                  <span>Two Soothing Jet Hot Tubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0" />
                  <span>Dry Sauna & Shower Facilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0" />
                  <span>Tennis & Pickleball Court</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0" />
                  <span>Gas BBQ Picnic Pavilion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0" />
                  <span>Children’s Play Structure</span>
                </div>
              </div>
            </div>

            {/* Right side CTA & imagery */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-4">
              <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-16/10">
                <AppImage
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                  alt="Waikiki Banyan 6th floor pool and recreation sundeck"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                id="discover-waikiki-banyan-btn"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] transition-all shadow-md cursor-pointer self-stretch sm:self-auto text-center justify-center"
              >
                <span>Discover Waikiki Banyan Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

