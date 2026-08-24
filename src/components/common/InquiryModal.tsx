import React from 'react';
import { X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPropertyId?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedPropertyId,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="inquiry-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0D274D]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="inquiry-modal-card"
        className="relative bg-[#FAF9F5] w-full max-w-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rainbow top line */}
        <div className="h-1.5 w-full rainbow-gradient-bar" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 pb-4 flex items-start justify-between border-b border-[#0D274D]/10 bg-white">
          <div className="flex items-center gap-3">
            <PlumeriaSymbolLogo className="w-10 h-10 shrink-0" />
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#186A9E] block">
                Stay at Waikiki Banyan
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D274D]">
                Plan Your Waikiki Vacation
              </h2>
            </div>
          </div>

          <button
            id="close-inquiry-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#0D274D]/60 hover:text-[#0D274D] hover:bg-[#0D274D]/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location note */}
        <div className="bg-[#EAF7F9] px-6 py-2.5 flex items-center justify-between text-xs text-[#0D274D]/80 border-b border-[#4BB8C7]/20">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>Waikiki Banyan · 1 Block to Kuhio Beach</span>
          </span>
          <span className="flex items-center gap-1 text-[#186A9E] font-medium">
            <Sparkles className="w-3 h-3 text-[#F5B82E]" />
            <span>Direct Host Rates</span>
          </span>
        </div>

        {/* Modal Body with Form */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          <InquiryForm
            preselectedPropertyId={preselectedPropertyId}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
};
