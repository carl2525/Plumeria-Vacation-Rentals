import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles, Mail, Building2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

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
    <div className="pt-28 sm:pt-32 pb-24 bg-[#FAF9F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF7F9] border border-[#4BB8C7]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#186A9E]">
            <HelpCircle className="w-3.5 h-3.5 text-[#186A9E]" />
            <span>Help & Information</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0D274D] leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-[#0D274D]/80 font-light leading-relaxed">
            Everything you need to know about staying at Waikiki Banyan with Plumeria Vacation Rentals, from check-in details and building amenities to parking and beach proximity.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#0D274D]/8 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="text"
              placeholder="Search questions (e.g. parking, pool, beach, kitchen, check-in)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF9F5] border border-[#0D274D]/10 rounded-2xl text-[#0D274D] placeholder:text-[#0D274D]/40 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#186A9E] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#0D274D]/75 hover:bg-[#EAF7F9] border border-[#0D274D]/10'
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
                  className="bg-white rounded-3xl border border-[#0D274D]/8 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF9F5]/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#186A9E]">
                        {faq.category}
                      </span>
                      <h2 className="font-serif text-base sm:text-lg font-bold text-[#0D274D]">
                        {faq.question}
                      </h2>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-[#FAF9F5] flex items-center justify-center text-[#0D274D]/60 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#0D274D]/80 leading-relaxed font-light border-t border-[#0D274D]/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#0D274D]/8 space-y-2">
              <p className="text-sm font-semibold text-[#0D274D]">No matching questions found.</p>
              <p className="text-xs text-[#0D274D]/70">Feel free to message our team directly with any specific questions.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-[#0D274D] to-[#186A9E] rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold">Have an unlisted question?</h3>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              Contact us directly at <span className="underline">{SITE_CONFIG.email}</span> or call/text <a href="tel:+18086719191" className="underline font-medium hover:text-[#F5B82E]">{SITE_CONFIG.phone}</a>.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 rounded-full text-xs font-semibold bg-[#F5B82E] text-[#0D274D] hover:bg-[#F78D74] hover:text-white transition-all shadow-sm cursor-pointer shrink-0"
          >
            Send Us a Message
          </button>
        </div>
      </div>
    </div>
  );
};
