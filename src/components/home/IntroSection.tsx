import React from 'react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { LogoWatermark } from '../brand/LogoWatermark';
import { Sparkles, Utensils, SunMedium, Waves } from 'lucide-react';
import { AppImage } from '../common/AppImage';

interface IntroSectionProps {
  onLearnMore: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onLearnMore }) => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#F9F7F2]">
      {/* Subtle Plumeria Symbol Watermark in Background */}
      <LogoWatermark size="xl" position="top-right" opacity="opacity-[0.05] sm:opacity-[0.08]" />
      <LogoWatermark size="lg" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/50 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Plumeria Vacation Rentals · The Waikiki Banyan Advantage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
              Why our Waikiki condo rentals outclass ordinary vacation rentals.
            </h2>

            <p className="text-base sm:text-lg text-[#1A3B34]/85 font-light leading-relaxed">
              When searching for a Waikiki vacation rental, travelers usually face a frustrating dilemma: cramped 280 sq. ft. hotel rooms with zero kitchen facilities and $50/day surprise resort fees, or aging walk-up rentals with zero amenities.
            </p>

            <p className="text-sm sm:text-base text-[#1A3B34]/80 leading-relaxed font-light">
              <strong className="font-semibold text-[#1A3B34]">Waikiki Banyan vacation rentals give you the best of both worlds:</strong> spacious 550 sq. ft. private 1-bedroom suites with full chef-ready kitchens and private ocean-breeze lanais, paired with Oʻahu’s largest 1-acre resort recreation deck (heated pool, 2 jet spas, sauna, tennis/pickleball, and sunset BBQ grills). When you book direct in Waikiki with Plumeria Vacation Rentals, you secure the finest Waikiki short term rentals with zero hidden fees.
            </p>

            {/* 3 Quick Highlight Pills matching Brand Palette */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#7FB6D9]/20 text-[#1A3B34] flex items-center justify-center">
                  <Waves className="w-4 h-4 text-[#1A3B34]" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#1A3B34]">1-Acre Resort Deck</h3>
                <p className="text-xs text-[#1A3B34]/70">Heated pool, 2 hot tubs, sauna, tennis & BBQ pavilion</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#F6E7A7]/40 text-[#C59B4B] flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-[#C59B4B]" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#1A3B34]">Full Chef Kitchen</h3>
                <p className="text-xs text-[#1A3B34]/70">Save $200+/day by cooking fresh poke & breakfasts</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#8CA58A]/20 text-[#1A3B34] flex items-center justify-center">
                  <SunMedium className="w-4 h-4 text-[#8CA58A]" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#1A3B34]">3-Min Beach Walk</h3>
                <p className="text-xs text-[#1A3B34]/70">Calm Kuhio Beach 1 block away; no street noise</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
              <AppImage
                src="https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80"
                alt="Waikiki Banyan tropical scenery and ocean breeze"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3B34]/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6E7A7]">
                  Waikiki Banyan Community
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold leading-snug">
                  “Stay at Waikiki Banyan. Experience Waikiki with Plumeria.”
                </p>
                <p className="text-xs text-white/80">
                  Honolulu, Oʻahu, Hawaiʻi
                </p>
              </div>
            </div>

            {/* Floating Brand Badge */}
            <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E8DCC6] flex items-center gap-3">
              <PlumeriaSymbolLogo className="w-10 h-10 shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#1A3B34] block">True Island Hospitality</span>
                <span className="text-[11px] text-[#8CA58A] font-semibold">Direct Host Communication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

