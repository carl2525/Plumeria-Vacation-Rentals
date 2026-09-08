import React from 'react';
import { InquiryForm } from '../components/common/InquiryForm';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { AppImage } from '../components/common/AppImage';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <Mail className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Connect with Plumeria</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A3B34] leading-tight">
            Reserve Waikiki’s Best Vacation Rental
          </h1>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Have questions about our Waikiki Banyan Tower 2 suites, rates, or dates? Connect with us directly to enjoy direct-host pricing, personalized Hawaiian hospitality, and $0 hidden resort fees at Waikiki’s premier condo-resort.
          </p>
        </div>

        {/* Main Grid: Form + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Information & Location Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Contact Card */}
            <div className="bg-white rounded-3xl p-7 border border-[#E8DCC6] shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E8DCC6]/60">
                <PlumeriaSymbolLogo className="w-10 h-10" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#1A3B34]">
                    Plumeria Vacation Rentals
                  </h2>
                  <span className="text-xs text-[#8CA58A] font-medium">At Waikiki Banyan</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#1A3B34]/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E8DCC6]/50 text-[#1A3B34] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#C59B4B]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/60">
                      Direct Host Email
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="font-medium text-[#8CA58A] hover:underline break-all"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E8DCC6]/50 text-[#1A3B34] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#8CA58A]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/60">
                      Direct Host Phone & Text
                    </span>
                    <a
                      href="tel:+18086719191"
                      className="font-medium text-[#8CA58A] hover:underline"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                    <span className="block text-[11px] text-[#1A3B34]/60 mt-0.5">
                      Call or text for inquiries & stay assistance
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F6E7A7]/50 text-[#1A3B34] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#C59B4B]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/60">
                      Physical Location
                    </span>
                    <p className="font-medium text-[#1A3B34]">
                      Waikiki Banyan
                    </p>
                    <p className="text-xs text-[#1A3B34]/70">
                      201 ʻOhua Avenue, Honolulu, HI 96815
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#8CA58A]/20 text-[#1A3B34] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#8CA58A]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/60">
                      Host Response Time
                    </span>
                    <p className="text-xs text-[#1A3B34]/80">
                      Inquiries answered promptly, usually within 2–4 hours (HST).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Highlight Card */}
            <div className="bg-[#F9F7F2] rounded-3xl p-6 border border-[#E8DCC6] space-y-4">
              <h3 className="font-serif text-base font-bold text-[#1A3B34] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59B4B]" />
                <span>Waikiki Banyan Map & Walking Distances</span>
              </h3>

              <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-inner border border-[#E8DCC6] relative bg-[#1A3B34]/10">
                {/* Visual Map Representation */}
                <AppImage
                  src="https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80"
                  alt="Aerial overview of Waikiki Banyan and Kuhio Beach coastline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1A3B34]/40 backdrop-blur-2xs flex items-center justify-center text-white text-center p-4">
                  <div className="space-y-1 bg-[#1A3B34]/85 p-3 rounded-2xl border border-white/20">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
                      <MapPin className="w-4 h-4 text-[#F6E7A7]" />
                      <span>201 ʻOhua Ave · Waikiki Banyan</span>
                    </div>
                    <p className="text-[10px] text-white/80">
                      1 Block (300 ft) to Kuhio Beach
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#1A3B34]/75 font-medium">
                <div className="p-2 rounded-xl bg-white border border-[#E8DCC6]/60">🏖️ Kuhio Beach: 1 Block</div>
                <div className="p-2 rounded-xl bg-white border border-[#E8DCC6]/60">🦁 Honolulu Zoo: 2 Blocks</div>
                <div className="p-2 rounded-xl bg-white border border-[#E8DCC6]/60">🌴 Kapiʻolani Park: 3 Blocks</div>
                <div className="p-2 rounded-xl bg-white border border-[#E8DCC6]/60">🛍️ International Market: 8 min</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DCC6] shadow-xs">
              <InquiryForm title="Send a Reservation Inquiry" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
