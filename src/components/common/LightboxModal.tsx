import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { AppImage } from './AppImage';

export interface LightboxImage {
  url: string;
  caption: string;
  category?: string;
}

interface LightboxModalProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      id="gallery-lightbox-overlay"
      className="fixed inset-0 z-50 bg-[#0D274D]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10 py-2">
        <span className="text-xs sm:text-sm font-medium text-white/70">
          {currentIndex + 1} of {images.length}
        </span>

        <button
          id="lightbox-close-btn"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-auto px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <AppImage
          src={currentImage.url}
          alt={currentImage.caption}
          className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
        />

        {/* Previous Button */}
        <button
          id="lightbox-prev-btn"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          id="lightbox-next-btn"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption Bottom */}
      <div
        className="max-w-2xl mx-auto text-center text-white py-3 space-y-1"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm sm:text-base font-light text-[#D4F2F5]">
          {currentImage.caption}
        </p>
        <p className="text-[11px] text-white/50">
          Plumeria Vacation Rentals at Waikiki Banyan
        </p>
      </div>
    </div>
  );
};
