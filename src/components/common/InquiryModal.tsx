import React from 'react';
import { X, MapPin, Sparkles } from 'lucide-react';
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
  if (!isOpen) return null;

  return (
    <div
      id="inquiry-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3B34]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="inquiry-modal-card"
        className="relative bg-[#F9F7F2] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E8DCC6] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rainbow top line */}
        <div className="h-1.5 w-full rainbow-gradient-bar" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 pb-4 flex items-start justify-between border-b border-[#E8DCC6] bg-white">
          <div className="flex items-center gap-3">
            <PlumeriaSymbolLogo className="w-10 h-10 shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8CA58A]">
                  Stay at Waikiki Banyan
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#FF385C]/10 text-[#FF385C] border border-[#FF385C]/20">
                  Airbnb Listed
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
                Booking Inquiry
              </h2>
            </div>
          </div>

          <button
            id="close-inquiry-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#1A3B34]/60 hover:text-[#1A3B34] hover:bg-[#1A3B34]/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location note */}
        <div className="bg-[#E8DCC6]/40 px-6 py-2.5 flex items-center justify-between text-xs text-[#1A3B34] border-b border-[#C59B4B]/20">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Waikiki Banyan · 1 Block to Kuhio Beach</span>
          </span>
          <span className="flex items-center gap-1 text-[#1A3B34] font-medium">
            <Sparkles className="w-3 h-3 text-[#C59B4B]" />
            <span>Direct Inquiry · $0 Resort Fees</span>
          </span>
        </div>

        {/* Modal Body with Form */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
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
