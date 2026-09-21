import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { InquiryModal } from './components/common/InquiryModal';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SEOHelper } from './components/common/SEOHelper';

import { HomePage } from './pages/HomePage';
import { RentalsPage } from './pages/RentalsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { WaikikiBanyanPage } from './pages/WaikikiBanyanPage';
import { ExplorePage } from './pages/ExplorePage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { RulesPage } from './pages/RulesPage';
import { RentalPolicyPage } from './pages/RentalPolicyPage';

export function App() {
  // Simple, robust client-side routing based on browser pathname or hash
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) return hash;
    return window.location.pathname || '/';
  });

  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [inquiryPropertyId, setInquiryPropertyId] = useState<string | undefined>(undefined);
  const [inquiryCheckIn, setInquiryCheckIn] = useState<string | undefined>(undefined);
  const [inquiryCheckOut, setInquiryCheckOut] = useState<string | undefined>(undefined);
  const [inquiryGuests, setInquiryGuests] = useState<number | undefined>(undefined);

  // Synchronize browser history and hash navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        setCurrentPath(hash);
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    const hashIndex = path.indexOf('#');
    if (hashIndex !== -1) {
      const anchorId = path.substring(hashIndex + 1);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProperty = (slug: string) => {
    navigate(`/rentals/${slug}`);
  };

  const handleOpenInquiry = (
    propertyId?: string,
    checkIn?: string,
    checkOut?: string,
    guests?: number
  ) => {
    setInquiryPropertyId(propertyId);
    setInquiryCheckIn(checkIn);
    setInquiryCheckOut(checkOut);
    setInquiryGuests(guests);
    setInquiryModalOpen(true);
  };

  // Render active page based on current route
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectProperty={handleSelectProperty}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    if (currentPath === '/rentals' || currentPath === '/rentals/') {
      return (
        <RentalsPage
          onSelectProperty={handleSelectProperty}
          onInquireProperty={handleOpenInquiry}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath.startsWith('/rentals/')) {
      const slug = currentPath.replace('/rentals/', '');
      return (
        <PropertyDetailPage
          slug={slug}
          onNavigate={navigate}
          onSelectProperty={handleSelectProperty}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    if (currentPath === '/waikiki-banyan' || currentPath === '/waikiki-banyan/' || currentPath.startsWith('/waikiki-banyan#')) {
      return (
        <WaikikiBanyanPage
          onSelectProperty={handleSelectProperty}
          onInquireProperty={handleOpenInquiry}
          onNavigate={navigate}
        />
      );
    }

    if (
      currentPath === '/explore' ||
      currentPath === '/explore/' ||
      currentPath.startsWith('/explore#') ||
      currentPath.startsWith('/explore?')
    ) {
      return (
        <ExplorePage
          onNavigate={navigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      );
    }

    if (currentPath === '/about' || currentPath === '/about/') {
      return (
        <AboutPage
          onNavigate={navigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      );
    }

    if (
      currentPath === '/faq' ||
      currentPath === '/faqs' ||
      currentPath === '/faq/' ||
      currentPath === '/faqs/'
    ) {
      return (
        <FAQPage
          onNavigate={navigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      );
    }

    if (currentPath === '/contact' || currentPath === '/contact/') {
      return (
        <ContactPage
          onNavigate={navigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      );
    }

    if (
      currentPath === '/policy' ||
      currentPath === '/policy/' ||
      currentPath === '/rental-policy' ||
      currentPath === '/rental-policy/' ||
      currentPath === '/rent-policy' ||
      currentPath === '/rent-policy/'
    ) {
      return (
        <RentalPolicyPage
          onNavigate={navigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      );
    }

    if (
      currentPath === '/rules' ||
      currentPath === '/rules/' ||
      currentPath === '/house-rules' ||
      currentPath === '/building-rules'
    ) {
      return (
        <RulesPage
          onNavigate={navigate}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      );
    }

    // Default fallback to Home
    return (
      <HomePage
        onNavigate={navigate}
        onSelectProperty={handleSelectProperty}
        onOpenInquiry={handleOpenInquiry}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A3B34] font-sans selection:bg-[#C59B4B]/30 selection:text-[#1A3B34] flex flex-col justify-between">
      {/* Dynamic SEO Meta, Titles & Breadcrumbs */}
      <SEOHelper currentPath={currentPath} />

      {/* Universal Navigation Header */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Universal Global Footer */}
      <Footer
        onNavigate={navigate}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Stay Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialPropertyId={inquiryPropertyId}
        initialCheckIn={inquiryCheckIn}
        initialCheckOut={inquiryCheckOut}
        initialGuests={inquiryGuests}
      />

      {/* Floating Modern Scroll-to-Top Action */}
      <ScrollToTop />
    </div>
  );
}

export default App;
