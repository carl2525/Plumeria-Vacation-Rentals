import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { InquiryModal } from './components/common/InquiryModal';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { RentalsPage } from './pages/RentalsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { WaikikiBanyanPage } from './pages/WaikikiBanyanPage';
import { ExplorePage } from './pages/ExplorePage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  // Simple, robust client-side routing based on browser pathname or hash
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) return hash;
    return window.location.pathname || '/';
  });

  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [inquiryPropertyId, setInquiryPropertyId] = useState<string | undefined>(undefined);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (slug: string) => {
    navigate(`/rentals/${slug}`);
  };

  const handleOpenInquiry = (propertyId?: string) => {
    setInquiryPropertyId(propertyId);
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

    if (currentPath === '/waikiki-banyan' || currentPath === '/waikiki-banyan/') {
      return (
        <WaikikiBanyanPage
          onSelectProperty={handleSelectProperty}
          onInquireProperty={handleOpenInquiry}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/explore' || currentPath === '/explore/') {
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
      return <ContactPage />;
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
    <div className="min-h-screen bg-[#FAF9F5] text-[#0D274D] font-sans selection:bg-[#4BB8C7]/30 selection:text-[#0D274D] flex flex-col justify-between">
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
      />

      {/* Floating Modern Scroll-to-Top Action */}
      <ScrollToTop />
    </div>
  );
}

export default App;
