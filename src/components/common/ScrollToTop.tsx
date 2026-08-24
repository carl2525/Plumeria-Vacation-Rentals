import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setScrollProgress(progress);
      }

      if (currentScroll > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circle progress calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <aside
      aria-label="Scroll navigation"
      className={`fixed bottom-20 sm:bottom-20 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-30 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      }`}
    >
      <button
        id="floating-scroll-to-top-btn"
        onClick={scrollToTop}
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0D274D]/95 hover:bg-[#186A9E] text-white flex items-center justify-center shadow-lg shadow-[#0D274D]/30 hover:shadow-xl hover:shadow-[#186A9E]/35 border border-white/20 hover:border-[#F5B82E] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5B82E] focus:ring-offset-2"
        aria-label="Scroll back to top"
        title="Scroll to top"
      >
        {/* Dynamic Circular Scroll Progress Meter */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* Background Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white/20"
            strokeWidth="2"
            fill="none"
          />
          {/* Active Hawaiian Gold Progress Indicator */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-[#F5B82E] transition-all duration-100"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:text-[#F5B82E] transition-all duration-200 group-hover:-translate-y-0.5 transform shrink-0 z-10" />
      </button>
    </aside>
  );
};
