import React, { useState } from 'react';
import { WAIKIKI_DESTINATIONS } from '../../data/waikikiGuide';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { AppImage } from '../common/AppImage';
import { LogoWatermark } from '../brand/LogoWatermark';

interface ExploreWaikikiSectionProps {
  onExploreMore: () => void;
}

export const ExploreWaikikiSection: React.FC<ExploreWaikikiSectionProps> = ({ onExploreMore }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Waikiki' },
    { id: 'beaches', label: 'Beach & Ocean' },
    { id: 'activities', label: 'Surfing & Parks' },
    { id: 'dining', label: 'Dining & Cafes' },
    { id: 'nature', label: 'Diamond Head & Scenic' },
    { id: 'shopping', label: 'Shopping & Culture' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? WAIKIKI_DESTINATIONS
      : WAIKIKI_DESTINATIONS.filter((item) => item.category === activeCategory);

  return (
    <section className="relative py-20 sm:py-28 bg-[#F9F7F2] border-t border-[#E8DCC6] overflow-hidden">
      {/* Decorative watermark */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/50 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
              <Compass className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Explore Waikiki & Oʻahu</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
              Beyond your front door.
            </h2>

            <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light">
              Unlike vacation rentals located deep inland or tucked along noisy thoroughfares, staying at Waikiki Banyan gives you the ultimate home base: just 1 block to Kuhio Beach, quick access out of the city, and Honolulu’s best dining and sights at your doorstep.
            </p>
          </div>

          <button
            id="explore-waikiki-header-link"
            onClick={onExploreMore}
            className="text-[#1A3B34] hover:text-[#8CA58A] font-bold text-sm border-b-2 border-[#C59B4B]/50 hover:border-[#8CA58A] pb-1 transition-colors group self-start md:self-end cursor-pointer flex items-center gap-1.5"
          >
            <span>Explore Complete Waikiki Guide</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1A3B34] text-white shadow-md'
                  : 'bg-white text-[#1A3B34]/80 hover:bg-[#E8DCC6]/40 border border-[#E8DCC6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#1A3B34]/10">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#1A3B34] shadow-xs">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#F6E7A7]" />
                    <span>{item.distanceFromBanyan}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-bold text-[#1A3B34] group-hover:text-[#8CA58A] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlight Pills */}
                  {item.highlightPills && item.highlightPills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.highlightPills.slice(0, 3).map((pill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#1A3B34]/5 text-[#1A3B34]/80 border border-[#1A3B34]/10"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Insider Tip Box */}
                <div className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-xs text-[#1A3B34]/80 space-y-1 mt-2">
                  <span className="font-bold text-[#1A3B34] flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-[#C59B4B]" />
                    <span>Banyan Guest Advantage</span>
                  </span>
                  <p className="line-clamp-2 text-[11px] leading-relaxed text-[#1A3B34]/75">
                    {item.insiderTip}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-12 text-center">
          <button
            id="explore-waikiki-bottom-cta"
            onClick={onExploreMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1A3B34] hover:bg-[#2A5D52] text-white shadow-lg transition-all cursor-pointer border border-[#C59B4B]/30"
          >
            <span>Explore Complete Waikiki Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

