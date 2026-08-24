export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  tower: 'Tower 1 (Mauka/Ewa)' | 'Tower 2 (Makai/Diamond Head)';
  floorLevel: string;
  viewType: 'Ocean View' | 'Partial Ocean & City' | 'Mountain & City View' | 'Diamond Head & Sunset';
  guestsMax: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  squareFeet?: number;
  ratePerNight?: number; // Verified rate if supplied, optional
  cleaningFee?: number;
  taxRateDescription?: string;
  featured: boolean;
  heroImage: string;
  gallery: {
    url: string;
    caption: string;
    category: 'living' | 'bedroom' | 'kitchen' | 'lanai' | 'view' | 'amenity';
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
