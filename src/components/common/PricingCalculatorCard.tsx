import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  BASE_NIGHTLY_RATE,
  calculateStayPricing,
  formatCurrency,
  LENGTH_DISCOUNT_TIERS,
} from '../../utils/pricing';
import { getTodayDateString, getNextDayDateString } from '../../utils/date';

interface PricingCalculatorCardProps {
  initialNights?: number;
  showTitle?: boolean;
  className?: string;
  onSelectNights?: (nights: number) => void;
  onOpenInquiry?: (checkIn?: string, checkOut?: string, nights?: number) => void;
}

export const PricingCalculatorCard: React.FC<PricingCalculatorCardProps> = ({
  initialNights = 5,
  showTitle = true,
  className = '',
  onSelectNights,
  onOpenInquiry,
}) => {
  const today = getTodayDateString();
  const [mode, setMode] = useState<'nights' | 'dates'>('nights');
  const [nights, setNights] = useState<number>(initialNights);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  // Compute calculated nights if dates are supplied
  const effectiveNights = useMemo(() => {
    if (mode === 'dates' && checkIn && checkOut) {
      const start = new Date(checkIn).getTime();
      const end = new Date(checkOut).getTime();
      if (!isNaN(start) && !isNaN(end) && end > start) {
        return Math.round((end - start) / (1000 * 60 * 60 * 24));
      }
    }
    return nights;
  }, [mode, checkIn, checkOut, nights]);

  const pricing = useMemo(() => {
    if (mode === 'dates' && checkIn && checkOut) {
      return calculateStayPricing(effectiveNights, undefined, checkIn, checkOut);
    }
    return calculateStayPricing(effectiveNights);
  }, [mode, effectiveNights, checkIn, checkOut]);

  const handleNightsChange = (val: number) => {
    const clamped = Math.max(1, Math.min(60, val));
    setNights(clamped);
    if (onSelectNights) onSelectNights(clamped);
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckIn(val);
    if (val && (!checkOut || checkOut <= val)) {
      setCheckOut(getNextDayDateString(val, 3));
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(e.target.value);
  };

  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCC6] p-5 sm:p-7 shadow-sm space-y-5 ${className}`}
    >
      {/* Title & Legal Badge */}
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DCC6]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A3B34] text-[#F6E7A7]">
                Transparent Pricing
              </span>
              <span className="text-xs text-[#1A3B34]/60 font-medium">No Surprise Fees</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
              Rate & Tax Breakdown
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-medium self-start sm:self-center">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              <strong>Licensed STR</strong> · City & County of Honolulu
            </span>
          </div>
        </div>
      )}

      {/* Mode toggle: By Nights vs. By Specific Dates */}
      <div className="flex items-center justify-between gap-2 p-1 bg-[#F9F7F2] rounded-xl border border-[#E8DCC6] text-xs">
        <button
          type="button"
          onClick={() => setMode('nights')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer text-center ${
            mode === 'nights'
              ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-2xs'
              : 'text-[#1A3B34]/70 hover:text-[#1A3B34]'
          }`}
        >
          Quick Nights Slider
        </button>
        <button
          type="button"
          onClick={() => setMode('dates')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer text-center ${
            mode === 'dates'
              ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-2xs'
              : 'text-[#1A3B34]/70 hover:text-[#1A3B34]'
          }`}
        >
          Select Exact Dates (2026–2027)
        </button>
      </div>

      {mode === 'nights' ? (
        /* Nights selector pill buttons */
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="pricing-nights-slider" className="font-semibold text-[#1A3B34] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Select Length of Stay:</span>
            </label>
            <span className="font-bold text-sm text-[#1A3B34]">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </span>
          </div>

          {/* Quick select buttons */}
          <div className="grid grid-cols-6 gap-1.5">
            {[2, 3, 7, 10, 20, 30].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleNightsChange(n)}
                className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  nights === n
                    ? 'bg-[#1A3B34] text-white shadow-xs'
                    : 'bg-[#F9F7F2] text-[#1A3B34]/70 hover:bg-[#E8DCC6]/60 border border-[#E8DCC6]'
                }`}
              >
                {n}n
              </button>
            ))}
          </div>

          <input
            id="pricing-nights-slider"
            type="range"
            min="1"
            max="35"
            value={nights}
            onChange={(e) => handleNightsChange(parseInt(e.target.value, 10))}
            className="w-full accent-[#1A3B34] cursor-pointer"
          />
        </div>
      ) : (
        /* Specific date pickers */
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#1A3B34]/80 mb-1">
                Check-In Date
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={handleCheckInChange}
                className="w-full p-2 bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] font-medium focus:outline-none focus:border-[#1A3B34] cursor-pointer text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1A3B34]/80 mb-1">
                Check-Out Date
              </label>
              <input
                type="date"
                min={checkIn ? getNextDayDateString(checkIn, 1) : today}
                value={checkOut}
                onChange={handleCheckOutChange}
                className="w-full p-2 bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] font-medium focus:outline-none focus:border-[#1A3B34] cursor-pointer text-xs"
              />
            </div>
          </div>
          <div className="text-xs text-[#1A3B34]/70">
            <span>
              {checkIn && checkOut
                ? `${effectiveNights} ${effectiveNights === 1 ? 'night selected' : 'nights selected'}`
                : 'Select dates to preview real-time pricing quote'}
            </span>
          </div>
        </div>
      )}

      {/* Calculation Line Items */}
      <div className="bg-[#F9F7F2] rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] space-y-3 text-xs sm:text-sm">
        {/* Base Rate */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium text-[#1A3B34]">Base Room Rate</span>
            <span className="block text-[11px] text-[#1A3B34]/60">
              {pricing.rateLabel
                ? `${pricing.rateLabel} (${effectiveNights} ${effectiveNights === 1 ? 'nt' : 'nts'})`
                : `${formatCurrency(pricing.baseRatePerNight)} × ${effectiveNights} ${effectiveNights === 1 ? 'night' : 'nights'}`}
            </span>
            {pricing.seasonSummary && (
              <span className="block text-[10px] text-[#C59B4B] font-semibold">
                {pricing.seasonSummary}
              </span>
            )}
          </div>
          <span className="font-semibold text-[#1A3B34]">
            {formatCurrency(pricing.grossRoomTotal)}
          </span>
        </div>

        {/* Length of Stay Discount (if applicable) */}
        {pricing.discountPercent > 0 && (
          <div className="flex items-center justify-between text-emerald-800 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/60">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold">
                {pricing.discountPercent}% Stay Discount ({effectiveNights}+ days)
              </span>
            </div>
            <span className="font-bold text-emerald-700">
              -{formatCurrency(pricing.discountAmount)}
            </span>
          </div>
        )}

        {/* Cleaning Fee */}
        <div className="pt-1 border-t border-[#E8DCC6]/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-medium text-[#1A3B34]">Cleaning Fee</span>
              <span className="block text-[11px] text-[#1A3B34]/60">
                {pricing.isCleaningFeeWaived ? (
                  <span className="text-emerald-700 font-semibold">
                    ✓ Waived for 3+ nights (Standard $250 fee is $0)
                  </span>
                ) : (
                  <span className="text-amber-800">
                    $250 fee for short stays (1–2 nights only)
                  </span>
                )}
              </span>
            </div>
            <span className="font-semibold text-[#1A3B34]">
              {pricing.cleaningFee > 0 ? (
                formatCurrency(pricing.cleaningFee)
              ) : (
                <span className="text-emerald-700 font-bold">$0 (Waived)</span>
              )}
            </span>
          </div>

          {/* Want to waive cleaning fee banner */}
          {effectiveNights < 3 ? (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block text-amber-950">
                  Want to waive the cleaning fee? Book 3 nights or more!
                </span>
                <p className="text-[11px] text-amber-800 leading-snug">
                  Stays of 1–2 nights incur a $250 cleaning fee. Book 3 nights or more and the cleaning fee is completely waived ($0 fee).
                </p>
                <button
                  type="button"
                  onClick={() => handleNightsChange(3)}
                  className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1A3B34] hover:bg-[#224D44] text-[#F6E7A7] font-bold text-[10.5px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Select 3 Nights & Save $250</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-[11px]">
                  Cleaning fee waived! You saved $250 by booking 3+ nights.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                $0 Fee
              </span>
            </div>
          )}
        </div>

        {/* Resort Fees & Parking */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-800">
          <span>Resort fees</span>
          <span className="font-bold">$0 (Never Charged)</span>
        </div>
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-800">
          <span>Covered Garage Parking</span>
          <span className="font-bold">Included ($0)</span>
        </div>

        {/* Hawaii Taxes (18.5% Total) */}
        <div className="pt-2 border-t border-[#E8DCC6] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A3B34]">
          <div className="space-y-0.5">
            <span>Hawaii Taxes (18.5%)</span>
            <span className="block text-[10.5px] font-normal text-[#1A3B34]/60">
              Applied directly to Base Rate + Cleaning Fee
            </span>
          </div>
          <span>{formatCurrency(pricing.totalTaxes)}</span>
        </div>

        {/* Grand Total */}
        <div className="pt-3 border-t border-[#1A3B34]/20 flex items-center justify-between">
          <div>
            <span className="font-serif text-base sm:text-lg font-bold text-[#1A3B34] block">
              Total Stay Cost
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#1A3B34]/60">
              Formula: Base + Cleaning Fee + Taxes (18.50%)
            </span>
          </div>
          <div className="text-right">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
              {formatCurrency(pricing.grandTotal)}
            </span>
            <span className="block text-[10.5px] text-[#1A3B34]/60">
              Avg. ~{formatCurrency(Math.round(pricing.grandTotal / (effectiveNights || 1)))}/night all-in
            </span>
          </div>
        </div>
      </div>

      {/* Action button if onOpenInquiry passed */}
      {onOpenInquiry && (
        <button
          type="button"
          onClick={() => onOpenInquiry(checkIn || undefined, checkOut || undefined, effectiveNights)}
          className="w-full py-3 px-4 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-[#F6E7A7] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer border border-[#C59B4B]/30"
        >
          <Calendar className="w-4 h-4 text-[#F6E7A7]" />
          <span>Inquire With This Quotation</span>
        </button>
      )}

      {/* Discount Tiers Quick Table */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C59B4B] block">
          Incremental Extended Stay Discounts (On Base Rate)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
          {LENGTH_DISCOUNT_TIERS.map((tier) => (
            <div
              key={tier.minNights}
              className={`p-2 rounded-xl border transition-all ${
                pricing.discountPercent === tier.percent
                  ? 'bg-[#1A3B34] text-white border-[#1A3B34] font-semibold'
                  : 'bg-white border-[#E8DCC6] text-[#1A3B34]/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{tier.minNights}+ Days</span>
                <span className={pricing.discountPercent === tier.percent ? 'text-[#F6E7A7]' : 'font-bold text-emerald-700'}>
                  {tier.percent}% Off
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
