/**
 * ============================================================================
 * PLUMERIA VACATION RENTALS — DYNAMIC PRICING & SEASONAL RATE CALENDAR (2026–2027)
 * ============================================================================
 *
 * HOW TO CHANGE PRICES:
 * Edit the `nightlyRate` values or add/modify date periods in `SEASONAL_RATES` below.
 * Changes made here will automatically reflect across:
 *   - Instant quotation calculations
 *   - Reservation Inquiry Form & Contact page form
 *   - Property detail page sticky booking card
 *   - Generated host email summaries & quotes
 *   - Pricing calculator cards and rental policy schedules
 */

export interface SeasonalRatePeriod {
  id: string;
  name: string;
  startDate: string; // 'YYYY-MM-DD' (inclusive)
  endDate: string;   // 'YYYY-MM-DD' (inclusive)
  nightlyRate: number; // Nightly rate in USD
  badge?: string;
  description?: string;
}

/**
 * Master Seasonal Rate Calendar for 2026 and 2027.
 * Edit any rate here to adjust pricing for the specified date range.
 */
export const SEASONAL_RATES: SeasonalRatePeriod[] = [
  // --------------------------------------------------------------------------
  // 2026 CALENDAR
  // --------------------------------------------------------------------------
  {
    id: 'rate-2026-sep-oct',
    name: 'Promotional Fall Aloha Rate',
    startDate: '2026-09-01',
    endDate: '2026-10-31',
    nightlyRate: 199,
    badge: 'Special Promo',
    description: 'Promotional rate across all units',
  },
  {
    id: 'rate-2026-early-nov',
    name: 'Early November Standard',
    startDate: '2026-11-01',
    endDate: '2026-11-22',
    nightlyRate: 249,
    description: 'Standard Fall Season',
  },
  {
    id: 'rate-2026-thanksgiving',
    name: 'Thanksgiving Holiday Week',
    startDate: '2026-11-23',
    endDate: '2026-11-30',
    nightlyRate: 299,
    badge: 'Holiday',
    description: 'Thanksgiving Week in Waikiki',
  },
  {
    id: 'rate-2026-early-dec',
    name: 'Early December Pre-Holiday',
    startDate: '2026-12-01',
    endDate: '2026-12-21',
    nightlyRate: 299,
    description: 'December Pre-Holiday Season',
  },
  {
    id: 'rate-2026-holiday-peak',
    name: 'Christmas & Holiday Peak',
    startDate: '2026-12-22',
    endDate: '2026-12-31',
    nightlyRate: 399,
    badge: 'Peak Holiday',
    description: 'Christmas & Year-End Holiday Season',
  },

  // --------------------------------------------------------------------------
  // 2027 CALENDAR
  // --------------------------------------------------------------------------
  {
    id: 'rate-2027-new-year-peak',
    name: 'New Year Peak',
    startDate: '2027-01-01',
    endDate: '2027-01-03',
    nightlyRate: 399,
    badge: 'Peak Holiday',
    description: 'New Year Weekend Peak',
  },
  {
    id: 'rate-2027-january',
    name: 'January Winter Season',
    startDate: '2027-01-04',
    endDate: '2027-01-31',
    nightlyRate: 299,
    description: 'January Winter Sunshine Escape',
  },
  {
    id: 'rate-2027-february',
    name: 'February Aloha Season',
    startDate: '2027-02-01',
    endDate: '2027-02-28',
    nightlyRate: 249,
    description: 'February Warm Winter Getaway',
  },
  {
    id: 'rate-2027-march-early',
    name: 'Early March Spring Break',
    startDate: '2027-03-01',
    endDate: '2027-03-15',
    nightlyRate: 299,
    description: 'Spring Break Early Season',
  },
  {
    id: 'rate-2027-march-late',
    name: 'Late March Spring Break',
    startDate: '2027-03-16',
    endDate: '2027-03-31',
    nightlyRate: 299,
    description: 'Spring Break Peak Season',
  },
  {
    id: 'rate-2027-april',
    name: 'April Spring Season',
    startDate: '2027-04-01',
    endDate: '2027-04-30',
    nightlyRate: 299,
    description: 'April Island Getaway',
  },
  {
    id: 'rate-2027-may-early',
    name: 'May Early Summer',
    startDate: '2027-05-01',
    endDate: '2027-05-27',
    nightlyRate: 249,
    description: 'Pre-Memorial Day Summer Escape',
  },
  {
    id: 'rate-2027-memorial-day',
    name: 'Memorial Day Weekend',
    startDate: '2027-05-28',
    endDate: '2027-05-31',
    nightlyRate: 299,
    badge: 'Holiday',
    description: 'Memorial Day Holiday Kickoff',
  },
  {
    id: 'rate-2027-june',
    name: 'June Summer Season',
    startDate: '2027-06-01',
    endDate: '2027-06-30',
    nightlyRate: 299,
    description: 'Early Summer Beach Season',
  },
  {
    id: 'rate-2027-july',
    name: 'July Mid-Summer Peak',
    startDate: '2027-07-01',
    endDate: '2027-07-31',
    nightlyRate: 319,
    badge: 'Summer Peak',
    description: 'July Mid-Summer High Season',
  },
  {
    id: 'rate-2027-august',
    name: 'August Late-Summer Peak',
    startDate: '2027-08-01',
    endDate: '2027-08-31',
    nightlyRate: 319,
    badge: 'Summer Peak',
    description: 'August Summer Sunshine High Season',
  },
  {
    id: 'rate-2027-september',
    name: 'September Aloha Season',
    startDate: '2027-09-01',
    endDate: '2027-09-30',
    nightlyRate: 249,
    description: 'September Warm Island Breeze',
  },
  {
    id: 'rate-2027-october',
    name: 'October Fall Season',
    startDate: '2027-10-01',
    endDate: '2027-10-31',
    nightlyRate: 249,
    description: 'October Autumn in Waikiki',
  },
  {
    id: 'rate-2027-early-nov',
    name: 'Early November Standard',
    startDate: '2027-11-01',
    endDate: '2027-11-22',
    nightlyRate: 249,
    description: 'November Pre-Thanksgiving',
  },
  {
    id: 'rate-2027-thanksgiving',
    name: 'Thanksgiving Holiday Week',
    startDate: '2027-11-23',
    endDate: '2027-11-30',
    nightlyRate: 299,
    badge: 'Holiday',
    description: 'Thanksgiving Holiday Gathering',
  },
  {
    id: 'rate-2027-early-dec',
    name: 'Early December Pre-Holiday',
    startDate: '2027-12-01',
    endDate: '2027-12-21',
    nightlyRate: 299,
    description: 'December Pre-Christmas Warm-Up',
  },
  {
    id: 'rate-2027-holiday-peak',
    name: 'Christmas & Holiday Peak',
    startDate: '2027-12-22',
    endDate: '2027-12-31',
    nightlyRate: 399,
    badge: 'Peak Holiday',
    description: 'Christmas & New Year Holiday High Season',
  },
];

/**
 * Default fallback rate if dates are outside 2026–2027 calendar:
 */
export const DEFAULT_FALLBACK_RATE = 249;

/**
 * Current base starting rate for display when no dates are selected:
 */
export const CURRENT_DISPLAY_BASE_RATE = 199;

/**
 * Finds the seasonal rate period for a specific date (YYYY-MM-DD).
 */
export function getSeasonForDate(dateStr: string): SeasonalRatePeriod | undefined {
  if (!dateStr) return undefined;
  // Standard string comparison works for ISO dates 'YYYY-MM-DD'
  return SEASONAL_RATES.find(
    (period) => dateStr >= period.startDate && dateStr <= period.endDate
  );
}

/**
 * Retrieves the nightly rate in USD for a specific single night date (YYYY-MM-DD).
 */
export function getNightlyRateForDate(dateStr: string): number {
  const match = getSeasonForDate(dateStr);
  return match ? match.nightlyRate : DEFAULT_FALLBACK_RATE;
}

export interface NightRateDetail {
  date: string;
  rate: number;
  seasonName: string;
}

/**
 * Calculates the exact day-by-day rates for every night between check-in and check-out.
 * (A stay from Nov 1 to Nov 3 comprises 2 nights: Nov 1 and Nov 2).
 */
export function calculateNightlyRatesForStay(
  checkInDate: string,
  checkOutDate: string
): NightRateDetail[] {
  if (!checkInDate || !checkOutDate) return [];

  const start = new Date(checkInDate + 'T00:00:00');
  const end = new Date(checkOutDate + 'T00:00:00');
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return [];
  }

  const results: NightRateDetail[] = [];
  const current = new Date(start);

  while (current < end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const season = getSeasonForDate(dateStr);
    results.push({
      date: dateStr,
      rate: season ? season.nightlyRate : DEFAULT_FALLBACK_RATE,
      seasonName: season ? season.name : 'Standard Season',
    });

    // Advance 1 day
    current.setDate(current.getDate() + 1);
  }

  return results;
}
