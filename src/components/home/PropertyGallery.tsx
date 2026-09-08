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
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      caption: 'Turquoise ocean water and gentle waves at Kuhio Beach, 1 block from Waikiki Banyan',
      category: 'beach',
    },
    {
      id: 'g-2',
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      caption: 'Comfortable air-conditioned living suite with sliding doors to the private lanai',
      category: 'interiors',
    },
    {
      id: 'g-3',
      url: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff568?auto=format&fit=crop&w=1400&q=80',
      caption: 'Iconic Diamond Head Crater views and afternoon trade wind clouds',
      category: 'views',
    },
    {
      id: 'g-4',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80',
      caption: 'Waikiki Banyan 6th-floor heated swimming pool and recreation sundeck',
      category: 'banyan',
    },
    {
      id: 'g-5',
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
      caption: 'Clean, serene master bedroom appointed with fresh island-style linens',
      category: 'interiors',
    },
    {
      id: 'g-6',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
      caption: 'Fully equipped kitchen with full-size refrigerator, oven, range & coffee maker',
      category: 'interiors',
    },
    {
      id: 'g-7',
      url: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1400&q=80',
      caption: 'Emerald Koʻolau mountain peaks with afternoon trade wind breezes',
      category: 'views',
    },
    {
      id: 'g-8',
      url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80',
      caption: 'Surfers catching golden hour rollers at Canoes and Queen’s Surf break',
      category: 'beach',
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
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
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
