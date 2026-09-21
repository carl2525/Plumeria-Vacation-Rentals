/**
 * Plumeria Vacation Rentals Pricing & Tax System
 *
 * Base Nightly Rate: $199 / night (Promotional Rate)
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
 *   - 5+ days (5–9 nights): 5% Discount
 *   - 10+ days (10–14 nights): 10% Discount
 *   - 15+ days (15–19 nights): 15% Discount
 *   - 20+ days (20–24 nights): 20% Discount
 *   - 25+ days (25–29 nights): 25% Discount
 *   - 30+ days (30+ nights): 30% Discount
 *
 * Legal Status:
 *   - Legally authorized Short-Term Rental (STR) License authorized by the City & County of Honolulu
 */

export const BASE_NIGHTLY_RATE = 199;

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
  { minNights: 30, percent: 30, label: '30+ Days: 30% Discount' },
  { minNights: 25, percent: 25, label: '25+ Days: 25% Discount' },
  { minNights: 20, percent: 20, label: '20+ Days: 20% Discount' },
  { minNights: 15, percent: 15, label: '15+ Days: 15% Discount' },
  { minNights: 10, percent: 10, label: '10+ Days: 10% Discount' },
  { minNights: 5, percent: 5, label: '5+ Days: 5% Discount' },
];

export interface StayPricingBreakdown {
  nights: number;
  baseRatePerNight: number;
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
}

export function getDiscountPercentage(nights: number): number {
  if (nights >= 30) return 30;
  if (nights >= 25) return 25;
  if (nights >= 20) return 20;
  if (nights >= 15) return 15;
  if (nights >= 10) return 10;
  if (nights >= 5) return 5;
  return 0;
}

export function getCleaningFee(nights: number): number {
  if (nights <= 0) return 0;
  if (nights < CLEANING_FEE_WAIVED_NIGHTS) return CLEANING_FEE_SHORT_STAY;
  return 0;
}

export function calculateStayPricing(nights: number, customBaseRate: number = BASE_NIGHTLY_RATE): StayPricingBreakdown {
  const safeNights = Math.max(0, nights);
  const baseRatePerNight = customBaseRate;
  const grossRoomTotal = safeNights * baseRatePerNight;
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
  };
}

export function formatCurrency(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}
