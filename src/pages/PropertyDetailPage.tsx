import React, { useState } from 'react';
import { Property } from '../types';
import { PROPERTIES } from '../data/properties';
import { LightboxModal } from '../components/common/LightboxModal';
import { PropertyCard } from '../components/rentals/PropertyCard';
import {
  MapPin,
  Users,
  Bed,
  Bath,
  Check,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Share2,
  Heart,
  Clock,
  Waves,
  Utensils,
  ArrowLeft,
  Coffee,
} from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { SITE_CONFIG } from '../config/site';
import { AppImage } from '../components/common/AppImage';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectProperty: (slug: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectProperty,
  onOpenInquiry,
}) => {
  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenInquiry(property.id);
  };

  const otherProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 2);

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.03] sm:opacity-[0.05]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.025] sm:opacity-[0.045]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex items-center justify-between text-xs text-[#0D274D]/70">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#186A9E] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#0D274D]/30" />
            <button
              onClick={() => onNavigate('/rentals')}
              className="hover:text-[#186A9E] transition-colors cursor-pointer"
            >
              Our Rentals
            </button>
            <ChevronRight className="w-3 h-3 text-[#0D274D]/30" />
            <span className="font-semibold text-[#0D274D] truncate max-w-[200px] sm:max-w-none">
              {property.name}
            </span>
          </div>

          <button
            onClick={() => onNavigate('/rentals')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#186A9E] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all rentals</span>
          </button>
        </div>

        {/* Title & Location Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF7F9] text-[#186A9E] border border-[#4BB8C7]/30">
              {property.viewType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9F5] text-[#0D274D] border border-[#0D274D]/10">
              {property.tower}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9F5] text-[#0D274D] border border-[#0D274D]/10">
              {property.floorLevel}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D274D] leading-tight">
            {property.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#0D274D]/75">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#F78D74]" />
              <strong className="text-[#0D274D]">Waikiki Banyan</strong> · 201 ʻOhua Ave, Waikiki, Honolulu, HI
            </span>
            <span className="text-[#186A9E] font-medium">
              1 Block to Kuhio Beach & Queen’s Surf
            </span>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-lg border border-[#0D274D]/10 bg-white p-2">
          {/* Main Hero Photo (Left 2 cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 relative aspect-16/10 md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden cursor-pointer group"
          >
            <AppImage
              src={property.gallery[0]?.url || property.heroImage}
              alt={property.gallery[0]?.caption || property.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{property.gallery[0]?.caption || 'Click to view photo'}</span>
            </div>
          </div>

          {/* Right 2 cols: 4 smaller grid thumbnails */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3 h-[420px]">
            {property.gallery.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx + 1)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group bg-[#0D274D]/10"
              >
                <AppImage
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-2 right-2 text-[11px] text-white font-medium drop-shadow-md truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* View All Photos Button */}
        <div className="flex justify-end">
          <button
            id="view-all-photos-btn"
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white border border-[#0D274D]/15 text-[#0D274D] hover:bg-[#EAF7F9] transition-colors cursor-pointer shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>View All {property.gallery.length} Photos</span>
          </button>
        </div>

        {/* Main Content & Sticky Booking Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Amenities, Rules */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Highlight Bar */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#0D274D]/8 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-[#FAF9F5]">
                <Users className="w-5 h-5 text-[#186A9E] mx-auto mb-1" />
                <span className="text-xs text-[#0D274D]/60 block font-medium">Guests</span>
                <span className="text-sm font-bold text-[#0D274D]">Up to {property.guestsMax}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9F5]">
                <Bed className="w-5 h-5 text-[#186A9E] mx-auto mb-1" />
                <span className="text-xs text-[#0D274D]/60 block font-medium">Bedrooms</span>
                <span className="text-sm font-bold text-[#0D274D]">{property.bedrooms} Bed · {property.beds} Beds</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9F5]">
                <Bath className="w-5 h-5 text-[#186A9E] mx-auto mb-1" />
                <span className="text-xs text-[#0D274D]/60 block font-medium">Bathrooms</span>
                <span className="text-sm font-bold text-[#0D274D]">{property.bathrooms} Full Bath</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9F5]">
                <Waves className="w-5 h-5 text-[#186A9E] mx-auto mb-1" />
                <span className="text-xs text-[#0D274D]/60 block font-medium">Outdoor</span>
                <span className="text-sm font-bold text-[#0D274D]">Private Lanai</span>
              </div>
            </div>

            {/* About This Suite Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#0D274D]">
                About This Waikiki Banyan Suite
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-[#0D274D]/80 leading-relaxed font-light">
                {property.fullDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Sleeping Arrangements Breakdown */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#0D274D]">
                Sleeping Arrangements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.sleepingArrangements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-white border border-[#0D274D]/8 shadow-xs space-y-2"
                  >
                    <div className="flex items-center gap-2 text-[#186A9E]">
                      <Bed className="w-5 h-5" />
                      <h3 className="font-serif text-base font-bold text-[#0D274D]">
                        {item.room}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#186A9E] uppercase tracking-wider">
                      {item.beds}
                    </p>
                    <p className="text-xs text-[#0D274D]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Amenities by Category */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#0D274D]">
                Verified Amenities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {property.fullAmenities.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-[#0D274D]/8 shadow-xs space-y-3"
                  >
                    <h3 className="font-serif text-base font-bold text-[#0D274D] pb-2 border-b border-[#0D274D]/5">
                      {group.category}
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#0D274D]/80">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#186A9E] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#0D274D]/8 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#0D274D] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#186A9E]" />
                <span>House Rules & Building Standards</span>
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#0D274D]/80">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#186A9E] shrink-0 mt-2" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Waikiki Banyan Location Context */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#EAF7F9] border border-[#4BB8C7]/30 space-y-4">
              <div className="flex items-center gap-2.5 text-[#186A9E]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                  Location: Waikiki Banyan
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#0D274D]/80 leading-relaxed font-light">
                Situated at 201 ʻOhua Avenue, you are 1 short block from the warm beach sand, 2 blocks from the Honolulu Zoo and Kapiʻolani Park, and surrounded by Waikiki’s top casual eateries, coffee spots, and surf rentals.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#0D274D]/75 font-medium">
                <div className="p-2.5 rounded-xl bg-white/80">🏖️ Kuhio Beach · 3 min</div>
                <div className="p-2.5 rounded-xl bg-white/80">🏄 Queen’s Surf · 4 min</div>
                <div className="p-2.5 rounded-xl bg-white/80">🦁 Honolulu Zoo · 5 min</div>
                <div className="p-2.5 rounded-xl bg-white/80">🌋 Diamond Head · 5 min drive</div>
                <div className="p-2.5 rounded-xl bg-white/80">☕ Ground floor cafe on-site</div>
                <div className="p-2.5 rounded-xl bg-white/80">🚗 On-site garage parking</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Direct Inquiry Card (Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 border border-[#0D274D]/10 shadow-xl space-y-5">
              <div className="space-y-1.5 pb-4 border-b border-[#0D274D]/8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#186A9E]">
                    Direct Host Reservation
                  </span>
                  <div className="flex items-center gap-1 text-[#F5B82E]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#0D274D]">Best Rate Direct</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0D274D]">
                  Plan Your Stay
                </h3>
                <p className="text-xs text-[#0D274D]/60">
                  Waikiki Banyan · {property.tower}
                </p>
              </div>

              {/* Booking Dates Form in Sticky Card */}
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#0D274D]/10">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#0D274D]/60 mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-xs font-medium text-[#0D274D] bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#0D274D]/10">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#0D274D]/60 mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-xs font-medium text-[#0D274D] bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#0D274D]/10">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#0D274D]/60 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-[#0D274D] bg-transparent focus:outline-none cursor-pointer"
                  >
                    {[...Array(property.guestsMax)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  id="sticky-card-inquire-btn"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#186A9E] hover:bg-[#0D274D] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#F5B82E]" />
                  <span>Check Availability / Inquire</span>
                </button>
              </form>

              {/* Direct email quick note */}
              <div className="pt-2 text-center text-xs text-[#0D274D]/70 space-y-2">
                <p>Have specific dates or questions?</p>
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=Inquiry%20for%20${encodeURIComponent(property.name)}`}
                  className="text-xs font-semibold text-[#186A9E] hover:underline block truncate"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>

              {/* Perks list in card */}
              <div className="pt-4 border-t border-[#0D274D]/8 space-y-2 text-xs text-[#0D274D]/75">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Contactless Smart Lock Check-In</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full Kitchen & Private Lanai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>6th Floor Resort Recreation Deck</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Plumeria Rentals Section */}
        {otherProperties.length > 0 && (
          <div className="pt-16 border-t border-[#0D274D]/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#186A9E]">
                  More Accommodations
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D274D]">
                  Other Plumeria Suites at Waikiki Banyan
                </h2>
              </div>

              <button
                onClick={() => onNavigate('/rentals')}
                className="text-xs sm:text-sm font-semibold text-[#186A9E] hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onSelect={onSelectProperty}
                  onInquire={onOpenInquiry}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#0D274D]/10 p-3.5 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#186A9E] block">
            {property.viewType}
          </span>
          <span className="font-serif text-sm font-bold text-[#0D274D] block truncate max-w-[190px]">
            {property.name}
          </span>
        </div>

        <button
          id="mobile-sticky-inquire-btn"
          onClick={() => onOpenInquiry(property.id)}
          className="px-5 py-2.5 rounded-xl bg-[#186A9E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
        >
          <Calendar className="w-3.5 h-3.5 text-[#F5B82E]" />
          <span>Check Dates</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={property.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : property.gallery.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < property.gallery.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
