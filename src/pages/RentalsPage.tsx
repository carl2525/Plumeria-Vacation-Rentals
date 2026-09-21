import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/rentals/PropertyCard';
import { Building2, Search, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { SITE_CONFIG } from '../config/site';

interface RentalsPageProps {
  onSelectProperty: (slug: string) => void;
  onInquireProperty: (propertyId: string) => void;
  onNavigate: (path: string) => void;
}

export const RentalsPage: React.FC<RentalsPageProps> = ({
  onSelectProperty,
  onInquireProperty,
  onNavigate,
}) => {
  const [selectedView, setSelectedView] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProperties = PROPERTIES.filter((p) => {
    // View filter
    if (selectedView !== 'all' && p.viewType !== selectedView) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      const matchAmenities = p.keyAmenities.some((a) => a.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchAmenities) return false;
    }
    return true;
  });

  return (
    <div className="relative pt-24 sm:pt-32 pb-20 sm:pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        {/* Page Hero Header */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-[0.2em] text-[#1A3B34]">
            <Building2 className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
            <span className="truncate">Plumeria Vacation Rentals · Waikiki Banyan Tower 2</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
            Waikiki Vacation Rentals at Waikiki Banyan
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Browse our handpicked collection of Waikiki condo rentals and short term rentals. Most vacation rentals in Waikiki force you to compromise: cramped kitchenettes, noisy street corners, or hidden $50/night resort fees. <strong className="text-[#1A3B34] font-semibold">Waikiki Banyan vacation rentals deliver what no other rental can:</strong> high-floor 557 sq. ft. 1-bedroom suites + 67 sq. ft. private lanais (624 sq. ft. total) with Full kitchens, 180° Diamond Head and mountain views, Oʻahu’s largest 1-acre resort deck, and a peaceful 1-block walk to Kuhio Beach. Reserve on Airbnb or send a direct booking inquiry for zero mandatory resort fees. Authorized Short-Term Rental License by the City and County of Honolulu.
          </p>
        </div>

        {/* Simplified Airbnb & Direct Booking Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed max-w-2xl">
            Our primary listings are on <strong className="text-[#1A3B34] font-semibold">Airbnb</strong>. Inquire directly on our website for our <strong className="text-[#1A3B34] font-semibold">$199/night</strong> promo rate, $0 resort fees, and free garage parking.
          </p>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              id="btn-rentals-airbnb-redirect"
              href={SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#FF385C]/35 text-[#FF385C] hover:bg-[#FF385C]/5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Book on Airbnb</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              id="btn-rentals-direct-inquiry"
              onClick={() => onInquireProperty('')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-white text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F6E7A7]" />
              <span>Inquire to Book</span>
            </button>
          </div>
        </div>

        {/* Simplified Filter & Search Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8DCC6] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A3B34]/40" />
            <input
              type="text"
              placeholder="Search features, views, or amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/40 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
          </div>

          {/* View Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => setSelectedView('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedView === 'all'
                  ? 'bg-[#1A3B34] text-white'
                  : 'bg-[#F9F7F2] text-[#1A3B34]/70 hover:text-[#1A3B34] border border-[#E8DCC6]'
              }`}
            >
              All Suites (2)
            </button>
            <button
              onClick={() => setSelectedView('Ocean View')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedView === 'Ocean View'
                  ? 'bg-[#1A3B34] text-white'
                  : 'bg-[#F9F7F2] text-[#1A3B34]/70 hover:text-[#1A3B34] border border-[#E8DCC6]'
              }`}
            >
              Ocean & Mountain (3205)
            </button>
            <button
              onClick={() => setSelectedView('Diamond Head & Sunset')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedView === 'Diamond Head & Sunset'
                  ? 'bg-[#1A3B34] text-white'
                  : 'bg-[#F9F7F2] text-[#1A3B34]/70 hover:text-[#1A3B34] border border-[#E8DCC6]'
              }`}
            >
              Diamond Head & Ocean (3609)
            </button>
            {(selectedView !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedView('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#C59B4B] hover:underline font-semibold px-2 py-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onInquire={onInquireProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-[#E8DCC6]">
            <PlumeriaSymbolLogo className="w-12 h-12 mx-auto opacity-40" />
            <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
              No suites matched your exact filter combination
            </h3>
            <p className="text-sm text-[#1A3B34]/70 max-w-md mx-auto">
              Try adjusting your view type or guest count filter, or submit an inquiry to discuss custom stay requirements with our team.
            </p>
            <button
              onClick={() => {
                setSelectedView('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#1A3B34] text-white hover:bg-[#224D44] transition-colors cursor-pointer"
            >
              Show All Waikiki Banyan Suites
            </button>
          </div>
        )}

        {/* Building Perks Banner: Why Waikiki Banyan Outclasses Other Rentals */}
        <div className="bg-gradient-to-r from-[#1A3B34] via-[#224D44] to-[#2D6559] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg border border-[#8CA58A]/30">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#F6E7A7] font-bold">
              The Waikiki Banyan Advantage
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Amenities No Other Vacation Rental on Oʻahu Can Match
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl font-light leading-relaxed">
              Every reservation includes access to the 6th-floor 1-acre recreation oasis: heated swimming pool, therapeutic jet hot tubs, dry sauna, tennis & pickleball, 12 gas BBQs, children’s play park, and beach equipment inside your suite—all with $0 resort fees.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/waikiki-banyan')}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#C59B4B] text-[#1A3B34] hover:bg-[#D4A853] transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-sm inline-flex items-center justify-center gap-1.5"
          >
            <span>Why Banyan is Better</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
