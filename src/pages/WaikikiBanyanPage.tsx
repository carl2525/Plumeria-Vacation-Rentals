import React from 'react';
import { PROPERTIES } from '../data/properties';
import { FAQS } from '../data/faqs';
import { PropertyCard } from '../components/rentals/PropertyCard';
import {
  Building2,
  MapPin,
  Waves,
  Utensils,
  Check,
  Sun,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  Coffee,
  HelpCircle,
} from 'lucide-react';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { AppImage } from '../components/common/AppImage';

interface WaikikiBanyanPageProps {
  onSelectProperty: (slug: string) => void;
  onInquireProperty: (propertyId: string) => void;
  onNavigate: (path: string) => void;
}

export const WaikikiBanyanPage: React.FC<WaikikiBanyanPageProps> = ({
  onSelectProperty,
  onInquireProperty,
  onNavigate,
}) => {
  const banyanFaqs = FAQS.filter((f) => f.category === 'Waikiki Banyan' || f.category === 'General');

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Hero Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#4BB8C7]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
              <Building2 className="w-3.5 h-3.5 text-[#186A9E]" />
              <span>Condo-Resort Excellence · Honolulu, Hawaiʻi</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#0D274D] leading-tight">
              Waikiki Banyan Vacation Rentals
            </h1>

            <p className="text-base sm:text-lg text-[#0D274D]/85 font-light leading-relaxed">
              Stay at Waikiki Banyan with <strong className="text-[#0D274D] font-medium">Plumeria Vacation Rentals</strong>. Located at 201 ʻOhua Avenue in the vibrant heart of Waikiki, Waikiki Banyan combines the comfort and value of a full condo with premier resort amenities, just one block from Kuhio Beach.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-[#0D274D]/80">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#F78D74]" />
                <span>201 ʻOhua Ave, Waikiki</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Waves className="w-4 h-4 text-[#186A9E]" />
                <span>1 Block to Kuhio Beach</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Sun className="w-4 h-4 text-[#F5B82E]" />
                <span>6th-Floor 1-Acre Resort Deck</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3">
              <AppImage
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Waikiki Banyan 6th floor pool deck with palm trees and ocean views"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Why Waikiki Banyan is the Premier Choice */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0D274D]/8 shadow-sm space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#186A9E]">
              The Waikiki Banyan Advantage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0D274D]">
              Why Travelers Love Staying at Waikiki Banyan
            </h2>
            <p className="text-sm sm:text-base text-[#0D274D]/75 font-light leading-relaxed">
              Consisting of two prominent 38-story residential towers—Tower 1 (Mauka/Ewa) and Tower 2 (Makai/Diamond Head)—Waikiki Banyan is renowned for offering the ideal blend of private residential vacation rental living and rich resort-style recreation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#0D274D]/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7F9] text-[#186A9E] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0D274D]">
                Prime Beach Proximity
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Walk out the front lobby on ʻOhua Avenue and arrive at the calm breakwalls of Kuhio Beach and Queen’s Surf in roughly 3 minutes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#0D274D]/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF3D6] text-[#E59900] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0D274D]">
                Full Kitchens & Lanais
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Save significantly by preparing fresh island breakfasts or family dinners in a full kitchen with stove, oven, full refrigerator, and private outdoor lanai seating.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#0D274D]/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCE8E6] text-[#F78D74] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0D274D]">
                Oʻahu’s Largest Resort Deck
              </h3>
              <p className="text-xs sm:text-sm text-[#0D274D]/75 leading-relaxed">
                Nearly 1 full acre on the 6th floor with a heated swimming pool, 2 jet hot tubs, dry sauna, tennis & pickleball, gas BBQ grills, and a playground.
              </p>
            </div>
          </div>
        </div>

        {/* Available Plumeria Units at Waikiki Banyan */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#186A9E]">
                Featured Inventory
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0D274D]">
                Available Plumeria Suites at Waikiki Banyan
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/rentals')}
              className="text-xs sm:text-sm font-semibold text-[#186A9E] hover:underline self-start sm:self-end cursor-pointer"
            >
              Browse Filtered Catalog →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Building Recreation Deck Detail Banner */}
        <div className="bg-gradient-to-br from-[#0D274D] to-[#186A9E] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#4BB8C7] font-bold">
              Floor 6 Amenities Breakdown
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Everything Included With Your Waikiki Banyan Stay
            </h3>
            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
              When booking through Plumeria Vacation Rentals, your party receives complete access to building facilities throughout your visit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-white/90">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F5B82E] block">🏊 Heated Pool</span>
              <p className="text-white/75 text-xs">Spacious sundeck with lounge chairs and shaded umbrellas</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F5B82E] block">♨️ 2 Jet Spas & Sauna</span>
              <p className="text-white/75 text-xs">Soothing hot tubs for muscle relaxation after hiking Diamond Head</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F5B82E] block">🎾 Sports & Playground</span>
              <p className="text-white/75 text-xs">Tennis & pickleball courts plus fenced kids recreation play area</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F5B82E] block">🥩 BBQ Picnic Area</span>
              <p className="text-white/75 text-xs">Community gas grills and open-air covered dining tables</p>
            </div>
          </div>
        </div>

        {/* Building FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0D274D]/8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#186A9E]">
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Common Questions
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D274D]">
              Waikiki Banyan FAQs
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            {banyanFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#0D274D]/5 space-y-2"
              >
                <h3 className="font-serif text-base font-bold text-[#0D274D]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#0D274D]/80 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-[#FAF9F5] p-8 rounded-3xl border border-[#0D274D]/8 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#0D274D]">
            Ready to experience Waikiki Banyan?
          </h3>
          <p className="text-sm text-[#0D274D]/75 max-w-md mx-auto">
            Book directly with Plumeria Vacation Rentals for verified suite quality, keyless access, and personal host communication.
          </p>
          <button
            onClick={() => onInquireProperty()}
            className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#186A9E] hover:bg-[#0D274D] text-white shadow-md transition-all cursor-pointer"
          >
            Check Waikiki Banyan Availability
          </button>
        </div>
      </div>
    </div>
  );
};
