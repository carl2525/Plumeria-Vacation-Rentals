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
 * Builds formatted plain text inquiry body for email (optimized for high inbox deliverability)
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
  const notesText = params.message && params.message.trim() ? params.message.trim() : 'None';

  // Calculate nights and estimated pricing if dates provided
  let rateDetail = `• Standard Base Rate: $199 / night
• Resort Fees: $0 (Never charged)
• Covered Parking: Included ($0 dedicated garage pass)`;

  if (params.checkIn && params.checkOut) {
    const start = new Date(params.checkIn).getTime();
    const end = new Date(params.checkOut).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
      const pricing = calculateStayPricing(nights);
      const discountText = pricing.discountPercent > 0 ? ` (Includes ${pricing.discountPercent}% length-of-stay discount: -${formatCurrency(pricing.discountAmount)})` : '';
      const cleaningText = pricing.isCleaningFeeWaived
        ? '$0 (Waived for 3+ nights stay)'
        : `${formatCurrency(pricing.cleaningFee)} (1-2 nights stay)`;
      const taxesText = `${formatCurrency(pricing.totalTaxes)} (18.5% Hawaii State Taxes)`;

      rateDetail = `• Stay Duration: ${nights} Nights (${params.checkIn} to ${params.checkOut})
• Base Room Rate: $199 / night (${formatCurrency(pricing.grossRoomTotal)}${discountText})
• Resort Fees: $0 (Never charged)
• Garage Parking: Included ($0 dedicated pass)
• Cleaning Fee: ${cleaningText}
• Hawaii State Taxes: ${taxesText}
• Estimated Total: ${formatCurrency(pricing.grandTotal)}`;
    }
  }

  return `Aloha Plumeria Vacation Rentals,

I would like to inquire about reserving a stay with you at Waikiki Banyan:

Reservation Details:
• Suite: ${suiteName}
• Check-In: ${checkInText} (4:00 PM HST)
• Check-Out: ${checkOutText} (10:00 AM HST)
• Guests: ${guestsText}

Estimated Rate Breakdown:
${rateDetail}

Guest Contact Information:
• Name: ${guestName}
• Email: ${emailText}
• Phone: ${phoneText}

Special Requests or Questions:
${notesText}

Mahalo,
${guestName}
${phoneText !== 'Not provided' ? `Phone: ${phoneText}` : ''}
${emailText !== 'Not provided' ? `Email: ${emailText}` : ''}`;
}

/**
 * Builds the subject line for the inquiry email (clean, spam-safe, human format)
 */
export function buildInquirySubject(params: MailtoInquiryParams): string {
  const propIdentifier = params.preferredProperty || params.propertyId;
  const suite = resolvePropertyName(propIdentifier, params.propertyName);
  const guestName = [params.firstName, params.lastName].filter(Boolean).join(' ');
  const who = guestName ? `${guestName} - ` : '';

  let dateSummary = '';
  if (params.checkIn && params.checkOut) {
    try {
      const inDate = new Date(params.checkIn);
      const outDate = new Date(params.checkOut);
      if (!isNaN(inDate.getTime()) && !isNaN(outDate.getTime())) {
        const inStr = inDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const outStr = outDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dateSummary = ` (${inStr} - ${outStr})`;
      }
    } catch {
      dateSummary = ` (${params.checkIn})`;
    }
  }

  return `Booking Inquiry: ${who}${suite}${dateSummary}`;
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
