import React, { useState, useEffect } from 'react';
import { X, Sparkles, ExternalLink, Calendar, Mail } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { SITE_CONFIG, HOSPITABLE_CONFIG } from '../../config/site';
import { HospitableBookingWidget } from '../booking/HospitableBookingWidget';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPropertyId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedPropertyId,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}) => {
  const [activeTab, setActiveTab] = useState<'hospitable' | 'inquiry'>('hospitable');

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="inquiry-modal-overlay"
      className="fixed inset-0 z-[70] overflow-y-auto bg-[#1A3B34]/75 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-5 md:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div
        id="inquiry-modal-card"
        className={`relative bg-[#F9F7F2] w-full ${
          activeTab === 'hospitable' ? 'max-w-3xl' : 'max-w-xl'
        } max-h-[90dvh] flex flex-col rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border border-[#E8DCC6] overflow-hidden my-auto animate-modal-pop transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rainbow top line */}
        <div className="h-1.5 w-full rainbow-gradient-bar shrink-0" />

        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-7 sm:py-4 flex items-center justify-between border-b border-[#E8DCC6] bg-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <PlumeriaSymbolLogo className="w-9 h-9 sm:w-11 sm:h-11 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 flex-wrap">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase text-[#8CA58A] truncate">
                  Waikiki Banyan
                </span>
                <a
                  href={SITE_CONFIG.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-bold uppercase bg-[#FF385C] hover:bg-[#E00B41] text-white whitespace-nowrap inline-flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                  title="View listings on Airbnb"
                >
                  <span>Airbnb Listed</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <h2
                id="inquiry-modal-title"
                className="font-serif text-lg sm:text-2xl font-bold text-[#1A3B34] truncate"
              >
                {activeTab === 'hospitable'
                  ? 'Direct Booking (Hospitable)'
                  : 'Direct Host Inquiry'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <a
              id="modal-airbnb-redirect-btn"
              href={SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF385C] hover:bg-[#E00B41] text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
            >
              <span>Book on Airbnb</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              id="close-inquiry-modal-btn"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full text-[#1A3B34]/60 hover:text-[#1A3B34] hover:bg-[#1A3B34]/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher: Hospitable Direct Booking vs Inquiry Form */}
        <div className="bg-[#1A3B34] text-white px-4 sm:px-6 py-2 flex items-center justify-between border-b border-[#C59B4B]/30 shrink-0 gap-2">
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('hospitable')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'hospitable'
                  ? 'bg-[#C59B4B] text-[#1A3B34] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Direct Booking (Hospitable)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inquiry'
                  ? 'bg-[#C59B4B] text-[#1A3B34] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Host Inquiry &amp; Custom Dates</span>
            </button>
          </div>

          <span className="hidden sm:flex items-center gap-1 text-[#F6E7A7] text-[11px] font-medium shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E7A7]" />
            <span>$0 Resort Fees · Free Covered Parking</span>
          </span>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="p-3 sm:p-5 md:p-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          {activeTab === 'hospitable' ? (
            <div className="space-y-4">
              <HospitableBookingWidget onSuccess={onClose} />
            </div>
          ) : (
            <InquiryForm
              initialPropertyId={preselectedPropertyId}
              initialCheckIn={initialCheckIn}
              initialCheckOut={initialCheckOut}
              initialGuests={initialGuests}
              onSuccess={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};
