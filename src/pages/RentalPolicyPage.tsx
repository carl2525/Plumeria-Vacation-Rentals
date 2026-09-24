import React, { useState, useMemo } from 'react';
import { RENTAL_POLICY_OVERVIEW, RENTAL_POLICY_SECTIONS } from '../data/rentalPolicy';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { PlumeriaLogo } from '../components/brand/PlumeriaLogo';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { SITE_CONFIG } from '../config/site';
import {
  FileText,
  Clock,
  Car,
  DollarSign,
  ShieldCheck,
  CalendarCheck,
  AlertCircle,
  Check,
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Mail,
  Phone,
  Video,
  Youtube,
  Instagram,
  Facebook,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Compass,
} from 'lucide-react';
import { InlineLink } from '../components/common/InlineLink';

interface RentalPolicyPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

export const RentalPolicyPage: React.FC<RentalPolicyPageProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'rates-fees-payment': true,
    'checkin-checkout': true,
    'parking-included': true,
    'cancellation-policy': true,
    'reservation-changes': true,
    'damage-cleaning-charges': true,
    'agreement-and-acknowledgment': true,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    RENTAL_POLICY_SECTIONS.forEach((s) => (all[s.id] = true));
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return RENTAL_POLICY_SECTIONS;
    return RENTAL_POLICY_SECTIONS.filter((s) => {
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchSummary = s.summary.toLowerCase().includes(q);
      const matchContent = s.content.some((c) => c.toLowerCase().includes(q));
      const matchImportant = s.importantData?.some((d) => d.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchContent || matchImportant;
    });
  }, [searchQuery]);

  const handleCopyPolicy = () => {
    const text = [
      'PLUMERIA VACATION RENTALS — DIRECT BOOKING RENTAL POLICY',
      'Waikiki Banyan Tower 2 · Honolulu, Hawaiʻi',
      '=======================================================\n',
      ...RENTAL_POLICY_SECTIONS.map((s) => {
        const bullets = s.content.map((c) => `  ${c}`).join('\n');
        return `${s.number}. ${s.title.toUpperCase()}\n${bullets}\n`;
      }),
      '-------------------------------------------------------',
      `${RENTAL_POLICY_OVERVIEW.alohaGreeting}`,
      `${RENTAL_POLICY_OVERVIEW.alohaClosing}`,
      `\nDirect Host Email: ${SITE_CONFIG.email}`,
      `Direct Host Phone: ${SITE_CONFIG.phone}`,
      '\nFollow & Connect:',
      ...SITE_CONFIG.socials.map((soc) => `  • ${soc.name}: ${soc.url}`),
    ].join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-5 h-5 text-[#FF0000]" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-[#E1306C]" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-[#1877F2]" />;
      case 'tiktok':
      default:
        return <Video className="w-5 h-5 text-[#1A3B34]" />;
    }
  };

  const getSocialSubtitle = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return 'Suite Video Walkthroughs & Tours';
      case 'instagram':
        return 'Daily Waikiki Moments & Photos';
      case 'facebook':
        return 'Community Updates & Reviews';
      case 'tiktok':
      default:
        return 'Quick Room Reels & Travel Tips';
    }
  };

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative Brand Watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.05]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.04]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Top Go Back Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            type="button"
            id="top-back-to-rules-btn"
            onClick={() => onNavigate('/rules')}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white hover:bg-[#F9F7F2] border border-[#E8DCC6] hover:border-[#C59B4B]/60 text-[#1A3B34] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
            title="Go back to Building & House Rules"
          >
            <ArrowLeft className="w-4 h-4 text-[#C59B4B] group-hover:-translate-x-1 transition-transform" />
            <span>Go Back to Building Rules</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#1A3B34]/60">
            <span className="hover:text-[#1A3B34] cursor-pointer" onClick={() => onNavigate('/rules')}>
              Building Rules
            </span>
            <span>/</span>
            <span className="font-semibold text-[#1A3B34]">Rental Policy</span>
          </div>
        </div>

        {/* Page Header with Typographic Balance */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <FileText className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Direct Booking Terms & Conditions</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A3B34] leading-tight tracking-tight">
            Direct Booking Rental Policy
          </h1>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            {RENTAL_POLICY_OVERVIEW.subtitle} Designed to be fair, completely transparent, and straightforward—protecting both our valued guests and our Waikiki Banyan community.
          </p>

          {/* Quick Cross-Navigation Links */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/rules')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Building Rules</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/rentals')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Browse Suites</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/waikiki-banyan')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>1-Acre Deck Amenities</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/faq')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Frequently Asked Questions</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Contact Direct Host</span>
            </button>
          </div>
        </div>

        {/* 4 Balanced Key Metric Highlights Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59B4B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Policy Pillars at a Glance</span>
            </span>
            <span className="text-xs text-[#1A3B34]/60 hidden sm:inline">
              Guaranteed transparent direct-booking terms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Card 1: Base Rate */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs hover:border-[#8CA58A]/50 transition-all flex flex-col justify-between min-w-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C59B4B] truncate">
                    Promo Rate
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#1A3B34] text-[#F6E7A7] shrink-0">
                    $0 Fees
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34] leading-none">
                    $199
                  </span>
                  <span className="text-xs text-[#C59B4B] font-semibold">/ night</span>
                </div>
              </div>
              <p className="text-xs text-[#1A3B34]/75 font-light mt-3 pt-2.5 border-t border-[#E8DCC6]/50 leading-relaxed">
                Promotional rate across all units with zero resort fees.
              </p>
            </div>

            {/* Card 2: Parking */}
            <div
              onClick={() => onNavigate('/parking')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs hover:border-[#C59B4B] hover:shadow-xs transition-all flex flex-col justify-between min-w-0 cursor-pointer group"
              title="Click to view step-by-step parking location guide and video"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/65 truncate">
                    Garage Parking
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#8CA58A]/20 text-[#1A3B34] shrink-0">
                    Included
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34] leading-none">
                    Free Parking
                  </span>
                  <span className="text-xs font-semibold text-[#C59B4B] group-hover:underline">Guide →</span>
                </div>
              </div>
              <p className="text-xs text-[#1A3B34]/75 font-light mt-3 pt-2.5 border-t border-[#E8DCC6]/50 leading-relaxed">
                Dedicated on-site covered garage parking &amp; entry video guidelines.
              </p>
            </div>

            {/* Card 3: Check-In / Out */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs hover:border-[#8CA58A]/50 transition-all flex flex-col justify-between min-w-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/65 truncate">
                    Check-In / Out
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E8DCC6]/60 text-[#1A3B34] shrink-0">
                    Keyless
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34] leading-none">
                    4 PM · 10 AM
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#1A3B34]/75 font-light mt-3 pt-2.5 border-t border-[#E8DCC6]/50 leading-relaxed">
                Standard 4 PM check-in / 10 AM checkout. Early in upon availability ($50–$75/hr).
              </p>
            </div>

            {/* Card 4: Cancellation */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs hover:border-[#8CA58A]/50 transition-all flex flex-col justify-between min-w-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/65 truncate">
                    Cancellation
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#8CA58A]/20 text-[#1A3B34] shrink-0">
                    100% Refund
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1A3B34] leading-none">
                    14+ Days
                  </span>
                  <span className="text-xs font-normal text-[#1A3B34]/70">notice</span>
                </div>
              </div>
              <p className="text-xs text-[#1A3B34]/75 font-light mt-3 pt-2.5 border-t border-[#E8DCC6]/50 leading-relaxed">
                100% refund up to 14 days prior; 50% refund at 7–13 days.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Search & Utility Toolbar */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E8DCC6] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-[#1A3B34]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="search-policy-input"
              placeholder="Search policy terms (e.g. rate, cancellation, late checkout, parking, damage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-16 py-2.5 text-xs sm:text-sm bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/40 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1A3B34]/50 hover:text-[#1A3B34] cursor-pointer font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              id="copy-rental-policy-btn"
              onClick={handleCopyPolicy}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E8DCC6] text-[#1A3B34] text-xs font-semibold hover:bg-[#E8DCC6]/40 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
              title="Copy entire rental policy text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#8CA58A]" />
                  <span className="text-[#8CA58A]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C59B4B]" />
                  <span>Copy Policy</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="print-rental-policy-btn"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E8DCC6] text-[#1A3B34] text-xs font-semibold hover:bg-[#E8DCC6]/40 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
              title="Print policy or save to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#1A3B34]" />
              <span>Print / PDF</span>
            </button>

            <div className="flex items-center gap-1.5 pl-2 border-l border-[#E8DCC6] text-[11px] sm:text-xs text-[#1A3B34]/60 whitespace-nowrap">
              <button onClick={expandAll} className="hover:text-[#1A3B34] hover:underline cursor-pointer">
                Expand All
              </button>
              <span>·</span>
              <button onClick={collapseAll} className="hover:text-[#1A3B34] hover:underline cursor-pointer">
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* 7 Policy Sections Accordion */}
        <div className="space-y-4">
          {filteredSections.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-sm text-[#1A3B34]/60 border border-[#E8DCC6]">
              No policy terms matched &ldquo;{searchQuery}&rdquo;. Try another search keyword.
            </div>
          ) : (
            filteredSections.map((section) => {
              const isExpanded = expandedSections[section.id] ?? true;
              return (
                <div
                  key={section.id}
                  id={`policy-section-${section.id}`}
                  className="bg-white rounded-3xl border border-[#E8DCC6] overflow-hidden shadow-2xs transition-all"
                >
                  {/* Section Accordion Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#F9F7F2]/60 transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                      <span className="w-8 h-8 rounded-xl bg-[#1A3B34] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                        {section.number}
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                          {section.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#1A3B34]/75 font-normal mt-0.5 leading-relaxed">
                          {section.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-1 rounded-lg text-[#1A3B34]/60 shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Expanded Content with Balanced Typography */}
                  {isExpanded && (
                    <div className="px-5 sm:px-8 pb-7 pt-2 space-y-5 border-t border-[#E8DCC6]/60 bg-[#F9F7F2]/30 text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed animate-fade-in">
                      {/* Key Highlight Specifications Strip */}
                      {section.highlights && section.highlights.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B4B] block mb-2.5">
                            Key Specifications
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {section.highlights.map((h, hIdx) => (
                              <div
                                key={hIdx}
                                className="bg-white rounded-xl p-3.5 border border-[#E8DCC6] shadow-2xs flex flex-col justify-between"
                              >
                                <div>
                                  <span className="text-[10px] font-bold text-[#1A3B34]/60 uppercase tracking-wider block">
                                    {h.label}
                                  </span>
                                  <span className="font-serif text-base font-bold text-[#1A3B34] block mt-1">
                                    {h.value}
                                  </span>
                                </div>
                                {h.subtext && (
                                  <span className="text-[11px] text-[#1A3B34]/70 font-light block mt-1.5 pt-1.5 border-t border-[#E8DCC6]/40 leading-tight">
                                    {h.subtext}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Official Policy Terms */}
                      <div className="space-y-3 bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DCC6]/80 shadow-2xs">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8DCC6]/50">
                          <FileText className="w-3.5 h-3.5 text-[#C59B4B]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A3B34]">
                            Official Agreement Terms
                          </span>
                        </div>
                        <div className="space-y-2.5 text-[#1A3B34] text-xs sm:text-sm leading-relaxed">
                          {section.content.map((p, pIdx) => {
                            const isBullet = p.startsWith('•');
                            return (
                              <p
                                key={pIdx}
                                className={
                                  isBullet
                                    ? 'pl-4 font-semibold text-[#1A3B34] flex items-center gap-1.5'
                                    : 'font-normal'
                                }
                              >
                                {p}
                              </p>
                            );
                          })}
                        </div>
                      </div>

                      {/* Special Visual: Early Check-In & Late Checkout Visual for Section 2 */}
                      {section.id === 'checkin-checkout' && (
                        <div className="space-y-3">
                          {/* Early Check-In Feature Box */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-[#8CA58A]/10 border border-[#8CA58A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#8CA58A]" />
                                <h3 className="font-serif text-sm font-bold text-[#1A3B34]">
                                  Early Check-In Policy
                                </h3>
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#8CA58A]/20 text-[#1A3B34]">
                                  $50 – $75 / Hour
                                </span>
                              </div>
                              <p className="text-xs text-[#1A3B34]/80 font-light leading-relaxed">
                                Standard check-in is at 4:00 PM HST. Early arrival is available at <strong>$50–$75 per hour</strong>, strictly upon the availability of the unit and completion of housekeeping turnaround. Please request in advance so our team can coordinate with cleaning staff.
                              </p>
                            </div>
                          </div>

                          {/* Late Checkout Fee Ladder */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-[#E8DCC6]/30 border border-[#C59B4B]/30 space-y-3">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#C59B4B]" />
                                <h3 className="font-serif text-sm font-bold text-[#1A3B34]">
                                  Late Checkout Tiered Fee Schedule (Standard Checkout: 10:00 AM)
                                </h3>
                              </div>
                              <span className="text-[11px] text-[#1A3B34]/70 font-medium">
                                Requires advance approval & subject to availability
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                              <div className="bg-white p-3.5 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1">
                                <span className="block text-[10px] uppercase tracking-wider text-[#1A3B34]/60 font-semibold">Until 11:00 AM</span>
                                <span className="font-serif text-lg font-bold text-[#1A3B34] block">$50</span>
                                <span className="text-[10px] text-[#1A3B34]/60 block">+1 hour extension</span>
                              </div>
                              <div className="bg-white p-3.5 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1">
                                <span className="block text-[10px] uppercase tracking-wider text-[#1A3B34]/60 font-semibold">Until 12:00 PM</span>
                                <span className="font-serif text-lg font-bold text-[#1A3B34] block">$100</span>
                                <span className="text-[10px] text-[#1A3B34]/60 block">+2 hour extension</span>
                              </div>
                              <div className="bg-white p-3.5 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1">
                                <span className="block text-[10px] uppercase tracking-wider text-[#1A3B34]/60 font-semibold">Until 1:00 PM</span>
                                <span className="font-serif text-lg font-bold text-[#1A3B34] block">$150</span>
                                <span className="text-[10px] text-[#1A3B34]/60 block">+3 hour extension</span>
                              </div>
                              <div className="bg-white p-3.5 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1">
                                <span className="block text-[10px] uppercase tracking-wider text-[#1A3B34]/60 font-semibold">After 1:00 PM</span>
                                <span className="font-serif text-lg font-bold text-[#1A3B34] block">Up to $300</span>
                                <span className="text-[10px] text-[#1A3B34]/60 block">(Base night rate)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Special Visual: Cancellation Timeline for Section 4 */}
                      {section.id === 'cancellation-policy' && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#8CA58A]/10 border border-[#8CA58A]/30 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <CalendarCheck className="w-4 h-4 text-[#8CA58A]" />
                              <h3 className="font-serif text-sm font-bold text-[#1A3B34]">
                                Cancellation Refund Timeline
                              </h3>
                            </div>
                            <span className="text-[11px] text-[#1A3B34]/70 font-medium">
                              Official notice date determines refund tier
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div className="bg-white p-4 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1.5">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-[#8CA58A]/20 text-[#1A3B34] font-bold text-[10px] uppercase tracking-wider">
                                14+ Days Notice
                              </span>
                              <p className="font-serif text-lg font-bold text-[#1A3B34]">
                                100% Refund
                              </p>
                              <p className="text-[11px] text-[#1A3B34]/70 leading-normal">
                                Full refund of eligible accommodation charges.
                              </p>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1.5">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-[#C59B4B]/20 text-[#1A3B34] font-bold text-[10px] uppercase tracking-wider">
                                7 to 13 Days Notice
                              </span>
                              <p className="font-serif text-lg font-bold text-[#1A3B34]">
                                50% Refund
                              </p>
                              <p className="text-[11px] text-[#1A3B34]/70 leading-normal">
                                Half refund of eligible accommodation charges.
                              </p>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-[#E8DCC6] shadow-2xs space-y-1.5">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] uppercase tracking-wider">
                                Less than 7 Days
                              </span>
                              <p className="font-serif text-lg font-bold text-[#1A3B34]">
                                No Standard Refund
                              </p>
                              <p className="text-[11px] text-[#1A3B34]/70 leading-normal">
                                Close-in window; date received is effective date.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Alert / Notice Note */}
                      {section.alertNote && (
                        <div className="p-3.5 rounded-xl bg-[#C59B4B]/15 border border-[#C59B4B]/40 text-xs text-[#1A3B34] flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold block text-[#1A3B34]">
                              Important Notice
                            </strong>
                            <span className="leading-relaxed">{section.alertNote}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Section 7: Agreement & Understanding (Primary Guest Commitment) */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E8DCC6] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DCC6]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1A3B34] text-[#F6E7A7] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B4B] block">
                  Binding Guest Agreement
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
                  Agreement & Understanding
                </h2>
              </div>
            </div>

            <button
              id="back-to-rules-agreement-btn"
              onClick={() => onNavigate('/rules')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9F7F2] hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Go Back to Building Rules</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6]/80 text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed space-y-2">
            <p className="font-medium text-[#1A3B34]">
              By completing payment and occupying the suite, the primary guest agrees to this Direct Booking Rental Policy, the Plumeria Vacation Rentals In-House Rules, the Waikiki Banyan Building Rules, and the pricing and terms shown in the reservation confirmation.
            </p>
            <p className="text-[#1A3B34]/70 font-light">
              The primary guest assumes full responsibility for communicating all building safety, noise, lanai, and parking rules to every registered guest and authorized visitor in their party.
            </p>
          </div>

          <div className="pt-2 text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="font-serif text-xl font-bold text-[#1A3B34]">
              {RENTAL_POLICY_OVERVIEW.alohaGreeting}
            </h3>
            <p className="text-xs sm:text-sm text-[#1A3B34]/75 font-light leading-relaxed">
              {RENTAL_POLICY_OVERVIEW.alohaClosing}
            </p>
          </div>

          {/* Direct Host Contact Actions */}
          <div className="pt-4 border-t border-[#E8DCC6]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#1A3B34]/75 text-center sm:text-left space-y-1">
              <span className="font-medium block text-[#1A3B34]">Have questions before booking your Waikiki Banyan dates?</span>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=Question%20About%20Rental%20Policy`}
                  className="font-semibold text-[#8CA58A] hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C59B4B]" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
                <span>·</span>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="font-semibold text-[#1A3B34] hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8CA58A]" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="back-to-rules-bottom-btn"
                onClick={() => onNavigate('/rules')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8DCC6]/60 hover:bg-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shrink-0 border border-[#C59B4B]/30"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#1A3B34]" />
                <span>Go Back to Rules</span>
              </button>

              <button
                onClick={() => onOpenInquiry()}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1A3B34] text-white hover:bg-[#224D44] transition-colors cursor-pointer shadow-xs border border-[#C59B4B]/30 shrink-0"
              >
                Inquire / Reserve Dates
              </button>
            </div>
          </div>
        </div>

        {/* ELEGANT FOLLOW & CONNECT SHOWCASE WITH DEDICATED PLUMERIA LOGO CARD */}
        <div id="follow-and-connect-showcase" className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59B4B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Connected With Plumeria</span>
            </span>
            <span className="text-xs text-[#1A3B34]/60 hidden sm:inline">
              Watch video walkthroughs & local recommendations
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 1. Signature Plumeria Brand Logo Card */}
            <div
              id="plumeria-brand-logo-card"
              className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC6] shadow-sm flex flex-col justify-between items-center text-center relative overflow-hidden group hover:border-[#8CA58A]/50 transition-all"
            >
              {/* Subtle floral watermark in card background */}
              <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none translate-x-6 translate-y-6">
                <PlumeriaSymbolLogo className="w-48 h-48 text-[#1A3B34]" />
              </div>

              {/* Host Badge */}
              <div className="w-full flex justify-between items-center mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9F7F2] border border-[#E8DCC6] text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]">
                  <ShieldCheck className="w-3 h-3 text-[#C59B4B]" />
                  <span>Direct Host Verified</span>
                </span>
                <span className="text-[10px] font-bold text-[#8CA58A] uppercase tracking-wider">
                  Honolulu, HI
                </span>
              </div>

              {/* Logo Emblem Presentation */}
              <div className="py-2">
                <PlumeriaLogo layout="stacked" variant="dark" className="mx-auto" />
              </div>

              {/* Location & Tagline */}
              <div className="space-y-2 mt-4 max-w-xs">
                <p className="text-xs text-[#1A3B34]/80 font-medium">
                  Waikiki Banyan Tower 2 · 201 ʻOhua Ave
                </p>
                <p className="text-xs text-[#1A3B34]/65 font-light italic leading-relaxed">
                  &ldquo;Stay at Waikiki Banyan. Experience Waikiki with Plumeria.&rdquo;
                </p>
              </div>

              {/* Direct Host Contact Actions inside Logo Card */}
              <div className="w-full pt-5 mt-5 border-t border-[#E8DCC6]/60 flex items-center justify-center gap-3 text-xs">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F9F7F2] hover:bg-[#E8DCC6]/50 text-[#1A3B34] font-medium border border-[#E8DCC6] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C59B4B]" />
                  <span>Email Host</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F9F7F2] hover:bg-[#E8DCC6]/50 text-[#1A3B34] font-medium border border-[#E8DCC6] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8CA58A]" />
                  <span>(808) 671-9191</span>
                </a>
              </div>
            </div>

            {/* 2. Official Social Media Channels Showcase (2x2 Grid) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC6] shadow-sm flex flex-col justify-between space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8DCC6]/60">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B4B] block">
                    Follow & Connect
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
                    Explore Waikiki on Social Media
                  </h3>
                </div>
                <p className="text-xs text-[#1A3B34]/70 max-w-xs font-light sm:text-right">
                  Watch full video suite walkthroughs and neighborhood recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SITE_CONFIG.socials.map((soc) => (
                  <a
                    key={soc.platform}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`policy-social-${soc.platform}`}
                    className="bg-[#F9F7F2] hover:bg-white border border-[#E8DCC6] hover:border-[#C59B4B]/50 rounded-2xl p-4 transition-all duration-200 group flex items-center justify-between shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E8DCC6]/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {getSocialIcon(soc.platform)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-[#1A3B34] block">
                          {soc.name}
                        </span>
                        <span className="text-[11px] text-[#8CA58A] font-medium block truncate max-w-[135px]">
                          {soc.handle}
                        </span>
                        <span className="text-[10px] text-[#1A3B34]/60 font-light block mt-0.5 truncate max-w-[140px]">
                          {getSocialSubtitle(soc.platform)}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#1A3B34]/40 group-hover:text-[#C59B4B] transition-colors shrink-0 ml-2" />
                  </a>
                ))}
              </div>

              {/* Bottom Quick Help Tip */}
              <div className="pt-2 text-xs text-[#1A3B34]/70 flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#7FB6D9]" />
                  <span>Planning an Oʻahu trip? Check out our Waikiki Guide!</span>
                </span>
                <button
                  onClick={() => onNavigate('/explore')}
                  className="font-bold text-[#1A3B34] hover:text-[#8CA58A] underline cursor-pointer text-xs"
                >
                  View Guide &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
