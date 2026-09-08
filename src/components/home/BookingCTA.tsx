import React from 'react';
import { Compass, Mail } from 'lucide-react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { LogoWatermark } from '../brand/LogoWatermark';
import { AppImage } from '../common/AppImage';
import { SITE_CONFIG } from '../../config/site';

interface BookingCTAProps {
  onViewRentals: () => void;
  onSendInquiry: () => void;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({
  onViewRentals,
  onSendInquiry,
}) => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#1A3B34] text-white border-y border-[#C59B4B]/30">
      {/* Background with warm golden hour tones */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80"
          alt="Golden hour sun setting over Waikiki Pacific ocean"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3B34] via-[#1A3B34]/95 to-[#2A5D52]/85" />
      </div>

      {/* Decorative ambient watermarks */}
      <LogoWatermark size="2xl" position="top-right" variant="white" opacity="opacity-[0.06] sm:opacity-[0.09]" />
      <LogoWatermark size="xl" position="bottom-left" variant="white" opacity="opacity-[0.04] sm:opacity-[0.07]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-center border border-[#C59B4B]/40 shadow-lg">
          <PlumeriaSymbolLogo variant="white" className="w-11 h-11" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#F6E7A7]">
            Start Planning Your Island Escape
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Your Waikiki vacation is closer than you think.
          </h2>
          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed">
            Experience why Waikiki Banyan is better than any other vacation rental in Honolulu. Reserve your high-floor Tower 2 suite directly with Plumeria and enjoy 1-acre resort amenities, full kitchens, and $0 resort fees.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="cta-view-rentals-btn"
            onClick={onViewRentals}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] shadow-xl transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#1A3B34]" />
            <span>View Available Rentals</span>
          </button>

          <button
            id="cta-send-inquiry-btn"
            onClick={onSendInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-[#8CA58A]/50 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#F6E7A7]" />
            <span>Send an Inquiry</span>
          </button>
        </div>

        <p className="text-xs text-white/70 pt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>Waikiki Banyan · 201 ʻOhua Ave, Honolulu, HI 96815</span>
          <span className="hidden sm:inline">·</span>
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white underline underline-offset-2">
            {SITE_CONFIG.email}
          </a>
          <span className="hidden sm:inline">·</span>
          <a href="tel:+18086719191" className="hover:text-white underline underline-offset-2 font-medium">
            (808) 671-9191
          </a>
        </p>
      </div>
    </section>
  );
};

