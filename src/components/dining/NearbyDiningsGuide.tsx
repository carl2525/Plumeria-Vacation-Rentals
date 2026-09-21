import React, { useState } from 'react';
import {
  Utensils,
  Coffee,
  Fish,
  Clock,
  MapPin,
  DollarSign,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Users,
  Calendar,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  NEARBY_DINING_SPOTS,
  DINING_BUDGET_SCENARIOS,
  DiningSpot,
} from '../../data/nearbyDining';
import { AppImage } from '../common/AppImage';

interface NearbyDiningsGuideProps {
  initialGuests?: number;
  initialDays?: number;
  onSelectDining?: (spot: DiningSpot) => void;
  className?: string;
}

export const NearbyDiningsGuide: React.FC<NearbyDiningsGuideProps> = ({
  initialGuests = 4,
  initialDays = 5,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [guests, setGuests] = useState<number>(initialGuests);
  const [days, setDays] = useState<number>(initialDays);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('casual-gems');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedScenario =
    DINING_BUDGET_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    DINING_BUDGET_SCENARIOS[0];

  const totalCalculatedDiningCost =
    selectedScenario.dailyCostPerPerson * guests * days;
  const dailyTotalForParty = selectedScenario.dailyCostPerPerson * guests;

  const categories = [
    { id: 'all', label: 'All Nearby Spots', icon: Utensils },
    { id: 'breakfast', label: 'Breakfast & Island Coffee', icon: Coffee },
    { id: 'poke-casual', label: 'Poke & Casual Bites', icon: Fish },
    { id: 'family-dinner', label: 'Lunch & Family Dinner', icon: Utensils },
    { id: 'treats', label: 'Sweet Treats & Bakeries', icon: Sparkles },
    { id: 'groceries', label: 'Groceries & Kitchen Prep', icon: ShoppingBag },
  ];

  const filteredSpots = NEARBY_DINING_SPOTS.filter((spot) => {
    const matchesCategory =
      activeCategory === 'all' || spot.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="nearby-dining-guide" className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C59B4B]/15 text-[#8A5A1C] border border-[#C59B4B]/30">
          <Utensils className="w-3.5 h-3.5" />
          <span>Curated Waikiki Banyan Neighborhood Dining & Pricing</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A3B34] tracking-tight">
          Where to Eat Around Waikiki Banyan
        </h2>
        <p className="text-sm sm:text-base text-[#1A3B34]/80 font-light leading-relaxed">
          Wondering where to grab coffee, fresh poke, or family dinner? Waikiki Banyan sits in the culinary sweet spot of Kūhiō and Kapahulu Avenues. Explore real nearby spots, calculated pricing, and walking distances.
        </p>
      </div>

      {/* Interactive Meal Budget & Dining Cost Estimator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC6] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-[#E8DCC6]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#1A3B34] text-white">
                <DollarSign className="w-4 h-4" />
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                Nearby Meal Budget & Cost Estimator
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#1A3B34]/70 font-light">
              Select your party size, trip length, and dining style to see realistic neighborhood dining expenses.
            </p>
          </div>

          {/* Quick Party / Days Selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#F9F7F2] px-3 py-1.5 rounded-2xl border border-[#E8DCC6] text-xs">
              <Users className="w-3.5 h-3.5 text-[#1A3B34]" />
              <span className="text-neutral-600">Guests:</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="font-bold text-[#1A3B34] bg-transparent focus:outline-hidden cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#F9F7F2] px-3 py-1.5 rounded-2xl border border-[#E8DCC6] text-xs">
              <Calendar className="w-3.5 h-3.5 text-[#1A3B34]" />
              <span className="text-neutral-600">Days:</span>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="font-bold text-[#1A3B34] bg-transparent focus:outline-hidden cursor-pointer"
              >
                {[2, 3, 4, 5, 7, 10, 14].map((num) => (
                  <option key={num} value={num}>
                    {num} Days
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dining Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DINING_BUDGET_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`text-left p-4 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1A3B34] text-white border-[#1A3B34] shadow-md ring-2 ring-[#C59B4B]'
                    : 'bg-[#F9F7F2] text-[#1A3B34] border-[#E8DCC6] hover:border-[#C59B4B]/50'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#C59B4B] text-[#1A3B34]'
                        : 'bg-[#E8DCC6] text-[#1A3B34]'
                    }`}
                  >
                    ~${scenario.dailyCostPerPerson}/day/person
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F6E7A7]" />}
                </div>
                <h4 className="font-serif font-bold text-sm sm:text-base mb-1">
                  {scenario.title}
                </h4>
                <p
                  className={`text-xs font-light line-clamp-2 ${
                    isSelected ? 'text-white/80' : 'text-[#1A3B34]/70'
                  }`}
                >
                  {scenario.styleDescription}
                </p>
              </button>
            );
          })}
        </div>

        {/* Calculated Breakdown Display */}
        <div className="p-5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Daily Meal Breakdown */}
          <div className="space-y-2 flex-1">
            <span className="text-xs uppercase tracking-wider font-bold text-[#C59B4B] block">
              Sample Daily Itinerary & Meal Pricing
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1A3B34]">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-neutral-800">Breakfast:</span>
                  <span className="text-[11px] text-neutral-500">{selectedScenario.breakdown.breakfast.spot}</span>
                </div>
                <span className="font-semibold text-[#8A5A1C] shrink-0 ml-2">
                  ~${selectedScenario.breakdown.breakfast.cost}/person
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-neutral-800">Lunch:</span>
                  <span className="text-[11px] text-neutral-500">{selectedScenario.breakdown.lunch.spot}</span>
                </div>
                <span className="font-semibold text-[#8A5A1C] shrink-0 ml-2">
                  ~${selectedScenario.breakdown.lunch.cost}/person
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-neutral-800">Dinner:</span>
                  <span className="text-[11px] text-neutral-500">{selectedScenario.breakdown.dinner.spot}</span>
                </div>
                <span className="font-semibold text-[#8A5A1C] shrink-0 ml-2">
                  ~${selectedScenario.breakdown.dinner.cost}/person
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC6]/60 flex justify-between items-center">
                <div>
                  <span className="font-bold block text-neutral-800">Snack / Dessert:</span>
                  <span className="text-[11px] text-neutral-500">{selectedScenario.breakdown.treatOrSnack.spot}</span>
                </div>
                <span className="font-semibold text-[#8A5A1C] shrink-0 ml-2">
                  ~${selectedScenario.breakdown.treatOrSnack.cost}/person
                </span>
              </div>
            </div>
          </div>

          {/* Calculated Grand Total Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1A3B34] text-white lg:w-72 shrink-0 flex flex-col justify-center space-y-2 text-center lg:text-left">
            <span className="text-[11px] uppercase tracking-wider text-[#F6E7A7] font-semibold block">
              Estimated Total Meal Budget
            </span>
            <div className="font-serif text-3xl font-extrabold text-white">
              ${totalCalculatedDiningCost.toLocaleString()}
            </div>
            <div className="text-xs text-white/80 space-y-0.5">
              <p>
                ${dailyTotalForParty.toLocaleString()} / day for {guests} {guests === 1 ? 'guest' : 'guests'}
              </p>
              <p className="text-[11px] text-emerald-300 font-medium">
                ~${selectedScenario.dailyCostPerPerson}/day per person
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A3B34] text-white shadow-xs'
                      : 'bg-[#F9F7F2] text-[#1A3B34]/80 border border-[#E8DCC6] hover:bg-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search spots, food, dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-full border border-[#E8DCC6] bg-white text-[#1A3B34] placeholder:text-neutral-400 focus:outline-hidden focus:border-[#C59B4B]"
            />
          </div>
        </div>

        {/* Spot Count Note */}
        <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
          <span>Showing {filteredSpots.length} nearby dining spots</span>
          <span className="text-[11px] text-[#8A5A1C] font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3" /> All within 0–14 min of Waikiki Banyan
          </span>
        </div>
      </div>

      {/* Dining Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="rounded-3xl bg-white border border-[#E8DCC6] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            {/* Image & Badges */}
            <div className="relative h-44 overflow-hidden bg-neutral-100">
              <AppImage
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Walking time badge */}
              <div className="absolute top-3 left-3 bg-[#1A3B34]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#F6E7A7]" />
                <span>{spot.walkingMinutes === 0 ? 'On-Site' : `${spot.walkingMinutes} min walk`}</span>
              </div>

              {/* Price level badge */}
              <div className="absolute top-3 right-3 bg-white/95 text-[#1A3B34] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                <span>{spot.averageCostPerPerson}</span>
              </div>

              {/* Title & Cuisine overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F6E7A7] block">
                  {spot.cuisine}
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-xs">
                  {spot.name}
                </h4>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Distance & Address */}
                <div className="flex items-center gap-1.5 text-xs text-[#8A5A1C] font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{spot.distanceFromBanyan}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#1A3B34]/80 font-light leading-relaxed">
                  {spot.description}
                </p>

                {/* Popular Dishes with Exact Pricing */}
                <div className="pt-2 border-t border-[#E8DCC6]/60 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block">
                    Popular Items & Pricing:
                  </span>
                  <div className="space-y-1">
                    {spot.popularItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-0.5"
                      >
                        <span className="text-neutral-700 truncate pr-2">
                          {item.name}
                        </span>
                        <span className="font-semibold text-[#1A3B34] shrink-0 bg-[#F9F7F2] px-1.5 py-0.5 rounded text-[11px]">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insider Tip Box */}
                <div className="p-2.5 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6] text-[11px] text-[#1A3B34]/85 leading-relaxed flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#C59B4B] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1A3B34] font-semibold">Tip: </strong>
                    {spot.insiderTip}
                  </span>
                </div>
              </div>

              {/* Tag pills */}
              <div className="pt-3 border-t border-[#E8DCC6]/60 flex flex-wrap gap-1">
                {spot.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#F9F7F2] text-[#1A3B34]/70 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
