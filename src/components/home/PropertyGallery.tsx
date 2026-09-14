import React, { useState } from 'react';
import { Camera, Maximize2, Sparkles, Eye } from 'lucide-react';
import { LightboxModal, LightboxImage } from '../common/LightboxModal';
import { AppImage } from '../common/AppImage';
import { LogoWatermark } from '../brand/LogoWatermark';

export const PropertyGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const galleryItems: (LightboxImage & { id: string; category: 'interiors' | 'views' | 'banyan' | 'beach' })[] = [
    {
      id: 'g-1',
      url: '/images/banyan/banyan-amenity-03.webp',
      caption: 'Sweeping aerial view of Waikiki Beach and turquoise Pacific waters, just 1 block down ʻOhua Ave',
      category: 'beach',
    },
    {
      id: 'g-2',
      url: '/images/properties/wb-3205-t2/unit-3205-02.webp',
      caption: 'Unit #3205-T2 open living lounge featuring air conditioning and breakfast bar island with barstools',
      category: 'interiors',
    },
    {
      id: 'g-3',
      url: '/images/banyan/banyan-amenity-01.webp',
      caption: 'High-elevation Diamond Head Crater and Honolulu city skyline panorama from Waikiki Banyan',
      category: 'views',
    },
    {
      id: 'g-4',
      url: '/images/banyan/banyan-amenity-09.webp',
      caption: 'Waikiki Banyan 6th-floor heated swimming pool and 1-acre recreation sundeck',
      category: 'banyan',
    },
    {
      id: 'g-5',
      url: '/images/properties/wb-3205-t2/unit-3205-12.webp',
      caption: 'Clean, modern master bedroom with platform bed, dual reading lamps, and Koʻolau mountain window views',
      category: 'interiors',
    },
    {
      id: 'g-6',
      url: '/images/properties/wb-3205-t2/unit-3205-07.webp',
      caption: 'Fully equipped chef’s kitchen with full refrigerator, electric range, microwave, and coffee maker',
      category: 'interiors',
    },
    {
      id: 'g-7',
      url: '/images/banyan/banyan-amenity-11.webp',
      caption: 'Emerald Ala Wai Golf Course, peaceful canal, and Koʻolau mountain range directly behind Banyan',
      category: 'views',
    },
    {
      id: 'g-8',
      url: '/images/banyan/banyan-amenity-08.webp',
      caption: '6th-floor therapeutic jet hot tubs framing Diamond Head for evening relaxation',
      category: 'banyan',
    },
    {
      id: 'g-9',
      url: '/images/banyan/banyan-amenity-06.webp',
      caption: 'Outdoor 12-station gas barbecue grilling pavilion with solid stone picnic dining tables',
      category: 'banyan',
    },
    {
      id: 'g-10',
      url: '/images/properties/wb-3205-t2/unit-3205-05.webp',
      caption: 'Private covered 32nd-floor lanai with armchair seating framing scenic city and canal views',
      category: 'views',
    },
    {
      id: 'g-11',
      url: '/images/banyan/banyan-amenity-02.webp',
      caption: 'Aerial location perspective showing Waikiki Banyan’s direct, flat 1-block walk to Kuhio Beach',
      category: 'beach',
    },
    {
      id: 'g-12',
      url: '/images/properties/wb-3205-t2/unit-3205-10.webp',
      caption: 'Bright, clean bathroom with walk-in shower and green speckled decorative trim',
      category: 'interiors',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interiors', label: 'Suites & Kitchens' },
    { id: 'views', label: 'Lanais & Views' },
    { id: 'banyan', label: 'Waikiki Banyan Resort Deck' },
    { id: 'beach', label: 'Waikiki Beach & Surf' },
  ];

  const filtered =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#F9F7F2] border-t border-[#E8DCC6] overflow-hidden">
      {/* Decorative watermark */}
      <LogoWatermark size="xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="lg" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <Camera className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Visual Gallery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A3B34] leading-tight">
            Glimpses of Waikiki Banyan.
          </h2>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Take a look at our guest suites, private lanais, the 6th-floor resort deck, and the turquoise ocean awaiting just down the street.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#1A3B34] text-white shadow-xs'
                  : 'bg-white text-[#1A3B34]/80 hover:bg-[#E8DCC6]/50 border border-[#E8DCC6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden aspect-4/3 bg-[#1A3B34]/10 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#E8DCC6]"
            >
              <AppImage
                src={item.url}
                alt={item.caption}
                fallbackSrc={item.fallbackUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3B34]/85 via-[#1A3B34]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="self-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs font-medium text-white/95 leading-snug line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={filtered}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
};
