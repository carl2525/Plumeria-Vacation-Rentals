import { WaikikiDestination } from '../types';

export const WAIKIKI_DESTINATIONS: WaikikiDestination[] = [
  {
    id: 'diamond-head-hike',
    title: 'Diamond Head State Monument (Leʻahi Crater)',
    category: 'nature',
    categoryLabel: 'Scenic Hiking',
    distanceFromBanyan: '1.4 Miles · 5 min drive',
    image: '/images/banyan/banyan-amenity-01.webp',
    requiresReservation: true,
    description:
      'Directly visible from your Waikiki Banyan lanai. A scenic 1.6-mile trail climbs through historic volcanic tunnels to the summit rim for 360° panoramas of Waikiki and the Pacific ocean.',
    insiderTip:
      'Book the 6:00 AM sunrise permit slot online. Banyan’s east-end location puts you at the park gate in 5 minutes, beating crosstown morning traffic.',
    highlightPills: ['Lanai Crater Views', '5-Min Drive from Banyan', '360° Summit Panoramas', 'WWII Tunnel Hike'],
    backlinkUrl: 'https://dlnr.hawaii.gov/dsp/parks/oahu/diamond-head-state-monument/',
    backlinkLabel: 'DLNR Hawaii State Parks Guide',
    backlinkDomain: 'dlnr.hawaii.gov',
  },
  {
    id: 'hanauma-bay',
    title: 'Hanauma Bay Nature Preserve',
    category: 'nature',
    categoryLabel: 'Snorkeling Sanctuary',
    distanceFromBanyan: '9.5 Miles · 18 min drive via H-1',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=80',
    requiresReservation: true,
    description:
      'Formed inside a sunken volcanic crater, this world-famous marine sanctuary offers calm turquoise waters, colorful coral reefs, and frequent green sea turtle (honu) sightings.',
    insiderTip:
      'City permits release online 2 days in advance at 7:00 AM HST. Waikiki Banyan’s garage and fast H-1 access make early morning arrivals effortless.',
    highlightPills: ['Protected Marine Preserve', 'Green Sea Turtles (Honu)', 'Vibrant Coral Reefs', '18-Min Drive from Banyan'],
    backlinkUrl: 'https://www.honolulu.gov/dpr/hanauma-bay-nature-preserve/',
    backlinkLabel: 'Honolulu Nature Preserve Guide',
    backlinkDomain: 'honolulu.gov',
  },
  {
    id: 'kualoa-ranch',
    title: 'Kualoa Ranch & Jurassic Valley',
    category: 'activities',
    categoryLabel: 'Jurassic Valley',
    distanceFromBanyan: '24 Miles · 40 min drive via H-3',
    image: '/images/destinations/kualoa-ranch.jpg',
    requiresReservation: true,
    description:
      'A 4,000-acre private nature reserve famous as "Hollywood’s Hawaii Backlot" for Jurassic Park. Enjoy guided UTV Raptor expeditions, ocean catamarans, and ziplines.',
    insiderTip:
      'Popular UTV and movie site tours book weeks in advance online. From Banyan, jump straight onto H-3 for a breathtaking trans-Koʻolau drive.',
    highlightPills: ['Jurassic Park Filming Site', 'Guided UTV Raptor Tours', '4,000-Acre Nature Reserve', 'Fast H-3 Highway Route'],
    backlinkUrl: 'https://www.kualoa.com/',
    backlinkLabel: 'Kualoa Ranch Official Tours',
    backlinkDomain: 'kualoa.com',
  },
  {
    id: 'ala-wai-canal-golf',
    title: 'Ala Wai Promenade & Golf Course',
    category: 'activities',
    categoryLabel: 'Scenic Golf & Walkway',
    distanceFromBanyan: 'Directly behind Banyan · 2 min walk',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    requiresReservation: true,
    description:
      'Located directly behind Waikiki Banyan across the canal. Features an 18-hole championship municipal course against the Koʻolau mountains, plus a paved canal walkway.',
    insiderTip:
      'Golfers can book municipal tee times online in advance. The tree-lined canal promenade is also Waikiki’s premier sunrise and dusk jogging path.',
    highlightPills: ['Directly Behind Banyan', '18-Hole Championship Course', 'Koʻolau Mountain Vistas', 'Canal Sunrise Walkway'],
    backlinkUrl: 'https://www.honolulu.gov/des/golf-courses/',
    backlinkLabel: 'Honolulu Municipal Golf Courses',
    backlinkDomain: 'honolulu.gov',
  },
  {
    id: 'kuhio-beach',
    title: 'Kuhio Beach & Protected Lagoons',
    category: 'beaches',
    categoryLabel: 'Beach & Ocean',
    distanceFromBanyan: '1 Flat Block · 3 min walk down ʻOhua Ave',
    image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=80',
    description:
      'Just 1 flat block from Waikiki Banyan. Gentle breakwall lagoons provide wave-free turquoise water ideal for swimming, floating, and families with young children.',
    insiderTip:
      'Head down early at 7:30 AM for calm glassy water, or gather at dusk for the free sunset torch-lighting ceremony by the Duke Kahanamoku statue.',
    highlightPills: ['1 Block From Banyan', 'Calm Breakwall Lagoons', 'Beach Chairs & Towels', 'Duke Kahanamoku Statue'],
    backlinkUrl: 'https://www.gohawaii.com/islands/oahu/things-to-do/beaches/kuhio-beach',
    backlinkLabel: 'GoHawaii Official Beach Guide',
    backlinkDomain: 'gohawaii.com',
  },
  {
    id: 'waikiki-surf-breaks',
    title: 'Canoes & Queen’s Surf Breaks',
    category: 'activities',
    categoryLabel: 'Surfing & Watersports',
    distanceFromBanyan: '1 Block · 4 min walk down ʻOhua Ave',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    description:
      'The historic birthplace of surfing. Walk your board 1 flat block down ʻOhua Ave to paddle into long, forgiving waves that peel gently over the reef.',
    insiderTip:
      'First-time surfers can take lessons with the licensed Waikiki Beach Boys, or enjoy an outrigger canoe surfing ride with the whole family.',
    highlightPills: ['1 Block to Surf', 'Gentle Longboarding Waves', 'Outrigger Canoe Rides', 'Beach Boy Lessons'],
    backlinkUrl: 'https://www.hawaiiansouthshore.com/blogs/waves-of-the-south-shore-series/surf-guide-series-canoes-hawaii',
    backlinkLabel: 'Canoes Surf Guide by Hawaiian South Shore',
    backlinkDomain: 'hawaiiansouthshore.com',
  },
  {
    id: 'kapiolani-park',
    title: 'Kapiʻolani Regional Park',
    category: 'nature',
    categoryLabel: 'Parks & Greenery',
    distanceFromBanyan: '2 Blocks · 5 min walk down Paoakalani Ave',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    description:
      '300 tranquil acres of shaded parkland right down Paoakalani Ave. Ideal for morning jogs beneath canopy banyans and sunset picnics with Diamond Head views.',
    insiderTip:
      'Enjoy Art on the Zoo Fence on weekends, or catch an open-air evening concert under the stars at the historic Waikiki Shell.',
    highlightPills: ['2 Blocks from Banyan', '300-Acre Shaded Parkland', 'Diamond Head Views', 'Waikiki Shell Concerts'],
    backlinkUrl: 'https://www.honolulu.gov/dpr/kapiolani-regional-park/',
    backlinkLabel: 'Honolulu Parks Kapiʻolani Guide',
    backlinkDomain: 'honolulu.gov',
  },
  {
    id: 'honolulu-zoo',
    title: 'Honolulu Zoo & Botanical Gardens',
    category: 'activities',
    categoryLabel: 'Wildlife Sanctuary',
    distanceFromBanyan: '2 Blocks · 5 min walk',
    image: 'https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=1200&q=80',
    description:
      '42 lush tropical acres between Waikiki Beach and Diamond Head, showcasing over 900 animals, Komodo dragons, Asian elephants, bird aviaries, and native flora.',
    insiderTip:
      'The Keiki Children’s Zoo has interactive animal encounters. Just two flat blocks from Banyan with no parking hassles.',
    highlightPills: ['2 Blocks from Banyan', '42 Tropical Acres', 'Keiki Children’s Zoo', 'Native Flora & Fauna'],
    backlinkUrl: 'https://www.honoluluzoo.org/',
    backlinkLabel: 'Honolulu Zoo Official Website',
    backlinkDomain: 'honoluluzoo.org',
  },
  {
    id: 'waikiki-aquarium',
    title: 'Waikiki Aquarium & Living Reefs',
    category: 'activities',
    categoryLabel: 'Marine Life Sanctuary',
    distanceFromBanyan: '4 Blocks · 8 min coastal stroll',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description:
      'The third-oldest public aquarium in the U.S., showcasing rare Hawaiian monk seals, living South Pacific coral reef exhibits, and interactive touch pools.',
    insiderTip:
      'Take the flat shoreline boardwalk past the historic Natatorium for a scenic oceanfront stroller walk from Waikiki Banyan.',
    highlightPills: ['Endangered Monk Seals', 'Living Coral Reefs', 'Oceanfront Boardwalk', 'Stroller-Friendly Walk'],
    backlinkUrl: 'https://www.waikikiaquarium.org/',
    backlinkLabel: 'Waikīkī Aquarium Official Website',
    backlinkDomain: 'waikikiaquarium.org',
  },
  {
    id: 'international-marketplace',
    title: 'International Market Place',
    category: 'shopping',
    categoryLabel: 'Shopping & Culture',
    distanceFromBanyan: '6 Blocks · 8 min stroll down Kalākaua Ave',
    image: '/images/destinations/waikiki-market-place.jpg',
    description:
      'An open-air shopping and dining destination wrapped around a 160-year-old banyan tree, featuring local cultural classes, boutiques, and Grand Lanai dining.',
    insiderTip:
      'Gather in the Queen’s Court around sunset for the free nightly torch-lighting and traditional hula storytelling.',
    highlightPills: ['160-Year-Old Banyan Tree', 'Grand Lanai Dining', 'Free Nightly Hula & Torches', 'Open-Air Boutiques'],
    backlinkUrl: 'https://www.simon.com/mall/international-market-place',
    backlinkLabel: 'International Market Place Directory',
    backlinkDomain: 'simon.com',
  },
  {
    id: 'kalakaua-dining',
    title: 'Local Kuhio Dining & Fresh Poke',
    category: 'dining',
    categoryLabel: 'Local Dining & Cafes',
    distanceFromBanyan: 'Steps away along ʻOhua & Kuhio Avenues',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    description:
      'Skip expensive hotel buffets for fresh ahi poke at Maguro Spot, handmade musubi at IYASUME, artisanal coffees, and our ground-floor Banyan bakeshop.',
    insiderTip:
      'Pick up custom poke bowls on your walk back from the beach and dine al fresco on your private high-floor lanai overlooking the city lights.',
    highlightPills: ['Maguro Spot Poke (2 Blocks)', 'Musubi Cafe IYASUME', 'Ground-Floor Bakeshop', 'Dine on Your Lanai'],
  },
  {
    id: 'island-day-trips',
    title: 'Effortless Oʻahu Road Trips',
    category: 'nature',
    categoryLabel: 'Scenic Drives',
    distanceFromBanyan: 'Exit via Kapahulu Ave to H-1 in 3 min',
    image: '/images/destinations/oahu-coastal-highway.jpg',
    description:
      'Waikiki Banyan’s eastern location lets you exit straight onto Kapahulu Ave to H-1 in under 3 minutes—bypassing 25+ minutes of crosstown traffic.',
    insiderTip:
      'Use your head start to beat tour buses to Makapuʻu Lighthouse trail, Halona Blowhole, Kailua Beach, or the North Shore surf towns.',
    highlightPills: ['Fastest Highway Access', 'On-Site Parking Garage', 'Beat Crosstown Gridlock', 'North Shore Day Trips'],
    backlinkUrl: 'https://hidot.hawaii.gov/highways/home/oahu/oahu-state-roads-and-highways/oahu-map/',
    backlinkLabel: 'HDOT Official Oʻahu Highway Map',
    backlinkDomain: 'hidot.hawaii.gov',
  },
];
