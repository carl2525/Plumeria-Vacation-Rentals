/**
 * ============================================================================
 * PLUMERIA VACATION RENTALS — PRICING & DYNAMIC TAX SYSTEM
 * ============================================================================
 *
 * Grounded in City & County of Honolulu Licensed Short-Term Rental Rules.
 *
 * Taxes (Total 18.50%):
 *   - Hawaii General Excise Tax (GET): 4.5%
 *   - Hawaii Transient Accommodations Tax (TAT): 11.0%
 *   - City & County of Honolulu Transient Accommodations Tax (OTAT): 3.0%
 *
 * Cleaning Fee:
 *   - 1–2 nights: $250
 *   - 3+ nights: $0 (Waived!)
 *
 * Length-of-Stay Incremental Discounts:
 *   - 7 to 9 days: 3% Discount
 *   - 10 to 19 days: 5% Discount
 *   - 20 to 29 days: 10% Discount
 *   - 30+ days: 15% Max Discount
 *
 * Dynamic Seasonal Pricing (2026–2027):
 *   - Rates are dynamically determined from `src/config/rateCalendar.ts`.
 *   - To update prices, simply edit the values in `src/config/rateCalendar.ts`.
 */

import {
  SEASONAL_RATES,
  SeasonalRatePeriod,
  NightRateDetail,
  DEFAULT_FALLBACK_RATE,
  CURRENT_DISPLAY_BASE_RATE,
  getNightlyRateForDate,
  getSeasonForDate,
  calculateNightlyRatesForStay,
} from '../config/rateCalendar';

export {
  SEASONAL_RATES,
  type SeasonalRatePeriod,
  type NightRateDetail,
  DEFAULT_FALLBACK_RATE,
  getNightlyRateForDate,
  getSeasonForDate,
  calculateNightlyRatesForStay,
};

export const BASE_NIGHTLY_RATE = CURRENT_DISPLAY_BASE_RATE; // $199
export const POST_PROMO_NIGHTLY_RATE = DEFAULT_FALLBACK_RATE; // $249
export const PROMO_EXPIRATION_DATE = '2026-10-31';

/**
 * Checks whether a booking date (e.g. check-in date) is beyond October 31, 2026.
 */
export function isDateBeyondPromo(checkInDate?: string): boolean {
  if (!checkInDate) return false;
  return checkInDate > PROMO_EXPIRATION_DATE;
}

/**
 * Returns the exact price per night for a given date from the 2026–2027 rate calendar.
 */
export function getBaseNightlyRate(checkInDate?: string): number {
  if (!checkInDate) return BASE_NIGHTLY_RATE;
  return getNightlyRateForDate(checkInDate);
}

export const TAX_RATES = {
  GET_PERCENT: 4.5,
  TAT_PERCENT: 11.0,
  OTAT_PERCENT: 3.0,
  TOTAL_PERCENT: 18.5,
  GET_DECIMAL: 0.045,
  TAT_DECIMAL: 0.110,
  OTAT_DECIMAL: 0.030,
  TOTAL_DECIMAL: 0.185,
};

export const CLEANING_FEE_SHORT_STAY = 250;
export const CLEANING_FEE_WAIVED_NIGHTS = 3;

export const LENGTH_DISCOUNT_TIERS = [
  { minNights: 7, percent: 3, label: '7+ Days: 3% Discount' },
  { minNights: 10, percent: 5, label: '10+ Days: 5% Discount' },
  { minNights: 20, percent: 10, label: '20+ Days: 10% Discount' },
  { minNights: 30, percent: 15, label: '30+ Days: 15% Max Discount' },
];

export interface StayPricingBreakdown {
  nights: number;
  baseRatePerNight: number; // Single rate or average nightly rate across stay
  grossRoomTotal: number;
  discountPercent: number;
  discountAmount: number;
  netRoomTotal: number;
  effectiveNightlyRate: number;
  cleaningFee: number;
  isCleaningFeeWaived: boolean;
  taxableSubtotal: number;
  taxGet: number;
  taxTat: number;
  taxOtat: number;
  totalTaxes: number;
  grandTotal: number;
  nightlyBreakdown?: NightRateDetail[];
  minNightlyRate?: number;
  maxNightlyRate?: number;
  rateLabel?: string;
  seasonSummary?: string;
}

export function getDiscountPercentage(nights: number): number {
  if (nights >= 30) return 15;
  if (nights >= 20) return 10;
  if (nights >= 10) return 5;
  if (nights >= 7) return 3;
  return 0;
}

export function getCleaningFee(nights: number): number {
  if (nights <= 0) return 0;
  if (nights < CLEANING_FEE_WAIVED_NIGHTS) return CLEANING_FEE_SHORT_STAY;
  return 0;
}

/**
 * Calculates complete stay pricing with dynamic seasonal night-by-night rates,
 * tiered length-of-stay discounts, waived cleaning fee for 3+ nights, and 18.5% Hawaii taxes.
 */
export function calculateStayPricing(
  nights: number,
  customBaseRate?: number,
  checkInDate?: string,
  checkOutDate?: string
): StayPricingBreakdown {
  let safeNights = Math.max(0, nights);
  let grossRoomTotal = 0;
  let baseRatePerNight = customBaseRate ?? BASE_NIGHTLY_RATE;
  let nightlyBreakdown: NightRateDetail[] | undefined = undefined;
  let minNightlyRate = baseRatePerNight;
  let maxNightlyRate = baseRatePerNight;
  let rateLabel = `$${baseRatePerNight} / night`;
  let seasonSummary: string | undefined = undefined;

  // Case 1: Both check-in and check-out dates are supplied
  if (checkInDate && checkOutDate) {
    const calculatedBreakdown = calculateNightlyRatesForStay(checkInDate, checkOutDate);
    if (calculatedBreakdown.length > 0) {
      nightlyBreakdown = calculatedBreakdown;
      safeNights = calculatedBreakdown.length;
      grossRoomTotal = calculatedBreakdown.reduce((sum, n) => sum + n.rate, 0);
      baseRatePerNight = Math.round(grossRoomTotal / safeNights);
      minNightlyRate = Math.min(...calculatedBreakdown.map((n) => n.rate));
      maxNightlyRate = Math.max(...calculatedBreakdown.map((n) => n.rate));

      rateLabel =
        minNightlyRate === maxNightlyRate
          ? `$${minNightlyRate} / night`
          : `$${minNightlyRate}–$${maxNightlyRate} / night (avg $${baseRatePerNight}/nt)`;

      const uniqueSeasons = Array.from(new Set(calculatedBreakdown.map((n) => n.seasonName)));
      seasonSummary = uniqueSeasons.join(', ');
    } else {
      grossRoomTotal = safeNights * baseRatePerNight;
    }
  } else if (checkInDate && safeNights > 0) {
    // Case 2: Only check-in date is supplied (synthesize end date)
    const start = new Date(checkInDate + 'T00:00:00');
    if (!isNaN(start.getTime())) {
      const end = new Date(start);
      end.setDate(end.getDate() + safeNights);
      const endStr = end.toISOString().split('T')[0];
      const calculatedBreakdown = calculateNightlyRatesForStay(checkInDate, endStr);
      if (calculatedBreakdown.length > 0) {
        nightlyBreakdown = calculatedBreakdown;
        grossRoomTotal = calculatedBreakdown.reduce((sum, n) => sum + n.rate, 0);
        baseRatePerNight = Math.round(grossRoomTotal / safeNights);
        minNightlyRate = Math.min(...calculatedBreakdown.map((n) => n.rate));
        maxNightlyRate = Math.max(...calculatedBreakdown.map((n) => n.rate));

        rateLabel =
          minNightlyRate === maxNightlyRate
            ? `$${minNightlyRate} / night`
            : `$${minNightlyRate}–$${maxNightlyRate} / night (avg $${baseRatePerNight}/nt)`;

        const uniqueSeasons = Array.from(new Set(calculatedBreakdown.map((n) => n.seasonName)));
        seasonSummary = uniqueSeasons.join(', ');
      } else {
        baseRatePerNight = getNightlyRateForDate(checkInDate);
        minNightlyRate = baseRatePerNight;
        maxNightlyRate = baseRatePerNight;
        grossRoomTotal = safeNights * baseRatePerNight;
        rateLabel = `$${baseRatePerNight} / night`;
      }
    } else {
      grossRoomTotal = safeNights * baseRatePerNight;
    }
  } else {
    // Case 3: No dates supplied (e.g. calculator without dates)
    grossRoomTotal = safeNights * baseRatePerNight;
    rateLabel = `$${baseRatePerNight} / night`;
  }

  const discountPercent = getDiscountPercentage(safeNights);
  const discountAmount = Math.round(grossRoomTotal * (discountPercent / 100));
  const netRoomTotal = grossRoomTotal - discountAmount;
  const effectiveNightlyRate = safeNights > 0 ? Math.round(netRoomTotal / safeNights) : baseRatePerNight;

  const cleaningFee = getCleaningFee(safeNights);
  const isCleaningFeeWaived = safeNights >= CLEANING_FEE_WAIVED_NIGHTS;

  const taxableSubtotal = netRoomTotal + cleaningFee;
  // Apply 18.5% tax directly to taxable subtotal (Base + Cleaning Fee)
  const totalTaxes = Math.round(taxableSubtotal * TAX_RATES.TOTAL_DECIMAL);
  const taxGet = Math.round(taxableSubtotal * TAX_RATES.GET_DECIMAL);
  const taxTat = Math.round(taxableSubtotal * TAX_RATES.TAT_DECIMAL);
  const taxOtat = Math.round(taxableSubtotal * TAX_RATES.OTAT_DECIMAL);

  const grandTotal = taxableSubtotal + totalTaxes;

  return {
    nights: safeNights,
    baseRatePerNight,
    grossRoomTotal,
    discountPercent,
    discountAmount,
    netRoomTotal,
    effectiveNightlyRate,
    cleaningFee,
    isCleaningFeeWaived,
    taxableSubtotal,
    taxGet,
    taxTat,
    taxOtat,
    totalTaxes,
    grandTotal,
    nightlyBreakdown,
    minNightlyRate,
    maxNightlyRate,
    rateLabel,
    seasonSummary,
  };
}

export function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}
