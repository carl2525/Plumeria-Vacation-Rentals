import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import { PlumeriaLogo } from '../brand/PlumeriaLogo';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPath === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'glass-header shadow-xs border-b border-[#EAF7F9] py-0'
            : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-2 sm:py-3'
        }`}
      >
        {/* Top Logo Rainbow Stripe */}
        {(scrolled || !isHome) && (
          <div className="h-1 w-full rainbow-gradient-bar" />
        )}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between ${scrolled || !isHome ? 'py-3' : 'py-2'}`}>
          {/* Logo Brand Link */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
            aria-label="Plumeria Vacation Rentals Home"
          >
            {/* Desktop Full Logo */}
            <div className="hidden sm:block">
              <PlumeriaLogo
                variant={scrolled || !isHome ? 'dark' : 'white'}
                compact={false}
              />
            </div>
            {/* Mobile Compact Logo */}
            <div className="sm:hidden">
              <PlumeriaLogo
                variant={scrolled || !isHome ? 'dark' : 'white'}
                compact={true}
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {SITE_CONFIG.navItems.map((item) => {
              const isActive = currentPath === item.href;
              const linkClass =
                scrolled || !isHome
                  ? isActive
                    ? 'text-[#0D274D] font-bold border-b-2 border-[#F5B82E] pb-1'
                    : 'text-[#0D274D]/75 hover:text-[#186A9E] transition-colors pb-1'
                  : isActive
                  ? 'text-white font-bold border-b-2 border-[#F5B82E] pb-1'
                  : 'text-white/85 hover:text-white transition-colors pb-1';

              return (
                <button
                  key={item.href}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-1.5 text-[13px] font-medium uppercase tracking-wider cursor-pointer ${linkClass}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Book Your Stay CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-book-stay-cta"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-[#0D274D] hover:bg-[#186A9E] text-white"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-quick-book-btn"
              onClick={() => onOpenInquiry()}
              className={`p-2 rounded-full text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 transition-colors cursor-pointer ${
                scrolled || !isHome
                  ? 'bg-[#186A9E] text-white shadow-xs'
                  : 'bg-white/90 text-[#0D274D]'
              }`}
            >
              Book
            </button>
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                scrolled || !isHome
                  ? 'text-[#0D274D] hover:bg-[#EAF7F9]'
                  : 'text-white hover:bg-white/20'
              }`}
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
          className="fixed inset-0 z-40 bg-[#0D274D]/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-nav-panel"
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#FAF9F5] shadow-2xl flex flex-col justify-between p-6 pt-16 overflow-y-auto border-l border-[#EAF7F9]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header section in drawer with Rainbow bar */}
            <div>
              <div className="h-1 -mx-6 -mt-16 mb-6 rainbow-gradient-bar" />
              <div className="pb-4 mb-4 border-b border-[#EAF7F9] flex items-center justify-between">
                <PlumeriaLogo compact={true} />
                <button
                  id="mobile-close-inner-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#0D274D]/70 hover:text-[#0D274D] cursor-pointer"
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
                          ? 'bg-[#EAF7F9] text-[#186A9E]'
                          : 'text-[#0D274D] hover:bg-[#EAF7F9]/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#186A9E]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Brand Note */}
            <div className="pt-6 border-t border-[#EAF7F9] space-y-4">
              <button
                id="mobile-drawer-book-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0D274D] hover:bg-[#186A9E] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#F5B82E]" />
                <span>Book Your Stay</span>
              </button>

              <div className="text-xs text-[#0D274D]/70 space-y-1.5 pt-2">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F78D74] shrink-0" />
                  <span>Waikiki Banyan, 201 ʻOhua Ave, Honolulu</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#186A9E] shrink-0" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="truncate hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#186A9E] shrink-0" />
                  <a href="tel:+18086719191" className="font-semibold text-[#186A9E] hover:underline">
                    {SITE_CONFIG.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

