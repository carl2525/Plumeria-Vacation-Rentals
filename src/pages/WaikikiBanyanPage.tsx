import React from 'react';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/rentals/PropertyCard';
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
} from 'lucide-react';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { AppImage } from '../components/common/AppImage';
import { SITE_CONFIG } from '../config/site';

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
  const banyanFaqs = [
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
              Consistently rated among the top Waikiki vacation rentals and condo rentals in Honolulu, <strong className="text-[#1A3B34] font-semibold">Waikiki Banyan (201 ʻOhua Avenue)</strong> solves every headache of traveling to Oʻahu. Unlike ordinary Waikiki short term rentals, you enjoy the space and kitchen savings of a 550 sq. ft. private condo paired with Oʻahu’s largest 1-acre resort deck. Book direct in Waikiki with Plumeria Vacation Rentals for the best rates and zero resort fees.
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
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 relative">
              <AppImage
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Waikiki Banyan 6th floor pool deck with palm trees and ocean views"
                className="w-full h-full object-cover"
              />
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

        {/* Real Math: The Vacation Savings Breakdown */}
        <div className="bg-gradient-to-br from-[#1A3B34] via-[#1A3B34]/95 to-[#224D44] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 border border-[#C59B4B]/40">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-[0.22em] text-[#F6E7A7] font-bold">
              The True Vacation Economics
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">
              How Much Do You Save at Waikiki Banyan?
            </h3>
            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
              Here is an honest cost comparison for a 5-night stay in Waikiki for a party of 4 (family or friends):
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Column A: Typical Hotel */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                  Standard 4-Star Waikiki Hotel
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
                  <li className="flex justify-between pb-1.5 border-b border-white/10">
                    <span>2 Cramped Rooms (no suite option)</span>
                    <span className="font-semibold text-white">$4,200</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-white/10">
                    <span>Mandatory Resort Fees ($55/night × 2 rooms)</span>
                    <span className="font-semibold text-white">$550</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-white/10">
                    <span>Dining Out (Breakfast, Lunch & Dinner for 4)</span>
                    <span className="font-semibold text-white">$1,600</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-white/10">
                    <span>Beach Chairs & Towel Rentals</span>
                    <span className="font-semibold text-white">$150</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                <span className="text-sm font-light text-white/90">Estimated Total Cost:</span>
                <span className="text-xl sm:text-2xl font-bold text-red-300">~$6,500</span>
              </div>
            </div>

            {/* Column B: Waikiki Banyan */}
            <div className="bg-[#C59B4B]/20 backdrop-blur-md rounded-2xl p-6 border-2 border-[#C59B4B] space-y-4 flex flex-col justify-between relative">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F6E7A7]">
                  Waikiki Banyan (Plumeria Suite)
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/95">
                  <li className="flex justify-between pb-1.5 border-b border-white/15">
                    <span>1 Spacious 550 sq.ft. Suite (Sleeps 4–5 with 3 beds)</span>
                    <span className="font-semibold text-[#F6E7A7]">~$1,500–$1,900</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-white/15">
                    <span>Mandatory Resort Fees</span>
                    <span className="font-semibold text-emerald-300">$0 Included</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-white/15">
                    <span>Home-Cooked Breakfasts + Sunset BBQ Dinners</span>
                    <span className="font-semibold text-[#F6E7A7]">Save ~$800</span>
                  </li>
                  <li className="flex justify-between pb-1.5 border-b border-white/15">
                    <span>Tommy Bahama Beach Chairs & Towels</span>
                    <span className="font-semibold text-emerald-300">$0 In-Unit</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-sm font-light text-white/90 block">Estimated Total Cost:</span>
                  <span className="text-xs text-emerald-300 font-semibold">You save $2,500+ on your trip</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#F6E7A7]">~$2,500</span>
              </div>
            </div>
          </div>
        </div>

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

        {/* Building Recreation Deck Detail Banner */}
        <div className="bg-gradient-to-br from-[#1A3B34] via-[#224D44] to-[#2D6559] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6 border border-[#8CA58A]/30">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#F6E7A7] font-bold">
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
              <span className="font-bold text-[#F6E7A7] block">🏊 Heated Pool</span>
              <p className="text-white/75 text-xs">Spacious sundeck with lounge chairs and shaded umbrellas</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F6E7A7] block">♨️ 2 Jet Spas & Sauna</span>
              <p className="text-white/75 text-xs">Soothing hot tubs for muscle relaxation after hiking Diamond Head</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F6E7A7] block">🎾 Sports & Playground</span>
              <p className="text-white/75 text-xs">Tennis & pickleball courts plus fenced kids recreation play area</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md space-y-1">
              <span className="font-bold text-[#F6E7A7] block">🥩 BBQ Picnic Area</span>
              <p className="text-white/75 text-xs">Community gas grills and open-air covered dining tables</p>
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
    </div>
  );
};
