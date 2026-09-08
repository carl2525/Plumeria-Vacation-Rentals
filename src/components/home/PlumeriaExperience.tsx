import React from 'react';
import { Sparkles, Waves, Rainbow } from 'lucide-react';

export const PlumeriaExperience: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] border-t border-[#E8DCC6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/50 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>The Plumeria Spirit</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A3B34] leading-tight">
            Rooted in the feeling of Hawaiʻi.
          </h2>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Our visual identity is drawn directly from what makes Waikiki magical: the fragrant plumeria bloom, the rolling ocean swells, the island rainbow, and the joyful surf culture.
          </p>
        </div>

        {/* 4 Editorial Cards Grid matching Brand Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Plumeria (Warm Gold & Cream) */}
          <div className="group bg-white rounded-3xl p-7 border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C59B4B]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                  <path d="M12 2C13.5 6 16 7 20 8C16 9.5 14.5 12 14 16C12.5 12 10 10.5 6 10C10 8.5 11.5 6 12 2Z" fill="#F6E7A7" fillOpacity="0.8" stroke="#C59B4B" />
                  <circle cx="12" cy="9" r="2" fill="#C59B4B" />
                </svg>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C59B4B]">
                  Hospitality & Care
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                  Plumeria
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                <strong className="font-semibold text-[#1A3B34]">A warm island welcome.</strong> Thoughtful host communication, fresh linens, spotless suites, and the unmistakable spirit of Aloha greeting you on arrival.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8DCC6] text-[11px] font-medium text-[#1A3B34]/60">
              Symbol of hospitality & comfort
            </div>
          </div>

          {/* Card 2: Ocean (Ocean Blue) */}
          <div className="group bg-white rounded-3xl p-7 border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#7FB6D9]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7FB6D9]/25 text-[#1A3B34] flex items-center justify-center">
                <Waves className="w-6 h-6 text-[#1A3B34]" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A3B34]">
                  The Pacific
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                  Ocean
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                <strong className="font-semibold text-[#1A3B34]">Waikiki is calling.</strong> The sound of rhythmic shorebreaks, morning swims in calm waters, and watching golden sun dips into the Pacific from your lanai.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8DCC6] text-[11px] font-medium text-[#1A3B34]/60">
              Symbol of renewal & energy
            </div>
          </div>

          {/* Card 3: Rainbow (Brand Gradient) */}
          <div className="group bg-white rounded-3xl p-7 border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C59B4B] via-[#8CA58A] to-[#7FB6D9]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F6E7A7]/50 text-[#C59B4B] flex items-center justify-center">
                <Rainbow className="w-6 h-6 text-[#C59B4B]" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C59B4B]">
                  Island Colors
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                  Rainbow
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                <strong className="font-semibold text-[#1A3B34]">Made in the colors of Hawaiʻi.</strong> Anāʻanapu—the afternoon sun showers over the Koʻolau mountains that paint vibrant rainbow arcs directly across Waikiki.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8DCC6] text-[11px] font-medium text-[#1A3B34]/60">
              Symbol of hope & beauty
            </div>
          </div>

          {/* Card 4: Surf (Sage Green) */}
          <div className="group bg-white rounded-3xl p-7 border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8CA58A]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8CA58A]/25 text-[#1A3B34] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-[#1A3B34]">
                  <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(30 12 12)" />
                  <line x1="8" y1="5" x2="16" y2="19" />
                </svg>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8CA58A]">
                  Lifestyle & Heritage
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                  Surf
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                <strong className="font-semibold text-[#1A3B34]">Live the Waikiki lifestyle.</strong> Walk barefoot from Waikiki Banyan with your board, catch gentle rolls at Canoes, and soak in the effortless outdoor island pace.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8DCC6] text-[11px] font-medium text-[#1A3B34]/60">
              Symbol of adventure & joy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

