export interface Property {
  id: string;
  slug: string;
  name: string;
  unitNumber?: string;
  tagline: string;
  tower: 'Tower 1 (Mauka/Ewa)' | 'Tower 2 (Makai/Diamond Head)' | string;
  floorLevel: string;
  viewType: 'Ocean View' | 'Partial Ocean & City' | 'Mountain & City View' | 'Diamond Head & Sunset' | string;
  guestsMax: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  squareFeet?: number;
  lanaiSquareFeet?: number;
  ratePerNight?: number; // Verified rate if supplied, optional
  cleaningFee?: number;
  taxRateDescription?: string;
  airbnbUrl?: string;
  featured: boolean;
  heroImage: string;
  gallery: {
    url: string;
    fallbackUrl?: string;
    caption: string;
    category: 'living' | 'bedroom' | 'kitchen' | 'lanai' | 'view' | 'amenity' | 'bathroom';
  }[];
  shortDescription: string;
  fullDescription: string[];
  sleepingArrangements: {
    room: string;
    beds: string;
    description: string;
  }[];
  keyAmenities: string[];
  fullAmenities: {
    category: string;
    items: string[];
  }[];
  houseRules: string[];
  waikikiBanyanPerks: string[];
}

export interface InquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  preferredProperty?: string;
  message: string;
}

export interface WaikikiDestination {
  id: string;
  title: string;
  category: 'beaches' | 'dining' | 'activities' | 'nature' | 'shopping';
  categoryLabel: string;
  distanceFromBanyan: string;
  image: string;
  description: string;
  insiderTip: string;
  highlightPills: string[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Waikiki Banyan' | 'Booking & Policies' | 'Local Tips';
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  guestName: string;
  guestLocation: string;
  stayDate: string;
  propertyName: string;
  quote: string;
  rating: number;
  highlight: string;
}

export interface RuleItem {
  id: string;
  number: number;
  title: string;
  summary: string;
  details: string[];
  importantNote?: string;
  tag?: string;
}

export interface RuleCategory {
  part: 'I' | 'II';
  partTitle: string;
  partSubtitle: string;
  rules: RuleItem[];
}

export interface RentalPolicySection {
  id: string;
  number: number;
  title: string;
  summary: string;
  content: string[];
  highlights?: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  importantData?: string[];
  alertNote?: string;
}
