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

  return `Aloha Plumeria Vacation Rentals Team,

I would like to inquire about booking a stay at Waikiki Banyan:

• Preferred Suite: ${suiteName}
• Check-In Date: ${checkInText}
• Check-Out Date: ${checkOutText}
• Number of Guests: ${guestsText}

Guest Details:
• Name: ${guestName}
• Email: ${emailText}
• Phone: ${phoneText}

Special Requests / Questions:
${notesText}

Mahalo!
Sent from Plumeria Vacation Rentals (Waikiki Banyan Tower 2)`;
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

  return `Stay Inquiry: ${suite}${dates}${fromPart}`;
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
