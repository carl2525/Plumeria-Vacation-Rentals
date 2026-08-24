import React from 'react';
import { Users, Bed, Bath, MapPin, Eye, Calendar } from 'lucide-react';
import { Property } from '../../types';
import { AppImage } from '../common/AppImage';

interface PropertyCardProps {
  property: Property;
  onSelect: (slug: string) => void;
  onInquire: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onInquire,
}) => {
  return (
    <article
      id={`property-card-${property.slug}`}
      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAF7F9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image & Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#0D274D]/5">
        <AppImage
          src={property.heroImage}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-[#0D274D] shadow-sm">
            {property.viewType}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0D274D]/85 backdrop-blur-md text-white">
            {property.tower.includes('Tower 1') ? 'Tower 1' : 'Tower 2'}
          </span>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#F78D74]" />
            <span>Waikiki Banyan · {property.floorLevel}</span>
          </div>
          <span className="text-[#F5B82E] font-serif italic text-xs drop-shadow-sm">
            Verified Suite
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Title & Tagline */}
          <div className="flex justify-between items-start gap-2">
            <h3
              onClick={() => onSelect(property.slug)}
              className="font-serif text-lg sm:text-xl font-bold text-[#0D274D] group-hover:text-[#186A9E] transition-colors cursor-pointer leading-snug"
            >
              {property.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#0D274D]/75 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>

          {/* Quick Specs Pill Row */}
          <div className="flex items-center gap-3 text-[11px] text-[#0D274D]/70 font-medium pt-1">
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#186A9E]" />
              <span>{property.guestsMax} Guests</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#186A9E]" />
              <span>{property.bedrooms} Bed</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#186A9E]" />
              <span>{property.bathrooms} Bath</span>
            </span>
          </div>

          {/* Key Amenities preview */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {property.keyAmenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#EAF7F9] text-[#186A9E] font-medium"
              >
                ✓ {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Actions bottom */}
        <div className="pt-4 border-t border-[#EAF7F9] flex items-center justify-between gap-3">
          <button
            id={`btn-view-details-${property.slug}`}
            onClick={() => onSelect(property.slug)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-[#186A9E] text-[#186A9E] text-[11px] font-bold hover:bg-[#EAF7F9] transition-colors uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>View Details</span>
          </button>

          <button
            id={`btn-inquire-${property.slug}`}
            onClick={() => onInquire(property.id)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#186A9E] hover:bg-[#0D274D] text-white text-[11px] font-bold transition-colors uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F5B82E]" />
            <span>Check Dates</span>
          </button>
        </div>
      </div>
    </article>
  );
};

