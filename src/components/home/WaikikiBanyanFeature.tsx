import React from 'react';
import { MapPin, Waves, Home, Compass, ArrowRight, Check } from 'lucide-react';
import { AppImage } from '../common/AppImage';
import { LogoWatermark } from '../brand/LogoWatermark';

interface WaikikiBanyanFeatureProps {
  onLearnMore: () => void;
}

export const WaikikiBanyanFeature: React.FC<WaikikiBanyanFeatureProps> = ({ onLearnMore }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] relative overflow-hidden">
      {/* Decorative background aura & watermark */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-at-tr from-[#EAF7F9]/60 via-transparent to-transparent pointer-events-none" />
      <LogoWatermark size="xl" position="top-left" opacity="opacity-[0.04] sm:opacity-[0.07]" />
      <LogoWatermark size="2xl" position="bottom-right" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#186A9E]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <MapPin className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>Your Home in Waikiki</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D274D] leading-tight">
            Stay at Waikiki Banyan.
          </h2>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Positioned just one block from the famous surf and sand of Kuhio Beach, Waikiki Banyan serves as the ultimate launching pad for your Oʻahu adventures.
          </p>
        </div>

        {/* Feature Grid: 4 Core Informational Pillars matching logo colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 - Coral */}
          <div className="bg-white p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F78D74]/15 text-[#F78D74] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                Waikiki Location
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Stay in one of Honolulu’s most vibrant, recognizable vacation neighborhoods, framed by palm trees, dining, and the Pacific.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#F78D74] pt-2 block">
              201 ʻOhua Avenue, Waikiki
            </span>
          </div>

          {/* Pillar 2 - Turquoise */}
          <div className="bg-white p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4BB8C7]/20 text-[#186A9E] flex items-center justify-center">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                Beach Days
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Make Waikiki’s famous ocean lifestyle part of your daily rhythm. A 3-minute stroll takes you directly into warm, calm swimming waters.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#186A9E] pt-2 block">
              1 block to Kuhio & Queen’s Surf
            </span>
          </div>

          {/* Pillar 3 - Gold */}
          <div className="bg-white p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5B82E]/20 text-[#E59900] flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                Your Own Space
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Enjoy the flexibility of a full vacation rental: chef-ready kitchen, living room, private breezy lanai, and true privacy.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#D9822B] pt-2 block">
              Full kitchen + private balcony
            </span>
          </div>

          {/* Pillar 4 - Pacific Ocean Blue */}
          <div className="bg-white p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#186A9E]/15 text-[#186A9E] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                Explore Honolulu
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Use Waikiki Banyan as your central home base for experiencing Diamond Head, North Shore day trips, and island culinary gems.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#186A9E] pt-2 block">
              Central Oʻahu access
            </span>
          </div>
        </div>

        {/* Large Recreation Deck Spotlight Card */}
        <div className="bg-gradient-to-br from-[#0D274D] via-[#113B6B] to-[#186A9E] rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden relative border border-[#4BB8C7]/30">
          {/* Subtle background glow */}
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F78D74]">
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
                  <Check className="w-4 h-4 text-[#F5B82E] shrink-0" />
                  <span>Large Heated Swimming Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5B82E] shrink-0" />
                  <span>Two Soothing Jet Hot Tubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5B82E] shrink-0" />
                  <span>Dry Sauna & Shower Facilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5B82E] shrink-0" />
                  <span>Tennis & Pickleball Court</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5B82E] shrink-0" />
                  <span>Gas BBQ Picnic Pavilion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F5B82E] shrink-0" />
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
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5B82E] hover:bg-[#FCD575] text-[#0D274D] transition-all shadow-md cursor-pointer self-stretch sm:self-auto text-center justify-center"
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

