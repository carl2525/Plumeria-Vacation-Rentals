import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  Clock,
  Car,
  Calendar,
  ShieldAlert,
  FileCheck2,
  HeartHandshake,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  RENTAL_POLICY_SECTIONS,
  LATE_CHECKOUT_TIERS,
  CANCELLATION_TIERS,
  ALOHA_MAHALO_MESSAGE,
} from '../data/rentalPolicy';
import { SITE_CONFIG } from '../config/site';

interface RentalPolicyPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

export const RentalPolicyPage: React.FC<RentalPolicyPageProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleCopyPolicy = () => {
    const fullText = `PLUMERIA VACATION RENTALS — DIRECT BOOKING RENTAL POLICY
Waikiki Banyan, Honolulu, Hawaii

1. Rate, Fees & Payment
Your base rate is $300 per night unless a different rate is displayed or quoted for your dates. Parking is included and Plumeria does not charge a separate resort or amenity fee. Any cleaning fee, taxes, or other applicable charges will be disclosed before payment.
A direct reservation is not confirmed until the required payment has been received and Plumeria Vacation Rentals issues a booking confirmation. Any remaining balance must be paid by the due date shown in the confirmation.

2. Check-In, Checkout & Late Checkout
Check-in: 2:00 PM
Checkout: 12:00 PM
Early check-in and late checkout require advance approval and are subject to availability. Any early check-in fee will be disclosed before approval.
• Until 1:00 PM: $50
• Until 2:00 PM: $100
• Until 3:00 PM: $150
• After 3:00 PM: up to $300, equivalent to the base rate for another night
Late checkout is not guaranteed. Unauthorized late departure may result in the applicable late-checkout amount plus reasonable documented costs caused by the delay.

3. Parking Included
Parking is included from check-in through checkout unless otherwise approved. Guests must follow Waikiki Banyan garage rules. Actual replacement or building charges may apply for lost or damaged parking credentials.

4. Direct Booking Cancellation Policy
• 14 days or more before check-in: 100% refund of eligible accommodation charges
• 7 to 13 days before check-in: 50% refund of eligible accommodation charges
• Less than 7 days before check-in: no standard refund
Any non-refundable processing costs or separately disclosed non-refundable charges will be identified before booking. Cancellation must be submitted to Plumeria Vacation Rentals in writing. The date received is the effective cancellation date.
No-shows and voluntary early departures do not automatically qualify for refunds for unused nights.

5. Reservation Changes
Requests to change dates, number of guests, length of stay, or unit are subject to availability and written approval. Changes may affect rates, taxes, fees, and the reservation total. A booking for #3609-T2 does not provide access to #3205-T2, and vice versa.

6. Damage, Extra Cleaning & Building Charges
There is no automatic fixed damage fee. The primary guest may be responsible for actual documented costs caused by the guest’s party, including damage beyond normal wear and tear, extraordinary cleaning, lost keys or access devices, lost parking credentials, and guest-caused building fines or charges.
Any security deposit, card authorization, or damage-protection requirement for direct bookings will be disclosed before the reservation is completed.

7. Agreement
By completing payment and occupying the property, the primary guest agrees to this Direct Booking Rental Policy, the Plumeria Vacation Rentals In-House Rules, the Waikiki Banyan Building Rules, and the pricing and terms shown in the booking confirmation.

Aloha & Mahalo
${ALOHA_MAHALO_MESSAGE.content}
Contact: ${SITE_CONFIG.email}`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const getSectionIcon = (num: number) => {
    switch (num) {
      case 1:
        return <DollarSign className="w-5 h-5 text-[#8CA58A]" />;
      case 2:
        return <Clock className="w-5 h-5 text-[#8CA58A]" />;
      case 3:
        return <Car className="w-5 h-5 text-[#8CA58A]" />;
      case 4:
        return <Calendar className="w-5 h-5 text-[#8CA58A]" />;
      case 5:
        return <FileCheck2 className="w-5 h-5 text-[#8CA58A]" />;
      case 6:
        return <ShieldAlert className="w-5 h-5 text-[#8CA58A]" />;
      case 7:
        return <HeartHandshake className="w-5 h-5 text-[#8CA58A]" />;
      default:
        return <FileText className="w-5 h-5 text-[#8CA58A]" />;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      {/* Hero Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-br from-[#1A3B34] via-[#224D44] to-[#1A3B34] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8CA58A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#F6E7A7]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F6E7A7] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Booking Terms & Standards</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Direct Booking Rental Policy
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
              Clear, transparent rental terms designed to make booking effortless while protecting our Waikiki Banyan homes and community. Every direct reservation includes on-site parking and $0 separate resort fees.
            </p>

            {/* Action buttons in hero */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-copy-rental-policy"
                onClick={handleCopyPolicy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#F6E7A7]" />
                    <span className="text-[#F6E7A7]">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white/80" />
                    <span>Copy Full Policy</span>
                  </>
                )}
              </button>

              <button
                id="btn-print-rental-policy"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <Printer className="w-4 h-4 text-white/80" />
                <span>Print / Save PDF</span>
              </button>

              <button
                id="btn-switch-to-house-rules"
                onClick={() => onNavigate('/rules')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F6E7A7] hover:bg-[#ebd88d] text-[#1A3B34] text-xs font-bold transition-all cursor-pointer shadow-sm ml-auto"
              >
                <ShieldCheck className="w-4 h-4 text-[#1A3B34]" />
                <span>View 31 House Rules →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Snapshot Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/60">Base Rate</span>
              <DollarSign className="w-4 h-4 text-[#8CA58A]" />
            </div>
            <div className="mt-2">
              <div className="font-serif text-2xl font-bold text-[#1A3B34]">$300<span className="text-xs font-normal text-[#1A3B34]/60">/nt</span></div>
              <p className="text-[11px] text-[#8CA58A] font-medium mt-0.5">$0 separate resort fees</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/60">Check-In & Out</span>
              <Clock className="w-4 h-4 text-[#8CA58A]" />
            </div>
            <div className="mt-2">
              <div className="font-serif text-lg font-bold text-[#1A3B34]">2:00 PM <span className="text-xs font-normal text-[#1A3B34]/60">/</span> 12:00 PM</div>
              <p className="text-[11px] text-[#1A3B34]/70 mt-0.5">Generous noon checkout</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/60">Garage Parking</span>
              <Car className="w-4 h-4 text-[#8CA58A]" />
            </div>
            <div className="mt-2">
              <div className="font-serif text-lg font-bold text-[#1A3B34]">Included</div>
              <p className="text-[11px] text-[#8CA58A] font-medium mt-0.5">Save $35–$50/day vs hotels</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E8DCC6] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/60">Cancellation</span>
              <Calendar className="w-4 h-4 text-[#8CA58A]" />
            </div>
            <div className="mt-2">
              <div className="font-serif text-lg font-bold text-[#1A3B34]">100% Refund</div>
              <p className="text-[11px] text-[#1A3B34]/70 mt-0.5">14+ days before arrival</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Switcher between Policy and Rules */}
        <div className="p-4 rounded-2xl bg-[#E8DCC6]/40 border border-[#E8DCC6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A3B34] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#F6E7A7]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1A3B34]">Companion Guide: Waikiki Banyan & Plumeria House Rules</h4>
              <p className="text-xs text-[#1A3B34]/70">
                Detailed 31-point building regulations covering recreation deck, Tower 2 freight elevator Car #5, and lanai safety.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/rules')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#1A3B34] text-[#1A3B34] hover:text-white font-semibold text-xs border border-[#1A3B34]/20 transition-all cursor-pointer whitespace-nowrap shadow-2xs"
          >
            Switch to House Rules (/rules) →
          </button>
        </div>

        {/* The 7 Core Policy Sections */}
        <div className="space-y-6">
          {RENTAL_POLICY_SECTIONS.map((section) => (
            <article
              key={section.number}
              id={`policy-section-${section.number}`}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC6] shadow-sm hover:border-[#8CA58A]/50 transition-all"
            >
              {/* Section Header */}
              <div className="flex items-start gap-4 pb-4 border-b border-[#E8DCC6]/60">
                <div className="w-10 h-10 rounded-2xl bg-[#8CA58A]/15 text-[#1A3B34] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  {section.number}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getSectionIcon(section.number)}
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A3B34]/65 font-medium">
                    {section.summary}
                  </p>
                </div>
              </div>

              {/* Section Paragraphs */}
              <div className="mt-5 space-y-3.5 text-sm sm:text-base text-[#1A3B34]/85 leading-relaxed font-light">
                {section.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {/* Section Specific Visual Callouts */}
                {section.number === 2 && (
                  <div className="mt-6 pt-4 border-t border-[#E8DCC6]/60">
                    <h3 className="font-serif text-base font-bold text-[#1A3B34] mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8CA58A]" />
                      <span>Late Checkout Fee Schedule (Subject to advance written approval)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {LATE_CHECKOUT_TIERS.map((tier, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] hover:border-[#8CA58A] transition-colors"
                        >
                          <div className="text-xs font-semibold text-[#1A3B34]/60 uppercase tracking-wider">
                            {tier.time}
                          </div>
                          <div className="font-serif text-2xl font-bold text-[#1A3B34] my-1">
                            {tier.fee}
                          </div>
                          <p className="text-[11px] text-[#1A3B34]/70 leading-normal">
                            {tier.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.number === 4 && (
                  <div className="mt-6 pt-4 border-t border-[#E8DCC6]/60">
                    <h3 className="font-serif text-base font-bold text-[#1A3B34] mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#8CA58A]" />
                      <span>Direct Booking Cancellation Timeline</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {CANCELLATION_TIERS.map((tier, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border ${
                            tier.percent === 100
                              ? 'bg-[#8CA58A]/10 border-[#8CA58A]/40'
                              : tier.percent === 50
                              ? 'bg-[#F6E7A7]/25 border-[#C59B4B]/30'
                              : 'bg-red-50/50 border-red-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3B34]/60">
                              Window
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                tier.percent === 100
                                  ? 'bg-[#8CA58A] text-white'
                                  : tier.percent === 50
                                  ? 'bg-[#C59B4B] text-white'
                                  : 'bg-red-600 text-white'
                              }`}
                            >
                              {tier.refund}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm text-[#1A3B34] mb-1">
                            {tier.timeframe}
                          </h4>
                          <p className="text-xs text-[#1A3B34]/75">
                            {tier.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Bullet Points */}
                {section.bulletPoints && section.number !== 2 && (
                  <ul className="space-y-2 mt-3 pt-2">
                    {section.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#8CA58A] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Callout Box */}
                {section.callout && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#8CA58A] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1A3B34] block uppercase tracking-wider">
                        {section.callout.label}
                      </span>
                      <p className="text-xs text-[#1A3B34]/75 leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Aloha & Mahalo Signature Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1A3B34] to-[#224D44] text-white shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌺</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {ALOHA_MAHALO_MESSAGE.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light max-w-3xl">
            {ALOHA_MAHALO_MESSAGE.content}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/20">
            <div className="space-y-1">
              <span className="text-xs text-[#F6E7A7] font-semibold uppercase tracking-wider block">
                Plumeria Vacation Rentals
              </span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-xs text-white/80 hover:text-white underline"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="px-6 py-3 rounded-full bg-[#F6E7A7] hover:bg-[#ebd88d] text-[#1A3B34] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                Inquire or Check Dates
              </button>
              <button
                onClick={() => onNavigate('/rentals')}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                View Our Suites
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
