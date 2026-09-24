import React, { useState } from 'react';
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
  Eye,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { calculateStayPricing, TAX_RATES } from '../../utils/pricing';

interface FullCompetitorComparisonProps {
  onBookStay?: () => void;
  onExploreRentals?: () => void;
  onNavigate?: (path: string) => void;
}

type ComparisonCategory = 'hotels' | 'hyatt' | 'calculator';

interface ComparisonFeature {
  feature: string;
  category: 'hotels' | 'hyatt';
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
  onNavigate,
}) => {
  // Compare Hotel first, before alternative competitors
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory>('hotels');
  const [mobileViewStyle, setMobileViewStyle] = useState<'cards' | 'table'>('cards');
  const [stayNights, setStayNights] = useState<number>(5);
  const [calculatorMode, setCalculatorMode] = useState<'hotels' | 'hyatt'>('hotels');

  // Competitor pricing benchmarks
  // Hawaii taxes: 18.50% total (GET 4.5% + TAT 11% + OTAT 3%) on room + mandatory resort fees
  // Hawaii GET tax: 4.712% on parking
  const LODGING_TAX_RATE = 0.185;
  const PARKING_TAX_RATE = 0.04712;

  // Hilton Hawaiian Village 1-Bedroom Suite
  const hiltonNightly = 850;
  const hiltonResortFee = 65;
  const hiltonRoomTaxDaily = Math.round((hiltonNightly + hiltonResortFee) * LODGING_TAX_RATE);
  const hiltonParking = 69;
  const hiltonParkingTaxDaily = Math.round(hiltonParking * PARKING_TAX_RATE);
  const hiltonDailyStayTotal = hiltonNightly + hiltonResortFee + hiltonRoomTaxDaily + hiltonParking + hiltonParkingTaxDaily;
  const hiltonTotal = hiltonDailyStayTotal * stayNights;

  // Sheraton Waikiki 1-Bedroom Ocean Suite
  const sheratonNightly = 980;
  const sheratonResortFee = 61;
  const sheratonRoomTaxDaily = Math.round((sheratonNightly + sheratonResortFee) * LODGING_TAX_RATE);
  const sheratonParking = 55;
  const sheratonParkingTaxDaily = Math.round(sheratonParking * PARKING_TAX_RATE);
  const sheratonDailyStayTotal = sheratonNightly + sheratonResortFee + sheratonRoomTaxDaily + sheratonParking + sheratonParkingTaxDaily;
  const sheratonTotal = sheratonDailyStayTotal * stayNights;

  // Hyatt Regency Waikiki Beach Resort & Spa (Premier 4-Star Kalakaua Ave Resort)
  const hyattNightly = 520;
  const hyattResortFee = 52;
  const hyattRoomTaxDaily = Math.round((hyattNightly + hyattResortFee) * LODGING_TAX_RATE);
  const hyattParking = 65;
  const hyattParkingTaxDaily = Math.round(hyattParking * PARKING_TAX_RATE);
  const hyattDailyStayTotal = hyattNightly + hyattResortFee + hyattRoomTaxDaily + hyattParking + hyattParkingTaxDaily;
  const hyattTotal = hyattDailyStayTotal * stayNights;

  // Generic Waikiki Airbnb
  const genericAirbnbNightly = 240;
  const genericAirbnbFee = 35;
  const genericAirbnbRoomTaxDaily = Math.round((genericAirbnbNightly + genericAirbnbFee) * LODGING_TAX_RATE);
  const genericAirbnbParking = 43;
  const genericAirbnbParkingTaxDaily = Math.round(genericAirbnbParking * PARKING_TAX_RATE);
  const genericDailyStayTotal = genericAirbnbNightly + genericAirbnbFee + genericAirbnbRoomTaxDaily + genericAirbnbParking + genericAirbnbParkingTaxDaily;
  const genericTotal = genericDailyStayTotal * stayNights;

  // Plumeria pricing via centralized calculation (formula: Total = TAX + Base + Cleaning Fee)
  const plumeriaPricing = calculateStayPricing(stayNights);

  // 1. Hotel Comparison Features (Hotel first) - Simple, clear, concise
  const hotelFeatures: ComparisonFeature[] = [
    {
      feature: 'Nightly Suite Rate',
      category: 'hotels',
      plumeria: {
        title: '$199 / Night (Special Promo)',
        description: 'True 1-bedroom high-floor suite. 5%–30% tiered stay discounts.',
        isSuperior: true,
        badge: '$199 Promo Rate',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '$650 – $1,450+ / Night',
        description: 'Hotel suite pricing with no kitchen.',
        isSuperior: false,
        badge: 'Resort Markup',
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '$850 – $1,650+ / Night',
        description: 'Standard rooms start at $450/nt with no kitchen.',
        isSuperior: false,
        badge: 'Luxury Surcharge',
      },
    },
    {
      feature: 'Resort Fees',
      category: 'hotels',
      plumeria: {
        title: '$0 Resort Fees (Never Charged)',
        description: 'Full access to heated pool, 2 jet hot tubs, sauna, tennis/pickleball & BBQ grills.',
        isSuperior: true,
        badge: '$0 Resort Fees',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '+$65 / Night Mandatory',
        description: 'Adds $325+ per 5-night stay on top of room rate.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '+$61 / Night Mandatory',
        description: 'Adds $305+ per 5-night stay on top of room rate.',
        isSuperior: false,
      },
    },
    {
      feature: 'Covered Garage Parking',
      category: 'hotels',
      plumeria: {
        title: 'FREE Dedicated Parking Pass ($0)',
        description: 'Dedicated covered garage pass with unlimited in-and-out privileges and $0 tax.',
        isSuperior: true,
        badge: 'Saves $275–$360',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: '$69 / Day + Tax',
        description: 'Subject to GET tax (~$72/day). Adds $360+ per 5-night stay.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: '$55 / Day + Tax',
        description: 'Subject to GET tax (~$58/day). Adds $290+ per 5-night stay.',
        isSuperior: false,
      },
    },
    {
      feature: 'Kitchen Setup',
      category: 'hotels',
      plumeria: {
        title: 'Full Kitchen in Suite',
        description: 'Full-size refrigerator, oven, stove, microwave, coffee maker & cookware inside your suite.',
        isSuperior: true,
        badge: 'Full Kitchen',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'No Kitchen (Mini-Fridge Only)',
        description: 'No cooking facilities or kitchenware in standard suites. Must dine out for all meals.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'No Kitchen (Wet Bar Only)',
        description: 'Wet bar only. No cooking range, oven, or kitchen appliances.',
        isSuperior: false,
      },
    },
    {
      feature: 'Air Conditioning & Comfort',
      category: 'hotels',
      plumeria: {
        title: 'Fully Airconditioned',
        description: 'Fully airconditioned comfort, modern coastal furniture, and high-speed Wi-Fi.',
        isSuperior: true,
        badge: 'Fully Airconditioned',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'Central Hotel AC',
        description: 'Standard hotel central cooling system.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'Central Hotel AC',
        description: 'Standard hotel central cooling system.',
        isSuperior: false,
      },
    },
    {
      feature: 'Beach Gear & Proximity',
      category: 'hotels',
      plumeria: {
        title: '1 Block to Beach + Free Beach Gear',
        description: '3-minute walk to Kuhio Beach. Beach chairs, boogie boards & beach towels included.',
        isSuperior: true,
        badge: 'Beach Gear ($0)',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'Beachfront (Gear Costs Extra)',
        description: 'Direct sand access, but chairs rent for $80+/day.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'Oceanfront Seawall',
        description: 'Seawall edge with narrow beach section.',
        isSuperior: false,
      },
    },
    {
      feature: 'Short-Term Rental License',
      category: 'hotels',
      plumeria: {
        title: 'Authorized Honolulu STR License',
        description: 'Authorized Short-Term Rental License by the City and County of Honolulu in Waikiki Resort zone.',
        isSuperior: true,
        badge: 'City Authorized STR',
      },
      competitor1: {
        name: 'Hilton Hawaiian Village',
        title: 'Commercial Hotel',
        description: 'Standard commercial resort operation.',
        isSuperior: true,
      },
      competitor2: {
        name: 'Sheraton Waikiki',
        title: 'Commercial Hotel',
        description: 'Standard commercial resort operation.',
        isSuperior: true,
      },
    },
  ];

  // 2. Hyatt Regency Waikiki Comparison Features - Simple, clear, concise
  const hyattFeatures: ComparisonFeature[] = [
    {
      feature: 'Guaranteed Suite & Floor',
      category: 'hyatt',
      plumeria: {
        title: 'Guaranteed High-Floor (Floors 32 & 36)',
        description: 'Exact suite booked in Tower 2 with panoramic Diamond Head, mountain, and ocean views.',
        isSuperior: true,
        badge: 'Guaranteed High Floor',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: 'Assigned on Arrival / Floor Surcharges',
        description: 'Rooms and suites assigned upon check-in. High oceanfront floors require steep upgrade fees.',
        isSuperior: false,
        badge: 'No Guaranteed Floor',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Varies Widely / Lower Floors',
        description: 'Floor levels and views vary unpredictably.',
        isSuperior: false,
      },
    },
    {
      feature: 'Covered Garage Parking',
      category: 'hyatt',
      plumeria: {
        title: 'FREE Dedicated Parking Pass ($0)',
        description: 'Dedicated pass for Waikiki Banyan garage included with unlimited in/out access.',
        isSuperior: true,
        badge: 'Saves $340+ per stay',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: '$65 / Day Hotel Parking + Tax',
        description: 'Self/valet hotel parking is $65/day + tax ($340+ extra for a 5-night stay).',
        isSuperior: false,
        badge: '+$340 Extra (5 Nts)',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: '$43 / Day Public Rate',
        description: 'Most individual hosts do not provide parking.',
        isSuperior: false,
      },
    },
    {
      feature: 'Resort Fees & Pricing',
      category: 'hyatt',
      plumeria: {
        title: '$199 Promo Rate · $0 Resort Fees',
        description: 'Formula: Total = TAX (18.5%) + Base + Cleaning Fee ($0 for 3+ nights). 5% to 30% stay discounts.',
        isSuperior: true,
        badge: '$0 Resort Fees',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: '+$52 / Night Mandatory Resort Fee',
        description: 'Daily resort destination fee on top of room rates ($260+ extra on a 5-night stay).',
        isSuperior: false,
        badge: '+$260 Fee',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'High Cleaning & Service Fees',
        description: 'High cleaning fees ($200–$300) plus 14% platform guest markups.',
        isSuperior: false,
      },
    },
    {
      feature: 'Suite Size & Layout',
      category: 'hyatt',
      plumeria: {
        title: 'Spacious 600+ sq ft with Private Bedroom',
        description: 'Full separate master bedroom with sliding privacy door, spacious living room, dining space, and lanai.',
        isSuperior: true,
        badge: '600+ sq ft',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: 'Standard Hotel Room (~500 sq ft)',
        description: 'Open hotel room layout without residential suite separation; suites cost $650–$900+/night.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Inconsistent Upkeep & Space',
        description: 'Often compact studios or older window AC layouts with cramped living areas.',
        isSuperior: false,
      },
    },
    {
      feature: 'Kitchen Capabilities',
      category: 'hyatt',
      plumeria: {
        title: 'Full kitchen in Suite',
        description: 'Full-size refrigerator, oven, stove, microwave, coffee maker & cookware inside your private suite.',
        isSuperior: true,
        badge: 'Full kitchen',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: 'Mini-Fridge Only (No Stove/Oven)',
        description: 'No kitchen or cooking facilities. Dining out is required for every meal, adding $150–$250/day.',
        isSuperior: false,
        badge: 'No Kitchen',
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Basic / Incomplete Cookware',
        description: 'Frequently missing essential cookware or dining supplies.',
        isSuperior: false,
      },
    },
    {
      feature: 'Beach Gear Included',
      category: 'hyatt',
      plumeria: {
        title: 'Beach Gear Included ($0)',
        description: 'Backpack beach chairs, boogie boards, plush beach towels & cooler tote inside suite.',
        isSuperior: true,
        badge: 'Free Gear',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: 'Pool Towels Only',
        description: 'No beach chairs or boogie boards. Beach umbrella & chair rentals on sand run $60–$80/day.',
        isSuperior: false,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Sparse or Missing',
        description: 'Often broken or missing items left by previous guests.',
        isSuperior: false,
      },
    },
    {
      feature: 'Short-Term Rental License',
      category: 'hyatt',
      plumeria: {
        title: 'Authorized Honolulu STR License',
        description: 'Authorized Short-Term Rental License by the City and County of Honolulu for legal peace of mind.',
        isSuperior: true,
        badge: 'Honolulu Licensed STR',
      },
      competitor1: {
        name: 'Hyatt Regency Waikiki',
        title: 'Commercial Hotel License',
        description: 'Operates as large commercial hotel property.',
        isSuperior: true,
      },
      competitor2: {
        name: 'Generic Waikiki Airbnb Hosts',
        title: 'Unregistered Units Risk Penalties',
        description: 'Unregistered rentals outside resort districts face city penalties or cancellation.',
        isSuperior: false,
      },
    },
  ];

  const currentFeatures = activeCategory === 'hotels' ? hotelFeatures : hyattFeatures;

  return (
    <div id="full-comparison" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A3B34] text-[#F6E7A7] border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.18em] shadow-2xs">
          <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
          <span>Competitor Breakdown & Trip Savings Calculator</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A3B34] leading-tight tracking-tight">
          How Plumeria at Waikiki Banyan <br className="hidden sm:inline" />
          <span className="text-[#C59B4B] italic font-medium">Outclasses the Competition</span>
        </h3>

        <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed">
          Compare our guaranteed high-floor Tower 2 suites at <strong className="text-[#1A3B34] font-semibold">$199/night promo rate</strong> with free covered parking and $0 Resort fees against prominent Waikiki hotel suites and on-site building rental pools.
        </p>

        {/* Category Tabs: Compare Hotel First */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex flex-wrap sm:flex-nowrap p-1.5 bg-white rounded-2xl sm:rounded-full border border-[#E8DCC6] shadow-2xs gap-1 max-w-full justify-center">
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
              onClick={() => setActiveCategory('hyatt')}
              className={`px-4 sm:px-5 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === 'hyatt'
                  ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                  : 'text-[#1A3B34]/75 hover:text-[#1A3B34] hover:bg-[#F9F7F2]'
              }`}
            >
              vs. Hyatt Regency Waikiki
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
      {(activeCategory === 'hotels' || activeCategory === 'hyatt') && (
        <div className="space-y-6">
          {/* Sub-Banner */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#C59B4B] uppercase tracking-wider">
                {activeCategory === 'hotels' ? 'Luxury Hotel Suite Comparison' : 'Premier Waikiki Resort Hotel Comparison'}
              </span>
              <p className="text-xs sm:text-sm text-[#1A3B34]/80">
                {activeCategory === 'hotels'
                  ? 'Plumeria ($199/nt promo, $0 Resort fees, Free Parking, Full kitchen) vs. Hilton Hawaiian Village & Sheraton Waikiki.'
                  : 'Plumeria (Floors 32 & 36, $199/nt promo, $0 Resort fees, Free Parking) vs. Hyatt Regency Waikiki & Generic Airbnb hosts.'}
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
                    <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1A3B34] text-[#F6E7A7] whitespace-nowrap shrink-0 ml-2">
                      {item.plumeria.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#1A3B34]/5 border border-[#1A3B34]/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Plumeria at Waikiki Banyan ($199/nt Promo)</span>
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
                          $199 Promo · $0 Resort Fees
                        </div>
                        <h4 className="font-serif text-base lg:text-lg font-bold text-[#F6E7A7]">
                          Plumeria at Waikiki Banyan
                        </h4>
                        <p className="text-[11px] text-white/80 font-light">
                          Tower 2 Suites (#3609 & #3205) · Honolulu Licensed STR
                        </p>
                      </div>
                    </th>

                    <th className="p-4 lg:p-5 text-xs font-semibold text-[#1A3B34] w-1/5 border-l border-[#E8DCC6]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {activeCategory === 'hotels' ? 'Beachfront Resort' : 'Premier Resort Hotel'}
                        </span>
                        <h5 className="font-serif text-sm lg:text-base font-bold text-[#1A3B34]">
                          {activeCategory === 'hotels' ? 'Hilton Hawaiian Village' : 'Hyatt Regency Waikiki'}
                        </h5>
                        <p className="text-[11px] text-[#1A3B34]/70 font-light">
                          {activeCategory === 'hotels' ? '1-Bedroom Suites' : 'Kalakaua Ave Resort'}
                        </p>
                      </div>
                    </th>

                    <th className="p-4 lg:p-5 text-xs font-semibold text-[#1A3B34] w-1/5 border-l border-[#E8DCC6]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {activeCategory === 'hotels' ? 'Oceanfront Resort' : 'Generic Short-Term Rental'}
                        </span>
                        <h5 className="font-serif text-sm lg:text-base font-bold text-[#1A3B34]">
                          {activeCategory === 'hotels' ? 'Sheraton Waikiki' : 'Generic Airbnb / VRBO Hosts'}
                        </h5>
                        <p className="text-[11px] text-[#1A3B34]/70 font-light">
                          {activeCategory === 'hotels' ? 'Kai Oceanfront Suites' : 'Off-Island Hosts'}
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
              Compare Plumeria ($199 promo rate, $0 Resort fees, Free Parking, and $0 Cleaning Fee for 3+ nights) against Waikiki hotel suites and on-site hotel pools.
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
                  onClick={() => setCalculatorMode('hotels')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    calculatorMode === 'hotels'
                      ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                      : 'bg-[#F9F7F2] text-[#1A3B34] border border-[#E8DCC6] hover:border-[#C59B4B]'
                  }`}
                >
                  Hilton & Sheraton Suites
                </button>
                <button
                  type="button"
                  onClick={() => setCalculatorMode('hyatt')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    calculatorMode === 'hyatt'
                      ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-xs'
                      : 'bg-[#F9F7F2] text-[#1A3B34] border border-[#E8DCC6] hover:border-[#C59B4B]'
                  }`}
                >
                  Hyatt Regency Waikiki
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A3B34] block">
                Length of Stay: <span className="text-sm text-[#C59B4B] font-serif font-bold">{stayNights} Nights</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[1, 2, 3, 5, 7, 10, 15, 20, 30].map((n) => (
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

              {/* Want to waive cleaning fee tip */}
              {stayNights < 3 ? (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-between gap-2 mt-2">
                  <span><strong>Want to waive the cleaning fee?</strong> Book 3 nights or more ($0 cleaning fee instead of $250)!</span>
                  <button
                    type="button"
                    onClick={() => setStayNights(3)}
                    className="px-2.5 py-1 rounded bg-[#1A3B34] text-[#F6E7A7] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#224D44]"
                  >
                    Select 3 Nts
                  </button>
                </div>
              ) : (
                <div className="p-1.5 px-2.5 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-200/70 flex items-center gap-1.5 mt-2">
                  <span>✓ <strong>Cleaning fee waived!</strong> You save $250 with 3+ nights.</span>
                </div>
              )}
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
                    Honolulu Licensed STR · Full kitchen · Free Parking · Fully Airconditioned
                  </p>
                </div>

                <div className="py-2 border-y border-white/15 space-y-1.5 text-xs text-white/85">
                  <div className="flex justify-between">
                    <span>Base Rate ({stayNights} nts @ $199):</span>
                    <span className="font-semibold">${plumeriaPricing.grossRoomTotal.toLocaleString()}</span>
                  </div>

                  {plumeriaPricing.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-300 font-semibold bg-white/10 px-2 py-1 rounded">
                      <span>Stay Discount ({plumeriaPricing.discountPercent}% Off):</span>
                      <span>-${Math.round(plumeriaPricing.discountAmount).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Cleaning Fee:</span>
                    <span className={plumeriaPricing.cleaningFee === 0 ? 'text-emerald-300 font-semibold' : 'font-semibold'}>
                      {plumeriaPricing.cleaningFee === 0 ? '$0 (Waived for 3+ Nts)' : `$${plumeriaPricing.cleaningFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#F6E7A7]">
                    <span>Hawaii Taxes (18.5%):</span>
                    <span className="font-semibold">${Math.round(plumeriaPricing.totalTaxes).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-300 font-medium pt-1">
                    <span>Resort Fees:</span>
                    <span>$0 (Never Charged)</span>
                  </div>
                  <div className="flex justify-between text-emerald-300 font-medium">
                    <span>Covered Garage Parking:</span>
                    <span>$0 FREE Included ($0 Tax)</span>
                  </div>
                  <div className="flex justify-between text-emerald-200 text-[11px] pt-0.5">
                    <span>Kitchen Setup:</span>
                    <span>Full Kitchen in Suite</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/20">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-white/70 block">Total Stay (TAX + Base + Cleaning):</span>
                    <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F6E7A7]">
                      ${Math.round(plumeriaPricing.grandTotal).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-300 font-bold block">
                      {stayNights >= 3 ? 'Cleaning Fee Waived' : '1–2 Nt Stay'}
                    </span>
                    {plumeriaPricing.discountPercent > 0 && (
                      <span className="text-[10px] text-white/70 block">
                        {plumeriaPricing.discountPercent}% Extended Stay Discount
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-[#F6E7A7] font-semibold block mt-1">
                  Transparent formula: Total = TAX + Base + Cleaning Fee
                </span>
              </div>
            </div>

            {/* Competitor 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-[#1A3B34] flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                    {calculatorMode === 'hotels' ? 'Hilton Hawaiian Village' : 'Hyatt Regency Waikiki'}
                  </h5>
                  <p className="text-xs text-[#1A3B34]/70 font-light">
                    {calculatorMode === 'hotels'
                      ? '1-Bedroom Suite · No Kitchen'
                      : 'Resort Suite · Mini-Fridge Only'}
                  </p>
                </div>

                <div className="py-2 border-y border-[#E8DCC6] space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Room ({stayNights} nights):</span>
                    <span className="font-semibold text-neutral-900">
                      ${((calculatorMode === 'hotels' ? hiltonNightly : hyattNightly) * stayNights).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Mandatory Resort Fees:</span>
                    <span>+${((calculatorMode === 'hotels' ? hiltonResortFee : hyattResortFee) * stayNights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#8A5A1C]">
                    <span>Hawaii Taxes (18.5%):</span>
                    <span className="font-semibold">+${((calculatorMode === 'hotels' ? hiltonRoomTaxDaily : hyattRoomTaxDaily) * stayNights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Garage Parking + Tax:</span>
                    <span>+${((calculatorMode === 'hotels' ? (hiltonParking + hiltonParkingTaxDaily) : (hyattParking + hyattParkingTaxDaily)) * stayNights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 pt-0.5">
                    <span>Kitchen Setup:</span>
                    <span>{calculatorMode === 'hotels' ? 'No kitchen in suite' : 'Mini-fridge only (no kitchen/oven)'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DCC6]">
                <span className="text-xs text-[#1A3B34]/70 block">Total Stay (Room + Taxes + Resort Fees + Parking):</span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-red-600">
                  ${Math.round(calculatorMode === 'hotels' ? hiltonTotal : hyattTotal).toLocaleString()}
                </div>
                <span className="text-xs text-red-700 font-medium block mt-1">
                  +${Math.round((calculatorMode === 'hotels' ? hiltonTotal : hyattTotal) - plumeriaPricing.grandTotal).toLocaleString()} more than Plumeria stay
                </span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">
                  {calculatorMode === 'hotels'
                    ? 'Room, taxes, and fees alone cost significantly more'
                    : '$52/night resort fee + $65/day parking add hundreds to your bill'}
                </span>
              </div>
            </div>

            {/* Competitor 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-[#1A3B34] flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h5 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                    {calculatorMode === 'hotels' ? 'Sheraton Waikiki' : 'Generic Waikiki Airbnb'}
                  </h5>
                  <p className="text-xs text-[#1A3B34]/70 font-light">
                    {calculatorMode === 'hotels'
                      ? 'Oceanfront Suite · No Kitchen'
                      : 'Off-Island Host · Parking Extra'}
                  </p>
                </div>

                <div className="py-2 border-y border-[#E8DCC6] space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Room ({stayNights} nights):</span>
                    <span className="font-semibold text-neutral-900">
                      ${((calculatorMode === 'hotels' ? sheratonNightly : genericAirbnbNightly) * stayNights).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-700">
                    <span>{calculatorMode === 'hotels' ? 'Resort Fees:' : 'Cleaning & Service Fees:'}</span>
                    <span className="text-red-600">
                      +${((calculatorMode === 'hotels' ? sheratonResortFee : genericAirbnbFee) * stayNights).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#8A5A1C]">
                    <span>Hawaii Taxes (18.5%):</span>
                    <span className="font-semibold">+${((calculatorMode === 'hotels' ? sheratonRoomTaxDaily : genericAirbnbRoomTaxDaily) * stayNights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Garage Parking + Tax:</span>
                    <span>+${((calculatorMode === 'hotels' ? (sheratonParking + sheratonParkingTaxDaily) : (genericAirbnbParking + genericAirbnbParkingTaxDaily)) * stayNights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 pt-0.5">
                    <span>Kitchen Setup:</span>
                    <span>{calculatorMode === 'hotels' ? 'Wet bar only (no range/oven)' : 'Variable cookware quality'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DCC6]">
                <span className="text-xs text-[#1A3B34]/70 block">Total Stay (Room + Taxes + Fees + Parking):</span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-red-600">
                  ${Math.round(calculatorMode === 'hotels' ? sheratonTotal : genericTotal).toLocaleString()}
                </div>
                <span className="text-xs text-red-700 font-medium block mt-1">
                  +${Math.round((calculatorMode === 'hotels' ? sheratonTotal : genericTotal) - plumeriaPricing.grandTotal).toLocaleString()} more than Plumeria stay
                </span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">
                  {calculatorMode === 'hotels'
                    ? '$61 resort fee + $58/day parking add hundreds to stay'
                    : 'Hidden host fees and unbundled parking increase total cost'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick link to Nearby Dinings */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C59B4B]/30 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#C59B4B]/15 text-[#8A5A1C]">
                  <Utensils className="w-4 h-4" />
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-[#1A3B34]">
                  Where to Eat: Calculated Nearby Dinings & Pricing
                </span>
              </div>
              <p className="text-xs text-[#1A3B34]/75 font-light">
                Discover 11 real nearby spots around Waikiki Banyan with itemized meal prices and our interactive dining budget estimator on the Explore page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/explore');
                } else {
                  window.location.hash = '#/explore';
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#1A3B34] text-[#F6E7A7] text-xs font-semibold hover:bg-[#234E45] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Explore Dining Guide & Prices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Real Data Grounding Note */}
          <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-xs text-[#1A3B34]/80 space-y-1.5">
            <span className="font-semibold text-[#1A3B34] block text-sm">How This Comparative Pricing is Grounded:</span>
            <p className="font-light leading-relaxed">
              • <strong>Plumeria at Waikiki Banyan:</strong> $199/night promotional rate across all units, $0 Resort fees, $0 parking pass. Cleaning fee is $250 for 1–2 nights and waived ($0) for 3+ nights. Tiered stay discounts apply incrementally (5 days: 5%, 10 days: 10%, 15 days: 15%, 20 days: 20%, 25 days: 25%, 30 days: 30%). Hawaii Taxes: 18.5% total applied directly to Base + Cleaning Fee.
            </p>
            <p className="font-light leading-relaxed">
              • <strong>Hawaii Taxes:</strong> Full Hawaii taxes (18.5% total) are applied across competitor room rates and mandatory resort fees, giving you an accurate, true comparison.
            </p>
            <p className="font-light leading-relaxed">
              • <strong>Taxed Hotel Parking:</strong> Hawaii hotels and garages apply Hawaii General Excise Tax (GET 4.712%) to parking fees ($69/day at Hilton, $65/day at Hyatt Regency, $55/day at Sheraton). Plumeria includes a complimentary dedicated covered parking pass ($0 fee, $0 tax).
            </p>
            <p className="font-light leading-relaxed">
              • <strong>Nearby Dinings & Kitchen Flexibility:</strong> Having a Full kitchen provides the flexibility to brew morning Kona coffee or prepare snacks, while being steps away from Waikiki's favorite dining spots. Explore the dedicated guide with local meal pricing on the Explore Waikiki page.
            </p>
          </div>
        </div>
      )}

      {/* Regulatory Citations & Backlinks */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DCC6] space-y-3">
        <div className="flex items-center gap-2 text-[#1A3B34]">
          <Info className="w-4 h-4 text-[#C59B4B] shrink-0" />
          <h5 className="font-serif text-sm sm:text-base font-bold">
            Authorized Short-Term Rental License & Legal Resort Zoning
          </h5>
        </div>
        <p className="text-xs text-[#1A3B34]/75 font-light leading-relaxed">
          Waikiki Banyan is located in the official City & County of Honolulu <strong>Waikiki Resort Hotel District</strong>, and our suites hold an authorized Short-Term Rental License authorized by the City and County of Honolulu, providing complete compliance and zero cancellation risk.
        </p>
        <div className="pt-2 border-t border-[#E8DCC6]/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#1A3B34]/80">
          <span className="font-semibold text-[#1A3B34]">Verified Sources:</span>
          <a
            href="https://www.hyatt.com/hyatt-regency/en-US/hnlrw-hyatt-regency-waikiki-beach-resort-and-spa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C59B4B] hover:text-[#996D28] font-medium transition-colors"
          >
            <span>Hyatt Regency Waikiki Fees ($52 resort fee, $65 parking)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.gohawaii.com/islands/oahu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors"
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
            <span>Honolulu DPP Short-Term Rental Licensing</span>
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
