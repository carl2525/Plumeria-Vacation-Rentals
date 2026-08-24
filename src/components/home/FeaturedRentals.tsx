import React from 'react';
import { PROPERTIES } from '../../data/properties';
import { PropertyCard } from '../rentals/PropertyCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedRentalsProps {
  onSelectProperty: (slug: string) => void;
  onInquireProperty: (propertyId: string) => void;
  onViewAllRentals: () => void;
}

export const FeaturedRentals: React.FC<FeaturedRentalsProps> = ({
  onSelectProperty,
  onInquireProperty,
  onViewAllRentals,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#EAF7F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold text-[#F78D74] uppercase tracking-[0.3em] block">
              Curated Collection
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D274D] leading-tight">
              Featured at Waikiki Banyan
            </h2>

            <p className="text-sm sm:text-base text-[#0D274D]/75 font-light">
              Explore our boutique collection of 1-bedroom suites with private lanais, full kitchens, and resort amenities.
            </p>
          </div>

          <button
            id="view-all-rentals-header-btn"
            onClick={onViewAllRentals}
            className="text-[#186A9E] font-bold text-sm border-b-2 border-[#186A9E]/20 hover:border-[#186A9E] pb-1 transition-colors group self-start md:self-end cursor-pointer flex items-center gap-1.5"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROPERTIES.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              onInquire={onInquireProperty}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <button
            id="browse-all-suites-bottom-btn"
            onClick={onViewAllRentals}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#186A9E] text-[#0D274D] hover:text-white border border-[#EAF7F9] shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Browse All Waikiki Banyan Suites</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

