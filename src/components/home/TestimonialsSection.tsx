import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-t border-[#EAF7F9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#186A9E]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <Heart className="w-3.5 h-3.5 text-[#F78D74]" />
            <span>Guest Memories</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D274D] leading-tight">
            Aloha, in their words.
          </h2>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Read how guests describe their stays at Waikiki Banyan with Plumeria Vacation Rentals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-[#EAF7F9] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F5B82E]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#186A9E]/20" />
                </div>

                {/* Highlight Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-[#EAF7F9] text-[#186A9E] text-xs font-semibold">
                  {t.highlight}
                </div>

                {/* Quote Body */}
                <p className="text-sm text-[#0D274D]/80 font-light italic leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              {/* Guest Author Info */}
              <div className="pt-4 border-t border-[#EAF7F9] space-y-1">
                <p className="font-serif text-base font-bold text-[#0D274D]">
                  {t.guestName}
                </p>
                <div className="flex items-center justify-between text-xs text-[#0D274D]/60">
                  <span>{t.guestLocation}</span>
                  <span className="text-[#186A9E] font-medium">{t.stayDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

