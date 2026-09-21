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
 * Builds formatted plain text inquiry body for email (optimized for high deliverability)
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
  let rateDetail = `- Base Rate: $199 / night
- Resort Fees: $0.00 (Never charged)
- Covered Parking: Included ($0.00 dedicated pass)`;

  if (params.checkIn && params.checkOut) {
    const start = new Date(params.checkIn).getTime();
    const end = new Date(params.checkOut).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
      const pricing = calculateStayPricing(nights);
      const discountText = pricing.discountPercent > 0 ? ` (Includes ${pricing.discountPercent}% Stay Discount of -${formatCurrency(pricing.discountAmount)})` : '';
      const cleaningText = pricing.isCleaningFeeWaived
        ? '$0.00 (Waived for 3+ nights stay)'
        : `${formatCurrency(pricing.cleaningFee)} (1-2 night stay)`;
      const taxesText = `${formatCurrency(pricing.totalTaxes)} (18.5% Hawaii Taxes)`;

      rateDetail = `- Stay Duration: ${nights} Nights (${params.checkIn} to ${params.checkOut})
- Base Rate: $199 / night (${formatCurrency(pricing.grossRoomTotal)}${discountText})
- Resort Fees: $0.00 (Never charged)
- Covered Parking: Included ($0.00 dedicated garage pass)
- Cleaning Fee: ${cleaningText}
- Hawaii Taxes: ${taxesText}
- Estimated Total: ${formatCurrency(pricing.grandTotal)}`;
    }
  }

  return `Aloha Plumeria Vacation Rentals Team,

I would like to inquire about reserving a stay at Waikiki Banyan:

RESERVATION DETAILS:
- Suite: ${suiteName}
- Check-In: ${checkInText} (2:00 PM HST)
- Check-Out: ${checkOutText} (12:00 PM HST)
- Guests: ${guestsText}

ESTIMATED PRICING:
${rateDetail}

GUEST CONTACT INFORMATION:
- Name: ${guestName}
- Email: ${emailText}
- Phone: ${phoneText}

SPECIAL REQUESTS / QUESTIONS:
${notesText}

Mahalo,
${guestName}

---
Plumeria Vacation Rentals at Waikiki Banyan
201 Ohua Avenue, Tower 2, Honolulu, HI 96815
Direct Host Phone: (808) 671-9191
Website: https://plumeriavacationrentals.com`;
}

/**
 * Builds the subject line for the inquiry email (clean, spam-safe format)
 */
export function buildInquirySubject(params: MailtoInquiryParams): string {
  const propIdentifier = params.preferredProperty || params.propertyId;
  const suite = resolvePropertyName(propIdentifier, params.propertyName);
  const dates = params.checkIn && params.checkOut ? ` (${params.checkIn} to ${params.checkOut})` : '';
  const guestName = [params.firstName, params.lastName].filter(Boolean).join(' ');
  const fromPart = guestName ? ` - ${guestName}` : '';

  return `Reservation Inquiry: ${suite}${dates}${fromPart}`;
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
