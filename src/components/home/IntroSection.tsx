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
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#FAF9F5]">
      {/* Subtle Plumeria Symbol Watermark in Background */}
      <LogoWatermark size="xl" position="top-right" opacity="opacity-[0.05] sm:opacity-[0.08]" />
      <LogoWatermark size="lg" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#186A9E]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span>Aloha from Waikiki</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D274D] leading-tight">
              A Hawaiian home base for your Waikiki adventure.
            </h2>

            <p className="text-base sm:text-lg text-[#0D274D]/85 font-light leading-relaxed">
              At <strong className="font-medium text-[#0D274D]">Plumeria Vacation Rentals</strong>, we specialize in welcoming, comfortable short-term stays at <strong className="font-medium text-[#186A9E]">Waikiki Banyan</strong>. Whether you are traveling for morning surf sessions, family beach days, or Oʻahu road trips, our suites offer the space, comfort, and independence of a true island home.
            </p>

            <p className="text-sm sm:text-base text-[#0D274D]/75 leading-relaxed">
              Skip the cramped hotel room. Step onto your private breezy lanai, whip up fresh island fruit in your full kitchen, and walk just one block to the warm turquoise waters of Kuhio Beach.
            </p>

            {/* 3 Quick Highlight Pills matching Logo Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white border border-[#EAF7F9] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#4BB8C7]/20 text-[#186A9E] flex items-center justify-center">
                  <Waves className="w-4 h-4 text-[#186A9E]" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0D274D]">1 Block to Beach</h3>
                <p className="text-xs text-[#0D274D]/70">Short 3-minute stroll to Kuhio & Queen’s Surf</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAF7F9] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#F5B82E]/20 text-[#E59900] flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-[#E59900]" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0D274D]">Full Kitchens</h3>
                <p className="text-xs text-[#0D274D]/70">Stove, oven, fridge & cookware in every suite</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#EAF7F9] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#F78D74]/15 text-[#F78D74] flex items-center justify-center">
                  <SunMedium className="w-4 h-4 text-[#F78D74]" />
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0D274D]">Private Lanais</h3>
                <p className="text-xs text-[#0D274D]/70">Covered balcony with ocean & mountain breezes</p>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D274D]/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5B82E]">
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
            <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl border border-[#EAF7F9] flex items-center gap-3">
              <PlumeriaSymbolLogo className="w-10 h-10 shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#0D274D] block">True Island Hospitality</span>
                <span className="text-[11px] text-[#186A9E] font-medium">Direct Host Communication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

