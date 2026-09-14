import React from 'react';
import {
  Check,
  Sparkles,
  ExternalLink,
  Car,
  Utensils,
  DollarSign,
  Award,
  ArrowRight,
  ShieldCheck,
  Eye,
  Calculator
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface HotelSuiteComparisonProps {
  onExploreRentals?: () => void;
  onBookStay?: () => void;
  onViewFullComparison?: () => void;
}

interface PillarCardData {
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
  plumeriaHighlight: string;
  plumeriaDesc: string;
  competitorRow1: {
    label: string;
    value: string;
    isNegative?: boolean;
  };
  competitorRow2: {
    label: string;
    value: string;
    isNegative?: boolean;
  };
  footerVerdict: string;
}

export const HotelSuiteComparison: React.FC<HotelSuiteComparisonProps> = ({
  onBookStay,
  onViewFullComparison,
}) => {
  const handleFullComparisonClick = (e: React.MouseEvent) => {
    if (onViewFullComparison) {
      e.preventDefault();
      onViewFullComparison();
    }
  };

  const pillars: PillarCardData[] = [
    {
      id: 'rate-fees',
      icon: <DollarSign className="w-5 h-5 text-[#C59B4B]" />,
      eyebrow: 'Nightly & Resort Fees',
      title: '$300/Nt (or $255 Direct)',
      subtitle: '$0 Fees · 15% Off Direct',
      plumeriaHighlight: 'Direct: $255/nt (15% Off)',
      plumeriaDesc: 'Inquire on our website to receive 15% off accepted bookings. Zero resort fees or surprise add-ons.',
      competitorRow1: {
        label: 'Aston at Banyan:',
        value: '+$37.74/nt fee',
        isNegative: true,
      },
      competitorRow2: {
        label: 'Hilton & Sheraton:',
        value: 'Suites $750–$1,450+',
        isNegative: true,
      },
      footerVerdict: 'Save $200–$4,500+ on suite & resort fees',
    },
    {
      id: 'parking',
      icon: <Car className="w-5 h-5 text-[#C59B4B]" />,
      eyebrow: 'Covered Garage Parking',
      title: 'Free Dedicated Pass',
      subtitle: '100% Included ($0)',
      plumeriaHighlight: 'Building Garage Included',
      plumeriaDesc: 'Unlimited in-and-out access pass for your entire staycation or island vacation.',
      competitorRow1: {
        label: 'Aston at Banyan:',
        value: '$43/day charged',
        isNegative: true,
      },
      competitorRow2: {
        label: 'Hilton & Sheraton:',
        value: '$55–$72/day',
        isNegative: true,
      },
      footerVerdict: 'Save $215–$360 on parking alone (5 nights)',
    },
    {
      id: 'floor-guarantee',
      icon: <Eye className="w-5 h-5 text-[#C59B4B]" />,
      eyebrow: 'Floor & View Guarantee',
      title: 'Guaranteed High Floors',
      subtitle: 'Tower 2 (Floors 32 & 36)',
      plumeriaHighlight: 'Exact Suite Confirmed',
      plumeriaDesc: '180° mountain & ocean horizons; quiet retreat high above street noise.',
      competitorRow1: {
        label: 'Aston at Banyan:',
        value: 'Room Floor (Fl 5–12)',
        isNegative: true,
      },
      competitorRow2: {
        label: 'Generic Airbnbs:',
        value: 'Low / blocked views',
        isNegative: true,
      },
      footerVerdict: 'High-Rise; confirmed 32nd & 36th floors',
    },
    {
      id: 'kitchen-gear',
      icon: <Utensils className="w-5 h-5 text-[#C59B4B]" />,
      eyebrow: 'Kitchen & Beach Gear',
      title: 'Full Chef Kitchen',
      subtitle: '+ In-Unit Beach Gear',
      plumeriaHighlight: 'Gourmet Kitchen & Gear',
      plumeriaDesc: 'Stove, oven, fridge & 12 BBQ grills + Tommy Bahama chairs & umbrella.',
      competitorRow1: {
        label: 'Hotels (Hilton):',
        value: 'Mini-fridge only',
        isNegative: true,
      },
      competitorRow2: {
        label: 'Beach Rentals:',
        value: '$80/day rental fee',
        isNegative: true,
      },
      footerVerdict: 'Save $150–$250/day on dining & gear',
    },
  ];

  return (
    <section id="hotel-suite-comparison" className="py-14 sm:py-20 lg:py-24 bg-[#F9F7F2] relative overflow-hidden">
      {/* Subtle decorative background ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C59B4B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1A3B34]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A3B34] text-[#F6E7A7] border border-[#C59B4B]/30 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Honest Value Comparison · Sneak Peek</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1A3B34] leading-[1.15] tracking-tight">
            Why Plumeria at Waikiki Banyan <br className="hidden sm:inline" />
            <span className="text-[#C59B4B] italic font-medium">Beats Hotels & Other Vacation Rentals</span>
          </h2>

          <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Spacious 624 sq. ft. 1-bedroom suites perched high on floors 32 & 36 in Tower 2 with full kitchens, private lanais, and free covered parking. Compare our transparent <strong className="text-[#1A3B34] font-semibold">$300/night</strong> standard rate (or <strong className="text-[#1A3B34] font-semibold">$255/night</strong> with our exclusive 15% direct website discount) with <strong className="text-[#1A3B34] font-semibold">$0 resort fees</strong> against building operators and Waikiki mega-resorts.
          </p>
        </div>

        {/* 4-Pillar Sneak Peek Comparison Grid: Perfect 1-col on mobile, 2-col on tablet, 4-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E8DCC6] shadow-xs hover:border-[#C59B4B]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
            >
              {/* Card Header: Fixed vertical rhythm across all resolutions */}
              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1A3B34]/10 text-[#1A3B34] flex items-center justify-center shrink-0 group-hover:bg-[#1A3B34] group-hover:text-[#F6E7A7] transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C59B4B]">
                    {pillar.eyebrow}
                  </span>
                </div>

                <div className="min-h-[2.75rem] sm:min-h-[3rem] flex flex-col justify-center">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A3B34] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-medium text-[#C59B4B] leading-tight mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Plumeria Advantage Box: Equalized min-height prevents uneven alignment */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 flex items-start gap-2.5 min-h-[4.75rem]">
                  <div className="w-4 h-4 rounded-full bg-emerald-600/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-700" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-emerald-950 block font-semibold text-xs leading-tight">
                      {pillar.plumeriaHighlight}
                    </strong>
                    <p className="text-[11px] sm:text-xs text-emerald-900/80 leading-snug font-normal">
                      {pillar.plumeriaDesc}
                    </p>
                  </div>
                </div>

                {/* Competitor Comparison Rows: Cleanly structured key-values */}
                <div className="p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6] text-neutral-600 space-y-2 text-xs min-h-[4.25rem] flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-1 leading-tight">
                    <span className="font-medium text-neutral-800 text-[11px] sm:text-xs truncate">
                      {pillar.competitorRow1.label}
                    </span>
                    <span className="text-red-700 font-semibold text-[11px] sm:text-xs shrink-0 whitespace-nowrap">
                      {pillar.competitorRow1.value}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 leading-tight pt-1 border-t border-[#E8DCC6]/60">
                    <span className="font-medium text-neutral-800 text-[11px] sm:text-xs truncate">
                      {pillar.competitorRow2.label}
                    </span>
                    <span className="text-red-700 font-semibold text-[11px] sm:text-xs shrink-0 whitespace-nowrap">
                      {pillar.competitorRow2.value}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Pinned cleanly to bottom */}
              <div className="pt-3.5 mt-3 sm:mt-4 border-t border-[#E8DCC6]/60 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 leading-snug">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{pillar.footerVerdict}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sneak Peek Vacation Math Callout: Balanced grid with dedicated action card */}
        <div className="bg-gradient-to-br from-[#1A3B34] via-[#1A3B34]/95 to-[#20473F] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-[#C59B4B]/40 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C59B4B]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F6E7A7] text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-white/10">
                <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
                <span>5-Night Realistic Stay Comparison</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
                Spend ~$1,825 with Plumeria vs. <br className="hidden sm:inline" />
                <span className="text-[#F6E7A7]">~$2,530 at Aston</span> or{' '}
                <span className="text-amber-200/90 font-medium">~$6,000+ at Hilton Suites</span>
              </h3>

              <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed max-w-2xl">
                Even within the exact same Waikiki Banyan building, booking with Plumeria saves you{' '}
                <strong className="text-[#F6E7A7] font-semibold">$700+ on parking and mandatory amenity fees</strong>
                , while guaranteeing Tower 2’s 32nd or 36th floors, full kitchen savings, and whisper-quiet split-AC comfort. (Or save $4,000+ compared to 1-bedroom beachfront hotel suites).
              </p>
            </div>

            {/* Right Action Hub: Unified card design with crisp hierarchy */}
            <div className="lg:col-span-5 xl:col-span-4 w-full">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 shadow-inner flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-white/80 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5 font-semibold text-[#F6E7A7]">
                    <Calculator className="w-3.5 h-3.5 text-[#C59B4B]" />
                    <span>Compare All-In Costs</span>
                  </div>
                  <span className="text-[11px] text-white/70">Waikiki Banyan</span>
                </div>

                <a
                  href="/waikiki-banyan#full-comparison"
                  onClick={handleFullComparisonClick}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl bg-[#C59B4B] hover:bg-[#D4AC5B] text-[#1A3B34] font-bold text-xs sm:text-sm shadow-md transition-all group w-full text-center cursor-pointer"
                >
                  <span>See Full Comparison & Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </a>

                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <a
                    href={SITE_CONFIG.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] sm:text-xs border border-white/15 transition-colors text-center"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Airbnb Superhost</span>
                    <ExternalLink className="w-2.5 h-2.5 text-white/60 shrink-0" />
                  </a>

                  {onBookStay ? (
                    <button
                      type="button"
                      onClick={onBookStay}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6E7A7] font-medium text-[11px] sm:text-xs border border-white/15 transition-colors cursor-pointer text-center"
                    >
                      <span className="truncate">Inquire ($0 Fees)</span>
                    </button>
                  ) : (
                    <a
                      href="/rentals"
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6E7A7] font-medium text-[11px] sm:text-xs border border-white/15 transition-colors text-center"
                    >
                      <span className="truncate">View Suites</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
