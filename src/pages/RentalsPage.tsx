import React, { useState } from 'react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/rentals/PropertyCard';
import { Building2, Filter, Users, Sparkles, MapPin, Check, Search } from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { LogoWatermark } from '../components/brand/LogoWatermark';

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
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Page Hero Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#4BB8C7]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <Building2 className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>Waikiki Banyan Listings</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0D274D] leading-tight">
            Our Waikiki Banyan Rentals
          </h1>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Every Plumeria Vacation Rental is located within the Waikiki Banyan resort complex (201 ʻOhua Avenue), featuring full chef-ready kitchens, private breezy lanais, air conditioning, and complete access to Oʻahu’s premier 6th-floor recreation deck.
          </p>
        </div>

        {/* Filter Bar Panel */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#0D274D]/8 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
              <input
                type="text"
                placeholder="Search by view, features, or amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F5] border border-[#0D274D]/10 rounded-2xl text-[#0D274D] placeholder:text-[#0D274D]/40 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* View Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0D274D]/70 hidden sm:inline">View:</span>
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="px-3 py-2 text-xs font-medium bg-[#FAF9F5] border border-[#0D274D]/10 rounded-xl text-[#0D274D] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Views</option>
                  <option value="Ocean View">Ocean View</option>
                  <option value="Mountain & City View">Mountain & City View</option>
                  <option value="Diamond Head & Sunset">Diamond Head View</option>
                  <option value="Partial Ocean & City">Partial Ocean</option>
                </select>
              </div>

              {/* Tower Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0D274D]/70 hidden sm:inline">Tower:</span>
                <select
                  value={selectedTower}
                  onChange={(e) => setSelectedTower(e.target.value)}
                  className="px-3 py-2 text-xs font-medium bg-[#FAF9F5] border border-[#0D274D]/10 rounded-xl text-[#0D274D] focus:outline-none cursor-pointer"
                >
                  <option value="all">Both Towers</option>
                  <option value="tower1">Tower 1 (Mauka/Ewa)</option>
                  <option value="tower2">Tower 2 (Makai/Diamond Head)</option>
                </select>
              </div>

              {/* Guests Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0D274D]/70 hidden sm:inline">Guests:</span>
                <select
                  value={minGuests}
                  onChange={(e) => setMinGuests(Number(e.target.value))}
                  className="px-3 py-2 text-xs font-medium bg-[#FAF9F5] border border-[#0D274D]/10 rounded-xl text-[#0D274D] focus:outline-none cursor-pointer"
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
                  className="text-xs text-[#186A9E] hover:underline font-semibold px-2 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#0D274D]/60 pt-2 border-t border-[#0D274D]/5">
            <span>Showing {filteredProperties.length} suites at Waikiki Banyan</span>
            <span className="text-[#186A9E] font-medium">All suites include private lanai & full kitchen</span>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-[#0D274D]/8">
            <PlumeriaSymbolLogo className="w-12 h-12 mx-auto opacity-40" />
            <h3 className="font-serif text-xl font-bold text-[#0D274D]">
              No suites matched your exact filter combination
            </h3>
            <p className="text-sm text-[#0D274D]/70 max-w-md mx-auto">
              Try adjusting your view type or guest count filter, or submit an inquiry to discuss custom stay requirements with our team.
            </p>
            <button
              onClick={() => {
                setSelectedView('all');
                setSelectedTower('all');
                setMinGuests(1);
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#186A9E] text-white hover:bg-[#0D274D] transition-colors cursor-pointer"
            >
              Show All Waikiki Banyan Suites
            </button>
          </div>
        )}

        {/* Building Perks Banner */}
        <div className="bg-gradient-to-r from-[#0D274D] to-[#186A9E] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#F5B82E] font-bold">
              Included in Every Reservation
            </span>
            <h3 className="font-serif text-2xl font-bold">
              Full Waikiki Banyan Resort Access
            </h3>
            <p className="text-sm text-white/80 max-w-xl font-light">
              6th-floor heated swimming pool, dual jet hot tubs, dry sauna, tennis & pickleball, gas BBQs, children’s play area, and beach equipment in your suite.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/waikiki-banyan')}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#0D274D] hover:bg-[#D4F2F5] transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Learn More About the Building
          </button>
        </div>
      </div>
    </div>
  );
};
