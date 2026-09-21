import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  Info,
  Car,
  Utensils,
  Award,
} from 'lucide-react';
import {
  BASE_NIGHTLY_RATE,
  TAX_RATES,
  calculateStayPricing,
  formatCurrency,
  LENGTH_DISCOUNT_TIERS,
} from '../../utils/pricing';

interface PricingCalculatorCardProps {
  initialNights?: number;
  showTitle?: boolean;
  className?: string;
  onSelectNights?: (nights: number) => void;
}

export const PricingCalculatorCard: React.FC<PricingCalculatorCardProps> = ({
  initialNights = 5,
  showTitle = true,
  className = '',
  onSelectNights,
}) => {
  const [nights, setNights] = useState<number>(initialNights);

  const pricing = calculateStayPricing(nights);

  const handleNightsChange = (val: number) => {
    const clamped = Math.max(1, Math.min(60, val));
    setNights(clamped);
    if (onSelectNights) onSelectNights(clamped);
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

      {/* Nights selector pill buttons */}
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
          {[2, 3, 5, 10, 15, 30].map((n) => (
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

      {/* Calculation Line Items */}
      <div className="bg-[#F9F7F2] rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] space-y-3 text-xs sm:text-sm">
        {/* Base Rate */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-medium text-[#1A3B34]">Base Rate</span>
            <span className="block text-[11px] text-[#1A3B34]/60">
              {formatCurrency(BASE_NIGHTLY_RATE)} × {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
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
                {pricing.discountPercent}% Stay Discount ({nights}+ days)
              </span>
            </div>
            <span className="font-bold text-emerald-700">
              -{formatCurrency(pricing.discountAmount)}
            </span>
          </div>
        )}

        {/* Cleaning Fee */}
        <div className="flex items-center justify-between pt-1 border-t border-[#E8DCC6]/60">
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

        {/* Resort Fees & Parking */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-800">
          <span>Resort fees</span>
          <span className="font-bold">$0 (Never Charged)</span>
        </div>
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-emerald-800">
          <span>Covered Garage Parking</span>
          <span className="font-bold">Included ($0)</span>
        </div>

        {/* Taxes Breakdown (18.50% Total) */}
        <div className="pt-2 border-t border-[#E8DCC6] space-y-1.5">
          <div className="flex items-center justify-between font-semibold text-[#1A3B34]">
            <span>Hawaii Taxes (18.50% Total)</span>
            <span>{formatCurrency(pricing.totalTaxes)}</span>
          </div>

          <div className="pl-2 space-y-1 text-[11px] text-[#1A3B34]/70">
            <div className="flex items-center justify-between">
              <span>• GET (General Excise Tax) — 4.5%</span>
              <span>{formatCurrency(pricing.taxGet)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• TAT (Transient Accommodations Tax) — 11%</span>
              <span>{formatCurrency(pricing.taxTat)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• OTAT (Oʻahu Transient Accommodations Tax) — 3%</span>
              <span>{formatCurrency(pricing.taxOtat)}</span>
            </div>
          </div>
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
              Avg. ~{formatCurrency(Math.round(pricing.grandTotal / nights))}/night all-in
            </span>
          </div>
        </div>
      </div>

      {/* Discount Tiers Quick Table */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C59B4B] block">
          Incremental Extended Stay Discounts (On Base Rate)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
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
