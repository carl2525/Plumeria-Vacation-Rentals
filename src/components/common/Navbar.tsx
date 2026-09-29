import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ChevronDown,
  Building2,
  Sparkles,
  Waves,
  Car,
  Compass,
  ShieldCheck,
  FileText,
  HelpCircle,
  Youtube,
  Instagram,
  Facebook,
  Video,
} from 'lucide-react';
import { PlumeriaLogo } from '../brand/PlumeriaLogo';
import { SITE_CONFIG } from '../../config/site';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

interface NavSubItem {
  id: string;
  label: string;
  href: string;
  description: string;
  badge?: string;
  badgeVariant?: 'default' | 'danger' | 'success';
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  id: string;
  label: string;
  href?: string;
  items?: NavSubItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'suites',
    label: 'Rental Units',
    href: '/rentals',
    items: [
      {
        id: 'all-suites',
        label: 'All Waikiki Banyan Suites',
        href: '/rentals',
        description: 'Compare all 1-bedroom Tower 2 suites',
        badge: 'All Units',
        badgeVariant: 'default',
        icon: Building2,
      },
      {
        id: 'suite-3609',
        label: 'Penthouse Suite #3609',
        href: '/rentals/waikiki-banyan-3609-t2',
        description: 'Floor 36 · Not available as of the moment',
        badge: 'Not Available',
        badgeVariant: 'danger',
        icon: Sparkles,
      },
      {
        id: 'suite-3205',
        label: 'High-Floor Suite #3205',
        href: '/rentals/waikiki-banyan-3205-t2',
        description: 'Floor 32 · Ocean, beach & mountain views',
        badge: 'Available',
        badgeVariant: 'success',
        icon: Sparkles,
      },
    ],
  },
  {
    id: 'resort',
    label: 'Waikiki Banyan',
    href: '/waikiki-banyan',
    items: [
      {
        id: 'banyan-amenities',
        label: 'Waikiki Banyan Amenities',
        href: '/waikiki-banyan',
        description: '1-acre recreation deck, heated pool & 2 spas',
        icon: Waves,
      },
      {
        id: 'parking-guide',
        label: 'Guest Parking Guide',
        href: '/parking',
        description: 'Free garage pass, directions & photo guide',
        badge: 'Free Parking',
        badgeVariant: 'default',
        icon: Car,
      },
      {
        id: 'explore-waikiki',
        label: 'Explore Waikiki',
        href: '/explore',
        description: 'Walk to Kuhio Beach, dining & attractions',
        icon: Compass,
      },
    ],
  },
  {
    id: 'guide',
    label: 'Guest Guide',
    href: '/rules',
    items: [
      {
        id: 'house-rules',
        label: 'House Rules & Quiet Hours',
        href: '/rules',
        description: 'Building guidelines, check-in & deck hours',
        icon: ShieldCheck,
      },
      {
        id: 'rental-policy',
        label: 'Direct Rental Policy',
        href: '/rental-policy',
        description: 'Transparent formula: Tax + Base + Clean fee',
        badge: '$0 Fees',
        badgeVariant: 'default',
        icon: FileText,
      },
      {
        id: 'faqs',
        label: 'Frequently Asked Questions',
        href: '/faq',
        description: 'Answers to booking, amenity & stay questions',
        icon: HelpCircle,
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileGroups, setExpandedMobileGroups] = useState<Record<string, boolean>>({
    suites: true,
    resort: false,
    guide: false,
  });

  const desktopNavRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownEnter = (groupId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(groupId);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleParentButtonClick = (group: NavGroup) => {
    if (!group.items) {
      if (group.href) handleNavClick(group.href);
      return;
    }
    setOpenDropdown((prev) => (prev === group.id ? null : group.id));
  };

  const toggleMobileGroup = (groupId: string) => {
    setExpandedMobileGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const isSubItemActive = (href: string) => {
    if (href === '/') return currentPath === '/' || currentPath === '';
    return currentPath === href || currentPath.startsWith(href + '/') || currentPath.startsWith(href + '#') || currentPath.startsWith(href + '?');
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.href && isSubItemActive(group.href)) return true;
    if (group.items) {
      return group.items.some((item) => isSubItemActive(item.href));
    }
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#E8DCC6] transition-all duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        {/* Direct Website Booking Transparent Pricing Announcement Bar with Prominent Call Now CTA */}
        <div className="bg-[#1A3B34] text-[#F9F7F2] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-[#C59B4B]/30 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="px-1.5 py-0.5 rounded bg-[#C59B4B] text-[#1A3B34] font-black text-[9px] uppercase tracking-wider shrink-0">
            PROMOTION
          </span>
          <span className="hidden md:inline font-medium">
            Direct Inquiries: $199*/night promo rate in all units (Valid until Oct 30) · $0 Resort fees · Free covered garage parking pass!
          </span>
          <span className="md:hidden text-[11px] font-medium truncate max-w-[210px] xs:max-w-none">
            $199* Promo (Until Oct 30) · Free Parking
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenInquiry()}
              className="underline text-[#F6E7A7] font-semibold hover:text-white cursor-pointer text-[11px] sm:text-xs whitespace-nowrap"
            >
              Inquire Now
            </button>
            <span className="text-white/40">|</span>
            <a
              id="topbar-call-now-btn"
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C59B4B] hover:bg-[#d6a953] text-[#1A3B34] font-bold text-[10.5px] sm:text-xs transition-colors shadow-2xs whitespace-nowrap"
              title={`Call host directly: ${SITE_CONFIG.phone}`}
            >
              <Phone className="w-3 h-3 text-[#1A3B34]" />
              <span>Call Now: {SITE_CONFIG.phone}</span>
            </a>
          </div>
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

          {/* Desktop Navigation Links with Menu-Submenu Architecture */}
          <nav
            ref={desktopNavRef}
            className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0"
            aria-label="Main Navigation"
          >
            {NAV_GROUPS.map((group) => {
              const hasSubmenu = Boolean(group.items && group.items.length > 0);
              const isActive = isGroupActive(group);
              const isOpen = openDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && handleDropdownEnter(group.id)}
                  onMouseLeave={() => hasSubmenu && handleDropdownLeave()}
                >
                  <button
                    id={`nav-link-${group.id}`}
                    type="button"
                    onClick={() => handleParentButtonClick(group)}
                    aria-expanded={hasSubmenu ? isOpen : undefined}
                    aria-haspopup={hasSubmenu ? 'true' : undefined}
                    className={`inline-flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-bold uppercase tracking-wider cursor-pointer rounded-full transition-all duration-150 whitespace-nowrap ${
                      isActive || isOpen
                        ? 'bg-[#E8DCC6] text-[#1A3B34] shadow-2xs'
                        : 'text-[#1A3B34]/80 hover:text-[#1A3B34] hover:bg-[#E8DCC6]/50'
                    }`}
                  >
                    <span>{group.label}</span>
                    {hasSubmenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#C59B4B]' : 'text-[#1A3B34]/60'
                        }`}
                      />
                    )}
                  </button>

                  {/* Desktop Dropdown Submenu */}
                  {hasSubmenu && (
                    <div
                      className={`absolute left-0 top-full pt-2 w-72 xl:w-80 transition-all duration-200 z-50 ${
                        isOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 translate-y-1.5 pointer-events-none invisible'
                      }`}
                      onMouseEnter={() => handleDropdownEnter(group.id)}
                      onMouseLeave={() => handleDropdownLeave()}
                    >
                      <div className="bg-white/98 backdrop-blur-md rounded-2xl border border-[#E8DCC6] shadow-xl p-2 space-y-1 ring-1 ring-black/5 animate-fade-in">
                        {group.items?.map((sub) => {
                          const IconComponent = sub.icon;
                          const isSubActive = isSubItemActive(sub.href);

                          return (
                            <button
                              key={sub.id}
                              id={`submenu-link-${sub.id}`}
                              type="button"
                              onClick={() => handleNavClick(sub.href)}
                              className={`w-full group/sub flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                isSubActive
                                  ? 'bg-[#F9F7F2] border border-[#C59B4B]/35 shadow-2xs'
                                  : 'hover:bg-[#F9F7F2] hover:border-[#E8DCC6]/70 border border-transparent'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                                  sub.badgeVariant === 'danger'
                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                    : isSubActive
                                    ? 'bg-[#1A3B34] text-[#F6E7A7] border-[#1A3B34]'
                                    : 'bg-[#F9F7F2] text-[#1A3B34] border-[#E8DCC6]/60 group-hover/sub:bg-[#1A3B34] group-hover/sub:text-[#F6E7A7] group-hover/sub:border-[#1A3B34]'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span
                                    className={`text-xs font-bold leading-tight truncate ${
                                      isSubActive
                                        ? 'text-[#1A3B34]'
                                        : 'text-[#1A3B34] group-hover/sub:text-[#1A3B34]'
                                    }`}
                                  >
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span
                                      className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wider shrink-0 border ${
                                        sub.badgeVariant === 'danger'
                                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                                          : sub.badgeVariant === 'success'
                                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                          : 'bg-[#F6E7A7] text-[#1A3B34] border-[#C59B4B]/30'
                                      }`}
                                    >
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#1A3B34]/70 font-light leading-snug line-clamp-2 mt-0.5">
                                  {sub.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action: Call Now CTA + Airbnb + Inquire to Book (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <a
              id="nav-call-now-cta"
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-3 xl:px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-white hover:bg-[#F9F7F2] text-[#1A3B34] border border-[#E8DCC6] hover:border-[#C59B4B] whitespace-nowrap"
              title={`Call Host Directly: ${SITE_CONFIG.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span>Call Now</span>
            </a>


            <button
              id="nav-book-stay-cta"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer bg-[#1A3B34] hover:bg-[#224D44] text-white border border-[#C59B4B]/30 hover:border-[#C59B4B]/60 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F6E7A7]" />
              <span>Inquire to Book</span>
            </button>
          </div>

          {/* Mobile & Tablet Actions (shown only when desktop nav is hidden) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <a
              id="mobile-quick-call-btn"
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1.5 transition-colors cursor-pointer bg-white text-[#1A3B34] border border-[#E8DCC6] shadow-xs"
              title={`Call ${SITE_CONFIG.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B4B]" />
              <span className="hidden xs:inline">Call Now</span>
            </a>

            <button
              id="mobile-quick-book-btn"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3.5 py-1.5 transition-colors cursor-pointer bg-[#1A3B34] text-white shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F6E7A7]" />
              <span>Inquire</span>
            </button>

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl transition-colors cursor-pointer text-[#1A3B34] hover:bg-[#E8DCC6]/50"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#F9F7F2] shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-y-auto border-l border-[#E8DCC6]"
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

              {/* Categorized Hierarchical Mobile Navigation */}
              <div className="space-y-1.5">
                {NAV_GROUPS.map((group) => {
                  const hasSubmenu = Boolean(group.items && group.items.length > 0);
                  const isExpanded = expandedMobileGroups[group.id];
                  const isActive = isGroupActive(group);

                  if (!hasSubmenu) {
                    return (
                      <button
                        key={group.id}
                        id={`mobile-link-${group.id}`}
                        onClick={() => group.href && handleNavClick(group.href)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#E8DCC6] text-[#1A3B34]'
                            : 'text-[#1A3B34] hover:bg-[#E8DCC6]/30'
                        }`}
                      >
                        <span>{group.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#8CA58A]" />
                      </button>
                    );
                  }

                  return (
                    <div key={group.id} className="rounded-xl border border-[#E8DCC6]/60 bg-white/70 overflow-hidden">
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F9F7F2]/80">
                        <button
                          type="button"
                          onClick={() => group.href && handleNavClick(group.href)}
                          className={`text-xs font-bold uppercase tracking-wider text-left hover:text-[#C59B4B] transition-colors cursor-pointer ${
                            isActive ? 'text-[#1A3B34]' : 'text-[#1A3B34]/85'
                          }`}
                        >
                          {group.label}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleMobileGroup(group.id)}
                          className="p-1 rounded-md text-[#1A3B34]/70 hover:bg-[#E8DCC6]/50 cursor-pointer"
                          aria-label={`Toggle ${group.label} submenu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#C59B4B]' : 'text-[#1A3B34]/50'
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="p-1.5 space-y-1 border-t border-[#E8DCC6]/50 bg-white">
                          {group.items?.map((sub) => {
                            const IconComponent = sub.icon;
                            const isSubActive = isSubItemActive(sub.href);
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => handleNavClick(sub.href)}
                                className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                                  isSubActive ? 'bg-[#F9F7F2] font-semibold text-[#1A3B34]' : 'hover:bg-[#F9F7F2]/80 text-[#1A3B34]/80'
                                }`}
                              >
                                <div className="w-6 h-6 rounded-md bg-[#F9F7F2] flex items-center justify-center shrink-0 border border-[#E8DCC6]/50 text-[#1A3B34]">
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs truncate block">{sub.label}</span>
                                </div>
                                {sub.badge && (
                                  <span
                                    className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase tracking-wider shrink-0 border ${
                                      sub.badgeVariant === 'danger'
                                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                                        : sub.badgeVariant === 'success'
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                        : 'bg-[#F6E7A7] text-[#1A3B34] border-[#C59B4B]/30'
                                    }`}
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Brand Note */}
            <div className="pt-5 border-t border-[#E8DCC6] space-y-2.5">
              <a
                id="mobile-drawer-call-cta"
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="w-full py-3 px-4 rounded-xl bg-[#C59B4B] hover:bg-[#d6a953] text-[#1A3B34] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#1A3B34]" />
                <span>Call Host: {SITE_CONFIG.phone}</span>
              </a>

              <a
                id="mobile-drawer-airbnb-cta"
                href={SITE_CONFIG.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#FF385C] hover:bg-[#E00B41] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <span>Book / View on Airbnb</span>
              </a>

              <button
                id="mobile-drawer-book-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer border border-[#C59B4B]/30"
              >
                <Calendar className="w-4 h-4 text-[#F6E7A7]" />
                <span>Inquire to Book</span>
              </button>
              <p className="text-[11px] text-center text-[#1A3B34]/70 font-medium">
                $199*/nt promo (valid until Oct 30) · $0 resort fees · Free parking pass
              </p>

              <div className="text-xs text-[#1A3B34]/75 space-y-1.5 pt-1.5">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
                  <span className="text-[11px]">Waikiki Banyan, 201 ʻOhua Ave, Honolulu</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="truncate hover:underline text-[11px]">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8CA58A] shrink-0" />
                  <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-semibold text-[#1A3B34] hover:underline text-[11px]">
                    {SITE_CONFIG.phone}
                  </a>
                </p>
              </div>

              {/* Mobile Drawer Social Links */}
              <div className="pt-2 border-t border-[#E8DCC6]/60">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C59B4B] block mb-1.5">
                  Follow Our Channels
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {SITE_CONFIG.socials.map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#E8DCC6]/30 hover:bg-[#E8DCC6]/60 text-[11px] font-semibold text-[#1A3B34] flex items-center gap-1.5 transition-colors"
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
