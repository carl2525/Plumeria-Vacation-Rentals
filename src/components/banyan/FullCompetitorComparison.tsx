import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  Sparkles,
  ExternalLink,
  Car,
  Utensils,
  Building2,
  DollarSign,
  Info,
  Award,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Key,
  Umbrella,
  Eye,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface FullCompetitorComparisonProps {
  onBookStay?: () => void;
  onExploreRentals?: () => void;
}

type ComparisonCategory = 'banyan' | 'hotels' | 'calculator';

interface ComparisonFeature {
  feature: string;
  category: 'banyan' | 'hotels';
  plumeria: {
    title: string;
    description: string;
    isSuperior: boolean;
    badge?: string;
  };
  competitor1: {
    name: string;
    title: string;
    description: string;
    isSuperior: boolean;
    badge?: string;
  };
  competitor2: {
    name: string;
    title: string;
    description: string;
    isSuperior: boolean;
    badge?: string;
  };
}

export const FullCompetitorComparison: React.FC<FullCompetitorComparisonProps> = ({
  onBookStay,
  onExploreRentals,
}) => {
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory>('banyan');
  const [mobileViewStyle, setMobileViewStyle] = useState<'cards' | 'table'>('cards');
  const [stayNights, setStayNights] = useState<number>(5);
  const [calculatorMode, setCalculatorMode] = useState<'banyan' | 'hotels'>('banyan');

  // Plumeria standard verified base rate
  const plumeriaNightly = 300;
  const plumeriaResortFee = 0;
  const plumeriaParking = 0;
  const plumeriaDiningDaily = 65; // with full kitchen & 12 outdoor BBQ grills

  // Aston at Waikiki Banyan (Hotel pool operator in same building)
  const astonNightly = 275;
  const astonAmenityFee = 38; // published mandatory daily hospitality fee
  const astonParking = 40; // charged separately for building garage
  const astonDiningDaily = 150; // standard dining out

  // Generic Waikiki Airbnb / Absentee host
  const genericAirbnbNightly = 230;
  const genericAirbnbFee = 25; // amortized cleaning + platform service fees
  const genericAirbnbParking = 40; // public parking rate (rarely included)
  const genericAirbnbDiningDaily = 110;

  // Mega-resort suites (Hilton & Sheraton)
  const hiltonNightly = 1350;
  const hiltonResortFee = 50;
  const hiltonParking = 68;
  const hiltonDiningDaily = 220;

  const sheratonNightly = 1500;
  const sheratonResortFee = 52;
  const sheratonParking = 65;
  const sheratonDiningDaily = 220;

  const calculateTotal = (nightly: number, fee: number, parking: number, dining: number) => {
    return (nightly + fee + parking + dining) * stayNights;
  };

  const plumeriaTotal = calculateTotal(plumeriaNightly, plumeriaResortFee, plumeriaParking, plumeriaDiningDaily);
  const astonTotal = calculateTotal(astonNightly, astonAmenityFee, astonParking, astonDiningDaily);
  const genericTotal = calculateTotal(genericAirbnbNightly, genericAirbnbFee, genericAirbnbParking, genericAirbnbDiningDaily);
  const hiltonTotal = calculateTotal(hiltonNightly, hiltonResortFee, hiltonParking, hiltonDiningDaily);
  const sheratonTotal = calculateTotal(sheratonNightly, sheratonResortFee, sheratonParking, sheratonDiningDaily);

  // Comparison Data: Plumeria vs Aston at Waikiki Banyan & Generic Waikiki Airbnbs
  const banyanFeatures: ComparisonFeature[] = [
    {
      feature: 'Guaranteed Unit & Floor Level',
      category: 'banyan',
      plumeria: {
        title: 'Guaranteed High-Floor (Floors 32 & 36)',
        description: 'You get the exact designer suite booked in Tower 2 with sweeping 180° Koʻolau mountains, Ala Wai canal, and ocean horizon views. Whisper-quiet high above traffic.',
        isSuperior: true,
        badge: 'Guaranteed View & Suite',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: 'Room Lottery / Assigned at Check-in',
        description: 'Random pool unit assigned on arrival. Often placed on lower floors (5–12) facing the loud concrete parking structure, alleyway trash chutes, or noisy Kuhio Ave.',
        isSuperior: false,
        badge: 'No Floor Guarantee',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Varies Widely / Low-Mid Floors',
        description: 'Many units are on lower noisy levels or face adjacent building concrete walls. Photos often disguise obstructed or unrenovated views.',
        isSuperior: false,
      },
    },
    {
      feature: 'Covered Garage Parking',
      category: 'banyan',
      plumeria: {
        title: 'FREE Dedicated Parking Pass ($0)',
        description: 'Complimentary electronic pass for the Waikiki Banyan covered multi-story garage. Unlimited in-and-out privileges included for your entire stay.',
        isSuperior: true,
        badge: 'Saves $200–$350/Stay',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: '$38 – $40 / Day Mandatory Parking',
        description: 'Aston does NOT include parking! Guests must pay $38–$40+ tax per day to park in the exact same garage ($200+ extra on a 5-night stay).',
        isSuperior: false,
        badge: '+$190–$200 Extra',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Rarely Included / Public Rate',
        description: 'Most individual Airbnb hosts do not own deeded stalls. Guests are forced to pay the $40/day public rate or search for impossible street parking.',
        isSuperior: false,
      },
    },
    {
      feature: 'Mandatory Daily Amenity / Resort Fees',
      category: 'banyan',
      plumeria: {
        title: '$0 Zero Amenity or Resort Fees',
        description: 'Full transparent pricing at $300/night. Complete access to the 1-acre 6th-floor recreation deck, heated pool, 2 jet hot tubs, sauna, and tennis court with zero daily checkout fees.',
        isSuperior: true,
        badge: '100% Transparent',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: '+$35 – $42 / Night Mandatory Fee',
        description: 'Aston levies an extra daily "Hospitality/Amenity Fee" on top of the room rate. For a 5-night stay, this adds $175–$210+ to your final bill.',
        isSuperior: false,
        badge: 'Hidden Checkout Surcharge',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'High Cleaning & Booking Fees',
        description: 'While resort fees may be absent, generic hosts frequently tack on $250–$350 cleaning fees plus 14% platform guest service markups.',
        isSuperior: false,
      },
    },
    {
      feature: 'Interior Modernization & Air Conditioning',
      category: 'banyan',
      plumeria: {
        title: 'Designer Renovation & Split-System AC',
        description: 'Fresh coastal design, whisper-quiet split-unit AC, luxury plush king & queen bedding, 55" 4K smart TVs with streaming, and modern rainfall shower.',
        isSuperior: true,
        badge: 'Modern Comfort',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: '1980s Vintage Hotel Pool Units',
        description: 'Older unrenovated rental pool inventory. Vintage rattan furniture, worn carpeting, and loud box wall air conditioners that rumble through the night.',
        isSuperior: false,
        badge: 'Dated Interiors',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Hit-or-Miss Interior Upkeep',
        description: 'Inconsistent upkeep, sagging sofa beds, and window AC units that struggle during humid Honolulu afternoons.',
        isSuperior: false,
      },
    },
    {
      feature: 'Kitchen & Meal Capabilities',
      category: 'banyan',
      plumeria: {
        title: 'Full Gourmet Chef Kitchen',
        description: '4-burner stove, full oven, full-size refrigerator/freezer, microwave, rice cooker, coffee maker, cookware, plus 12 outdoor gas BBQ grills on 6th floor.',
        isSuperior: true,
        badge: 'Cook & Save $150+/Day',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: 'Standard Basic Kitchen',
        description: 'Kitchenette or older kitchen with minimal mismatched utensils and basic cookware.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Basic / Incomplete Cookware',
        description: 'Frequently missing basic essentials, dull knives, or lacking proper cooking gear for family meals.',
        isSuperior: false,
      },
    },
    {
      feature: 'Complimentary In-Unit Beach Gear',
      category: 'banyan',
      plumeria: {
        title: 'Deluxe Tommy Bahama Beach Set ($0)',
        description: 'Lightweight backpack beach chairs, matching umbrella, boogie boards, plush oversized beach towels, and insulated cooler tote provided inside your suite.',
        isSuperior: true,
        badge: '$150+ Beach Rental Savings',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: 'No Beach Gear Provided',
        description: 'Pool towels only. Beach chairs and umbrellas must be rented separately at Kuhio Beach concession stands for $60–$80/day.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Missing or Broken Gear',
        description: 'Often sparse, rusted, or broken chairs left behind by previous guests.',
        isSuperior: false,
      },
    },
    {
      feature: 'Check-In & Guest Hospitality',
      category: 'banyan',
      plumeria: {
        title: 'Keyless Digital Smart Lock + Local Host',
        description: 'Direct keypad access with personalized code (no lobby queues). Responsive local on-island Superhost available 24/7 for tips and immediate assistance.',
        isSuperior: true,
        badge: 'No Front Desk Lines',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: 'Lobby Front Desk Queues',
        description: 'Standard hotel front desk. Long check-in lines (often 30–45 minute waits during peak 3:00 PM mainland flight arrivals).',
        isSuperior: false,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Remote Call Centers / Absentee Hosts',
        description: 'Remote owners or outsourced call centers in different timezones with slow response times if door codes or WiFi fail.',
        isSuperior: false,
      },
    },
    {
      feature: 'Legal Permitting & City Compliance',
      category: 'banyan',
      plumeria: {
        title: '100% Legally Permitted Resort Zone',
        description: 'Waikiki Banyan is located in the City & County of Honolulu designated Waikiki Resort Hotel District. Fully compliant short-term rental with zero risk of cancellation.',
        isSuperior: true,
        badge: '100% Legal & Protected',
      },
      competitor1: {
        name: 'Aston at Waikiki Banyan',
        title: 'Legal Hotel Operation',
        description: 'Operates legally within the Waikiki resort precinct.',
        isSuperior: true,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Some Unregistered Units Risk Fines',
        description: 'Off-resort Waikiki rentals outside designated resort precincts face strict city enforcement, heavy fines, or sudden booking cancellations.',
        isSuperior: false,
      },
    },
  ];

  // Comparison Data: Plumeria vs Mega-Resorts (Hilton & Sheraton)
  const hotelFeatures: ComparisonFeature[] = [
    {
      feature: 'Typical Nightly Suite Rate',
      category: 'hotels',
      plumeria: {
        title: '$300 / Night Flat Rate',
        description: 'Direct book or verified Airbnb Superhost for a true 1-bedroom suite sleeping up to 5 with 3 beds.',
        isSuperior: true,
        badge: 'Save 75%–80%',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '$1,100 – $1,650+ / Night',
        description: 'Rainbow / Aliʻi Tower 1-bedroom suite rack rate. Seasonal high-demand pricing.',
        isSuperior: false,
        badge: 'Mega-Resort Pricing',
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '$1,250 – $1,750+ / Night',
        description: 'Kai Oceanfront / Malia suite standard published pricing.',
        isSuperior: false,
        badge: 'High Luxury Markup',
      },
    },
    {
      feature: 'Mandatory Daily Resort Fee',
      category: 'hotels',
      plumeria: {
        title: '$0 Zero Resort Fees',
        description: 'Full access to 1-acre resort deck, heated pool, 2 spas, sauna, tennis court, and BBQ grills.',
        isSuperior: true,
        badge: '$0 Resort Fee',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '+$50 / Night + Tax Mandatory',
        description: 'Adds $250+ to a 5-night stay just for basic pool and WiFi access.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '+$52 / Night + Tax Mandatory',
        description: 'Adds $260+ to a 5-night stay regardless of whether you use all amenities.',
        isSuperior: false,
      },
    },
    {
      feature: 'Parking Rate',
      category: 'hotels',
      plumeria: {
        title: 'FREE Covered Garage Parking ($0)',
        description: 'Pass included with dedicated building garage. Unlimited in-and-out access.',
        isSuperior: true,
        badge: 'Saves $325–$350',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '$68 / Day Self ($75 Valet)',
        description: 'Adds $340–$375 to your 5-night vacation budget.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '$65 / Day Valet Parking',
        description: 'Adds $325 to your 5-night vacation budget.',
        isSuperior: false,
      },
    },
    {
      feature: 'Total Living Space & Lanai',
      category: 'hotels',
      plumeria: {
        title: '624 Sq. Ft. Total (Suite + Lanai)',
        description: '557 sq. ft. interior with real privacy doors, full living room, plus 67 sq. ft. private mountain/ocean lanai.',
        isSuperior: true,
        badge: 'Spacious Suite Living',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '~500 – 620 sq. ft.',
        description: 'Standard suite floor plan with single king or double queen.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '~600 – 720 sq. ft.',
        description: 'Oceanfront suite with sitting room.',
        isSuperior: false,
      },
    },
    {
      feature: 'Kitchen & Dining Setup',
      category: 'hotels',
      plumeria: {
        title: 'Full Chef Kitchen + 12 BBQ Grills',
        description: 'Stove, oven, full fridge, microwave, rice cooker, coffee maker, dishes. Enjoy sunset BBQs.',
        isSuperior: true,
        badge: 'Save $150–$250/Day',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'No Kitchen (Mini-Fridge Only)',
        description: 'Empty mini-fridge & Keurig only. All meals must be purchased at resort restaurants.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'No Kitchen (Wet Bar Only)',
        description: 'Wet bar with mini-fridge only. No cooking appliances allowed in room.',
        isSuperior: false,
      },
    },
    {
      feature: 'Recreation Deck & Amenities',
      category: 'hotels',
      plumeria: {
        title: 'Oʻahu’s Largest 1-Acre 6th-Floor Deck',
        description: 'Large heated pool, 2 jet hot tubs, dry sauna, tennis & pickleball court, 12 gas BBQ pavilions, playground, and café.',
        isSuperior: true,
        badge: '1-Acre Recreation Oasis',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'Resort Pools & Lagoon',
        description: 'Crowded pool decks, competitive morning towel reservations, no sports courts or guest BBQ grills.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'Infinity Pool & Family Pool',
        description: 'Popular infinity pool with daybed rental fees ($150–$350). No tennis courts or barbecue stations.',
        isSuperior: false,
      },
    },
    {
      feature: 'Beach Proximity & Gear',
      category: 'hotels',
      plumeria: {
        title: '1 Block to Kuhio Beach + Free Gear',
        description: '3-minute flat walk to calm lagoon. Complimentary Tommy Bahama backpack beach chairs, umbrella, boogie boards, towels.',
        isSuperior: true,
        badge: 'Free In-Unit Gear',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'Direct Beachfront (Kahanamoku)',
        description: 'Direct sand access, but beach chairs/umbrellas cost $80+/day to rent.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'Direct Oceanfront Seawall',
        description: 'Oceanfront edge; narrow beach section with limited lounge chairs.',
        isSuperior: false,
      },
    },
  ];

  const currentFeatures = activeCategory === 'banyan' ? banyanFeatures : hotelFeatures;

  return (
    <div id="full-comparison" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A3B34] text-[#F6E7A7] border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.18em] shadow-2xs">
          <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
          <span>Complete Competitor Breakdown & Calculator</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A3B34] leading-tight tracking-tight">
          How Plumeria at Waikiki Banyan <br className="hidden sm:inline" />
          <span className="text-[#C59B4B] italic font-medium">Outclasses the Competition</span>
        </h3>

        <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed">
          Compare our guaranteed high-floor Tower 2 suites at <strong className="text-[#1A3B34] font-semibold">$300/night</strong> with free covered parking and $0 resort fees against building hotel operators like <strong className="text-[#1A3B34] font-semibold">Aston at Waikiki Banyan</strong> and prominent Waikiki mega-resorts like <strong className="text-[#1A3B34] font-semibold">Hilton Hawaiian Village & Sheraton Waikiki</strong>.
        </p>

        {/* Category Tabs: Mobile friendly & wraps cleanly */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex flex-wrap sm:flex-nowrap p-1.5 bg-white rounded-2xl sm:rounded-full border border-[#E8DCC6] shadow-2xs gap-1 max-w-full justify-center">
            <button
              type="button"
              onClick={() => setActiveCategory('banyan')}
              className={`px-4 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'banyan'
                  ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                  : 'text-[#1A3B34]/75 hover:text-[#1A3B34] hover:bg-[#F9F7F2]'
              }`}
            >
              vs. Aston & Banyan Rentals
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('hotels')}
              className={`px-4 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'hotels'
                  ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                  : 'text-[#1A3B34]/75 hover:text-[#1A3B34] hover:bg-[#F9F7F2]'
              }`}
            >
              vs. Hilton & Sheraton Suites
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('calculator')}
              className={`px-4 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'calculator'
                  ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                  : 'text-[#1A3B34]/75 hover:text-[#1A3B34] hover:bg-[#F9F7F2]'
              }`}
            >
              Trip Savings Calculator
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Tables / Cards */}
      {(activeCategory === 'banyan' || activeCategory === 'hotels') && (
        <div className="space-y-6">
          {/* Sub-Banner */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#C59B4B] uppercase tracking-wider">
                {activeCategory === 'banyan' ? 'Direct Building Operator Comparison' : 'Luxury Hotel Suite Comparison'}
              </span>
              <p className="text-xs sm:text-sm text-[#1A3B34]/80">
                {activeCategory === 'banyan'
                  ? 'Plumeria (Floors 32 & 36, $300/nt flat, $0 fee, Free Parking) vs. Aston Hotel Pool & Generic Airbnb hosts.'
                  : 'Plumeria 1-Bedroom Suites vs. Published 1-Bedroom Suite Rack Rates at Hilton Hawaiian Village and Sheraton Waikiki.'}
              </p>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex lg:hidden items-center gap-1.5 self-end sm:self-auto bg-[#F9F7F2] p-1 rounded-xl border border-[#E8DCC6]">
              <span className="text-[11px] text-[#1A3B34]/70 px-2 font-medium">View:</span>
              <button
                type="button"
                onClick={() => setMobileViewStyle('cards')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  mobileViewStyle === 'cards' ? 'bg-[#1A3B34] text-white shadow-2xs' : 'text-[#1A3B34]/70 hover:text-[#1A3B34]'
                }`}
                title="Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[11px]">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileViewStyle('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  mobileViewStyle === 'table' ? 'bg-[#1A3B34] text-white shadow-2xs' : 'text-[#1A3B34]/70 hover:text-[#1A3B34]'
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="text-[11px]">Table</span>
              </button>
            </div>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className={`space-y-4 ${mobileViewStyle === 'cards' ? 'block lg:hidden' : 'hidden'}`}>
            {currentFeatures.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DCC6] shadow-xs overflow-hidden transition-all hover:border-[#C59B4B]/50"
              >
                <div className="bg-[#FDFBF7] px-4 py-3 border-b border-[#E8DCC6] flex items-center justify-between">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#1A3B34]">
                    {item.feature}
                  </h4>
                  {item.plumeria.badge && (
                    <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1A3B34] text-[#F6E7A7]">
                      {item.plumeria.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#1A3B34]/5 border border-[#1A3B34]/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Plumeria at Waikiki Banyan ($300/nt)</span>
                    </div>
                    <h5 className="font-serif text-sm font-bold text-[#1A3B34]">
                      {item.plumeria.title}
                    </h5>
                    <p className="text-xs text-[#1A3B34]/80 leading-relaxed font-light">
                      {item.plumeria.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6] space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-600">
                        <span>{item.competitor1.name}</span>
                        {!item.competitor1.isSuperior && (
                          <span className="text-red-600 inline-flex items-center gap-0.5 text-[10px]">
                            <X className="w-3 h-3" /> Fee/Drawback
                          </span>
                        )}
                      </div>
                      <h6 className="font-serif text-xs font-bold text-neutral-800">
                        {item.competitor1.title}
                      </h6>
                      <p className="text-[11px] text-neutral-600 leading-normal font-light">
                        {item.competitor1.description}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6] space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-600">
                        <span>{item.competitor2.name}</span>
                        {!item.competitor2.isSuperior && (
                          <span className="text-red-600 inline-flex items-center gap-0.5 text-[10px]">
                            <X className="w-3 h-3" /> Fee/Drawback
                          </span>
                        )}
                      </div>
                      <h6 className="font-serif text-xs font-bold text-neutral-800">
                        {item.competitor2.title}
                      </h6>
                      <p className="text-[11px] text-neutral-600 leading-normal font-light">
                        {item.competitor2.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FULL DESKTOP TABLE & MOBILE SWIPEABLE TABLE */}
          <div
            className={`bg-white rounded-3xl border border-[#E8DCC6] shadow-sm overflow-hidden ${
              mobileViewStyle === 'table' ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="lg:hidden bg-[#FDFBF7] px-4 py-2 text-[11px] text-[#1A3B34]/70 border-b border-[#E8DCC6] flex items-center justify-between">
              <span>← Swipe sideways to compare all columns →</span>
              <span className="font-semibold text-[#C59B4B]">Scrollable Matrix</span>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[760px] lg:min-w-[860px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8DCC6] bg-[#FDFBF7]">
                    <th className="p-4 lg:p-5 text-xs font-bold uppercase tracking-wider text-[#1A3B34]/70 w-1/4">
                      Key Comparison Feature
                    </th>

                    <th className="p-4 lg:p-5 bg-[#1A3B34] text-white w-1/3 relative">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C59B4B] text-[#1A3B34] text-[10px] font-bold uppercase tracking-wider">
                          Our Best Value ($300/nt)
                        </div>
                        <h4 className="font-serif text-base lg:text-lg font-bold text-[#F6E7A7]">
                          Plumeria at Waikiki Banyan
                        </h4>
                        <p className="text-[11px] text-white/80 font-light">
                          High-Floor Tower 2 Suites (#3609 & #3205)
                        </p>
                      </div>
                    </th>

                    <th className="p-4 lg:p-5 text-xs font-semibold text-[#1A3B34] w-1/5 border-l border-[#E8DCC6]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {activeCategory === 'banyan' ? 'Banyan Hotel Operator' : 'Beachfront Mega-Resort'}
                        </span>
                        <h5 className="font-serif text-sm lg:text-base font-bold text-[#1A3B34]">
                          {activeCategory === 'banyan' ? 'Aston at Waikiki Banyan' : 'Hilton Hawaiian Village'}
                        </h5>
                        <p className="text-[11px] text-[#1A3B34]/70 font-light">
                          {activeCategory === 'banyan' ? 'Hotel Rental Pool' : 'Rainbow / Aliʻi Suites'}
                        </p>
                      </div>
                    </th>

                    <th className="p-4 lg:p-5 text-xs font-semibold text-[#1A3B34] w-1/5 border-l border-[#E8DCC6]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {activeCategory === 'banyan' ? 'Generic Short-Term Rental' : 'Beachfront Mega-Resort'}
                        </span>
                        <h5 className="font-serif text-sm lg:text-base font-bold text-[#1A3B34]">
                          {activeCategory === 'banyan' ? 'Generic Airbnb / VRBO Hosts' : 'Sheraton Waikiki'}
                        </h5>
                        <p className="text-[11px] text-[#1A3B34]/70 font-light">
                          {activeCategory === 'banyan' ? 'Off-Island Property Managers' : 'Kai Oceanfront Suites'}
                        </p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E8DCC6]/60 text-xs sm:text-sm">
                  {currentFeatures.map((item, i) => (
                    <tr key={i} className="hover:bg-[#F9F7F2]/40 transition-colors">
                      <td className="p-4 lg:p-5 font-semibold text-[#1A3B34] align-top">
                        <div className="space-y-1">
                          <span>{item.feature}</span>
                          {item.plumeria.badge && (
                            <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A3B34]/10 text-[#1A3B34]">
                              {item.plumeria.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 lg:p-5 bg-[#1A3B34]/5 font-semibold text-[#1A3B34] align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="font-serif text-sm font-bold text-[#1A3B34]">
                              {item.plumeria.title}
                            </span>
                          </div>
                          <p className="text-xs text-[#1A3B34]/80 font-normal leading-relaxed">
                            {item.plumeria.description}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 lg:p-5 border-l border-[#E8DCC6] text-neutral-700 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-neutral-800 font-medium text-xs font-serif">
                            {!item.competitor1.isSuperior ? (
                              <X className="w-3 h-3 text-red-600 shrink-0" />
                            ) : (
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            )}
                            <span>{item.competitor1.title}</span>
                          </div>
                          <p className="text-[11px] text-neutral-600 font-normal leading-normal">
                            {item.competitor1.description}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 lg:p-5 border-l border-[#E8DCC6] text-neutral-700 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-neutral-800 font-medium text-xs font-serif">
                            {!item.competitor2.isSuperior ? (
                              <X className="w-3 h-3 text-red-600 shrink-0" />
                            ) : (
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            )}
                            <span>{item.competitor2.title}</span>
                          </div>
                          <p className="text-[11px] text-neutral-600 font-normal leading-normal">
                            {item.competitor2.description}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR TAB */}
      {activeCategory === 'calculator' && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#E8DCC6] shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C59B4B]">
              Interactive Trip Comparison
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34]">
              Calculate Your True Vacation Savings
            </h4>
            <p className="text-xs sm:text-sm text-[#1A3B34]/75 font-light">
              Compare Plumeria ($300/night with free parking & $0 fees) against building hotel operators or beachfront mega-resorts for any stay duration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-[#E8DCC6]/80">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A3B34] block">
                Compare Plumeria Against:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCalculatorMode('banyan')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    calculatorMode === 'banyan'
                      ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                      : 'bg-[#F9F7F2] text-[#1A3B34] border border-[#E8DCC6] hover:border-[#C59B4B]'
                  }`}
                >
                  Aston & Banyan Rentals
                </button>
                <button
                  type="button"
                  onClick={() => setCalculatorMode('hotels')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    calculatorMode === 'hotels'
                      ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                      : 'bg-[#F9F7F2] text-[#1A3B34] border border-[#E8DCC6] hover:border-[#C59B4B]'
                  }`}
                >
                  Hilton & Sheraton Suites
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A3B34] block">
                Length of Stay: <span className="text-sm text-[#C59B4B] font-serif font-bold">{stayNights} Nights</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[3, 4, 5, 7, 10, 14].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStayNights(n)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      stayNights === n
                        ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                        : 'bg-[#F9F7F2] text-[#1A3B34] border border-[#E8DCC6] hover:border-[#C59B4B]'
                    }`}
                  >
                    {n}nt
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {/* Plumeria */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#1A3B34] to-[#20473F] text-white border-2 border-[#C59B4B] shadow-lg flex flex-col justify-between relative order-first">
              <div className="absolute -top-3 right-5 bg-[#C59B4B] text-[#1A3B34] text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Your Smart Choice
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg sm:text-xl font-bold text-[#F6E7A7]">
                    Plumeria at Waikiki Banyan
                  </h5>
                  <p className="text-xs text-white/80 font-light">
                    High Floor Tower 2 Suite · Full Kitchen · Free Parking
                  </p>
                </div>

                <div className="py-2 border-y border-white/15 space-y-1.5 text-xs text-white/85">
                  <div className="flex justify-between">
                    <span>Suite Rate ({stayNights} nights @ $300):</span>
                    <span className="font-semibold">${plumeriaNightly * stayNights}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300 font-medium">
                    <span>Amenity / Resort Fee:</span>
                    <span>$0 Included</span>
                  </div>
                  <div className="flex justify-between text-emerald-300 font-medium">
                    <span>Covered Parking Pass:</span>
                    <span>$0 FREE Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kitchen Groceries / BBQs:</span>
                    <span className="font-semibold">${plumeriaDiningDaily * stayNights}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/20">
                <span className="text-xs text-white/70 block">Estimated All-In Total:</span>
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F6E7A7]">
                  ${plumeriaTotal.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-300 font-semibold block mt-1">
                  Direct Booking or Airbnb Superhost
                </span>
              </div>
            </div>

            {/* Competitor 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-[#1A3B34] flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                    {calculatorMode === 'banyan' ? 'Aston at Waikiki Banyan' : 'Hilton Hawaiian Village'}
                  </h5>
                  <p className="text-xs text-[#1A3B34]/70 font-light">
                    {calculatorMode === 'banyan'
                      ? 'Hotel Rental Pool · Random Floor Assignment'
                      : 'Rainbow / Aliʻi Tower 1-Bedroom Suite'}
                  </p>
                </div>

                <div className="py-2 border-y border-[#E8DCC6] space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Room ({stayNights} nights):</span>
                    <span className="font-semibold text-neutral-900">
                      ${(calculatorMode === 'banyan' ? astonNightly : hiltonNightly) * stayNights}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Mandatory Amenity/Resort Fee:</span>
                    <span>+${(calculatorMode === 'banyan' ? astonAmenityFee : hiltonResortFee) * stayNights}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Garage Parking ({stayNights} days):</span>
                    <span>+${(calculatorMode === 'banyan' ? astonParking : hiltonParking) * stayNights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining / Restaurants:</span>
                    <span className="font-semibold">
                      ${(calculatorMode === 'banyan' ? astonDiningDaily : hiltonDiningDaily) * stayNights}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DCC6]">
                <span className="text-xs text-[#1A3B34]/70 block">Estimated All-In Total:</span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-red-600">
                  ${(calculatorMode === 'banyan' ? astonTotal : hiltonTotal).toLocaleString()}
                </div>
                <span className="text-xs text-red-700 font-medium block mt-1">
                  +${((calculatorMode === 'banyan' ? astonTotal : hiltonTotal) - plumeriaTotal).toLocaleString()} more than Plumeria
                </span>
              </div>
            </div>

            {/* Competitor 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-[#1A3B34] flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                    {calculatorMode === 'banyan' ? 'Generic Waikiki Airbnb' : 'Sheraton Waikiki'}
                  </h5>
                  <p className="text-xs text-[#1A3B34]/70 font-light">
                    {calculatorMode === 'banyan'
                      ? 'Off-Island Host · Parking Not Included'
                      : 'Kai Oceanfront Suite / Malia Suite'}
                  </p>
                </div>

                <div className="py-2 border-y border-[#E8DCC6] space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Room ({stayNights} nights):</span>
                    <span className="font-semibold text-neutral-900">
                      ${(calculatorMode === 'banyan' ? genericAirbnbNightly : sheratonNightly) * stayNights}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-700">
                    <span>{calculatorMode === 'banyan' ? 'Cleaning & Service Fees:' : 'Resort Fees:'}</span>
                    <span className="text-red-600">
                      +${(calculatorMode === 'banyan' ? genericAirbnbFee : sheratonResortFee) * stayNights}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Parking ({stayNights} days):</span>
                    <span>+${(calculatorMode === 'banyan' ? genericAirbnbParking : sheratonParking) * stayNights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Dining:</span>
                    <span className="font-semibold">
                      ${(calculatorMode === 'banyan' ? genericAirbnbDiningDaily : sheratonDiningDaily) * stayNights}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DCC6]">
                <span className="text-xs text-[#1A3B34]/70 block">Estimated All-In Total:</span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-red-600">
                  ${(calculatorMode === 'banyan' ? genericTotal : sheratonTotal).toLocaleString()}
                </div>
                <span className="text-xs text-red-700 font-medium block mt-1">
                  +${((calculatorMode === 'banyan' ? genericTotal : sheratonTotal) - plumeriaTotal).toLocaleString()} more than Plumeria
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Citations & Backlinks */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DCC6] space-y-3">
        <div className="flex items-center gap-2 text-[#1A3B34]">
          <Info className="w-4 h-4 text-[#C59B4B] shrink-0" />
          <h5 className="font-serif text-sm sm:text-base font-bold">
            Transparent Travel References & Legal Resort Zoning Compliance
          </h5>
        </div>
        <p className="text-xs text-[#1A3B34]/75 font-light leading-relaxed">
          Waikiki Banyan (201 ʻOhua Avenue) is located in the official City & County of Honolulu <strong>Waikiki Resort Hotel District</strong>, legally permitting short-term vacation rentals under 30 days without municipal zoning violation risks. Published figures reflect seasonal averages, mandatory daily resort fees, and standard parking garage rates in Waikiki.
        </p>
        <div className="pt-2 border-t border-[#E8DCC6]/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#1A3B34]/80">
          <span className="font-semibold text-[#1A3B34]">Verified Sources:</span>
          <a
            href="https://www.gohawaii.com/islands/oahu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C59B4B] hover:text-[#996D28] font-medium transition-colors"
          >
            <span>Hawaiʻi Tourism Authority</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.honolulu.gov/dpp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <span>Honolulu DPP Resort Zoning</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.aquaaston.com/hotels/aston-at-the-waikiki-banyan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <span>Aston at Waikiki Banyan Fees</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={SITE_CONFIG.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#FF385C] hover:underline font-semibold transition-colors"
          >
            <span>Verified Airbnb Superhost</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
