import { WaikikiDestination } from '../types';

export const WAIKIKI_DESTINATIONS: WaikikiDestination[] = [
  {
    id: 'kuhio-beach',
    title: 'Kuhio Beach & Queen’s Surf',
    category: 'beaches',
    categoryLabel: 'Beach & Ocean',
    distanceFromBanyan: '1 Block · 3 min walk',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description:
      'The calm, turquoise waters and iconic breakwalls of Kuhio Beach offer the quintessential Waikiki swimming experience. Gentle surf, soft sand, and sunset hula shows by the Duke Kahanamoku statue.',
    insiderTip:
      'Walk over early around 7:30 AM for glassy ocean conditions, or catch the free sunset torch-lighting and hula performance near the Duke statue on select evenings.',
    highlightPills: ['Calm Swimming', 'Surf Board Rentals', 'Duke Statue', 'Lifeguard Tower'],
  },
  {
    id: 'diamond-head-hike',
    title: 'Diamond Head State Monument (Lēʻahi)',
    category: 'nature',
    categoryLabel: 'Scenic Hiking',
    distanceFromBanyan: '1.4 Miles · 5 min drive / quick trolley',
    image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff568?auto=format&fit=crop&w=1200&q=80',
    description:
      'Honolulu’s most iconic volcanic crater. Hike the historic 1.6-mile round-trip trail to the summit bunkers for a 360-degree panoramic vista of Waikiki, the Pacific Ocean, and the Koʻolau mountains.',
    insiderTip:
      'State park reservations are required for non-residents. Book the 6:00 AM or 7:00 AM entry slot to beat the mid-day sun and catch breathtaking morning light over the south shore.',
    highlightPills: ['360° Ocean Views', 'Historic Crater', 'Iconic Photo Spot'],
  },
  {
    id: 'waikiki-surf-breaks',
    title: 'Canoes & Queen’s Surf Breaks',
    category: 'activities',
    categoryLabel: 'Surfing & Watersports',
    distanceFromBanyan: '1 Block · 4 min walk',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    description:
      'The birthplace of modern surfing where Duke Kahanamoku rode gentle rollers. Warm, long rolling swells make this one of the world’s best spots for both first-time surf lessons and experienced longboarders.',
    insiderTip:
      'Rent a longboard right at the beach stands or take an outrigger canoe surfing ride with local Waikiki beach boys for an authentic island rush.',
    highlightPills: ['Beginner Friendly', 'Longboarding', 'Outrigger Canoe', 'Board Rentals'],
  },
  {
    id: 'kalakaua-dining',
    title: 'Kalākaua & Kūhiō Dining Scene',
    category: 'dining',
    categoryLabel: 'Local Dining & Cafes',
    distanceFromBanyan: 'Steps away along Ohua & Kuhio',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    description:
      'From beachfront dining at Duke’s Waikiki to fresh local poke bowls, traditional Hawaiian plate lunches, Japanese ramen alleys, and artisanal coffee shops along Kuhio Ave.',
    insiderTip:
      'Try fresh ahi poke from Maguro Spot (just 2 blocks away on Kuhio Ave) or grab island pastries and Kona coffee from the bakery on the ground floor of Waikiki Banyan.',
    highlightPills: ['Fresh Island Poke', 'Oceanfront Dining', 'Kona Coffee', 'Late Night Bites'],
  },
  {
    id: 'kapiolani-park-zoo',
    title: 'Kapiʻolani Regional Park & Honolulu Zoo',
    category: 'activities',
    categoryLabel: 'Parks & Family',
    distanceFromBanyan: '2 Blocks · 5 min walk',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    description:
      'A sprawling 300-acre historic park shaded by massive banyan and monkeypod trees. Home to the Honolulu Zoo, Waikiki Shell concert venue, tennis courts, and peaceful picnic lawns facing Diamond Head.',
    insiderTip:
      'A wonderful spot for morning jogs, yoga beneath the banyans, or letting kids explore the zoo’s lush tropical botanical habitats and Komodo dragons.',
    highlightPills: ['Shaded Banyans', 'Honolulu Zoo', 'Picnic Lawns', 'Waikiki Shell'],
  },
  {
    id: 'international-marketplace',
    title: 'International Market Place & Shopping',
    category: 'shopping',
    categoryLabel: 'Shopping & Culture',
    distanceFromBanyan: '6 Blocks · 8 min walk',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd302?auto=format&fit=crop&w=1200&q=80',
    description:
      'An open-air shopping and dining destination centered around a magnificent centuries-old banyan tree, featuring Hawaiian cultural workshops, luxury boutiques, and the Grand Lanai rooftop dining.',
    insiderTip:
      'Check their evening calendar for free traditional Hawaiian hula storytelling and torch-lighting ceremonies nestled in the courtyard garden.',
    highlightPills: ['Historic Banyan Tree', 'Grand Lanai Dining', 'Open-Air Shops', 'Cultural Shows'],
  },
];
