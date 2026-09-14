import { SITE_CONFIG } from '../config/site';
import { PROPERTIES } from '../data/properties';

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
  return match ? `${match.name} (${match.viewType})` : 'Waikiki Banyan Suite';
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
  let rateDetail = 'Standard $300/nt → Direct 15% Discount Rate: $255/nt (applied upon booking acceptance)';
  if (params.checkIn && params.checkOut) {
    const start = new Date(params.checkIn).getTime();
    const end = new Date(params.checkOut).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
      const regularTotal = nights * 300;
      const discountedTotal = nights * 255;
      const savings = regularTotal - discountedTotal;
      rateDetail = `${nights} Nights: Standard $${regularTotal} ($300/nt) → Direct 15% Discount Rate: $${discountedTotal} ($255/nt, Save $${savings} on suite)`;
    }
  }

  return `Aloha Plumeria Vacation Rentals Team,

I would like to inquire about booking a stay at Waikiki Banyan and request the 15% Direct Website Booking Discount:

• Preferred Suite: ${suiteName}
• Check-In Date: ${checkInText}
• Check-Out Date: ${checkOutText}
• Number of Guests: ${guestsText}
• Promotion Requested: 15% Website Direct Discount (Applied upon accepted booking)
• Rate Estimate: ${rateDetail}
• Included Perks: $0 Mandatory Resort Fees + Free Covered Garage Parking

Guest Details:
• Name: ${guestName}
• Email: ${emailText}
• Phone: ${phoneText}

Special Requests / Questions:
${notesText}

Mahalo!
Sent from Plumeria Vacation Rentals Official Website (plumeriavacationrentals.com)`;
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

  return `Stay Inquiry: ${suite}${dates} [15% Direct Website Discount]${fromPart}`;
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
