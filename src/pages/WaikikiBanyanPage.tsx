import React, { useState, useMemo, useEffect } from 'react';
import { PROPERTIES } from '../data/properties';
import { BANYAN_AMENITY_PHOTOS, BanyanAmenityPhoto } from '../data/banyanAmenities';
import { PropertyCard } from '../components/rentals/PropertyCard';
import { LightboxModal } from '../components/common/LightboxModal';
import {
  Building2,
  MapPin,
  Waves,
  Sun,
  HelpCircle,
  DollarSign,
  Check,
  Award,
  Sparkles,
  Utensils,
  ShieldCheck,
  Mail,
  Camera,
  Maximize2,
  Filter,
} from 'lucide-react';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { AppImage } from '../components/common/AppImage';
import { SITE_CONFIG } from '../config/site';
import { FullCompetitorComparison } from '../components/banyan/FullCompetitorComparison';

interface WaikikiBanyanPageProps {
  onSelectProperty: (slug: string) => void;
  onInquireProperty: (propertyId?: string) => void;
  onNavigate: (path: string) => void;
}

export const WaikikiBanyanPage: React.FC<WaikikiBanyanPageProps> = ({
  onSelectProperty,
  onInquireProperty,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'deck' | 'lobby' | 'location' | 'views'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Auto-scroll to full-comparison anchor if present in URL
  useEffect(() => {
    if (window.location.hash.includes('full-comparison')) {
      setTimeout(() => {
        const el = document.getElementById('full-comparison');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  }, []);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return BANYAN_AMENITY_PHOTOS;
    return BANYAN_AMENITY_PHOTOS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const lightboxImages = useMemo(() => {
    return BANYAN_AMENITY_PHOTOS.map((p) => ({
      url: p.url,
      caption: `${p.title} — ${p.caption}`,
      category: p.categoryLabel,
    }));
  }, []);

  const openLightboxAt = (photoId: string) => {
    const idx = BANYAN_AMENITY_PHOTOS.findIndex((p) => p.id === photoId);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };
  const banyanFaqs = [
    {
      id: 'pool-heating-tower2',
      question: 'Is the swimming pool heated, and are the hot tubs accessible from Tower 2?',
      answer:
        'Yes! Waikiki Banyan’s large outdoor swimming pool is heated year-round, and the recreation deck features therapeutic jet hot tubs framing Diamond Head views. The expansive 1-acre resort deck is situated on the 6th floor connecting both Tower 1 and Tower 2—guests staying in Tower 2 take the Tower 2 elevator directly to the 6th floor for seamless, immediate access with $0 resort fees.',
    },
    {
      id: 'parking',
      question: 'Is parking available on-site at Waikiki Banyan?',
      answer:
        'Yes, Waikiki Banyan features a multi-story covered parking garage operated independently. Daily and weekly rates are available upon entrance, making it one of the most accessible and affordable parking setups in all of Waikiki.',
    },
    {
      id: 'amenities-hours',
      question: 'What are the recreation deck operating hours?',
      answer:
        'The 6th-floor recreation deck (pool, hot tubs, tennis court, sauna, BBQs) generally opens at 8:00 AM and remains open through 9:00 PM daily. Key card access is provided for all registered guests.',
    },
    {
      id: 'distance-beach',
      question: 'How far is the beach from Waikiki Banyan?',
      answer:
        'Kuhio Beach and Queen’s Surf Beach are directly 1 short block away (approximately 300 feet). You simply walk down ʻOhua Avenue, cross Kalākaua Boulevard, and your toes are in the sand.',
    },
    {
      id: 'laundry',
      question: 'Are there laundry facilities in the building?',
      answer:
        'Every single residential floor at Waikiki Banyan includes a dedicated, card-operated laundry room equipped with washers and dryers for guests.',
    },
  ];

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Hero Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A3B34] text-[#F6E7A7] border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Plumeria Vacation Rentals · Waikiki Banyan Condo Rentals</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#1A3B34] leading-tight">
              Why Waikiki Banyan is Better Than Any Other Vacation Rental
            </h1>

            <p className="text-base sm:text-lg text-[#1A3B34]/85 font-light leading-relaxed">
              Consistently rated among the top Waikiki vacation rentals and condo rentals in Honolulu, <strong className="text-[#1A3B34] font-semibold">Waikiki Banyan (201 ʻOhua Avenue)</strong> solves every headache of traveling to Oʻahu. Unlike ordinary Waikiki short term rentals, you enjoy the space and kitchen savings of a 557 sq. ft. private condo + 67 sq. ft. lanai paired with 180° Diamond Head & mountain views and Oʻahu’s largest 1-acre resort deck. Book direct in Waikiki with Plumeria Vacation Rentals for the best rates and zero resort fees.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-[#1A3B34]/80">
              <span className="flex items-center gap-1.5 font-semibold text-[#1A3B34]">
                <MapPin className="w-4 h-4 text-[#C59B4B]" />
                <span>1 Block to Kuhio Beach</span>
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-[#1A3B34]">
                <Waves className="w-4 h-4 text-[#7FB6D9]" />
                <span>1-Acre 6th-Floor Deck</span>
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-[#1A3B34]">
                <ShieldCheck className="w-4 h-4 text-[#8CA58A]" />
                <span>$0 Mandatory Resort Fees</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div
              onClick={() => openLightboxAt('banyan-amenity-09')}
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 relative cursor-pointer group"
            >
              <AppImage
                src="/images/banyan/banyan-amenity-09.webp"
                fallbackSrc="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
                alt="Waikiki Banyan 6th floor heated resort swimming pool with palm trees and sun deck"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-16">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-[#1A3B34] text-xs font-semibold shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C59B4B]" />
                  <span>Click to expand 12 amenity photos</span>
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#1A3B34]/90 backdrop-blur-md text-white border border-white/20 text-xs flex items-center justify-between">
                <span className="font-serif font-bold text-[#F6E7A7]">6th-Floor Resort Recreation Oasis</span>
                <span className="text-[11px] text-white/80">Tower 1 & Tower 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 Unfair Advantages of Waikiki Banyan */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DCC6] shadow-xs space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B4B]">
              Direct Comparison
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A3B34]">
              5 Reasons Waikiki Banyan Outclasses Other Rentals & Hotels
            </h2>
            <p className="text-sm sm:text-base text-[#1A3B34]/75 font-light leading-relaxed">
              When booking a vacation rental in Waikiki, location, space, amenities, and unexpected costs make or break your trip. Here is why Waikiki Banyan stands alone:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Advantage 1 */}
            <div className="p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#7FB6D9]/30 text-[#1A3B34] flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  Oʻahu’s Largest 1-Acre Deck
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  Most Waikiki condos have tiny, crowded pools or no facilities at all. Banyan’s entire 6th floor spans nearly an acre with a heated swimming pool, 2 jet hot tubs, dry sauna, tennis & pickleball court, and playground.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1A3B34] border-t border-[#E8DCC6] pt-3 block">
                vs. cramped hotel pool crowds
              </span>
            </div>

            {/* Advantage 2 */}
            <div className="p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#F6E7A7]/70 text-[#C59B4B] flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  Full Kitchen in Every Suite
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  Standard Waikiki hotels charge $450/night for 280 sq ft with empty mini-fridges. At Waikiki Banyan, your suite has a full 4-burner stove, oven, full-size refrigerator, microwave, and cookware—saving families $200+ every single day.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#C59B4B] border-t border-[#E8DCC6] pt-3 block">
                Save $1,000+ per stay on meals
              </span>
            </div>

            {/* Advantage 3 */}
            <div className="p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#8CA58A]/30 text-[#1A3B34] flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  1 Block to Kuhio Beach
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  Walk out the lobby, stroll 3 flat minutes down ʻOhua Avenue, and jump straight into the warm, protected swim waters of Kuhio Beach and Queen’s Surf. No bus, no car, no heavy carrying needed.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#8CA58A] border-t border-[#E8DCC6] pt-3 block">
                300 feet to Waikiki surf & sand
              </span>
            </div>

            {/* Advantage 4 */}
            <div className="p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  Zero Mandatory Resort Fees
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  Most Waikiki hotels sneak in a mandatory $45–$65+ per night "resort fee" at checkout. Plumeria Vacation Rentals at Waikiki Banyan charges $0 in hidden resort fees: all deck, pool, spa, and Wi-Fi access are 100% included.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#C59B4B] border-t border-[#E8DCC6] pt-3 block">
                100% transparent pricing
              </span>
            </div>

            {/* Advantage 5 */}
            <div className="p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1A3B34]/20 text-[#1A3B34] flex items-center justify-center font-bold">
                  5
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  12-Burner Sunset BBQ Pavilion
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  Instead of paying $40/entree at crowded restaurants every evening, grill fresh local catch, steaks, or burgers on 12 gas BBQs with open-air covered picnic tables while watching the Hawaiian evening colors.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1A3B34] border-t border-[#E8DCC6] pt-3 block">
                Nightly open-air barbecue dining
              </span>
            </div>

            {/* Advantage 6 */}
            <div className="p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8DCC6] text-[#1A3B34] flex items-center justify-center font-bold">
                  6
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
                  High-Floor Tower 2 Lanais
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  Unlike lower-floor walk-ups that look into concrete walls or alleyways, our suites (#3609-T2 and #3205-T2) are high up on the 36th and 32nd floors, offering panoramic Pacific Ocean and Diamond Head breezes.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#1A3B34] border-t border-[#E8DCC6] pt-3 block">
                High-floor tranquility & vistas
              </span>
            </div>
          </div>
        </div>

        {/* Comprehensive Competitor Comparison Matrix & Vacation Cost Calculator */}
        <FullCompetitorComparison
          onBookStay={() => onInquireProperty()}
          onExploreRentals={() => onNavigate('/rentals')}
        />

        {/* Editorial Summary: Why Waikiki Banyan stands above other vacation rentals */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F9F7F2] border border-[#E8DCC6] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C59B4B]">
              The Verdict for Waikiki Travelers
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
              No other vacation rental in Honolulu offers this total package.
            </h3>
            <p className="text-xs sm:text-sm text-[#1A3B34]/80 font-light leading-relaxed">
              When you balance ocean proximity, a 1-acre resort deck, full kitchens, true 1-bedroom space, quiet restful evenings, and zero mandatory resort fees, Waikiki Banyan is unequivocally the highest-value vacation rental destination on Oʻahu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/rentals')}
              className="px-6 py-3 rounded-full text-xs font-bold bg-[#1A3B34] text-white hover:bg-[#224D44] transition-colors cursor-pointer shadow-sm"
            >
              Browse Available Suites
            </button>
            <button
              onClick={() => onInquireProperty()}
              className="px-6 py-3 rounded-full text-xs font-bold bg-[#C59B4B] text-[#1A3B34] hover:bg-[#D4A853] transition-colors cursor-pointer shadow-sm"
            >
              Ask Our Host Team
            </button>
          </div>
        </div>

        {/* Available Plumeria Units at Waikiki Banyan */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8CA58A]">
                Featured Inventory
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A3B34]">
                Available Plumeria Suites at Waikiki Banyan
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/rentals')}
              className="text-xs sm:text-sm font-semibold text-[#8CA58A] hover:underline self-start sm:self-end cursor-pointer"
            >
              Browse Filtered Catalog →
            </button>
          </div>

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
        </div>

        {/* Building Recreation Deck Detail Banner & Interactive Photo Showcase */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#1A3B34] via-[#224D44] to-[#2D6559] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 border border-[#8CA58A]/30">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#F6E7A7] font-bold">
                  Shared Tower 2 Building & Resort Facilities
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                  Waikiki Banyan Amenities Experience
                </h3>
                <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
                  Both Plumeria suites (#3205-T2 and #3609-T2) enjoy complete, 100% complimentary access to all 6th-floor resort deck amenities, the ground lobby waterfalls, and dedicated facilities.
                </p>
              </div>

              <button
                id="view-all-banyan-photos-btn"
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>View All 12 Amenity Photos</span>
              </button>
            </div>

            {/* Amenity Spotlight Cards with Real Matching Thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-white/90">
              {/* Pool Card */}
              <div
                onClick={() => openLightboxAt('banyan-amenity-09')}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all space-y-2.5 cursor-pointer group border border-white/10"
              >
                <div className="h-32 rounded-xl overflow-hidden relative">
                  <AppImage
                    src="/images/banyan/banyan-amenity-09.webp"
                    fallbackSrc="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                    alt="Heated resort swimming pool with sun loungers and palms"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-[#F6E7A7] block text-sm">🏊 Heated Resort Pool</span>
                  <p className="text-white/75 text-xs">Spacious sundeck with sun loungers, umbrellas & palm trees</p>
                </div>
              </div>

              {/* Hot Tubs Card */}
              <div
                onClick={() => openLightboxAt('banyan-amenity-08')}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all space-y-2.5 cursor-pointer group border border-white/10"
              >
                <div className="h-32 rounded-xl overflow-hidden relative">
                  <AppImage
                    src="/images/banyan/banyan-amenity-08.webp"
                    fallbackSrc="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80"
                    alt="Therapeutic jet hot tubs with Diamond Head view"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-[#F6E7A7] block text-sm">♨️ Jet Spas & Hot Tubs</span>
                  <p className="text-white/75 text-xs">Therapeutic hot tubs with Diamond Head views plus indoor dry saunas</p>
                </div>
              </div>

              {/* BBQ Card */}
              <div
                onClick={() => openLightboxAt('banyan-amenity-06')}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all space-y-2.5 cursor-pointer group border border-white/10"
              >
                <div className="h-32 rounded-xl overflow-hidden relative">
                  <AppImage
                    src="/images/banyan/banyan-amenity-06.webp"
                    fallbackSrc="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                    alt="Outdoor 12-station gas barbecue grilling area with stone picnic tables"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-[#F6E7A7] block text-sm">🥩 Gas BBQ Pavilion</span>
                  <p className="text-white/75 text-xs">12 gas grills with solid stone picnic tables under shade trees</p>
                </div>
              </div>

              {/* Playground & Sports Card */}
              <div
                onClick={() => openLightboxAt('banyan-amenity-07')}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all space-y-2.5 cursor-pointer group border border-white/10"
              >
                <div className="h-32 rounded-xl overflow-hidden relative">
                  <AppImage
                    src="/images/banyan/banyan-amenity-07.webp"
                    fallbackSrc="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                    alt="Children's recreation playground structure and artificial turf lawn"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-[#F6E7A7] block text-sm">🛝 Kids Playground & Sports</span>
                  <p className="text-white/75 text-xs">Fenced play structure on turf lawn plus tennis & pickleball courts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full 12-Photo Amenity Gallery with Responsive Filter Tabs */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DCC6] shadow-xs space-y-8">
            <div className="space-y-6 border-b border-[#E8DCC6] pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DCC6]/40 text-[#1A3B34] text-xs font-semibold uppercase tracking-wider mb-2">
                    <Camera className="w-3.5 h-3.5 text-[#C59B4B]" />
                    <span>Resort Photo Catalog (12 Authentic Photos)</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34]">
                    Explore Waikiki Banyan Amenities
                  </h3>
                </div>

                <div className="text-xs text-[#1A3B34]/70 font-medium self-start sm:self-center px-3 py-1.5 rounded-full bg-[#F9F7F2] border border-[#E8DCC6]">
                  Showing {filteredPhotos.length} of 12 resort photos
                </div>
              </div>

              {/* Category Filter Pills - Responsive individual pill buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: 'all', label: 'All Photos', count: 12 },
                  { key: 'deck', label: '6th Floor Deck', count: 5 },
                  { key: 'lobby', label: 'Lobby & Grounds', count: 2 },
                  { key: 'location', label: 'Beach & Map', count: 2 },
                  { key: 'views', label: 'High Views', count: 3 },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedCategory(tab.key as any)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === tab.key
                        ? 'bg-[#1A3B34] text-white shadow-xs border border-[#1A3B34]'
                        : 'bg-[#F9F7F2] text-[#1A3B34]/80 hover:bg-[#E8DCC6]/60 border border-[#E8DCC6]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedCategory === tab.key
                          ? 'bg-white/20 text-white'
                          : 'bg-[#E8DCC6]/70 text-[#1A3B34]/80'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openLightboxAt(photo.id)}
                  className="bg-[#F9F7F2] rounded-2xl overflow-hidden border border-[#E8DCC6] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-[#1A3B34]/5">
                    <AppImage
                      src={photo.url}
                      fallbackSrc={photo.fallbackUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#1A3B34]/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wide">
                      {photo.categoryLabel}
                    </div>
                    <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#1A3B34] group-hover:text-[#C59B4B] transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-[#1A3B34]/75 line-clamp-2 mt-1 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E8DCC6]/60 flex items-center justify-between text-[11px] text-[#1A3B34]/60">
                      <span>Photo #{photo.number} of 12</span>
                      <span className="font-medium text-[#C59B4B] group-hover:underline">Click to enlarge →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Building FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DCC6] shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#8CA58A]">
              <HelpCircle className="w-5 h-5 text-[#C59B4B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3B34]">
                Common Questions
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34]">
              Waikiki Banyan FAQs
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            {banyanFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/60 space-y-2"
              >
                <h3 className="font-serif text-base font-bold text-[#1A3B34]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-[#E8DCC6]/30 p-8 rounded-3xl border border-[#C59B4B]/30 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1A3B34]">
            Ready to experience Waikiki Banyan?
          </h3>
          <p className="text-sm text-[#1A3B34]/75 max-w-md mx-auto">
            Book directly with Plumeria Vacation Rentals for verified suite quality, keyless access, and personal host communication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onInquireProperty()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold bg-[#1A3B34] hover:bg-[#224D44] text-white shadow-md transition-all cursor-pointer border border-[#C59B4B]/30"
            >
              Check Waikiki Banyan Availability
            </button>
            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Waikiki%20Banyan%20Stay%20Inquiry`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold bg-white hover:bg-[#E8DCC6]/50 text-[#1A3B34] border border-[#E8DCC6] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-[#C59B4B]" />
              <span>Email Host (mailto)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox for Amenities */}
      <LightboxModal
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
