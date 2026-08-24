import React from 'react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { Sparkles, HeartHandshake, Waves, Rainbow, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#186A9E]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#F78D74]" />
            <span>Our Island Story</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D274D] leading-tight">
            Rooted in the feeling of Hawaiʻi.
          </h1>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Plumeria Vacation Rentals was founded to offer travelers a more personal, relaxing, and comfortable way to experience Waikiki. We specialize in well-maintained 1-bedroom suites at <strong className="text-[#0D274D] font-medium">Waikiki Banyan</strong>—just steps from the ocean.
          </p>
        </div>

        {/* Narrative & Visual Composite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#EAF7F9] shadow-sm">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D274D]">
              A warm welcome at Waikiki Banyan
            </h2>

            <p className="text-sm sm:text-base text-[#0D274D]/80 font-light leading-relaxed">
              We believe a vacation rental should feel like a true Hawaiian home base: bright morning sunlight, a private breeze on your lanai, fresh coffee prepared in your full kitchen, and an uncomplicated walk to the beach.
            </p>

            <p className="text-sm sm:text-base text-[#0D274D]/80 font-light leading-relaxed">
              Unlike large impersonal hotel chains, Plumeria Vacation Rentals provides direct, responsive host communication. From the moment you inquire until your keyless departure, we ensure your stay is clean, seamless, and filled with Aloha.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#0D274D]/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#186A9E]" />
                <span>Smart Lock Keyless Access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#186A9E]" />
                <span>Professional Cleaning Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#186A9E]" />
                <span>Full Kitchens in Every Suite</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#186A9E]" />
                <span>Included Beach Gear</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#EAF7F9] text-center space-y-4 max-w-sm">
              <PlumeriaSymbolLogo className="w-24 h-24 mx-auto" />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0D274D]">
                  Plumeria Vacation Rentals
                </h3>
                <p className="text-xs text-[#186A9E] font-medium">
                  Waikiki Banyan, Honolulu, HI
                </p>
              </div>
              <p className="text-xs text-[#0D274D]/70 font-light italic leading-relaxed">
                “Stay at Waikiki Banyan. Experience Waikiki with Plumeria.”
              </p>
            </div>
          </div>
        </div>

        {/* The 4 Brand Symbols Meaning */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#186A9E]">
              Our Identity
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0D274D]">
              The Four Symbols in Our Logo
            </h2>
            <p className="text-sm text-[#0D274D]/75 font-light">
              Each quadrant of our brand mark represents a fundamental element of the island experience you enjoy with Plumeria Vacation Rentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE_CONFIG.brandValues.map((val) => (
              <div
                key={val.title}
                className="bg-white p-7 rounded-3xl border border-[#EAF7F9] shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] flex items-center justify-center text-[#186A9E]">
                    {val.symbol === 'plumeria' && <Sparkles className="w-6 h-6 text-[#F5B82E]" />}
                    {val.symbol === 'ocean' && <Waves className="w-6 h-6 text-[#186A9E]" />}
                    {val.symbol === 'rainbow' && <Rainbow className="w-6 h-6 text-[#F78D74]" />}
                    {val.symbol === 'surf' && <Compass className="w-6 h-6 text-[#4BB8C7]" />}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#186A9E]">
                    {val.symbol}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#0D274D] border border-[#F5B82E]/30 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
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
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5B82E] hover:bg-[#FCD575] text-[#0D274D] transition-all shadow-md cursor-pointer font-bold"
            >
              Browse Rentals
            </button>
            <button
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-[#4BB8C7]/40 transition-all cursor-pointer"
            >
              Send Stay Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

