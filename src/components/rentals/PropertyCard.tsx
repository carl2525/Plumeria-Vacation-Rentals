import React from 'react';
import { Users, Bed, Bath, MapPin, Eye, Calendar, Check, ExternalLink, Car, Sparkles } from 'lucide-react';
import { Property } from '../../types';
import { AppImage } from '../common/AppImage';
import { SITE_CONFIG } from '../../config/site';

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

  const isUnavailable = property.available === false;

  return (
    <article
      id={`property-card-${property.slug}`}
      className={`group rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between border ${
        isUnavailable
          ? 'bg-neutral-100/90 border-neutral-300/80 shadow-none hover:border-neutral-400'
          : 'bg-white border-[#E8DCC6] shadow-xs hover:shadow-xl'
      }`}
    >
      {/* Image & Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#1A3B34]/5">
        <AppImage
          src={customHero || property.heroImage}
          alt={property.name}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isUnavailable
              ? 'grayscale contrast-90 brightness-75 group-hover:grayscale-[0.6] group-hover:brightness-85'
              : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Unavailable full-dim blacked-out overlay badge */}
        {isUnavailable && (
          <div className="absolute inset-0 bg-neutral-950/45 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 z-10 pointer-events-none">
            <div className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-neutral-900/95 border border-white/20 text-white shadow-2xl flex items-center gap-2.5 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
              <div className="text-left">
                <span className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-rose-300">
                  Not Available as of the Moment
                </span>
                <span className="block text-[10px] sm:text-[11px] text-white/70 font-light">
                  Unit #3609 · Reservations Paused
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Top Badges: Structured to guarantee zero text-wrapping or oval distortion on mobile */}
        <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-start justify-between gap-2 pointer-events-none z-20">
          {/* Left View Badge: Responsive text and whitespace-nowrap prevents multi-line break */}
          <div className="min-w-0 shrink">
            <span
              className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-sm whitespace-nowrap border ${
                isUnavailable
                  ? 'bg-neutral-800/90 text-neutral-300 border-neutral-700'
                  : 'bg-white/95 text-[#1A3B34] border-white/60'
              }`}
            >
              {property.viewType.includes('Mountain') ? (
                <>
                  <span className="sm:hidden">Beach, Ocean & Mountain</span>
                  <span className="hidden sm:inline">Beach, Ocean & Mountain View</span>
                </>
              ) : (
                property.viewType
              )}
            </span>
          </div>

          {/* Right Badges: Stacks vertically on mobile to keep horizontal width compact; row on desktop */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
            <span
              className={`inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap border ${
                isUnavailable
                  ? 'bg-neutral-800 text-neutral-300 border-neutral-600'
                  : 'bg-[#1A3B34] text-[#F6E7A7] border-[#C59B4B]/30'
              }`}
            >
              {property.unitNumber ? `Unit #${property.unitNumber}` : property.tower}
            </span>
            <a
              href={property.airbnbUrl || SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View on Airbnb"
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap transition-colors cursor-pointer pointer-events-auto ${
                isUnavailable
                  ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200'
                  : 'bg-[#FF385C] hover:bg-[#E00B41] text-white'
              }`}
            >
              <span>Airbnb</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs gap-2 z-20">
          <div className="flex items-center gap-1 font-medium drop-shadow-sm min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
            <span className="truncate">Waikiki Banyan · {property.floorLevel}</span>
          </div>
          <span
            className={`font-serif italic text-xs drop-shadow-sm font-medium shrink-0 whitespace-nowrap ${
              isUnavailable ? 'text-neutral-300' : 'text-[#F6E7A7]'
            }`}
          >
            {isUnavailable ? 'Inactive Suite' : 'Verified Suite'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className={`p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between ${
        isUnavailable ? 'bg-neutral-100/60' : ''
      }`}>
        <div className="space-y-2.5">
          {/* Title & Tagline */}
          <div className="flex justify-between items-start gap-2">
            <h3
              onClick={() => onSelect(property.slug)}
              className={`font-serif text-lg sm:text-xl font-bold transition-colors cursor-pointer leading-snug ${
                isUnavailable
                  ? 'text-neutral-600 hover:text-neutral-800'
                  : 'text-[#1A3B34] group-hover:text-[#8CA58A]'
              }`}
            >
              <span>{property.name}</span>
              {isUnavailable && (
                <span className="ml-2 inline-block text-[10.5px] font-sans font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200 uppercase tracking-wider align-middle">
                  Not Available
                </span>
              )}
            </h3>
          </div>

          {/* Official Hawaii Tax Registration: TMK & TAT */}
          {(property.taxMapKey || property.transientTaxId) && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10.5px] text-[#1A3B34] bg-[#F9F7F2] border border-[#E8DCC6] px-2.5 py-1 rounded-lg w-fit">
              {property.taxMapKey && (
                <span className="font-medium">
                  <span className="text-[#1A3B34]/70">TMK:</span>{' '}
                  <strong className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#1A3B34]">
                    {property.taxMapKey}
                  </strong>
                </span>
              )}
              {property.taxMapKey && property.transientTaxId && (
                <span className="text-[#1A3B34]/30">·</span>
              )}
              {property.transientTaxId && (
                <span className="font-medium">
                  <span className="text-[#1A3B34]/70">TAT:</span>{' '}
                  <strong className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#1A3B34]">
                    {property.transientTaxId}
                  </strong>
                </span>
              )}
            </div>
          )}

          <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
            isUnavailable ? 'text-neutral-500' : 'text-[#1A3B34]/75'
          }`}>
            {property.shortDescription}
          </p>

          {/* Quick Specs Row */}
          <div className={`flex items-center flex-wrap gap-y-1.5 text-[11px] sm:text-xs font-medium pt-1 ${
            isUnavailable ? 'text-neutral-500' : 'text-[#1A3B34]/80'
          }`}>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap pr-2.5">
              <Users className={`w-3.5 h-3.5 shrink-0 ${isUnavailable ? 'text-neutral-400' : 'text-[#8CA58A]'}`} />
              <span>2 Guests Max</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 border-l border-neutral-300">
              <Bed className={`w-3.5 h-3.5 shrink-0 ${isUnavailable ? 'text-neutral-400' : 'text-[#8CA58A]'}`} />
              <span>{property.bedrooms} Bedroom · {property.beds} Beds</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 border-l border-neutral-300">
              <Bath className={`w-3.5 h-3.5 shrink-0 ${isUnavailable ? 'text-neutral-400' : 'text-[#8CA58A]'}`} />
              <span>{property.bathrooms} Bath</span>
            </span>
            {property.squareFeet && (
              <span className={`inline-flex items-center gap-1 whitespace-nowrap pl-2.5 border-l border-neutral-300 font-semibold ${
                isUnavailable ? 'text-neutral-600' : 'text-[#1A3B34]'
              }`}>
                <span>{property.squareFeet}+{property.lanaiSquareFeet || 67} sq ft</span>
              </span>
            )}
          </div>

          {/* Key Amenities Preview */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {property.keyAmenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap inline-flex items-center gap-1.5 border ${
                  isUnavailable
                    ? 'bg-neutral-200/50 text-neutral-500 border-neutral-300/80'
                    : 'bg-[#E8DCC6]/40 text-[#1A3B34] border-[#E8DCC6]/60'
                }`}
              >
                <Check className={`w-3 h-3 shrink-0 ${isUnavailable ? 'text-neutral-400' : 'text-[#C59B4B]'}`} />
                <span>{amenity}</span>
              </span>
            ))}
          </div>

          {/* Pricing & Direct Host Rate Highlight */}
          <div className={`pt-2.5 pb-1 flex items-center justify-between gap-2 border-t ${
            isUnavailable ? 'border-neutral-300' : 'border-[#E8DCC6]/60'
          }`}>
            {isUnavailable ? (
              <div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-serif text-lg font-bold text-neutral-400 line-through">$199*</span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-200 uppercase tracking-wider">
                    Reservations Paused
                  </span>
                </div>
                <span className="block text-[9.5px] text-neutral-500 font-medium">Currently unavailable for booking</span>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-1.5 shrink-0">
                  <span className="font-serif text-lg font-bold text-[#1A3B34]">$199*</span>
                  <span className="text-[11px] text-[#C59B4B] font-semibold">/ night promo</span>
                </div>
                <span className="block text-[9.5px] text-[#1A3B34]/65 font-medium">Valid until Oct 30</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {isUnavailable ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-600 text-[10px] font-bold uppercase tracking-wider border border-neutral-300 whitespace-nowrap">
                  <span>Inactive</span>
                </span>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#8CA58A]/20 text-[#1A3B34] text-[10px] font-bold uppercase tracking-wider border border-[#8CA58A]/40 whitespace-nowrap">
                    <Car className="w-2.5 h-2.5 text-[#1A3B34] shrink-0" />
                    <span>Free Parking</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1A3B34] text-[#F6E7A7] text-[10px] font-bold uppercase tracking-wider border border-[#C59B4B]/30 whitespace-nowrap">
                    <span>$0 Resort Fees</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions bottom */}
        <div className={`pt-4 border-t flex items-center justify-between gap-2.5 sm:gap-3 ${
          isUnavailable ? 'border-neutral-300' : 'border-[#E8DCC6]'
        }`}>
          <button
            id={`btn-view-details-${property.slug}`}
            onClick={() => onSelect(property.slug)}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-[11px] font-bold transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              isUnavailable
                ? 'border-neutral-300 text-neutral-600 hover:bg-neutral-200/60'
                : 'border-[#1A3B34]/40 text-[#1A3B34] hover:bg-[#E8DCC6]/40'
            }`}
          >
            <Eye className={`w-3.5 h-3.5 shrink-0 ${isUnavailable ? 'text-neutral-500' : 'text-[#1A3B34]'}`} />
            <span>View Details</span>
          </button>

          {isUnavailable ? (
            <button
              id={`btn-inquire-${property.slug}`}
              type="button"
              onClick={() => onSelect('waikiki-banyan-3205-t2')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-[#F6E7A7] text-[11px] font-bold transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md border border-[#C59B4B]/30 whitespace-nowrap"
              title="Unit 3609 is currently unavailable. View available active Unit #3205"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
              <span>See Unit #3205</span>
            </button>
          ) : (
            <button
              id={`btn-inquire-${property.slug}`}
              onClick={() => onInquire(property.id)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#1A3B34] hover:bg-[#2A5D52] text-white text-[11px] font-bold transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-[#C59B4B]/30 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
              <span>Inquire to Book</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

