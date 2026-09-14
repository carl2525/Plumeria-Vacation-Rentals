import React, { useEffect } from 'react';
import { PROPERTIES } from '../../data/properties';
import { SITE_CONFIG } from '../../config/site';

interface SEOHelperProps {
  currentPath: string;
}

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  breadcrumbName?: string;
}

export const SEOHelper: React.FC<SEOHelperProps> = ({ currentPath }) => {
  useEffect(() => {
    // Determine metadata based on route
    let meta: PageMeta = {
      title: `${SITE_CONFIG.name} | Waikiki Vacation Rentals & Waikiki Banyan Condo Rentals`,
      description: SITE_CONFIG.shortDescription,
      canonicalUrl: 'https://plumeriavacationrentals.com',
      breadcrumbName: 'Home',
    };

    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    if (cleanPath === '/') {
      meta = {
        title: `${SITE_CONFIG.name} | Waikiki Vacation Rentals & Hotel Suite Alternative`,
        description:
          'Spacious 1-bedroom Waikiki vacation rental suites with full chef kitchens, free covered parking, and 1-acre resort deck. Compare luxury suites at $300/nt vs $750–$1,450+/nt at Hilton and Sheraton mega-resorts and save $400+ on parking & resort fees vs Aston at Waikiki Banyan. $0 resort fees.',
        canonicalUrl: 'https://plumeriavacationrentals.com',
        breadcrumbName: 'Home',
      };
    } else if (cleanPath === '/rentals') {
      meta = {
        title: 'Waikiki Vacation Rentals & Condo Suites | Plumeria Vacation Rentals at Waikiki Banyan',
        description:
          'Browse handpicked Waikiki vacation rentals and short term condo rentals at Waikiki Banyan Tower 2. 557 sq. ft. 1-bedroom suites + 67 sq. ft. lanai with full chef kitchens, mountain and ocean views, 1-acre resort deck, and $0 resort fees.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/rentals',
        breadcrumbName: 'Vacation Rentals',
      };
    } else if (cleanPath.startsWith('/rentals/')) {
      const slug = cleanPath.replace('/rentals/', '');
      const prop = PROPERTIES.find((p) => p.slug === slug);
      if (prop) {
        meta = {
          title: `${prop.name} (${prop.viewType}) | Waikiki Banyan Vacation Rentals | Plumeria`,
          description: `${prop.tagline}. High-floor Waikiki condo rental at Waikiki Banyan with full kitchen, private lanai, sleeps ${prop.guestsMax}. 1 block to Kuhio Beach with $0 resort fees. Book direct or via Airbnb.`,
          canonicalUrl: `https://plumeriavacationrentals.com/#/rentals/${prop.slug}`,
          breadcrumbName: prop.name,
        };
      }
    } else if (cleanPath === '/waikiki-banyan') {
      meta = {
        title: 'Why Waikiki Banyan is Better | Luxury Suites vs Hilton & Sheraton Waikiki',
        description:
          'Discover why Waikiki Banyan suites outclass $750–$1,450/night hotel suites: 1-acre resort deck, heated pool, 2 hot tubs, tennis court, full chef kitchens, free covered parking, and $0 resort fees just 1 block to Kuhio Beach.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/waikiki-banyan',
        breadcrumbName: 'Why Waikiki Banyan',
      };
    } else if (cleanPath === '/explore') {
      meta = {
        title: 'Explore Waikiki & Oʻahu | Kuhio Beach, Dining & Attractions near Waikiki Banyan',
        description:
          'Local insider guide to Waikiki vacation rentals area: Kuhio Beach swimming, Diamond Head hiking, surf spots, Duke Kahanamoku statue, and Oʻahu island dining steps from Waikiki Banyan.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/explore',
        breadcrumbName: 'Explore Waikiki',
      };
    } else if (cleanPath === '/rules' || cleanPath === '/house-rules') {
      meta = {
        title: 'Building Rules & Guest Policies | Waikiki Banyan Vacation Rentals | Plumeria',
        description:
          'Essential Waikiki Banyan building rules, quiet hours, recreation deck guidelines, keycard access, and in-house guest policies for Plumeria Vacation Rentals in Honolulu, Hawaiʻi.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/rules',
        breadcrumbName: 'House Rules',
      };
    } else if (cleanPath === '/rental-policy' || cleanPath === '/policy' || cleanPath === '/rent-policy') {
      meta = {
        title: 'Rental Policy & Direct Reservation Terms | Plumeria Vacation Rentals',
        description:
          'Transparent rental policies, check-in instructions, deposit terms, cancellation policies, and direct inquiry guidelines for Plumeria Vacation Rentals at Waikiki Banyan.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/rental-policy',
        breadcrumbName: 'Rental Policy',
      };
    } else if (cleanPath === '/faq' || cleanPath === '/faqs') {
      meta = {
        title: 'Frequently Asked Questions | Waikiki Vacation Rentals FAQ | Plumeria',
        description:
          'Answers to common guest questions about Waikiki Banyan vacation rentals, parking rates, recreation deck amenities, beach distance, kitchen appliances, and Airbnb vs direct booking inquiries.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/faq',
        breadcrumbName: 'FAQ',
      };
    } else if (cleanPath === '/about') {
      meta = {
        title: 'About Plumeria Vacation Rentals | Dedicated Waikiki Banyan Hosts in Honolulu',
        description:
          'Learn about Plumeria Vacation Rentals—our story, commitment to authentic Hawaiian hospitality (aloha spirit), and why we specialize in premier Waikiki Banyan condo rentals.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/about',
        breadcrumbName: 'About Us',
      };
    } else if (cleanPath === '/contact') {
      meta = {
        title: 'Contact Host & Direct Inquiry | Plumeria Vacation Rentals Waikiki',
        description:
          'Send a direct booking inquiry, check suite dates, or reach our Honolulu host team directly at (808) 671-9191 or plumeria.vacationrentals808@gmail.com for Waikiki Banyan stays.',
        canonicalUrl: 'https://plumeriavacationrentals.com/#/contact',
        breadcrumbName: 'Contact Host',
      };
    }

    // 1. Update Document Title
    document.title = meta.title;

    // 2. Update Meta Description
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    }

    // 3. Update Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', meta.canonicalUrl);
    }

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', meta.canonicalUrl);

    // 5. Update Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.description);

    // 6. Dynamic BreadcrumbList JSON-LD Injection
    const existingBreadcrumb = document.getElementById('dynamic-breadcrumbs-jsonld');
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }

    if (meta.breadcrumbName && cleanPath !== '/') {
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'dynamic-breadcrumbs-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://plumeriavacationrentals.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: meta.breadcrumbName,
            item: meta.canonicalUrl,
          },
        ],
      });
      document.head.appendChild(breadcrumbScript);
    }
  }, [currentPath]);

  return null;
};
