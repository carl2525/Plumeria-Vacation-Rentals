import React from 'react';
import { HeartHandshake, MapPin, Coffee, Sparkles, Sun, ArrowRight } from 'lucide-react';

interface WhyBookWithPlumeriaProps {
  onNavigate?: (path: string) => void;
}

export const WhyBookWithPlumeria: React.FC<WhyBookWithPlumeriaProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-[#E8DCC6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/50 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>The Plumeria + Banyan Advantage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
            Why our guests never go back to standard Waikiki hotels.
          </h2>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            By pairing Waikiki Banyan’s premier resort amenities with Plumeria’s hand-curated high-floor Tower 2 suites, you experience the ultimate Oʻahu vacation stay.
          </p>
        </div>

        {/* 4 Cards Grid with Brand Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#F9F7F2] p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#8CA58A]/25 text-[#1A3B34] flex items-center justify-center">
                <Sun className="w-6 h-6 text-[#1A3B34]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                Twice the Living Space
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                557 sq. ft. true 1-bedroom suite + 67 sq. ft. private lanai (624 sq. ft. total) with closing doors, Full kitchen, and separate living room (sleeps up to 5 with 3 beds) vs cramped 280 sq. ft. hotel rooms.
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/rentals')}
                className="pt-3 text-xs font-bold text-[#1A3B34] hover:text-[#C59B4B] transition-colors inline-flex items-center gap-1 cursor-pointer border-t border-[#E8DCC6]/60 text-left"
              >
                <span>View 1-Bedroom Suites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-[#F9F7F2] p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#C59B4B]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                1-Acre Recreation Deck
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                Oʻahu’s largest condo-resort deck: heated pool, 2 jet hot tubs, dry sauna, tennis & pickleball, 12 gas BBQs, and children’s playground right on the 6th floor.
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/waikiki-banyan')}
                className="pt-3 text-xs font-bold text-[#1A3B34] hover:text-[#C59B4B] transition-colors inline-flex items-center gap-1 cursor-pointer border-t border-[#E8DCC6]/60 text-left"
              >
                <span>Explore Resort Deck</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-[#F9F7F2] p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#F6E7A7]/50 text-[#C59B4B] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-[#C59B4B]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                Sweet-Spot Location
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                Just 1 short block (3-minute flat walk) to the calm waters of Kuhio Beach, while buffered from loud late-night Kalākaua traffic noise for restful sleep.
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/explore')}
                className="pt-3 text-xs font-bold text-[#1A3B34] hover:text-[#C59B4B] transition-colors inline-flex items-center gap-1 cursor-pointer border-t border-[#E8DCC6]/60 text-left"
              >
                <span>Waikiki Neighborhood</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-[#F9F7F2] p-7 rounded-3xl border border-[#E8DCC6] shadow-xs hover:shadow-md transition-shadow space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#7FB6D9]/25 text-[#1A3B34] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#1A3B34]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                Zero Surprise Fees
              </h3>
              <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                No surprise $38–$65 daily resort/amenity fees or $43–$72/day parking fees at checkout. Covered garage parking ($0 fee), high-speed Wi-Fi, Tommy Bahama beach gear, and all recreation deck amenities are 100% included.
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/rental-policy')}
                className="pt-3 text-xs font-bold text-[#1A3B34] hover:text-[#C59B4B] transition-colors inline-flex items-center gap-1 cursor-pointer border-t border-[#E8DCC6]/60 text-left"
              >
                <span>Direct Rental Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Competitor Comparison Callout */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base font-bold text-[#1A3B34]">
              Comparing Plumeria to Sheraton or Hilton?
            </h4>
            <p className="text-xs sm:text-sm text-[#1A3B34]/75 font-light">
              See why our high-floor Tower 2 suites with free parking and $0 resort fees save you $3,800+ compared to Sheraton and Hilton.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate('/waikiki-banyan#full-comparison') : window.location.assign('#hotel-suite-comparison')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1A3B34] hover:bg-[#2A5D52] text-[#F6E7A7] font-semibold text-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>Compare Rates & Amenities</span>
          </button>
        </div>
      </div>
    </section>
  );
};

