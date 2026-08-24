import React, { useState } from 'react';
import { WAIKIKI_DESTINATIONS } from '../data/waikikiGuide';
import {
  Compass,
  MapPin,
  Waves,
  Utensils,
  Mountain,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Sun,
} from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { AppImage } from '../components/common/AppImage';

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
    <div className="pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Block */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#4BB8C7]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <Compass className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>Local Oʻahu Guide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0D274D] leading-tight">
            Explore Waikiki & Beyond
          </h1>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            From sunrise surfs at Canoes to sunset poke bowls along Kalākaua Avenue, staying at <strong className="text-[#0D274D] font-medium">Waikiki Banyan</strong> places you within minutes of Honolulu’s most treasured beaches, trails, and local eateries.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#0D274D]/8 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#186A9E] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#0D274D]/80 hover:bg-[#EAF7F9] border border-[#0D274D]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#0D274D]/60 font-medium px-2">
            Showing {filteredItems.length} curated destinations
          </span>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#0D274D]/8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#0D274D]/10">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#0D274D]">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#F78D74]" />
                    <span>{item.distanceFromBanyan}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#0D274D] group-hover:text-[#186A9E] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Highlights and Tip */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlightPills.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#EAF7F9] text-[#186A9E] font-medium"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Local Tip */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#0D274D]/5 text-xs text-[#0D274D]/80 space-y-1">
                    <span className="font-bold text-[#186A9E] flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3 h-3 text-[#F5B82E]" />
                      <span>Host Insider Tip</span>
                    </span>
                    <p className="text-[11px] leading-relaxed text-[#0D274D]/75">
                      {item.insiderTip}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Home Base Callout Banner */}
        <div className="bg-[#FAF9F5] p-8 sm:p-10 rounded-3xl border border-[#0D274D]/10 text-center max-w-3xl mx-auto space-y-4">
          <PlumeriaSymbolLogo className="w-10 h-10 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#0D274D]">
            Experience it all from Waikiki Banyan
          </h3>
          <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed font-light">
            With beach gear included in your suite, full kitchens for fresh poke lunches, and a 6th-floor pool deck to unwind, Plumeria Vacation Rentals makes your island exploration seamless.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/rentals')}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#186A9E] hover:bg-[#0D274D] text-white shadow-md transition-all cursor-pointer"
            >
              Browse Available Suites
            </button>
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#0D274D] border border-[#0D274D]/15 hover:bg-[#EAF7F9] transition-all cursor-pointer"
            >
              Inquire About Dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
