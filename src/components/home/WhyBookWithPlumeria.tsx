import React from 'react';
import { HeartHandshake, MapPin, Coffee, Sparkles, Sun } from 'lucide-react';

export const WhyBookWithPlumeria: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-[#EAF7F9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#186A9E]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#F78D74]" />
            <span>Why Stay With Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D274D] leading-tight">
            A vacation rental should feel like a vacation.
          </h2>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Plumeria Vacation Rentals bridges the gap between boutique hotel hospitality and the effortless freedom of having your own private Hawaiian suite.
          </p>
        </div>

        {/* 4 Cards Grid with Logo Quadrant Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FAF9F5] p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#4BB8C7]/20 text-[#186A9E] flex items-center justify-center">
              <Sun className="w-6 h-6 text-[#186A9E]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0D274D]">
              A more personal stay
            </h3>
            <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
              Vacation rentals with the space, kitchen conveniences, and private lanai of having your own Hawaiian home base.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#F5B82E]/20 text-[#E59900] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#E59900]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0D274D]">
              Waikiki at your doorstep
            </h3>
            <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
              Stay at Waikiki Banyan just one block from Kuhio Beach, Honolulu Zoo, and premier dining along Kalākaua Avenue.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#F78D74]/15 text-[#F78D74] flex items-center justify-center">
              <Coffee className="w-6 h-6 text-[#F78D74]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0D274D]">
              Made for island days
            </h3>
            <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
              Space to return to after beach mornings, surf sessions, and Oʻahu adventures—equipped with beach chairs and full kitchens.
            </p>
          </div>

          <div className="bg-[#FAF9F5] p-7 rounded-3xl border border-[#EAF7F9] shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#186A9E]/15 text-[#186A9E] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#186A9E]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0D274D]">
              Aloha from Plumeria
            </h3>
            <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
              Friendly host communication, seamless smart lock keyless check-in, and reliable local support throughout your stay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

