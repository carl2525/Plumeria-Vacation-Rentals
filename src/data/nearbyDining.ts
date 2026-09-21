export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isPopular?: boolean;
}

export interface DiningSpot {
  id: string;
  name: string;
  cuisine: string;
  category: 'breakfast' | 'poke-casual' | 'family-dinner' | 'treats' | 'groceries';
  categoryLabel: string;
  priceLevel: '$' | '$$' | '$$$';
  averageCostPerPerson: string;
  estimatedCostNum: number;
  distanceFromBanyan: string;
  walkingMinutes: number;
  address: string;
  highlight: string;
  description: string;
  insiderTip: string;
  popularItems: MenuItem[];
  image: string;
  tags: string[];
}

export interface DiningBudgetScenario {
  id: string;
  title: string;
  styleDescription: string;
  dailyCostPerPerson: number;
  breakdown: {
    breakfast: { spot: string; cost: number };
    lunch: { spot: string; cost: number };
    dinner: { spot: string; cost: number };
    treatOrSnack: { spot: string; cost: number };
  };
}

export const NEARBY_DINING_SPOTS: DiningSpot[] = [
  {
    id: 'banyan-breeze-cafe',
    name: 'Banyan Breeze Coffee & Snack Shop',
    cuisine: 'Island Coffee & Fresh Breakfast',
    category: 'breakfast',
    categoryLabel: 'Breakfast & Island Coffee',
    priceLevel: '$',
    averageCostPerPerson: '$6 – $13',
    estimatedCostNum: 9,
    distanceFromBanyan: 'Ground Level & 6th Floor Deck (On-Site)',
    walkingMinutes: 0,
    address: '201 ʻŌhua Ave (Waikiki Banyan Lobby & Rec Deck)',
    highlight: 'Steps from your elevator — 100% Kona drip coffee, fresh fruit acai bowls, and warm breakfast croissants.',
    description:
      'Convenient on-site cafe right on the ground lobby level and 6th-floor pool deck of Waikiki Banyan. Grab an iced Kona latte, hot breakfast croissant sandwich, or tropical fruit bowl before heading out for a morning beach walk.',
    insiderTip:
      'Grab an espresso and hot pastry on the elevator ride down, or pick up refreshing fruit smoothies while lounging on the 6th-floor pool deck.',
    popularItems: [
      { name: '100% Kona Drip Coffee', price: '$4.75', isPopular: true },
      { name: 'Bacon, Egg & Cheddar Croissant', price: '$7.95', isPopular: true },
      { name: 'Organic Island Acai Bowl with Berries', price: '$11.50' },
      { name: 'Tropical Mango Banana Smoothie', price: '$6.50' },
    ],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    tags: ['On-Site at Banyan', 'Kona Coffee', 'Acai Bowls', 'Zero Walk Time'],
  },
  {
    id: 'maguro-spot',
    name: 'Maguro Spot',
    cuisine: 'Fresh Hawaiian Poke Bowls',
    category: 'poke-casual',
    categoryLabel: 'Fresh Poke & Local Hawaiian',
    priceLevel: '$',
    averageCostPerPerson: '$13 – $19',
    estimatedCostNum: 16,
    distanceFromBanyan: '2 Blocks · 3 min walk',
    walkingMinutes: 3,
    address: '2441 Kūhiō Ave, Honolulu, HI 96815',
    highlight: 'Ranked among Waikiki’s top fresh ahi poke spots — custom made-to-order fish with house sauces.',
    description:
      'A cozy, world-famous hole-in-the-wall poke shop just three minutes down Kūhiō Ave from Waikiki Banyan. Choose your cut (fresh yellowfin ahi, bluefin, salmon, or marlin), sauce base, and toppings over warm sushi rice or salad.',
    insiderTip:
      'The Hawaiian sesame-shoyu and spicy mayo with macadamia nut toppings are legendary. Pick up a bowl after the beach and enjoy it on your suite’s ocean-breeze lanai.',
    popularItems: [
      { name: 'Fresh Ahi Sesame Shoyu Bowl (Medium)', price: '$14.50', isPopular: true },
      { name: 'Spicy Hawaiian Poke Bowl with Crunch', price: '$15.25', isPopular: true },
      { name: 'Volcano Ahi & Salmon Combo Bowl', price: '$18.00' },
      { name: 'Fresh Seaweed & Kimchi Side', price: '$3.50' },
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['2 Blocks Away', 'Fresh Local Ahi', 'Custom Bowls', 'Budget Friendly'],
  },
  {
    id: 'marugame-udon',
    name: 'Marugame Udon Waikiki',
    cuisine: 'Artisan Sanuki Udon & Tempura',
    category: 'family-dinner',
    categoryLabel: 'Casual Lunch & Dinner',
    priceLevel: '$',
    averageCostPerPerson: '$9 – $16',
    estimatedCostNum: 13,
    distanceFromBanyan: '5 Blocks · 7 min stroll',
    walkingMinutes: 7,
    address: '2310 Kūhiō Ave, Honolulu, HI 96815',
    highlight: 'Handmade Sanuki udon noodles kneaded and boiled fresh right before your eyes from $8.75.',
    description:
      'Waikiki’s most beloved dining institution. Famous for authentic, silky Sanuki udon made fresh from scratch daily, paired with a self-serve bar of piping-hot tempura (jumbo shrimp, sweet potato, chicken katsu, pumpkin). Outstanding value and speed.',
    insiderTip:
      'Go before 11:30 AM for lunch or around 4:30 PM for early dinner to avoid the line, or order online for fast pickup to bring back to your suite.',
    popularItems: [
      { name: 'Nikutama Udon (Sweet Beef & Soft Egg)', price: '$10.75', isPopular: true },
      { name: 'Kake Udon (Traditional Dashi Broth)', price: '$8.25' },
      { name: 'Jumbo Tiger Shrimp Tempura', price: '$2.95 each', isPopular: true },
      { name: 'Chicken Breast Katsu Skewer', price: '$3.25' },
    ],
    image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=800&q=80',
    tags: ['7 Min Walk', 'Handmade Noodles', 'Top Waikiki Value', 'Kids Love It'],
  },
  {
    id: 'musubi-cafe-iyasume',
    name: 'Musubi Cafe IYASUME',
    cuisine: 'Hawaiian Spam Musubi & Bento',
    category: 'breakfast',
    categoryLabel: 'Breakfast & Island Coffee',
    priceLevel: '$',
    averageCostPerPerson: '$4 – $9',
    estimatedCostNum: 6,
    distanceFromBanyan: '2 Blocks · 3 min walk',
    walkingMinutes: 3,
    address: '2427 Kūhiō Ave (Pacific Monarch) & 133 Kaiulani Ave',
    highlight: 'Handmade warm spam and eel musubis starting at $2.95 — the ultimate Hawaiian grab-and-go beach meal.',
    description:
      'An iconic Honolulu favorite just two blocks from Waikiki Banyan. Master rice ball artisans craft over twenty varieties of warm musubis wrapped in crisp nori seaweed, plus hearty bento boxes and hot miso soup.',
    insiderTip:
      'Buy 3–4 warm musubis in the morning before packing your beach tote. They stay warm and delicious for lunchtime at Kuhio Beach.',
    popularItems: [
      { name: 'Spam, Egg & Bacon Musubi', price: '$3.45', isPopular: true },
      { name: 'Avocado, Bacon & Spam Musubi', price: '$3.85', isPopular: true },
      { name: 'Teriyaki Spam Musubi', price: '$2.95' },
      { name: 'Chicken Karaage Bento Box', price: '$8.50' },
    ],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    tags: ['3 Min Walk', 'Beach Snack Essential', 'Under $5', 'Authentic Local'],
  },
  {
    id: 'me-bbq',
    name: 'Me BBQ Waikiki',
    cuisine: 'Hawaiian-Korean BBQ Plates',
    category: 'family-dinner',
    categoryLabel: 'Casual Lunch & Dinner',
    priceLevel: '$',
    averageCostPerPerson: '$14 – $20',
    estimatedCostNum: 17,
    distanceFromBanyan: '2 Blocks · 3 min walk',
    walkingMinutes: 3,
    address: '151 Uluniu Ave, Honolulu, HI 96815',
    highlight: 'Massive, hot-off-the-grill Korean BBQ plates with 4 traditional sides and steamed rice.',
    description:
      'A hidden local gem tucked just three minutes from the Waikiki Banyan. Serving generous portions of marinated Korean short ribs (kalbi), spicy BBQ pork, and crispy chicken katsu. Every plate includes two scoops of rice and your choice of 4 house-made banchan sides.',
    insiderTip:
      'Portions are generous enough that two lighter eaters can easily split one Kalbi & BBQ Chicken combo plate.',
    popularItems: [
      { name: 'Kalbi (Marinated Beef Short Ribs) Plate', price: '$18.50', isPopular: true },
      { name: 'BBQ Beef & Spicy Pork Combo', price: '$16.25', isPopular: true },
      { name: 'Crispy Chicken Katsu Plate', price: '$14.50' },
      { name: '4 House Banchan Sides (Included)', price: '$0.00' },
    ],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['3 Min Walk', 'Huge Portions', 'Kalbi & Katsu', 'Great for Families'],
  },
  {
    id: 'teddys-bigger-burgers',
    name: 'Teddy’s Bigger Burgers',
    cuisine: 'Gourmet Hawaiian Burgers & Fries',
    category: 'poke-casual',
    categoryLabel: 'Casual Lunch & Dinner',
    priceLevel: '$$',
    averageCostPerPerson: '$14 – $22',
    estimatedCostNum: 18,
    distanceFromBanyan: '4 Blocks · 5 min walk',
    walkingMinutes: 5,
    address: '134 Kapahulu Ave, Honolulu, HI 96815',
    highlight: '100% fresh ground chuck burgers cooked to order with signature sweet teriyaki and garlic butter fries.',
    description:
      'Voted Hawaii’s Best Burger year after year! Situated right at the corner of Kapahulu Ave and Kalākaua Ave near the Honolulu Zoo, Teddy’s makes made-to-order flame-broiled burgers on potato buns with house sauce, real ice cream shakes, and garlic fries.',
    insiderTip:
      'Order the "Hawaiiana" burger topped with teriyaki glaze, grilled pineapple, and bacon, paired with an authentic peanut butter chocolate shake.',
    popularItems: [
      { name: 'Single "Bigger" Burger Combo (Fries & Drink)', price: '$16.49', isPopular: true },
      { name: 'Hawaiiana Burger (Pineapple, Bacon, Teriyaki)', price: '$14.99', isPopular: true },
      { name: 'Crispy Garlic Butter Fries', price: '$5.79' },
      { name: 'Thick Hand-Scooped Milkshake', price: '$7.49' },
    ],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['5 Min Walk', 'Hawaii’s Best Burger', 'Casual Patio', 'Family Friendly'],
  },
  {
    id: 'paia-fish-market',
    name: 'Paʻia Fish Market Waikiki',
    cuisine: 'Fresh Catch Seafood & Fish Tacos',
    category: 'family-dinner',
    categoryLabel: 'Family & Sit-Down Dinners',
    priceLevel: '$$',
    averageCostPerPerson: '$18 – $28',
    estimatedCostNum: 23,
    distanceFromBanyan: '5 Blocks · 7 min walk',
    walkingMinutes: 7,
    address: '2299 Kūhiō Ave, Honolulu, HI 96815',
    highlight: 'Maui’s legendary surf seafood counter in Waikiki — fresh Hawaiian mahi-mahi, ono, and ahi.',
    description:
      'Originally from Maui’s North Shore, Paʻia Fish Market brings relaxed surf-shack counter service and ultra-fresh local fish plates. Choose your catch (Mahi Mahi, Ono, Opah, Snapper) and preparation (charbroiled, blackened, or sauteed in Cajun butter), served with coleslaw and home potatoes.',
    insiderTip:
      'The Blackened Ono Plate with Cajun rice is spectacular. Fast casual setup with communal wooden picnic tables, no high-pressure resort waitstaff.',
    popularItems: [
      { name: 'Fresh Catch Mahi-Mahi Plate', price: '$19.95', isPopular: true },
      { name: 'Blackened Ono Fish Tacos (2 Large)', price: '$16.95', isPopular: true },
      { name: 'New England Clam Chowder (Bowl)', price: '$8.50' },
      { name: 'Grilled Seafood Pasta with Garlic Baguette', price: '$22.50' },
    ],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    tags: ['7 Min Walk', 'Fresh Local Fish', 'Casual Surf Vibe', 'High Quality'],
  },
  {
    id: 'dukes-waikiki',
    name: 'Duke’s Waikiki & Barefoot Bar',
    cuisine: 'Oceanfront Hawaiian & Beach Cocktails',
    category: 'family-dinner',
    categoryLabel: 'Family & Sit-Down Dinners',
    priceLevel: '$$$',
    averageCostPerPerson: '$25 – $65',
    estimatedCostNum: 45,
    distanceFromBanyan: '6 Blocks · 8 min stroll',
    walkingMinutes: 8,
    address: '2335 Kalākaua Ave (Outrigger Waikiki Beach Resort)',
    highlight: 'Iconic oceanfront dining right on the sands of Waikiki — live slack-key guitar and world-famous Kimo’s Original Hula Pie.',
    description:
      'A legendary pilgrimage for Hawaiian visitors. Located directly on the beach honoring surf pioneer Duke Kahanamoku. Offers an expansive hot breakfast buffet in the morning, barefoot bar pupus by afternoon, and prime ribs, fresh island fish, and sunset cocktails at dusk.',
    insiderTip:
      'Reserve a dining room dinner 3–4 weeks early for sunset views. Or simply walk in at the Barefoot Bar around 4:00 PM for live Hawaiian music, a tropical Mai Tai, and a slice of Hula Pie.',
    popularItems: [
      { name: 'Daily Oceanfront Breakfast Buffet', price: '$25.00', isPopular: true },
      { name: 'Duke’s Famous Bacon Cheese Burger', price: '$21.50' },
      { name: 'Macadamia Nut Crusted Fresh Fish', price: '$39.00', isPopular: true },
      { name: 'Kimo’s Original Hula Pie (Huge to Share)', price: '$14.00', isPopular: true },
    ],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tags: ['8 Min Walk', 'Beachfront Iconic', 'Live Hawaiian Music', 'Hula Pie'],
  },
  {
    id: 'leonards-bakery',
    name: 'Leonard’s Bakery',
    cuisine: 'Famous Portuguese Malasadas',
    category: 'treats',
    categoryLabel: 'Sweet Treats & Bakeries',
    priceLevel: '$',
    averageCostPerPerson: '$3 – $8',
    estimatedCostNum: 5,
    distanceFromBanyan: 'Kapahulu Ave · 4 min drive / quick stroll',
    walkingMinutes: 14,
    address: '933 Kapahulu Ave, Honolulu, HI 96816',
    highlight: 'Hawaiʻi’s most famous bakery since 1952 — warm, sugar-dusted Portuguese fried malasadas from $1.85.',
    description:
      'No visit to Honolulu is complete without a pink box of hot, fluffy malasadas from Leonard’s. Crisp on the outside and airy inside, coated in cane sugar, cinnamon sugar, or li hing mui, and stuffed with velvety custard, haupia (coconut), or guava.',
    insiderTip:
      'Eat them hot immediately in the parking lot or bring a warm box back to your suite to pair with morning coffee on the lanai.',
    popularItems: [
      { name: 'Original Sugar Malasada (Warm)', price: '$1.85', isPopular: true },
      { name: 'Haupia (Coconut Cream) Filled Malasada', price: '$2.25', isPopular: true },
      { name: 'Custard Cream Filled Malasada', price: '$2.25', isPopular: true },
      { name: 'Li Hing Mui (Tart Plum Sugar) Malasada', price: '$1.85' },
    ],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    tags: ['Iconic Since 1952', 'Warm Malasadas', 'Under $3', 'Must-Do Island Treat'],
  },
  {
    id: 'waikiki-market-groceries',
    name: 'Waikiki Market & Piko Kitchen',
    cuisine: 'Full Grocery Market & Hot Food Counter',
    category: 'groceries',
    categoryLabel: 'Groceries & In-Suite Essentials',
    priceLevel: '$$',
    averageCostPerPerson: '$8 – $18',
    estimatedCostNum: 14,
    distanceFromBanyan: '4 Blocks · 5 min walk',
    walkingMinutes: 5,
    address: '2380 Kūhiō Ave, Honolulu, HI 96815',
    highlight: 'Waikiki’s full modern grocery market — fresh local produce, artisan bakery, hot poke bar, and beverages.',
    description:
      'A full-scale neighborhood grocery supermarket right on Kūhiō Ave. Features aisles of fresh groceries for your Waikiki Banyan full kitchen, fresh local fruit (papayas, pineapple), ready-to-eat hot island meals, and a dedicated poke bowl station.',
    insiderTip:
      'Stock your full refrigerator with breakfast groceries, snacks, Hawaiian juices, and fresh fruits on Day 1 for ultimate convenience and savings.',
    popularItems: [
      { name: 'Made-to-Order Hot Island Plate Lunch', price: '$12.99', isPopular: true },
      { name: 'Fresh Cut Local Tropical Fruit Bowl', price: '$6.50' },
      { name: 'Fresh Hawaiian Poke by the Pound', price: '$18.99/lb', isPopular: true },
      { name: '1 Gallon Island Milk / Juice', price: '$5.89' },
    ],
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    tags: ['5 Min Walk', 'Full Supermarket', 'Stock Your Kitchen', 'Hot Food Bar'],
  },
  {
    id: 'rainbow-drive-in',
    name: 'Rainbow Drive-In',
    cuisine: 'Legendary Hawaiian Plate Lunch',
    category: 'family-dinner',
    categoryLabel: 'Casual Lunch & Dinner',
    priceLevel: '$',
    averageCostPerPerson: '$10 – $16',
    estimatedCostNum: 13,
    distanceFromBanyan: 'Kapahulu Ave · 3 min drive / 12 min walk',
    walkingMinutes: 12,
    address: '3308 Kanaina Ave, Honolulu, HI 96815',
    highlight: 'Serving classic Hawaiian plate lunches with two scoops of rice and macaroni salad since 1961.',
    description:
      'A Honolulu cultural landmark. World-renowned for its hearty gravy-smothered loco mocos, chili dogs, and boneless chicken plates with trademark creamy mac salad. Loved by presidents and locals alike.',
    insiderTip:
      'Order the "Mix Plate" (BBQ beef, boneless chicken, and fried mahi mahi) or the signature Loco Moco with brown gravy poured over hot hamburger patties and fried eggs.',
    popularItems: [
      { name: 'World Famous Loco Moco Plate', price: '$11.25', isPopular: true },
      { name: 'Rainbow Mix Plate (Beef, Chicken, Fish)', price: '$13.75', isPopular: true },
      { name: 'Boneless Chicken with Gravy', price: '$10.95' },
      { name: 'Side Scoop of Creamy Macaroni Salad', price: '$2.25' },
    ],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    tags: ['Since 1961', 'Classic Plate Lunch', 'Loco Moco', 'Under $15'],
  },
];

export const DINING_BUDGET_SCENARIOS: DiningBudgetScenario[] = [
  {
    id: 'casual-gems',
    title: 'Local Gems & Quick Bites',
    styleDescription:
      'Casual morning musubis & coffee, fresh beach poke bowls for lunch, and dinner at famous spots like Marugame Udon or Me BBQ.',
    dailyCostPerPerson: 38,
    breakdown: {
      breakfast: { spot: 'Musubi Cafe IYASUME or Banyan Cafe', cost: 7 },
      lunch: { spot: 'Maguro Spot Poke Bowl & Drink', cost: 16 },
      dinner: { spot: 'Marugame Udon & Tempura', cost: 12 },
      treatOrSnack: { spot: 'Leonard’s Warm Malasada', cost: 3 },
    },
  },
  {
    id: 'balanced-lanai',
    title: 'Balanced: Lanai Breakfast + Dining Out',
    styleDescription:
      'Cook tropical breakfast & Kona coffee in your full kitchen, enjoy fresh poke on the beach, and dine out in the evening.',
    dailyCostPerPerson: 32,
    breakdown: {
      breakfast: { spot: 'In-Suite Full Kitchen (Groceries)', cost: 4 },
      lunch: { spot: 'Maguro Spot Poke or Teddy’s Burger', cost: 15 },
      dinner: { spot: 'Me BBQ Korean Plate or Paʻia Fish', cost: 18 },
      treatOrSnack: { spot: 'ABC Store Shave Ice / Ice Cream', cost: 4 },
    },
  },
  {
    id: 'island-foodie',
    title: 'Waikiki Foodie & Oceanfront Dining',
    styleDescription:
      'Cafe brunch, fresh catch seafood lunch at Paʻia Fish Market, and an iconic sunset dinner with cocktails at Duke’s Waikiki.',
    dailyCostPerPerson: 85,
    breakdown: {
      breakfast: { spot: 'Duke’s Beachfront Breakfast Buffet', cost: 25 },
      lunch: { spot: 'Paʻia Fish Market Mahi Mahi Plate', cost: 20 },
      dinner: { spot: 'Oceanfront Dinner & Sunset Cocktail', cost: 48 },
      treatOrSnack: { spot: 'Hula Pie or Gourmet Shave Ice', cost: 7 },
    },
  },
];
