import React, { useState } from 'react';
import { Calendar, Users, Search, MapPin } from 'lucide-react';
import { getTodayDateString, getNextDayDateString, isDateInPast } from '../../utils/date';

interface QuickSearchBarProps {
  onSearch: (params: { checkIn: string; checkOut: string; guests: number }) => void;
}

export const QuickSearchBar: React.FC<QuickSearchBarProps> = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const todayStr = getTodayDateString();
  const minCheckOutStr = checkIn ? getNextDayDateString(checkIn, 1) : getNextDayDateString(todayStr, 1);

  const handleCheckInChange = (newDate: string) => {
    // Prevent selecting a past date
    if (newDate && isDateInPast(newDate)) {
      setCheckIn(todayStr);
      if (checkOut && checkOut <= todayStr) {
        setCheckOut(getNextDayDateString(todayStr, 1));
      }
      return;
    }

    setCheckIn(newDate);

    // If checkOut is already chosen and is on or before the new checkIn, update checkOut
    if (newDate && checkOut && checkOut <= newDate) {
      setCheckOut(getNextDayDateString(newDate, 1));
    }
  };

  const handleCheckOutChange = (newDate: string) => {
    // If selected checkOut is before minCheckOutStr, enforce min
    if (newDate && newDate < minCheckOutStr) {
      setCheckOut(minCheckOutStr);
      return;
    }
    setCheckOut(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeCheckIn = checkIn && !isDateInPast(checkIn) ? checkIn : '';
    const safeCheckOut = checkOut && (!safeCheckIn || checkOut > safeCheckIn) ? checkOut : '';
    onSearch({ checkIn: safeCheckIn, checkOut: safeCheckOut, guests });
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-8 sm:mb-12">
      <form
        onSubmit={handleSubmit}
        id="quick-booking-search-form"
        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-5 border border-[#E8DCC6] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-stretch"
      >
        {/* 1. Location (Fixed at Waikiki Banyan) - Warm Gold */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C59B4B]/20 text-[#C59B4B] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#C59B4B]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase font-bold text-[#C59B4B] tracking-widest leading-none mb-1">
              Location
            </span>
            <span className="block text-sm font-semibold text-[#1A3B34] truncate">
              Waikiki Banyan
            </span>
          </div>
        </div>

        {/* 2. Check In - Plumeria Cream / Warm Gold */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F6E7A7]/50 text-[#C59B4B] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#C59B4B]" />
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="search-checkin"
              className="block text-[10px] uppercase font-bold text-[#C59B4B] tracking-widest leading-none mb-1 cursor-pointer"
            >
              Check In
            </label>
            <input
              type="date"
              id="search-checkin"
              min={todayStr}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold text-[#1A3B34] bg-transparent focus:outline-none cursor-pointer p-0 m-0"
            />
          </div>
        </div>

        {/* 3. Check Out - Ocean Blue */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7FB6D9]/25 text-[#1A3B34] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#1A3B34]" />
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="search-checkout"
              className="block text-[10px] uppercase font-bold text-[#1A3B34] tracking-widest leading-none mb-1 cursor-pointer"
            >
              Check Out
            </label>
            <input
              type="date"
              id="search-checkout"
              min={minCheckOutStr}
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold text-[#1A3B34] bg-transparent focus:outline-none cursor-pointer p-0 m-0"
            />
          </div>
        </div>

        {/* 4. Guests - Sage Green */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8CA58A]/25 text-[#1A3B34] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#8CA58A]" />
          </div>
          <div className="min-w-0 flex-1">
            <label
              htmlFor="search-guests"
              className="block text-[10px] uppercase font-bold text-[#1A3B34] tracking-widest leading-none mb-1 cursor-pointer"
            >
              Guests
            </label>
            <select
              id="search-guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-xs sm:text-sm font-semibold text-[#1A3B34] bg-transparent focus:outline-none cursor-pointer p-0 m-0"
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
            className="w-full h-full min-h-[50px] sm:min-h-[54px] px-6 rounded-2xl bg-[#1A3B34] hover:bg-[#2A5D52] text-white flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all duration-200 cursor-pointer border border-[#C59B4B]/30"
          >
            <Search className="w-4 h-4 text-[#F6E7A7] shrink-0" />
            <span className="whitespace-nowrap">Inquire Dates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
