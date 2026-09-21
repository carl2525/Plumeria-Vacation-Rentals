import React from 'react';
import { Users, Bed, Bath, MapPin, Eye, Calendar, Check } from 'lucide-react';
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
  const customHero = (() => {
    if (property.id !== 'wb-3205-t2') return null;
    try {
      const stored = localStorage.getItem('wb_3205_custom_photos');
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return parsed[1] || parsed[2] || null;
    } catch {
      return null;
    }
  })();

  return (
    <article
      id={`property-card-${property.slug}`}
      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DCC6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image & Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#1A3B34]/5">
        <AppImage
          src={customHero || property.heroImage}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges: Structured to guarantee zero text-wrapping or oval distortion on mobile */}
        <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-start justify-between gap-2 pointer-events-none">
          {/* Left View Badge: Responsive text and whitespace-nowrap prevents multi-line break */}
          <div className="min-w-0 shrink">
            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/95 backdrop-blur-md text-[#1A3B34] shadow-sm whitespace-nowrap border border-white/60">
              {property.viewType === '180° Diamond Head & Mountain View' ? (
                <>
                  <span className="sm:hidden">180° Mountain & Ocean</span>
                  <span className="hidden sm:inline">180° Diamond Head & Mountain View</span>
                </>
              ) : (
                property.viewType
              )}
            </span>
          </div>

          {/* Right Badges: Stacks vertically on mobile to keep horizontal width compact; row on desktop */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#1A3B34] text-[#F6E7A7] shadow-sm border border-[#C59B4B]/30 whitespace-nowrap">
              {property.unitNumber ? `Unit #${property.unitNumber}` : property.tower}
            </span>
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#FF385C] text-white shadow-sm whitespace-nowrap">
              Airbnb
            </span>
          </div>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs gap-2">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
            <span className="truncate">Waikiki Banyan · {property.floorLevel}</span>
          </div>
          <span className="text-[#F6E7A7] font-serif italic text-xs drop-shadow-sm font-medium shrink-0 whitespace-nowrap">
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
              className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34] group-hover:text-[#8CA58A] transition-colors cursor-pointer leading-snug"
            >
              {property.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#1A3B34]/75 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>

          {/* Quick Specs Row: Structured dividers prevent dangling bullet points on wrap */}
          <div className="flex items-center flex-wrap gap-y-1.5 text-[11px] sm:text-xs text-[#1A3B34]/80 font-medium pt-1">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap pr-2.5">
              <Users className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
              <span>{property.guestsMax} Guests</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 border-l border-[#E8DCC6]">
              <Bed className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
              <span>{property.bedrooms} Bed</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 border-l border-[#E8DCC6]">
              <Bath className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
              <span>{property.bathrooms} Bath</span>
            </span>
            {property.squareFeet && (
              <span className="inline-flex items-center gap-1 whitespace-nowrap pl-2.5 border-l border-[#E8DCC6] font-semibold text-[#1A3B34]">
                <span>{property.squareFeet}+{property.lanaiSquareFeet || 67} sq ft</span>
              </span>
            )}
          </div>

          {/* Key Amenities Preview: High-value, concise chips with checkmark that sit neatly on one line */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {property.keyAmenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-[#E8DCC6]/40 text-[#1A3B34] font-medium whitespace-nowrap inline-flex items-center gap-1.5 border border-[#E8DCC6]/60"
              >
                <Check className="w-3 h-3 text-[#C59B4B] shrink-0" />
                <span>{amenity}</span>
              </span>
            ))}
          </div>

          {/* Pricing & Direct Host Rate Highlight */}
          <div className="pt-2.5 pb-1 flex items-center justify-between border-t border-[#E8DCC6]/60">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-bold text-[#1A3B34]">$199</span>
              <span className="text-[11px] text-[#C59B4B] font-semibold">/ night promo</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1A3B34] text-[#F6E7A7] text-[10px] font-bold uppercase tracking-wider border border-[#C59B4B]/30">
              <span>$0 Resort Fees</span>
            </span>
          </div>
        </div>

        {/* Actions bottom: Guaranteed no text-breaking on buttons */}
        <div className="pt-4 border-t border-[#E8DCC6] flex items-center justify-between gap-2.5 sm:gap-3">
          <button
            id={`btn-view-details-${property.slug}`}
            onClick={() => onSelect(property.slug)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-[#1A3B34]/40 text-[#1A3B34] text-[11px] font-bold hover:bg-[#E8DCC6]/40 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-[#1A3B34] shrink-0" />
            <span>View Details</span>
          </button>

          <button
            id={`btn-inquire-${property.slug}`}
            onClick={() => onInquire(property.id)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#1A3B34] hover:bg-[#2A5D52] text-white text-[11px] font-bold transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-[#C59B4B]/30 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
            <span>Inquire to Book</span>
          </button>
        </div>
      </div>
    </article>
  );
};

