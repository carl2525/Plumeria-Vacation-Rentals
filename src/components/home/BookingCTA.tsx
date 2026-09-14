import React from 'react';
import { Compass, Mail, ExternalLink } from 'lucide-react';
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
          src="/images/banyan/banyan-amenity-01.webp"
          alt="Diamond Head and Waikiki skyline vista from Waikiki Banyan"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3B34] via-[#1A3B34]/95 to-[#2A5D52]/85" />
      </div>

      {/* Decorative ambient watermarks */}
      <LogoWatermark size="2xl" position="top-right" variant="white" opacity="opacity-[0.06] sm:opacity-[0.09]" />
      <LogoWatermark size="xl" position="bottom-left" variant="white" opacity="opacity-[0.04] sm:opacity-[0.07]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center justify-center border border-[#C59B4B]/40 shadow-lg">
          <PlumeriaSymbolLogo variant="white" className="w-14 h-14" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#F6E7A7]">
            Listed on Airbnb · Direct Inquiries Welcome
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Your Waikiki vacation is closer than you think.
          </h2>
          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed">
            Our suites are primarily listed on Airbnb, with direct inquiries welcomed right here. Experience why Waikiki Banyan condo rentals are better than any other vacation rental in Honolulu—enjoy spacious 1-bedroom suites with 1-acre resort deck amenities, full chef kitchens, <strong className="text-[#F6E7A7] font-semibold">15% discount on direct website bookings</strong> upon host acceptance ($255/nt vs $300/nt), and $0 mandatory resort fees.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="cta-view-rentals-btn"
            onClick={onViewRentals}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B4B] hover:bg-[#D4A853] text-[#1A3B34] shadow-xl transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#1A3B34]" />
            <span>Browse All Suites</span>
          </button>

          <a
            id="cta-airbnb-link-btn"
            href={SITE_CONFIG.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF385C] hover:bg-[#E00B41] text-white shadow-xl transition-all cursor-pointer"
          >
            <span>Book on Airbnb</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            id="cta-send-inquiry-btn"
            onClick={onSendInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-[#8CA58A]/50 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#F6E7A7]" />
            <span>Inquire & Save 15%</span>
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

