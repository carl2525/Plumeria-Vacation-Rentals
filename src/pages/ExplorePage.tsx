import React, { useState, useEffect } from 'react';
import { WAIKIKI_DESTINATIONS } from '../data/waikikiGuide';
import {
  Compass,
  MapPin,
  Sparkles,
  Utensils,
  ArrowDown,
  ArrowRight,
  DollarSign,
  ExternalLink,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { AppImage } from '../components/common/AppImage';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { InlineLink } from '../components/common/InlineLink';
import { NearbyDiningsGuide } from '../components/dining/NearbyDiningsGuide';

interface ExplorePageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Detect hash changes like #dining or #nearby-dining-guide
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('dining')) {
        setSelectedCategory('dining');
        setTimeout(() => {
          const el = document.getElementById('nearby-dining-guide');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const categories = [
    { id: 'all', label: 'All Waikiki & Oʻahu' },
    { id: 'reservations', label: '⚡ Requires Reservation (Priority)', isReservationFilter: true },
    { id: 'dining', label: 'Nearby Dinings & Pricing Guide', icon: Utensils, isSpecial: true },
    { id: 'beaches', label: 'Beaches & Ocean' },
    { id: 'activities', label: 'Surfing & Recreation' },
    { id: 'nature', label: 'Diamond Head & Hikes' },
    { id: 'shopping', label: 'Shopping & Nightlife' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? WAIKIKI_DESTINATIONS
      : selectedCategory === 'reservations'
      ? WAIKIKI_DESTINATIONS.filter((item) => item.requiresReservation)
      : WAIKIKI_DESTINATIONS.filter((item) => item.category === selectedCategory);

  const scrollToDining = () => {
    if (selectedCategory !== 'all' && selectedCategory !== 'dining') {
      setSelectedCategory('dining');
    }
    setTimeout(() => {
      const el = document.getElementById('nearby-dining-guide');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

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
            Unlike other vacation rentals stuck in congested gridlock or remote corners with zero amenities, staying at{' '}
            <InlineLink to="/waikiki-banyan" onNavigate={onNavigate}>
              Waikiki Banyan
            </InlineLink>{' '}
            gives you the premier launchpad for your Hawaiʻi vacation: just 1 flat block to the calm surf of Kuhio Beach, effortless highway access for North Shore day trips, covered garage parking on site, and{' '}
            <InlineLink to="/rentals" onNavigate={onNavigate}>
              spacious 1-bedroom suites with full kitchens
            </InlineLink>
            .
          </p>

          {/* Quick Anchor Link to Dining Guide */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToDining}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#1A3B34] text-[#F6E7A7] hover:bg-[#234E45] transition-all cursor-pointer shadow-xs"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Jump to Calculated Nearby Dinings & Pricing Guide</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-[#1A3B34]/70 font-light hidden sm:inline">
              11 local spots · walking times · itemized meal calculator
            </span>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8DCC6] shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-[#1A3B34] text-white shadow-xs'
                      : cat.isSpecial
                      ? 'bg-[#C59B4B]/15 text-[#8A5A1C] border border-[#C59B4B]/40 hover:bg-[#C59B4B]/25 font-semibold'
                      : 'bg-[#F9F7F2] text-[#1A3B34]/80 hover:bg-[#E8DCC6]/50 border border-[#E8DCC6]'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#1A3B34]/60 font-medium px-2">
            {selectedCategory === 'dining'
              ? 'Showing Curated Dining & Pricing Guide'
              : `Showing ${filteredItems.length} curated destinations`}
          </span>
        </div>

        {/* VIEW 1: Dedicated Dining Guide View */}
        {selectedCategory === 'dining' && (
          <div className="space-y-8 animate-fadeIn">
            <NearbyDiningsGuide />
          </div>
        )}

        {/* VIEW 2: General Destinations (When not viewing dining-only) */}
        {selectedCategory !== 'dining' && (
          <div className="space-y-10">
            {/* Priority Reservation Advisory Banner */}
            <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-[#1A3B34] via-[#204940] to-[#2B5E53] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-[#C59B4B]/40">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-[#C59B4B]/20 text-[#F6E7A7] shrink-0 mt-0.5 border border-[#C59B4B]/30">
                  <Calendar className="w-5 h-5 text-[#F6E7A7]" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#C59B4B] text-[#1A3B34]">
                      Guest Priority Notice
                    </span>
                    <span className="text-xs text-[#F6E7A7] font-semibold">
                      Advance Reservations Required
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Book Top 4 Sights in Advance: Diamond Head, Hanauma Bay, Kualoa Ranch & Ala Wai Golf
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-3xl">
                    These 4 world-renowned Oʻahu destinations require pre-booked entry permits, timed tour slots, or city tee-times. We recommend securing your reservations before arriving in Waikiki so you don't miss out!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory('reservations')}
                className="px-4 py-2.5 rounded-full text-xs font-bold bg-[#F6E7A7] hover:bg-white text-[#1A3B34] transition-all shrink-0 cursor-pointer shadow-xs whitespace-nowrap self-start md:self-center"
              >
                {selectedCategory === 'reservations' ? 'Showing 4 Priority Sights' : 'Filter 4 Priority Sights'}
              </button>
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredItems.map((item) => {
                const handleCardClick = () => {
                  if (item.backlinkUrl) {
                    window.open(item.backlinkUrl, '_blank', 'noopener,noreferrer');
                  } else if (item.id === 'kalakaua-dining') {
                    scrollToDining();
                  }
                };

                return (
                  <article
                    key={item.id}
                    onClick={handleCardClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick();
                      }
                    }}
                    className={`bg-white rounded-3xl overflow-hidden border ${
                      item.requiresReservation ? 'border-[#C59B4B]/70 shadow-sm' : 'border-[#E8DCC6]'
                    } hover:border-[#C59B4B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#C59B4B]/50`}
                    title={
                      item.backlinkUrl
                        ? `Click to view official guide: ${item.backlinkLabel || item.title}`
                        : item.id === 'kalakaua-dining'
                        ? 'Click to view Nearby Dining Calculator'
                        : item.title
                    }
                  >
                    {/* Image & Badges */}
                    <div className="relative aspect-16/10 overflow-hidden bg-[#1A3B34]/10 shrink-0">
                      <AppImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Header Badges: Single flex row to prevent any UI overlap */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#1A3B34] truncate shadow-xs">
                          {item.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.requiresReservation && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C59B4B] text-[#1A3B34] shadow-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#1A3B34]" />
                              <span>Reservation</span>
                            </span>
                          )}
                          {item.backlinkUrl && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1A3B34]/85 text-[#F6E7A7] backdrop-blur-md shadow-xs group-hover:bg-[#1A3B34] group-hover:text-white transition-colors border border-white/20">
                              <span>Guide</span>
                              <ExternalLink className="w-2.5 h-2.5 text-[#F6E7A7]" />
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-3 inset-x-3 text-white flex items-center justify-between text-xs pointer-events-none">
                        <span className="flex items-center gap-1 font-medium drop-shadow-sm truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
                          <span className="truncate">{item.distanceFromBanyan}</span>
                        </span>
                        {item.backlinkDomain && (
                          <span className="text-[10px] text-white/80 font-normal drop-shadow-sm shrink-0 ml-2">
                            {item.backlinkDomain}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-xl font-bold text-[#1A3B34] group-hover:text-[#C59B4B] transition-colors leading-snug">
                            {item.title}
                          </h3>
                          {item.backlinkUrl && (
                            <ExternalLink className="w-4 h-4 text-[#C59B4B] shrink-0 mt-1 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed font-light">
                          {item.description}
                        </p>

                        {/* Highlights Pills directly below description */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.highlightPills.map((h, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2.5 py-1 rounded-md bg-[#E8DCC6]/40 text-[#1A3B34] font-medium whitespace-nowrap"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Local Tip & Action Link */}
                      <div className="mt-auto pt-4 space-y-3">
                        <div className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-xs text-[#1A3B34]/80 space-y-1">
                          <span className="font-bold text-[#1A3B34] flex items-center gap-1.5 text-[11px]">
                            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
                            <span className="text-[#8CA58A] font-semibold">Host Insider Tip</span>
                          </span>
                          <p className="text-[11px] leading-relaxed text-[#1A3B34]/75">
                            {item.insiderTip}
                          </p>
                        </div>

                        {/* Direct Backlink Action Bar */}
                        {item.backlinkUrl ? (
                          <div className="pt-2 border-t border-[#E8DCC6]/60 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-[#1A3B34]/60 font-medium truncate">
                              Source: {item.backlinkDomain}
                            </span>
                            <a
                              href={item.backlinkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1A3B34] group-hover:bg-[#234E45] text-white hover:bg-[#C59B4B]! hover:text-[#1A3B34]! transition-all shrink-0 shadow-2xs"
                              title={item.backlinkLabel || `Visit ${item.title}`}
                            >
                              <span>{item.backlinkLabel ? 'Visit Guide' : 'Learn More'}</span>
                              <ExternalLink className="w-3 h-3 text-[#F6E7A7]" />
                            </a>
                          </div>
                        ) : item.id === 'kalakaua-dining' ? (
                          <div className="pt-2 border-t border-[#E8DCC6]/60 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-[#1A3B34]/60 font-medium">
                              11 Walking-Distance Spots
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToDining();
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C59B4B] hover:bg-[#F6E7A7] text-[#1A3B34] transition-all shrink-0 shadow-2xs cursor-pointer"
                            >
                              <span>Dining Calculator</span>
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* When 'all' is active, embed the full Calculated Nearby Dinings & Pricing Guide */}
            {selectedCategory === 'all' && (
              <div className="pt-10 border-t border-[#E8DCC6]">
                <NearbyDiningsGuide />
              </div>
            )}

            {/* When a specific subcategory is active (not 'all' and not 'dining'), provide a callout to the Dining Guide */}
            {selectedCategory !== 'all' && selectedCategory !== 'dining' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C59B4B]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-[#C59B4B]/15 text-[#8A5A1C]">
                      <Utensils className="w-4 h-4" />
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                      Hungry while exploring? Check out the Nearby Dinings & Pricing Guide
                    </h3>
                  </div>
                  <p className="text-xs text-[#1A3B34]/75 font-light">
                    11 spots within walking distance of Waikiki Banyan with real dish pricing, walking times, and our interactive meal budget estimator.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('dining')}
                  className="px-5 py-2.5 rounded-full bg-[#1A3B34] text-[#F6E7A7] text-xs font-semibold hover:bg-[#234E45] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Dining & Pricing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Home Base Callout Banner */}
        <div className="bg-[#E8DCC6]/30 p-8 sm:p-10 rounded-3xl border border-[#C59B4B]/30 text-center max-w-3xl mx-auto space-y-4">
          <PlumeriaSymbolLogo className="w-10 h-10 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#1A3B34]">
            Experience it all from Waikiki Banyan
          </h3>
          <p className="text-xs sm:text-sm text-[#1A3B34]/75 leading-relaxed font-light">
            With beach gear included in your suite, full kitchens for fresh local meals, and Waikiki's largest 1-acre resort recreation deck to unwind, Plumeria Vacation Rentals makes your island exploration seamless.
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
