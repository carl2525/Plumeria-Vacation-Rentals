import React, { useState, useMemo } from 'react';
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
  Waves,
  ArrowLeft,
  Mail,
  ExternalLink,
  Mountain,
} from 'lucide-react';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { SITE_CONFIG } from '../config/site';
import { AppImage } from '../components/common/AppImage';
import { generateInquiryMailtoUrl } from '../utils/mailto';
import { calculateStayPricing, formatCurrency, BASE_NIGHTLY_RATE } from '../utils/pricing';
import { getTodayDateString, getNextDayDateString, isDateInPast } from '../utils/date';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectProperty: (slug: string) => void;
  onOpenInquiry: (
    propertyId?: string,
    checkIn?: string,
    checkOut?: string,
    guests?: number
  ) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectProperty,
  onOpenInquiry,
}) => {
  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];

  const today = getTodayDateString();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const minCheckOutDate = checkIn
    ? getNextDayDateString(checkIn, 1)
    : getNextDayDateString(today, 1);

  const handleCheckInChange = (newDate: string) => {
    if (newDate && isDateInPast(newDate)) {
      setCheckIn(today);
      if (checkOut && checkOut <= today) {
        setCheckOut(getNextDayDateString(today, 1));
      }
      return;
    }
    setCheckIn(newDate);
    if (newDate && checkOut && checkOut <= newDate) {
      setCheckOut(getNextDayDateString(newDate, 1));
    }
  };

  const handleCheckOutChange = (newDate: string) => {
    if (newDate && newDate < minCheckOutDate) {
      setCheckOut(minCheckOutDate);
      return;
    }
    setCheckOut(newDate);
  };

  const stickyNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  const stickyPricing = useMemo(() => calculateStayPricing(stickyNights), [stickyNights]);
  const dynamicGallery = useMemo(() => {
    if (property.id !== 'wb-3205-t2') {
      return property.gallery;
    }
    try {
      const stored = localStorage.getItem('wb_3205_custom_photos');
      if (!stored) return property.gallery;
      const parsed: Record<number, string> = JSON.parse(stored);
      return property.gallery.map((img, idx) => {
        const customUrl = parsed[idx + 1];
        if (customUrl) {
          return {
            ...img,
            url: customUrl,
          };
        }
        return img;
      });
    } catch {
      return property.gallery;
    }
  }, [property]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeCheckIn = checkIn && !isDateInPast(checkIn) ? checkIn : '';
    const safeCheckOut = checkOut && (!safeCheckIn || checkOut > safeCheckIn) ? checkOut : '';
    onOpenInquiry(property.id, safeCheckIn, safeCheckOut, guests);
  };

  const directMailtoUrl = generateInquiryMailtoUrl({
    propertyId: property.id,
    propertyName: property.name,
    checkIn,
    checkOut,
    guests,
  });

  const otherProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 2);

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.03] sm:opacity-[0.05]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.025] sm:opacity-[0.045]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex items-center justify-between text-xs text-[#1A3B34]/70">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#8CA58A] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#1A3B34]/30" />
            <button
              onClick={() => onNavigate('/rentals')}
              className="hover:text-[#8CA58A] transition-colors cursor-pointer"
            >
              Our Rentals
            </button>
            <ChevronRight className="w-3 h-3 text-[#1A3B34]/30" />
            <span className="font-semibold text-[#1A3B34] truncate max-w-[200px] sm:max-w-none">
              {property.name}
            </span>
          </div>

          <button
            onClick={() => onNavigate('/rentals')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#8CA58A] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all rentals</span>
          </button>
        </div>

        {/* Title & Location Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8DCC6]/50 text-[#1A3B34] border border-[#C59B4B]/30 whitespace-nowrap">
              {property.viewType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#1A3B34] border border-[#E8DCC6] whitespace-nowrap">
              {property.tower}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#1A3B34] border border-[#E8DCC6] whitespace-nowrap">
              {property.floorLevel}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
            {property.name}{' '}
            <span className="font-light text-xl sm:text-2xl md:text-3xl text-[#1A3B34]/70 block sm:inline">
              · Waikiki Banyan Vacation Rental
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light max-w-3xl">
            {property.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#1A3B34]/75">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C59B4B]" />
              <strong className="text-[#1A3B34]">Waikiki Banyan</strong> · 201 ʻOhua Ave, Waikiki, Honolulu, HI
            </span>
            <span className="text-[#8CA58A] font-medium">
              1 Block to Kuhio Beach & Queen’s Surf
            </span>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-sm border border-[#E8DCC6] p-2 bg-white">

          {/* Main Hero Photo (Left 2 cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 relative aspect-16/10 md:aspect-auto md:h-[420px] rounded-2xl overflow-hidden cursor-pointer group"
          >
            <AppImage
              src={dynamicGallery[0]?.url || property.heroImage}
              alt={dynamicGallery[0]?.caption || property.name}
              fallbackSrc={dynamicGallery[0]?.fallbackUrl}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{dynamicGallery[0]?.caption || 'Click to view photo'}</span>
            </div>
          </div>

          {/* Right 2 cols: 4 smaller grid thumbnails */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3 h-[420px]">
            {dynamicGallery.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx + 1)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group bg-[#1A3B34]/10"
              >
                <AppImage
                  src={img.url}
                  alt={img.caption}
                  fallbackSrc={img.fallbackUrl}
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
        <div className="flex items-center justify-end">
          <button
            id="view-all-photos-btn"
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white border border-[#E8DCC6] text-[#1A3B34] hover:bg-[#F9F7F2] transition-colors cursor-pointer shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>View All {dynamicGallery.length} Photos</span>
          </button>
        </div>

        {/* Main Content & Sticky Booking Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Amenities, Rules */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Highlight Bar */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8DCC6] shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#F9F7F2]">
                <Users className="w-5 h-5 text-[#8CA58A] mx-auto mb-1" />
                <span className="text-[11px] text-[#1A3B34]/60 block font-medium">Guests</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A3B34]">Up to {property.guestsMax}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2]">
                <Bed className="w-5 h-5 text-[#8CA58A] mx-auto mb-1" />
                <span className="text-[11px] text-[#1A3B34]/60 block font-medium">Beds</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A3B34]">{property.bedrooms} Bed · {property.beds} Beds</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2]">
                <Bath className="w-5 h-5 text-[#8CA58A] mx-auto mb-1" />
                <span className="text-[11px] text-[#1A3B34]/60 block font-medium">Bathrooms</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A3B34]">{property.bathrooms} Full Bath</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2]">
                <Waves className="w-5 h-5 text-[#8CA58A] mx-auto mb-1" />
                <span className="text-[11px] text-[#1A3B34]/60 block font-medium">Total Size</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A3B34]">{property.squareFeet || 557} + {property.lanaiSquareFeet || 67} Lanai</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F9F7F2] col-span-2 sm:col-span-1">
                <Mountain className="w-5 h-5 text-[#C59B4B] mx-auto mb-1" />
                <span className="text-[11px] text-[#1A3B34]/60 block font-medium">Vantage View</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A3B34] truncate block" title={property.viewType}>
                  {property.viewType}
                </span>
              </div>
            </div>

            {/* View & Seclusion Orientation Note */}
            <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#8CA58A]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Mountain className="w-4 h-4 text-[#1A3B34]" />
              </div>
              <p className="text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed font-light">
                <strong className="text-[#1A3B34] font-semibold">Location & View Note:</strong> This suite is situated 1 flat block (approx. 3-minute walk) to Kuhio Beach. While not beachfront, its high-floor positioning grants breathtaking 180-degree panoramic views of Diamond Head Mountain and the Koʻolau mountain range, while insulating you from noisy shoreline crowds.
              </p>
            </div>

            {/* About This Suite Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#1A3B34]">
                About This Waikiki Banyan Suite
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-[#1A3B34]/80 leading-relaxed font-light">
                {property.fullDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Why Waikiki Banyan Beats Other Vacation Rentals */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A3B34] to-[#224D44] text-white shadow-md space-y-5 border border-[#C59B4B]/30">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F6E7A7]">
                  The Waikiki Banyan Advantage
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Why This Suite Outclasses Other Vacation Rentals in Waikiki
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  Booking Unit {property.unitNumber} guarantees you the gold standard in Hawaiian vacation condo living:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 border border-white/15">
                  <Sparkles className="w-4 h-4 text-[#F6E7A7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-semibold text-white block">1-Acre Recreation Deck</strong>
                    <span className="text-[11px] text-white/75">Heated pool, 2 jet hot tubs, sauna, and tennis—unheard of in ordinary rentals.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 border border-white/15">
                  <Check className="w-4 h-4 text-[#F6E7A7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-semibold text-white block">Full Kitchen</strong>
                    <span className="text-[11px] text-white/75">Stove, oven, and full fridge to cook island meals and save $200+/person daily over restaurants.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 border border-white/15">
                  <Waves className="w-4 h-4 text-[#F6E7A7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-semibold text-white block">1 Flat Block to Kuhio Beach</strong>
                    <span className="text-[11px] text-white/75">3-minute stroll to calm waters with no heavy cross-town walking or noise.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-[#F6E7A7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-semibold text-white block">$0 Mandatory Resort Fees</strong>
                    <span className="text-[11px] text-white/75">All recreation deck, pool, and Wi-Fi access included with zero hidden check-out fees.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sleeping Arrangements Breakdown */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#1A3B34]">
                Sleeping Arrangements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.sleepingArrangements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-white border border-[#E8DCC6] shadow-xs space-y-2"
                  >
                    <div className="flex items-center gap-2 text-[#8CA58A]">
                      <Bed className="w-5 h-5 text-[#C59B4B]" />
                      <h3 className="font-serif text-base font-bold text-[#1A3B34]">
                        {item.room}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#8CA58A] uppercase tracking-wider">
                      {item.beds}
                    </p>
                    <p className="text-xs text-[#1A3B34]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Amenities by Category */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1A3B34]">
                Verified Amenities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {property.fullAmenities.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-[#E8DCC6] shadow-xs space-y-3"
                  >
                    <h3 className="font-serif text-base font-bold text-[#1A3B34] pb-2 border-b border-[#E8DCC6]/60">
                      {group.category}
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#1A3B34]/80">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#8CA58A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DCC6] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8DCC6]/60">
                <h2 className="font-serif text-xl font-bold text-[#1A3B34] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#8CA58A]" />
                  <span>House Rules & Building Standards</span>
                </h2>
                <button
                  onClick={() => onNavigate('/rules')}
                  className="text-xs font-semibold text-[#8CA58A] hover:text-[#1A3B34] underline cursor-pointer inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>View All 31 Rules</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-[#1A3B34]/80">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8CA58A] shrink-0 mt-2" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#1A3B34]/80">
                <div className="space-y-0.5">
                  <span className="font-semibold text-[#1A3B34] block">Official Waikiki Banyan (Part I) & Plumeria (Part II) Rules</span>
                  <span className="text-[11px] text-[#1A3B34]/65">Includes quiet hours (10 PM), Tower 2 freight elevator Car #5 for surfboards, and lanai safety.</span>
                </div>
                <button
                  onClick={() => onNavigate('/rules')}
                  className="px-4 py-2 rounded-full bg-[#1A3B34] hover:bg-[#224D44] text-white font-semibold text-xs shrink-0 cursor-pointer shadow-2xs transition-colors"
                >
                  Read Complete Guide
                </button>
              </div>
            </div>

            {/* Waikiki Banyan Location Context */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#E8DCC6]/30 border border-[#C59B4B]/30 space-y-4">
              <div className="flex items-center gap-2.5 text-[#1A3B34]">
                <MapPin className="w-5 h-5 text-[#C59B4B]" />
                <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
                  Location: Waikiki Banyan
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                Situated at 201 ʻOhua Avenue, you are 1 short block from the warm beach sand, 2 blocks from the Honolulu Zoo and Kapiʻolani Park, and surrounded by Waikiki’s top casual eateries, coffee spots, and surf rentals.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#1A3B34]/75 font-medium">
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60">🏖️ Kuhio Beach · 3 min</div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60">🏄 Queen’s Surf · 4 min</div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60">🦁 Honolulu Zoo · 5 min</div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60">🌋 Diamond Head · 5 min drive</div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60">☕ Ground floor cafe on-site</div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60">🚗 On-site garage parking</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Direct Inquiry Card (Desktop & Tablet) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DCC6] shadow-sm space-y-5">
              <div className="space-y-2 pb-4 border-b border-[#E8DCC6]/70">
                <div className="flex items-center justify-between">
                  {property.airbnbUrl ? (
                    <a
                      href={property.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF385C] hover:bg-[#E00B41] text-white text-[10px] font-bold uppercase tracking-wider shadow-2xs transition-colors cursor-pointer"
                      title="View & Book on Airbnb"
                    >
                      <span>Airbnb Primary</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF385C]/10 border border-[#FF385C]/30 text-[10px] font-bold uppercase tracking-wider text-[#FF385C]">
                      <span>Airbnb Primary</span>
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1A3B34] text-[#F6E7A7] text-[10px] font-bold uppercase tracking-wider shadow-2xs border border-[#C59B4B]/30">
                    <Sparkles className="w-3 h-3 text-[#F6E7A7]" />
                    <span>$0 Resort Fees</span>
                  </div>
                </div>

                {/* Nightly Rates Breakdown */}
                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34]">
                        $199
                      </span>
                      <span className="text-xs text-[#C59B4B] font-semibold">/ night promo</span>
                    </div>
                    <span className="text-[10px] text-[#8CA58A] font-bold block uppercase tracking-wider">
                      Special Rate Promotion · All Units
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-1 rounded-md">
                    Honolulu STR License
                  </span>
                </div>

                <p className="text-xs text-[#1A3B34]/70 leading-relaxed pt-1">
                  Inquire directly on our website. Transparent pricing: TAX + Base + Cleaning Fee with $0 Resort fees and free covered parking.
                </p>
              </div>

              {/* Booking Dates Form in Sticky Card */}
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A3B34]/60 mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="w-full text-xs font-medium text-[#1A3B34] bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A3B34]/60 mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      min={minCheckOutDate}
                      value={checkOut}
                      onChange={(e) => handleCheckOutChange(e.target.value)}
                      className="w-full text-xs font-medium text-[#1A3B34] bg-transparent focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Want to waive cleaning fee prompt when dates not yet selected */}
                {stickyNights === 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-950 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span><strong>Want to waive the cleaning fee?</strong> Book 3 nights or more!</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md shrink-0">Save $250</span>
                  </div>
                )}

                {/* Sticky Nights Calculation Box */}
                {stickyNights > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#1A3B34] text-white space-y-2 text-xs shadow-xs animate-fade-in border border-[#C59B4B]/30">
                    <div className="flex items-center justify-between text-[#F6E7A7] font-semibold text-[11px] pb-1 border-b border-white/15">
                      <span>{stickyNights} Nights Estimate:</span>
                      <span>Formula: TAX + Base + Cleaning</span>
                    </div>

                    <div className="space-y-1 text-[11px] text-white/85">
                      <div className="flex justify-between">
                        <span>Base Rate (${BASE_NIGHTLY_RATE} × {stickyNights} nts):</span>
                        <span>{formatCurrency(stickyPricing.grossRoomTotal)}</span>
                      </div>
                      {stickyPricing.discountPercent > 0 && (
                        <div className="flex justify-between text-[#F6E7A7] font-semibold">
                          <span>{stickyPricing.discountPercent}% Stay Discount ({stickyNights}+ days):</span>
                          <span>-{formatCurrency(stickyPricing.discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Cleaning Fee:</span>
                        <span>
                          {stickyPricing.cleaningFee > 0
                            ? formatCurrency(stickyPricing.cleaningFee)
                            : '$0 (Waived for 3+ nights)'}
                        </span>
                      </div>
                      <div className="flex justify-between text-white/70 text-[10px]">
                        <span>Hawaii Taxes (18.5%):</span>
                        <span>{formatCurrency(stickyPricing.totalTaxes)}</span>
                      </div>
                    </div>

                    {stickyNights < 3 ? (
                      <div className="p-2 rounded-xl bg-[#F6E7A7]/15 border border-[#F6E7A7]/30 text-[10.5px] text-[#F6E7A7] leading-snug">
                        <strong>Want to waive the cleaning fee?</strong> Book 3 nights or more to get a <strong>$0 cleaning fee</strong> (saving you $250).
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                        <span>✓ Cleaning fee waived ($250 savings on 3+ nights)</span>
                      </div>
                    )}

                    <div className="pt-1.5 border-t border-white/20 flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-white/90">Estimated Total:</span>
                      <span className="font-serif text-base sm:text-lg font-bold text-[#F6E7A7]">
                        {formatCurrency(stickyPricing.grandTotal)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A3B34]/60 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-[#1A3B34] bg-transparent focus:outline-none cursor-pointer"
                  >
                    {[...Array(property.guestsMax)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    id="sticky-card-inquire-btn"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-[#C59B4B]/30"
                  >
                    <Calendar className="w-4 h-4 text-[#F6E7A7]" />
                    <span>
                      {stickyNights > 0
                        ? `Inquire to Book (${formatCurrency(stickyPricing.grandTotal)} Total)`
                        : 'Inquire to Book · $199/nt'}
                    </span>
                  </button>

                  {property.airbnbUrl && (
                    <a
                      href={property.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="sticky-card-airbnb-btn"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#FF385C] hover:bg-[#E00B41] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>View & Book on Airbnb</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                    </a>
                  )}

                  <a
                    href={directMailtoUrl}
                    id="sticky-card-mailto-btn"
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#E8DCC6]/40 text-[#1A3B34] font-medium text-xs flex items-center justify-center gap-1.5 border border-[#E8DCC6] transition-colors cursor-pointer shadow-2xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C59B4B]" />
                    <span>Email Host Directly</span>
                    <ExternalLink className="w-3 h-3 text-[#1A3B34]/40" />
                  </a>
                </div>
              </form>

              {/* Direct email quick note */}
              <div className="pt-2 text-center text-xs text-[#1A3B34]/70 space-y-1">
                <p className="text-[11px]">
                  Final details & computation sent in email · May require email verification
                </p>
                <a
                  href={directMailtoUrl}
                  className="text-xs font-semibold text-[#8CA58A] hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="w-3 h-3 text-[#C59B4B]" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </div>

              {/* Perks list in card */}
              <div className="pt-4 border-t border-[#E8DCC6]/70 space-y-2 text-xs text-[#1A3B34]/75">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8CA58A]" />
                  <span>Contactless Smart Lock Check-In</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8CA58A]" />
                  <span>Full Kitchen & Private Lanai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#8CA58A]" />
                  <span>6th Floor Resort Recreation Deck</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Plumeria Rentals Section */}
        {otherProperties.length > 0 && (
          <div className="pt-16 border-t border-[#E8DCC6] space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C59B4B]">
                  Tower 2 Collection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34]">
                  Also at Waikiki Banyan Tower 2
                </h2>
              </div>

              <button
                onClick={() => onNavigate('/rentals')}
                className="text-xs sm:text-sm font-semibold text-[#1A3B34] hover:text-[#8CA58A] hover:underline cursor-pointer"
              >
                View Both Suites →
              </button>
            </div>

            <div className="max-w-md">
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

      {/* Floating Bottom Mobile Booking Bar - ONLY for small phones (< md), preventing tablet/desktop overlap */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E8DCC6] p-3.5 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8CA58A] block">
            {property.viewType}
          </span>
          <span className="font-serif text-sm font-bold text-[#1A3B34] block truncate max-w-[190px]">
            {property.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {property.airbnbUrl && (
            <a
              id="mobile-sticky-airbnb-btn"
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl bg-[#FF385C] hover:bg-[#E00B41] text-white text-xs font-semibold flex items-center gap-1 shadow-md transition-colors"
              title="Book on Airbnb"
            >
              <span>Airbnb</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            id="mobile-sticky-inquire-btn"
            onClick={() => onOpenInquiry(property.id)}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#1A3B34] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md border border-[#C59B4B]/30"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F6E7A7]" />
            <span>Send Inquiry</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={dynamicGallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : dynamicGallery.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < dynamicGallery.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
