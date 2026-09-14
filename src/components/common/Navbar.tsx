import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Mail, Phone, ChevronRight, Youtube, Instagram, Facebook, Video } from 'lucide-react';
import { PlumeriaLogo } from '../brand/PlumeriaLogo';
import { SITE_CONFIG } from '../../config/site';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-[#C59B4B]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-[#8CA58A]" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-[#7FB6D9]" />;
      case 'tiktok':
      default:
        return <Video className="w-4 h-4 text-[#1A3B34]" />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent background shifting
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#E8DCC6] transition-all duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        {/* Direct Website Booking 15% Discount Announcement Bar */}
        <div className="bg-[#1A3B34] text-[#F9F7F2] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center border-b border-[#C59B4B]/30 flex items-center justify-center gap-1.5 sm:gap-2">
          <span className="px-1.5 py-0.5 rounded bg-[#C59B4B] text-[#1A3B34] font-black text-[9px] uppercase tracking-wider shrink-0">
            15% OFF
          </span>
          <span className="sm:hidden text-[11px] font-medium truncate">
            Direct Inquiries: Save 15% + $0 Resort Fees
          </span>
          <span className="hidden sm:inline">
            Inquire & receive 15% discount on accepted bookings directly on our website!
          </span>
          <button
            onClick={() => onOpenInquiry()}
            className="underline text-[#F6E7A7] font-semibold hover:text-white cursor-pointer ml-1 text-[11px] sm:text-xs shrink-0 whitespace-nowrap"
          >
            Claim Offer
          </button>
        </div>

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 ${
          scrolled ? 'py-2 sm:py-2.5' : 'py-2.5 sm:py-3'
        }`}>
          {/* Logo Brand Link */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center text-left focus:outline-none group cursor-pointer shrink-0"
            aria-label="Plumeria Vacation Rentals Home"
          >
            {/* Desktop Logo */}
            <div className="hidden sm:block">
              <PlumeriaLogo
                variant="dark"
                compact={false}
              />
            </div>
            {/* Mobile Logo */}
            <div className="sm:hidden">
              <PlumeriaLogo
                variant="dark"
                compact={true}
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 shrink-0">
            {SITE_CONFIG.navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <button
                  key={item.href}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-2.5 xl:px-3.5 py-1.5 text-[11.5px] xl:text-[12.5px] font-semibold uppercase tracking-wider cursor-pointer rounded-full transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E8DCC6] text-[#1A3B34] font-bold shadow-2xs'
                      : 'text-[#1A3B34]/80 hover:text-[#1A3B34] hover:bg-[#E8DCC6]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Inquire / Book CTA (Desktop only to prevent duplicate on tablet) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              id="nav-airbnb-link-btn"
              href={SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-[#FF385C] hover:bg-[#E00B41] text-white whitespace-nowrap"
            >
              <span>Airbnb</span>
            </a>
            <button
              id="nav-book-stay-cta"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-[#1A3B34] hover:bg-[#224D44] text-white border border-[#C59B4B]/30 hover:border-[#C59B4B]/60 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F6E7A7]" />
              <span>Inquire & Save 15%</span>
            </button>
          </div>

          {/* Mobile & Tablet Actions (shown only when desktop nav is hidden) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              id="mobile-quick-book-btn"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-1 rounded-full text-xs font-bold uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer bg-[#1A3B34] text-white shadow-xs"
            >
              <span className="text-[10px] font-black text-[#F6E7A7] bg-white/20 px-1 py-0.2 rounded">15%</span>
              <span>Inquire</span>
            </button>
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl transition-colors cursor-pointer text-[#1A3B34] hover:bg-[#E8DCC6]/50"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Slide-Down Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-40 bg-[#1A3B34]/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-nav-panel"
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#F9F7F2] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-l border-[#E8DCC6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header section in drawer */}
            <div>
              <div className="pb-4 mb-4 border-b border-[#E8DCC6] flex items-center justify-between">
                <PlumeriaLogo compact={true} variant="dark" />
                <button
                  id="mobile-close-inner-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#1A3B34]/70 hover:text-[#1A3B34] cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {SITE_CONFIG.navItems.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <button
                      key={item.href}
                      id={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold uppercase tracking-wider transition-colors text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#E8DCC6] text-[#1A3B34] font-bold'
                          : 'text-[#1A3B34] hover:bg-[#E8DCC6]/30'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#8CA58A]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Brand Note */}
            <div className="pt-6 border-t border-[#E8DCC6] space-y-3">
              <a
                id="mobile-drawer-airbnb-cta"
                href={SITE_CONFIG.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF385C] hover:bg-[#E00B41] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <span>Book / View on Airbnb</span>
              </a>

              <button
                id="mobile-drawer-book-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#1A3B34] hover:bg-[#224D44] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer border border-[#C59B4B]/30"
              >
                <Calendar className="w-4 h-4 text-[#F6E7A7]" />
                <span>Inquire & Save 15%</span>
              </button>
              <p className="text-[11px] text-center text-[#1A3B34]/70 font-medium">
                15% discount on accepted website inquiries · $0 resort fees
              </p>

              <div className="text-xs text-[#1A3B34]/75 space-y-1.5 pt-2">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
                  <span>Waikiki Banyan, 201 ʻOhua Ave, Honolulu</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="truncate hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
                  <a href="tel:+18086719191" className="font-semibold text-[#1A3B34] hover:underline">
                    {SITE_CONFIG.phone}
                  </a>
                </p>
              </div>

              {/* Mobile Drawer Social Links */}
              <div className="pt-3 border-t border-[#E8DCC6]/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B4B] block mb-2">
                  Follow Our Channels
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {SITE_CONFIG.socials.map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#E8DCC6]/30 hover:bg-[#E8DCC6]/60 text-xs font-semibold text-[#1A3B34] flex items-center gap-1.5 transition-colors"
                    >
                      {getSocialIcon(soc.platform)}
                      <span className="truncate">{soc.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
