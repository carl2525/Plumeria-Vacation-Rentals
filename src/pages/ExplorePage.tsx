import React, { useState } from 'react';
import { WAIKIKI_DESTINATIONS } from '../data/waikikiGuide';
import {
  Compass,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { AppImage } from '../components/common/AppImage';
import { LogoWatermark } from '../components/brand/LogoWatermark';

interface ExplorePageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Waikiki & Oʻahu' },
    { id: 'beaches', label: 'Beaches & Ocean' },
    { id: 'activities', label: 'Surfing & Recreation' },
    { id: 'dining', label: 'Dining & Island Cafes' },
    { id: 'nature', label: 'Diamond Head & Hikes' },
    { id: 'shopping', label: 'Shopping & Nightlife' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? WAIKIKI_DESTINATIONS
      : WAIKIKI_DESTINATIONS.filter((item) => item.category === selectedCategory);

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Block */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <Compass className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Local Oʻahu Guide · The Superior Home Base</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A3B34] leading-tight">
            Why Waikiki Banyan is the Ultimate Oʻahu Home Base
          </h1>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Unlike other vacation rentals stuck in congested gridlock or remote corners with zero amenities, staying at <strong className="text-[#1A3B34] font-medium">Waikiki Banyan</strong> gives you the premier launchpad for your Hawaiʻi vacation: just 1 flat block to the calm surf of Kuhio Beach, effortless highway access for North Shore day trips, covered parking on site, and Waikiki’s finest restaurants within walking distance.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8DCC6] shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A3B34] text-white shadow-xs'
                    : 'bg-[#F9F7F2] text-[#1A3B34]/80 hover:bg-[#E8DCC6]/50 border border-[#E8DCC6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#1A3B34]/60 font-medium px-2">
            Showing {filteredItems.length} curated destinations
          </span>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#1A3B34]/10">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#1A3B34]">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B4B]" />
                    <span>{item.distanceFromBanyan}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#1A3B34] group-hover:text-[#8CA58A] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Highlights and Tip */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlightPills.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#E8DCC6]/40 text-[#1A3B34] font-medium"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Local Tip */}
                  <div className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-xs text-[#1A3B34]/80 space-y-1">
                    <span className="font-bold text-[#8CA58A] flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3 h-3 text-[#C59B4B]" />
                      <span>Host Insider Tip</span>
                    </span>
                    <p className="text-[11px] leading-relaxed text-[#1A3B34]/75">
                      {item.insiderTip}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Home Base Callout Banner */}
        <div className="bg-[#E8DCC6]/30 p-8 sm:p-10 rounded-3xl border border-[#C59B4B]/30 text-center max-w-3xl mx-auto space-y-4">
          <PlumeriaSymbolLogo className="w-10 h-10 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#1A3B34]">
            Experience it all from Waikiki Banyan
          </h3>
          <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed font-light">
            With beach gear included in your suite, full kitchens for fresh poke lunches, and a 6th-floor pool deck to unwind, Plumeria Vacation Rentals makes your island exploration seamless.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/rentals')}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#1A3B34] hover:bg-[#224D44] text-white shadow-md transition-all cursor-pointer border border-[#C59B4B]/30"
            >
              Browse Available Suites
            </button>
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#1A3B34] border border-[#E8DCC6] hover:bg-[#F9F7F2] transition-all cursor-pointer"
            >
              Inquire About Dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
