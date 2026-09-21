import { SITE_CONFIG } from '../config/site';
import { PROPERTIES } from '../data/properties';
import { calculateStayPricing, formatCurrency } from './pricing';

export interface MailtoInquiryParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number | string;
  preferredProperty?: string;
  propertyId?: string;
  propertyName?: string;
  message?: string;
}

/**
 * Resolves the property name from property ID or falls back to generic Waikiki Banyan suite
 */
export function resolvePropertyName(propertyId?: string, explicitName?: string): string {
  if (explicitName) return explicitName;
  if (!propertyId) return 'Any Available Waikiki Banyan Suite (Tower 2)';
  const match = PROPERTIES.find((p) => p.id === propertyId || p.slug === propertyId);
  return match ? match.name : 'Waikiki Banyan Suite';
}

/**
 * Builds formatted plain text inquiry body for email
 */
export function buildInquiryEmailText(params: MailtoInquiryParams): string {
  const guestName = [params.firstName, params.lastName].filter(Boolean).join(' ') || 'Prospective Guest';
  const propIdentifier = params.preferredProperty || params.propertyId;
  const suiteName = resolvePropertyName(propIdentifier, params.propertyName);
  const checkInText = params.checkIn || 'Dates to be determined';
  const checkOutText = params.checkOut || 'Dates to be determined';
  const guestsText = params.guests ? `${params.guests} ${Number(params.guests) === 1 ? 'Guest' : 'Guests'}` : '2 Guests';
  const emailText = params.email || 'Not provided';
  const phoneText = params.phone || 'Not provided';
  const notesText = params.message && params.message.trim() ? params.message.trim() : 'No special requests submitted.';

  // Calculate nights and estimated pricing if dates provided
  let rateDetail = `• Base Rate      : $199 / night (Promotional Host Website Rate)
• Resort Fees    : $0.00 (Never charged · $0 Resort Fees)
• Garage Parking : INCLUDED ($0.00 dedicated covered pass)`;

  if (params.checkIn && params.checkOut) {
    const start = new Date(params.checkIn).getTime();
    const end = new Date(params.checkOut).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
      const pricing = calculateStayPricing(nights);
      const discountText = pricing.discountPercent > 0 ? ` (Includes ${pricing.discountPercent}% Stay Discount of -${formatCurrency(pricing.discountAmount)})` : '';
      const cleaningText = pricing.isCleaningFeeWaived ? '$0.00 (Waived for 3+ nights)' : `${formatCurrency(pricing.cleaningFee)} (1-2 night stay)`;
      const taxesText = `${formatCurrency(pricing.totalTaxes)} (18.50% Hawaii Lodging Taxes)`;

      rateDetail = `• Stay Duration  : ${nights} Nights (${params.checkIn} to ${params.checkOut})
• Base Rate      : $199 / night (${formatCurrency(pricing.grossRoomTotal)}${discountText})
• Resort Fees    : $0.00 (Never charged · $0 Resort Fees)
• Garage Parking : INCLUDED ($0.00 Dedicated Covered Garage Pass)
• Cleaning Fee   : ${cleaningText}
• Hawaii Taxes   : ${taxesText}
──────────────────────────────────────────────────────────
• ESTIMATED TOTAL: ${formatCurrency(pricing.grandTotal)}
  (Formula: TAX + Base + Cleaning Fee = Grand Total)`;
    }
  }

  return `══════════════════════════════════════════════════════════
       PLUMERIA VACATION RENTALS · WAIKIKI BANYAN
          Direct Booking Inquiry & Stay Request
       Honolulu Authorized Short-Term Rental Host
══════════════════════════════════════════════════════════

Aloha Plumeria Vacation Rentals Team,

I am requesting a direct booking reservation at Waikiki Banyan with the $199/night promo rate, $0 resort fees, and free covered parking:

┌─ 1. RESERVATION DETAILS ────────────────────────────────
│ Preferred Suite : ${suiteName}
│ Check-In Date   : ${checkInText} (2:00 PM HST)
│ Check-Out Date  : ${checkOutText} (12:00 PM HST)
│ Number of Guests: ${guestsText}
└─────────────────────────────────────────────────────────

┌─ 2. ESTIMATED PRICING & INCLUDED VALUE ─────────────────
${rateDetail.split('\n').map(line => `│ ${line}`).join('\n')}
│
│ Included Suite Amenities:
│ • High-floor Tower 2 placement (Floors 32 or 36)
│ • Fully Airconditioned suite & private lanai
│ • Full kitchen (refrigerator, stove, oven, microwave)
│ • 1-Acre 6th-Floor recreation deck (heated pool, hot tubs, BBQ)
│ • Complimentary beach chairs, towels & cooler tote
└─────────────────────────────────────────────────────────

┌─ 3. GUEST CONTACT INFORMATION ──────────────────────────
│ Lead Guest Name : ${guestName}
│ Email Address   : ${emailText}
│ Phone Number    : ${phoneText}
└─────────────────────────────────────────────────────────

┌─ 4. IMPORTANT RESERVATION & VERIFICATION NOTICE ────────
│ • Final Details & Computation:
│   Final reservation details, exact dates, and verified
│   cost computation will be sent via return email.
│
│ • Identity & Stay Verification:
│   Please note that further guest verification may be
│   required via email once this inquiry is received
│   before your stay is formally confirmed.
└─────────────────────────────────────────────────────────

┌─ 5. SPECIAL REQUESTS OR QUESTIONS ──────────────────────
│ ${notesText}
└─────────────────────────────────────────────────────────

Mahalo nui loa,
${guestName}

──────────────────────────────────────────────────────────
Plumeria Vacation Rentals at Waikiki Banyan
201 ʻOhua Avenue, Tower 2, Honolulu, HI 96815
Direct Host Phone: (808) 671-9191
Website: plumeriavacationrentals.com
══════════════════════════════════════════════════════════`;
}

/**
 * Builds the subject line for the inquiry email
 */
export function buildInquirySubject(params: MailtoInquiryParams): string {
  const propIdentifier = params.preferredProperty || params.propertyId;
  const suite = resolvePropertyName(propIdentifier, params.propertyName);
  const dates = params.checkIn && params.checkOut ? ` (${params.checkIn} to ${params.checkOut})` : '';
  const guestName = [params.firstName, params.lastName].filter(Boolean).join(' ');
  const fromPart = guestName ? ` - ${guestName}` : '';

  return `Stay Inquiry: ${suite}${dates} [$199/nt Promo]${fromPart}`;
}

/**
 * Constructs a full mailto: URI with encoded subject and body
 */
export function generateInquiryMailtoUrl(params: MailtoInquiryParams): string {
  const subject = buildInquirySubject(params);
  const body = buildInquiryEmailText(params);

  return `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Triggers the system default mail client via mailto
 */
export function openInquiryMailto(params: MailtoInquiryParams): void {
  const url = generateInquiryMailtoUrl(params);
  window.location.href = url;
}
