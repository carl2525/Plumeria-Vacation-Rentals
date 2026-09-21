import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';

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
        className="relative bg-[#F9F7F2] w-full max-w-xl max-h-[86dvh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border border-[#E8DCC6] overflow-hidden my-auto animate-modal-pop"
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
                <span className="px-1.5 py-0.2 rounded-full text-[8.5px] sm:text-[9px] font-bold uppercase bg-[#FF385C]/10 text-[#FF385C] border border-[#FF385C]/20 whitespace-nowrap">
                  Airbnb Listed
                </span>
              </div>
              <h2
                id="inquiry-modal-title"
                className="font-serif text-lg sm:text-2xl font-bold text-[#1A3B34] truncate"
              >
                Booking Inquiry
              </h2>
            </div>
          </div>

          <button
            id="close-inquiry-modal-btn"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full text-[#1A3B34]/60 hover:text-[#1A3B34] hover:bg-[#1A3B34]/10 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Rate & Licensed STR Bar */}
        <div className="bg-[#1A3B34] text-white px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between text-xs border-b border-[#C59B4B]/30 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="px-1.5 py-0.5 rounded bg-[#C59B4B] text-[#1A3B34] text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider shrink-0">
              $199 / NT PROMO
            </span>
            <span className="font-semibold text-white text-[11px] sm:text-xs truncate">
              Special Promo Rate · All Units
            </span>
          </div>
          <span className="flex items-center gap-1 text-[#F6E7A7] text-[10px] sm:text-[11px] font-medium shrink-0 ml-2">
            <Sparkles className="w-3 h-3 text-[#F6E7A7]" />
            <span>$0 Resort Fees · Free Parking</span>
          </span>
        </div>

        {/* Modal Body with Scrollable Form */}
        <div className="p-4 sm:p-6 md:p-7 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <InquiryForm
            initialPropertyId={preselectedPropertyId}
            initialCheckIn={initialCheckIn}
            initialCheckOut={initialCheckOut}
            initialGuests={initialGuests}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
};
