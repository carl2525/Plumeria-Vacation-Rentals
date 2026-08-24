import React, { useState } from 'react';
import { Calendar, Users, Search, MapPin } from 'lucide-react';

interface QuickSearchBarProps {
  onSearch: (params: { checkIn: string; checkOut: string; guests: number }) => void;
}

export const QuickSearchBar: React.FC<QuickSearchBarProps> = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests });
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-8 sm:mb-12">
      <form
        onSubmit={handleSubmit}
        id="quick-booking-search-form"
        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-5 border border-[#EAF7F9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch"
      >
        {/* 1. Location (Fixed at Waikiki Banyan) - Sunset Coral */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAF7F9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F78D74]/15 text-[#F78D74] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#F78D74]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase font-bold text-[#F78D74] tracking-widest leading-none mb-1">
              Location
            </span>
            <span className="block text-sm font-semibold text-[#0D274D] truncate">
              Waikiki Banyan
            </span>
          </div>
        </div>

        {/* 2. Check In - Hawaiian Gold */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAF7F9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5B82E]/20 text-[#0D274D] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#E59900]" />
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="search-checkin"
              className="block text-[10px] uppercase font-bold text-[#D9822B] tracking-widest leading-none mb-1 cursor-pointer"
            >
              Check In
            </label>
            <input
              type="date"
              id="search-checkin"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold text-[#0D274D] bg-transparent focus:outline-none cursor-pointer p-0 m-0"
            />
          </div>
        </div>

        {/* 3. Check Out - Ocean Aqua */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAF7F9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4BB8C7]/20 text-[#186A9E] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#186A9E]" />
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="search-checkout"
              className="block text-[10px] uppercase font-bold text-[#186A9E] tracking-widest leading-none mb-1 cursor-pointer"
            >
              Check Out
            </label>
            <input
              type="date"
              id="search-checkout"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold text-[#0D274D] bg-transparent focus:outline-none cursor-pointer p-0 m-0"
            />
          </div>
        </div>

        {/* 4. Guests - Pacific Navy */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EAF7F9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#186A9E]/15 text-[#186A9E] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#186A9E]" />
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="search-guests"
              className="block text-[10px] uppercase font-bold text-[#186A9E] tracking-widest leading-none mb-1 cursor-pointer"
            >
              Guests
            </label>
            <select
              id="search-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-xs sm:text-sm font-semibold text-[#0D274D] bg-transparent focus:outline-none cursor-pointer p-0 m-0"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5 Guests</option>
              <option value={6}>6 Guests</option>
            </select>
          </div>
        </div>

        {/* 5. Submit Button - Spans full width on mobile/tablet, 1 col on desktop */}
        <div className="sm:col-span-2 lg:col-span-1 flex items-center">
          <button
            type="submit"
            id="search-find-stay-btn"
            className="w-full h-full min-h-[50px] sm:min-h-[54px] px-6 rounded-2xl bg-[#186A9E] hover:bg-[#0D274D] text-white flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#186A9E]/25 transition-all duration-200 cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#F5B82E] shrink-0" />
            <span className="whitespace-nowrap">Find Your Stay</span>
          </button>
        </div>
      </form>
    </div>
  );
};
