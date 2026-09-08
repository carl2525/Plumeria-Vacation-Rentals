export interface LateCheckoutTier {
  time: string;
  fee: string;
  details: string;
}

export interface CancellationTier {
  timeframe: string;
  refund: string;
  percent: number;
  description: string;
}

export interface PolicySection {
  number: number;
  title: string;
  summary: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: {
    label: string;
    text: string;
  };
}

export const LATE_CHECKOUT_TIERS: LateCheckoutTier[] = [
  {
    time: 'Until 1:00 PM',
    fee: '$50',
    details: 'Requires advance approval; subject to availability and housekeeping schedules.',
  },
  {
    time: 'Until 2:00 PM',
    fee: '$100',
    details: 'Requires advance approval; subject to availability.',
  },
  {
    time: 'Until 3:00 PM',
    fee: '$150',
    details: 'Requires advance approval; subject to availability.',
  },
  {
    time: 'After 3:00 PM',
    fee: 'Up to $300',
    details: 'Equivalent to the base rate for another night; subject to availability.',
  },
];

export const CANCELLATION_TIERS: CancellationTier[] = [
  {
    timeframe: '14 days or more before check-in',
    refund: '100% Refund',
    percent: 100,
    description: '100% refund of eligible accommodation charges.',
  },
  {
    timeframe: '7 to 13 days before check-in',
    refund: '50% Refund',
    percent: 50,
    description: '50% refund of eligible accommodation charges.',
  },
  {
    timeframe: 'Less than 7 days before check-in',
    refund: 'No Standard Refund',
    percent: 0,
    description: 'No standard refund for late cancellations or unbooked vacancies.',
  },
];

export const RENTAL_POLICY_SECTIONS: PolicySection[] = [
  {
    number: 1,
    title: 'Rate, Fees & Payment',
    summary: '$300/night base rate, complimentary parking included, and $0 resort fees.',
    paragraphs: [
      'Your base rate is $300 per night unless a different rate is displayed or quoted for your dates. Parking is included and Plumeria does not charge a separate resort or amenity fee. Any cleaning fee, taxes, or other applicable charges will be disclosed before payment.',
      'A direct reservation is not confirmed until the required payment has been received and Plumeria Vacation Rentals issues a booking confirmation. Any remaining balance must be paid by the due date shown in the confirmation.',
    ],
    callout: {
      label: 'Zero Hidden Fees',
      text: 'Unlike nearby Waikiki hotels and third-party portals that add $40–$55/day resort fees and $40+/day parking fees, Plumeria includes covered parking with $0 separate resort fees.',
    },
  },
  {
    number: 2,
    title: 'Check-In, Checkout & Late Checkout',
    summary: 'Check-in: 2:00 PM · Checkout: 12:00 PM (Noon) · Advance approval required for late departure.',
    paragraphs: [
      'Check-in: 2:00 PM',
      'Checkout: 12:00 PM',
      'Early check-in and late checkout require advance approval and are subject to availability. Any early check-in fee will be disclosed before approval.',
    ],
    bulletPoints: [
      'Until 1:00 PM: $50',
      'Until 2:00 PM: $100',
      'Until 3:00 PM: $150',
      'After 3:00 PM: up to $300, equivalent to the base rate for another night',
    ],
    callout: {
      label: 'Departure Notice',
      text: 'Late checkout is not guaranteed. Unauthorized late departure may result in the applicable late-checkout amount plus reasonable documented costs caused by the delay.',
    },
  },
  {
    number: 3,
    title: 'Parking Included',
    summary: 'Complimentary reserved/garage parking from check-in through checkout.',
    paragraphs: [
      'Parking is included from check-in through checkout unless otherwise approved. Guests must follow Waikiki Banyan garage rules. Actual replacement or building charges may apply for lost or damaged parking credentials.',
    ],
    callout: {
      label: 'Garage Notice',
      text: 'Observe the posted 5 MPH speed limit inside the garage and park only in designated stalls. Keep your parking permit card or pass safely inside your vehicle dashboard.',
    },
  },
  {
    number: 4,
    title: 'Direct Booking Cancellation Policy',
    summary: 'Clear tiered refund schedule for cancellations submitted in writing.',
    paragraphs: [
      'Any non-refundable processing costs or separately disclosed non-refundable charges will be identified before booking. Cancellation must be submitted to Plumeria Vacation Rentals in writing. The date received is the effective cancellation date.',
      'No-shows and voluntary early departures do not automatically qualify for refunds for unused nights.',
    ],
    bulletPoints: [
      '14 days or more before check-in: 100% refund of eligible accommodation charges',
      '7 to 13 days before check-in: 50% refund of eligible accommodation charges',
      'Less than 7 days before check-in: no standard refund',
    ],
  },
  {
    number: 5,
    title: 'Reservation Changes',
    summary: 'Date, guest count, length of stay, or unit modifications require written approval.',
    paragraphs: [
      'Requests to change dates, number of guests, length of stay, or unit are subject to availability and written approval. Changes may affect rates, taxes, fees, and the reservation total. A booking for #3609-T2 does not provide access to #3205-T2, and vice versa.',
    ],
  },
  {
    number: 6,
    title: 'Damage, Extra Cleaning & Building Charges',
    summary: 'No automatic fixed damage fee; primary guest is responsible for actual documented costs.',
    paragraphs: [
      'There is no automatic fixed damage fee. The primary guest may be responsible for actual documented costs caused by the guest’s party, including damage beyond normal wear and tear, extraordinary cleaning, lost keys or access devices, lost parking credentials, and guest-caused building fines or charges.',
      'Any security deposit, card authorization, or damage-protection requirement for direct bookings will be disclosed before the reservation is completed.',
    ],
  },
  {
    number: 7,
    title: 'Agreement',
    summary: 'Mutual understanding and compliance upon booking and check-in.',
    paragraphs: [
      'By completing payment and occupying the property, the primary guest agrees to this Direct Booking Rental Policy, the Plumeria Vacation Rentals In-House Rules, the Waikiki Banyan Building Rules, and the pricing and terms shown in the booking confirmation.',
    ],
  },
];

export const ALOHA_MAHALO_MESSAGE = {
  title: 'Aloha & Mahalo',
  content:
    'Our goal is to make the booking terms easy to understand while protecting the home and the Waikiki Banyan community. Please contact Plumeria Vacation Rentals before arrival if anything in your reservation needs to be changed.',
};
