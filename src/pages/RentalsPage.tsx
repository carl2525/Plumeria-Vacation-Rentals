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
  const [selectedTower, setSelectedTower] = useState<string>('all');
  const [minGuests, setMinGuests] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProperties = PROPERTIES.filter((p) => {
    // View filter
    if (selectedView !== 'all' && p.viewType !== selectedView) return false;
    // Tower filter
    if (selectedTower !== 'all') {
      if (selectedTower === 'tower1' && !p.tower.includes('Tower 1')) return false;
      if (selectedTower === 'tower2' && !p.tower.includes('Tower 2')) return false;
    }
    // Guest filter
    if (p.guestsMax < minGuests) return false;
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

        {/* Airbnb First & Direct Inquiry Clarification Banner - Fully Responsive */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C59B4B]/35 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-6">
          <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={SITE_CONFIG.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#FF385C] hover:bg-[#E00B41] text-white shadow-2xs whitespace-nowrap transition-colors cursor-pointer"
                title="View Plumeria listings on Airbnb"
              >
                <span>Airbnb First</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#1A3B34] text-[#F6E7A7] border border-[#C59B4B]/40 whitespace-nowrap">
                Promo $199 Base
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed">
              Our primary listings are on <strong className="text-[#1A3B34] font-semibold">Airbnb</strong>. Inquire directly on our website to receive our special promotional base rate (<strong className="text-[#1A3B34] font-semibold">$199/night in all units</strong>), $0 Resort fees, waived cleaning fee on 3+ nights, and free garage parking.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              id="btn-rentals-airbnb-redirect"
              href={SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF385C] hover:bg-[#E00B41] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Book on Airbnb</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              id="btn-rentals-direct-inquiry"
              onClick={() => onInquireProperty('')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3B34] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#224D44] transition-colors cursor-pointer shadow-xs border border-[#C59B4B]/30 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
              <span>Inquire to Book</span>
            </button>
          </div>
        </div>

        {/* Filter Bar Panel */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E8DCC6] shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A3B34]/40" />
              <input
                type="text"
                placeholder="Search by view, features, or amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl sm:rounded-2xl text-[#1A3B34] placeholder:text-[#1A3B34]/40 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
              />
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
              {/* View Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-[#1A3B34]/70 hidden sm:inline">View:</span>
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-xs font-medium bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Views</option>
                  <option value="Ocean View">Ocean View</option>
                  <option value="Mountain & City View">Mountain & City View</option>
                  <option value="Diamond Head & Sunset">Diamond Head View</option>
                  <option value="Partial Ocean & City">Partial Ocean</option>
                </select>
              </div>

              {/* Tower Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-[#1A3B34]/70 hidden sm:inline">Tower:</span>
                <select
                  value={selectedTower}
                  onChange={(e) => setSelectedTower(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-xs font-medium bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none cursor-pointer"
                >
                  <option value="all">Both Towers</option>
                  <option value="tower1">Tower 1 (Mauka/Ewa)</option>
                  <option value="tower2">Tower 2 (Makai/Diamond Head)</option>
                </select>
              </div>

              {/* Guests Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-[#1A3B34]/70 hidden sm:inline">Guests:</span>
                <select
                  value={minGuests}
                  onChange={(e) => setMinGuests(Number(e.target.value))}
                  className="w-full sm:w-auto px-3 py-2 text-xs font-medium bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none cursor-pointer"
                >
                  <option value={1}>1+ Guests</option>
                  <option value={2}>2+ Guests</option>
                  <option value={4}>4+ Guests</option>
                  <option value={5}>5+ Guests</option>
                  <option value={6}>6 Guests (Family)</option>
                </select>
              </div>

              {/* Reset button */}
              {(selectedView !== 'all' || selectedTower !== 'all' || minGuests > 1 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedView('all');
                    setSelectedTower('all');
                    setMinGuests(1);
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#C59B4B] hover:underline font-semibold py-1 px-2 cursor-pointer text-center sm:text-left"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#1A3B34]/60 pt-2 border-t border-[#E8DCC6]/60">
            <span>Showing {filteredProperties.length} suites at Waikiki Banyan</span>
            <span className="text-[#8CA58A] font-medium">All suites include private lanai & full kitchen</span>
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
                setSelectedTower('all');
                setMinGuests(1);
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
