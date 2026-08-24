import React from 'react';
import { InquiryForm } from '../components/common/InquiryForm';
import { Mail, MapPin, Clock, Phone, Sparkles, Building2, ShieldCheck, Waves } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { AppImage } from '../components/common/AppImage';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#4BB8C7]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <Mail className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>Connect with Plumeria</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0D274D] leading-tight">
            Plan Your Waikiki Stay
          </h1>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Have questions about Waikiki Banyan suites, group bookings, or seasonal availability? Send us a direct inquiry and our team will get back to you with personalized assistance.
          </p>
        </div>

        {/* Main Grid: Form + Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Information & Location Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Contact Card */}
            <div className="bg-white rounded-3xl p-7 border border-[#0D274D]/8 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#0D274D]/5">
                <PlumeriaSymbolLogo className="w-10 h-10" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#0D274D]">
                    Plumeria Vacation Rentals
                  </h2>
                  <span className="text-xs text-[#186A9E]">At Waikiki Banyan</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#0D274D]/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF7F9] text-[#186A9E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0D274D]/60">
                      Direct Host Email
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="font-medium text-[#186A9E] hover:underline break-all"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF7F9] text-[#186A9E] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#186A9E]" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0D274D]/60">
                      Direct Host Phone & Text
                    </span>
                    <a
                      href="tel:+18086719191"
                      className="font-medium text-[#186A9E] hover:underline"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                    <span className="block text-[11px] text-[#0D274D]/60 mt-0.5">
                      Call or text for inquiries & stay assistance
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF3D6] text-[#E59900] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0D274D]/60">
                      Physical Location
                    </span>
                    <p className="font-medium text-[#0D274D]">
                      Waikiki Banyan
                    </p>
                    <p className="text-xs text-[#0D274D]/70">
                      201 ʻOhua Avenue, Honolulu, HI 96815
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FCE8E6] text-[#F78D74] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#0D274D]/60">
                      Host Response Time
                    </span>
                    <p className="text-xs text-[#0D274D]/80">
                      Inquiries answered promptly, usually within 2–4 hours (HST).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Highlight Card */}
            <div className="bg-[#FAF9F5] rounded-3xl p-6 border border-[#0D274D]/8 space-y-4">
              <h3 className="font-serif text-base font-bold text-[#0D274D] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F78D74]" />
                <span>Waikiki Banyan Map & Walking Distances</span>
              </h3>

              <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-inner border border-[#0D274D]/10 relative bg-[#0D274D]/10">
                {/* Visual Map Representation */}
                <AppImage
                  src="https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80"
                  alt="Aerial overview of Waikiki Banyan and Kuhio Beach coastline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0D274D]/40 backdrop-blur-2xs flex items-center justify-center text-white text-center p-4">
                  <div className="space-y-1 bg-[#0D274D]/80 p-3 rounded-2xl border border-white/20">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
                      <MapPin className="w-4 h-4 text-[#F5B82E]" />
                      <span>201 ʻOhua Ave · Waikiki Banyan</span>
                    </div>
                    <p className="text-[10px] text-white/80">
                      1 Block (300 ft) to Kuhio Beach
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#0D274D]/75 font-medium">
                <div className="p-2 rounded-xl bg-white border border-[#0D274D]/5">🏖️ Kuhio Beach: 1 Block</div>
                <div className="p-2 rounded-xl bg-white border border-[#0D274D]/5">🦁 Honolulu Zoo: 2 Blocks</div>
                <div className="p-2 rounded-xl bg-white border border-[#0D274D]/5">🌴 Kapiʻolani Park: 3 Blocks</div>
                <div className="p-2 rounded-xl bg-white border border-[#0D274D]/5">🛍️ International Market: 8 min</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#0D274D]/8 shadow-sm">
              <InquiryForm title="Send a Reservation Inquiry" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
