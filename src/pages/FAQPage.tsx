import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { HelpCircle, ChevronDown, ChevronUp, Search, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { LogoWatermark } from '../components/brand/LogoWatermark';

interface FAQPageProps {
  onOpenInquiry: () => void;
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenInquiry, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const categories = ['All', 'Waikiki Banyan', 'Booking & Policies', 'General'];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative background watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.06]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.05]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Help & Information</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A3B34] leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Everything you need to know about booking direct Waikiki vacation rentals at Waikiki Banyan with Plumeria Vacation Rentals—and why our Waikiki condo rentals are preferred over ordinary short term rentals and hotels across Honolulu.
          </p>

          {/* Quick Hub Navigation Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/rentals')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Browse Suites</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/waikiki-banyan')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>1-Acre Deck Amenities</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/rules')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Building Rules</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/rental-policy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Direct Rental Policy</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/explore')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Waikiki Guide</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#E8DCC6]/40 border border-[#E8DCC6] text-[#1A3B34] transition-colors cursor-pointer shadow-2xs"
            >
              <span>Contact Host</span>
            </button>
          </div>
        </div>

        {/* Quick Advantage Banner */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DCC6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C59B4B]">
              The Waikiki Banyan Standard
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
              Why Waikiki Banyan Outclasses Other Vacation Rentals
            </h3>
            <p className="text-xs sm:text-sm text-[#1A3B34]/75 font-light leading-relaxed">
              Oʻahu’s largest 1-acre 6th-floor resort deck (heated pool, 2 jet hot tubs, dry sauna, tennis & pickleball, 12 gas BBQs), full chef-ready kitchens in every suite, private ocean-view lanais, 1 flat block to Kuhio Beach, and $0 mandatory resort fees.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/waikiki-banyan')}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1A3B34] text-white hover:bg-[#224D44] transition-colors whitespace-nowrap self-start sm:self-center cursor-pointer shadow-xs"
          >
            Explore Banyan →
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8DCC6] shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A3B34]/40" />
            <input
              type="text"
              placeholder="Search questions (e.g. parking, pool, beach, kitchen, check-in)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#F9F7F2] border border-[#E8DCC6] rounded-2xl text-[#1A3B34] placeholder:text-[#1A3B34]/40 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A3B34] text-white shadow-xs'
                    : 'bg-[#F9F7F2] text-[#1A3B34]/75 hover:bg-[#E8DCC6]/50 border border-[#E8DCC6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-3xl border border-[#E8DCC6] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F9F7F2]/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8CA58A]">
                        {faq.category}
                      </span>
                      <h2 className="font-serif text-base sm:text-lg font-bold text-[#1A3B34]">
                        {faq.question}
                      </h2>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]/60 flex items-center justify-center text-[#1A3B34]/60 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#1A3B34]/80 leading-relaxed font-light border-t border-[#E8DCC6]/50 space-y-3">
                      <div>{faq.answer}</div>
                      
                      {/* Contextual single navigation link tailored to question topic */}
                      <div className="pt-2">
                        {(() => {
                          const q = (faq.question + ' ' + faq.id).toLowerCase();
                          if (q.includes('park') || q.includes('rule') || q.includes('quiet') || q.includes('pet') || q.includes('bbq')) {
                            return (
                              <button
                                type="button"
                                onClick={() => onNavigate('/rules')}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer group"
                              >
                                <span>Read Waikiki Banyan Building & Garage Rules</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          }
                          if (q.includes('fee') || q.includes('competitor') || q.includes('rate') || q.includes('aston') || q.includes('price')) {
                            return (
                              <button
                                type="button"
                                onClick={() => onNavigate('/waikiki-banyan#full-comparison')}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer group"
                              >
                                <span>Compare Plumeria vs. Aston & Waikiki Hotels</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          }
                          if (q.includes('book') || q.includes('direct') || q.includes('cancel') || q.includes('checkin') || q.includes('deposit') || q.includes('polic')) {
                            return (
                              <button
                                type="button"
                                onClick={() => onNavigate('/rental-policy')}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer group"
                              >
                                <span>View Direct Booking Terms (Save 15%)</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          }
                          if (q.includes('amenit') || q.includes('pool') || q.includes('deck') || q.includes('banyan') || q.includes('sauna') || q.includes('court')) {
                            return (
                              <button
                                type="button"
                                onClick={() => onNavigate('/waikiki-banyan')}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer group"
                              >
                                <span>Explore 1-Acre Resort Deck Amenities</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          }
                          if (q.includes('beach') || q.includes('location') || q.includes('where') || q.includes('kuhio')) {
                            return (
                              <button
                                type="button"
                                onClick={() => onNavigate('/explore')}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer group"
                              >
                                <span>Explore Kuhio Beach & Waikiki Area Guide</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          }
                          return (
                            <button
                              type="button"
                              onClick={() => onNavigate('/rentals')}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer group"
                            >
                              <span>Browse 1-Bedroom Suites</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#E8DCC6] space-y-2">
              <p className="text-sm font-semibold text-[#1A3B34]">No matching questions found.</p>
              <p className="text-xs text-[#1A3B34]/70">Feel free to message our team directly with any specific questions.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-[#1A3B34] via-[#224D44] to-[#2D6559] rounded-3xl p-8 text-white space-y-6 shadow-md border border-[#8CA58A]/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold">Have an unlisted question?</h3>
              <p className="text-xs sm:text-sm text-white/80 font-light">
                Contact us directly at <span className="underline">{SITE_CONFIG.email}</span> or call/text <a href="tel:+18086719191" className="underline font-medium hover:text-[#F6E7A7]">{SITE_CONFIG.phone}</a>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/20"
              >
                Contact Host
              </button>
              <button
                onClick={onOpenInquiry}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#C59B4B] text-[#1A3B34] hover:bg-[#D4A853] transition-all shadow-sm cursor-pointer shrink-0"
              >
                Send Us a Message
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
            <span className="font-semibold text-white/90">Quick Resource Links:</span>
            <button
              type="button"
              onClick={() => onNavigate('/rules')}
              className="hover:text-[#F6E7A7] transition-colors cursor-pointer"
            >
              Building & House Rules
            </button>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => onNavigate('/rental-policy')}
              className="hover:text-[#F6E7A7] transition-colors cursor-pointer"
            >
              Direct Rental Policy
            </button>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => onNavigate('/waikiki-banyan')}
              className="hover:text-[#F6E7A7] transition-colors cursor-pointer"
            >
              Waikiki Banyan Amenities
            </button>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => onNavigate('/explore')}
              className="hover:text-[#F6E7A7] transition-colors cursor-pointer"
            >
              Waikiki Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
