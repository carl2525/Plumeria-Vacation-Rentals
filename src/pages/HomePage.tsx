import React from 'react';
import { Hero } from '../components/home/Hero';
import { QuickSearchBar } from '../components/home/QuickSearchBar';
import { IntroSection } from '../components/home/IntroSection';
import { FeaturedRentals } from '../components/home/FeaturedRentals';
import { WaikikiBanyanFeature } from '../components/home/WaikikiBanyanFeature';
import { PlumeriaExperience } from '../components/home/PlumeriaExperience';
import { OceanBreakMoment } from '../components/home/OceanBreakMoment';
import { ExploreWaikikiSection } from '../components/home/ExploreWaikikiSection';
import { WhyBookWithPlumeria } from '../components/home/WhyBookWithPlumeria';
import { PropertyGallery } from '../components/home/PropertyGallery';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { BookingCTA } from '../components/home/BookingCTA';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectProperty: (slug: string) => void;
  onOpenInquiry: (
    propertyId?: string,
    checkIn?: string,
    checkOut?: string,
    guests?: number
  ) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProperty,
  onOpenInquiry,
}) => {
  const handleQuickSearch = (params: { checkIn: string; checkOut: string; guests: number }) => {
    onOpenInquiry(undefined, params.checkIn, params.checkOut, params.guests);
  };

  return (
    <div className="space-y-0">
      <Hero
        onExploreRentals={() => onNavigate('/rentals')}
        onBookStay={() => onOpenInquiry()}
      />

      <QuickSearchBar onSearch={handleQuickSearch} />

      <IntroSection onLearnMore={() => onNavigate('/about')} />

      <FeaturedRentals
        onSelectProperty={onSelectProperty}
        onInquireProperty={(id) => onOpenInquiry(id)}
        onViewAllRentals={() => onNavigate('/rentals')}
      />

      <WaikikiBanyanFeature onLearnMore={() => onNavigate('/waikiki-banyan')} />

      <PlumeriaExperience />

      <OceanBreakMoment />

      <ExploreWaikikiSection onExploreMore={() => onNavigate('/explore')} />

      <WhyBookWithPlumeria />

      <PropertyGallery />

      <TestimonialsSection />

      <BookingCTA
        onViewRentals={() => onNavigate('/rentals')}
        onSendInquiry={() => onOpenInquiry()}
      />
    </div>
  );
};
