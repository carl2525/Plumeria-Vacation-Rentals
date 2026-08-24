import React from 'react';
import { MapPin, Mail, Phone, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { PlumeriaLogo } from '../brand/PlumeriaLogo';
import { SITE_CONFIG } from '../../config/site';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <footer className="relative bg-[#0D274D] text-white">
      {/* Signature Logo Rainbow Bar */}
      <div className="h-1.5 w-full rainbow-gradient-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-5">
            <div className="cursor-pointer" onClick={() => onNavigate('/')}>
              <PlumeriaLogo variant="white" compact={false} />
            </div>

            <p className="text-white/80 text-base leading-relaxed max-w-md font-light">
              Experience boutique Hawaiian hospitality at Waikiki Banyan. Ocean breezes, golden sands, and the heart of Waikiki at your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="footer-book-cta"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#186A9E] hover:bg-[#F5B82E] hover:text-[#0D274D] text-white transition-all cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F5B82E] group-hover:text-[#0D274D]" />
                <span>Book Your Stay</span>
              </button>
              <button
                id="footer-explore-cta"
                onClick={() => onNavigate('/waikiki-banyan')}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
              >
                <Compass className="w-3.5 h-3.5 text-[#4BB8C7]" />
                <span>Waikiki Banyan</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#F78D74]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/rentals')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Waikiki Banyan Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/waikiki-banyan')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Waikiki Banyan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/explore')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Waikiki Destination Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Plumeria
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-white/75 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#F78D74]">
              Location & Aloha
            </h3>

            <div className="space-y-3 text-sm text-white/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F78D74] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Waikiki Banyan</p>
                  <p className="text-white/70">201 ʻOhua Avenue</p>
                  <p className="text-white/70">Waikiki, Honolulu, HI 96815</p>
                  <p className="text-xs text-[#4BB8C7] mt-0.5 font-medium">Oʻahu, Hawaiʻi</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-5 h-5 text-[#F5B82E] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-white/85 hover:text-white underline underline-offset-2 transition-colors break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-5 h-5 text-[#4BB8C7] shrink-0" />
                <a
                  href="tel:+18086719191"
                  className="text-white/85 hover:text-white underline underline-offset-2 transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <ShieldCheck className="w-5 h-5 text-[#4BB8C7] shrink-0" />
                <span className="text-xs text-white/75">
                  Direct Verified Host · Contactless Keyless Check-In
                </span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-white/60 leading-relaxed">
                Stay at Waikiki Banyan. Experience Waikiki with Plumeria Vacation Rentals.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Logo 4-Color Dots Indicator & Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50 tracking-widest uppercase">
              © {new Date().getFullYear()} Plumeria Vacation Rentals
            </span>
            <div className="h-3 w-px bg-white/20" />
            <span className="text-[11px] text-white/50 tracking-widest uppercase">
              Waikiki Banyan, Honolulu, HI
            </span>
          </div>

          <div className="flex gap-6 items-center">
            {/* Logo 4 Color Pillars: Coral, Gold, Aqua, Ocean */}
            <div className="flex gap-1.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F78D74]" title="Sunset Coral" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F5B82E]" title="Hawaiian Gold" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#4BB8C7]" title="Ocean Aqua" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#186A9E]" title="Pacific Navy" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
              Aloha Starts Here
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

