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
      aria-label="Scroll to top"
      className={`fixed bottom-5 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 xl:right-10 z-40 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      }`}
    >
      <button
        id="floating-scroll-to-top-btn"
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1A3B34]/92 hover:bg-[#1A3B34] text-white shadow-lg shadow-[#1A3B34]/25 hover:shadow-xl hover:shadow-[#1A3B34]/40 border border-[#C59B4B]/40 hover:border-[#C59B4B] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:ring-offset-2"
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
            className="stroke-[#E8DCC6]/20"
            strokeWidth="2"
            fill="none"
          />
          {/* Active Warm Gold Progress Indicator */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-[#C59B4B] transition-all duration-100"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Upward Arrow Icon */}
        <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#F6E7A7] group-hover:text-white transition-all duration-200 group-hover:-translate-y-0.5 transform shrink-0 z-10" />

        {/* Discreet Tooltip Badge on Desktop Hover */}
        <span className="hidden md:group-hover:inline-flex absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-[#1A3B34] text-[#F6E7A7] border border-[#C59B4B]/30 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 animate-fade-in">
          Top
        </span>
      </button>
    </aside>
  );
};
