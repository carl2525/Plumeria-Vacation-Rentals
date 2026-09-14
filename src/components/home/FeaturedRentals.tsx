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
    <section className="py-16 sm:py-24 bg-[#F9F7F2] border-b border-[#E8DCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-bold text-[#C59B4B] uppercase tracking-[0.3em] block">
              Superior Vacation Rental Living
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
              Why Our Waikiki Banyan Suites Beat Other Rentals
            </h2>

            <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light">
              Unlike typical vacation rentals with cramped quarters or zero resort amenities, our high-floor Tower 2 suites give you 557 sq. ft. of private comfort + 67 sq. ft. private lanais (624 sq. ft. total), full chef-ready kitchens, 180° Diamond Head and mountain vistas, and unrestricted access to Oʻahu’s 1-acre recreation deck—with zero mandatory resort fees.
            </p>
          </div>

          <button
            id="view-all-rentals-header-btn"
            onClick={onViewAllRentals}
            className="text-[#1A3B34] hover:text-[#8CA58A] font-bold text-sm border-b-2 border-[#C59B4B]/50 hover:border-[#8CA58A] pb-1 transition-colors group self-start md:self-end cursor-pointer flex items-center gap-1.5"
          >
            <span>View Both Suites</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Properties Grid - 2 High-Value Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROPERTIES.map((property) => (
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#1A3B34] text-[#1A3B34] hover:text-white border border-[#E8DCC6] shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Browse All Waikiki Banyan Suites</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

