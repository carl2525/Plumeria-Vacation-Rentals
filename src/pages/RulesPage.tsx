import React, { useState, useMemo } from 'react';
import {
  BUILDING_RULES,
  IN_HOUSE_RULES,
  GUEST_ACKNOWLEDGMENT,
  QUICK_RULE_HIGHLIGHTS,
} from '../data/rules';
import { RuleItem } from '../types';
import { LogoWatermark } from '../components/brand/LogoWatermark';
import { PlumeriaSymbolLogo } from '../components/brand/PlumeriaSymbolLogo';
import { SITE_CONFIG } from '../config/site';
import {
  ShieldCheck,
  Search,
  Check,
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
  Moon,
  CigaretteOff,
  Waves,
  Eye,
  Clock,
  Car,
  AlertCircle,
  Building2,
  Home,
  Mail,
  ExternalLink,
  DollarSign,
  ChevronRight,
} from 'lucide-react';

interface RulesPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (propertyId?: string) => void;
}

export const RulesPage: React.FC<RulesPageProps> = ({ onNavigate, onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'part1' | 'part2'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRuleIds, setExpandedRuleIds] = useState<Record<string, boolean>>({
    'banyan-conduct': true,
    'banyan-noise': true,
    'banyan-elevators-surfboards': true,
    'banyan-vehicles-parking': true,
    'plumeria-occupancy': true,
    'plumeria-quiet-hours': true,
    'plumeria-no-smoking': true,
    'plumeria-lanai-safety': true,
  });
  const [copied, setCopied] = useState(false);

  const toggleRule = (id: string) => {
    setExpandedRuleIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = {};
    BUILDING_RULES.rules.forEach((r) => (allIds[r.id] = true));
    IN_HOUSE_RULES.rules.forEach((r) => (allIds[r.id] = true));
    setExpandedRuleIds(allIds);
  };

  const collapseAll = () => {
    setExpandedRuleIds({});
  };

  // Filter rules based on search and tab
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const filterList = (rules: RuleItem[]) => {
      if (!q) return rules;
      return rules.filter((r) => {
        const titleMatch = r.title.toLowerCase().includes(q);
        const summaryMatch = r.summary.toLowerCase().includes(q);
        const tagMatch = r.tag?.toLowerCase().includes(q);
        const detailsMatch = r.details.some((d) => d.toLowerCase().includes(q));
        const noteMatch = r.importantNote?.toLowerCase().includes(q);
        return titleMatch || summaryMatch || tagMatch || detailsMatch || noteMatch;
      });
    };

    const p1Rules = filterList(BUILDING_RULES.rules);
    const p2Rules = filterList(IN_HOUSE_RULES.rules);

    return {
      part1: p1Rules,
      part2: p2Rules,
      totalCount: p1Rules.length + p2Rules.length,
    };
  }, [searchQuery]);

  const handleCopyAllRules = () => {
    const formatRuleText = (r: RuleItem, partLabel: string) => {
      const details = r.details.map((d) => `  • ${d}`).join('\n');
      const note = r.importantNote ? `\n  Important Note: ${r.importantNote}` : '';
      return `[${partLabel}] ${r.number}. ${r.title}\n${r.summary}\n${details}${note}\n`;
    };

    const text = [
      'WAIKIKI BANYAN & PLUMERIA VACATION RENTALS — GUEST & BUILDING RULES',
      '==================================================================\n',
      'PART I — WAIKIKI BANYAN BUILDING RULES',
      '--------------------------------------',
      ...BUILDING_RULES.rules.map((r) => formatRuleText(r, 'Building Rule')),
      '\nPART II — PLUMERIA VACATION RENTALS IN-HOUSE RULES',
      '---------------------------------------------------',
      ...IN_HOUSE_RULES.rules.map((r) => formatRuleText(r, 'In-House Rule')),
      '\nGUEST ACKNOWLEDGMENT',
      '--------------------',
      GUEST_ACKNOWLEDGMENT.text,
      '\n' + GUEST_ACKNOWLEDGMENT.alohaGreeting,
      GUEST_ACKNOWLEDGMENT.closingText,
    ].join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative pt-28 sm:pt-32 pb-24 bg-[#F9F7F2] min-h-screen overflow-hidden">
      {/* Decorative Brand Watermarks */}
      <LogoWatermark size="2xl" position="top-right" opacity="opacity-[0.035] sm:opacity-[0.05]" />
      <LogoWatermark size="xl" position="bottom-left" opacity="opacity-[0.03] sm:opacity-[0.04]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC6]/40 border border-[#C59B4B]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3B34]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B4B]" />
            <span>Resort Policies & House Standards</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A3B34] leading-tight">
            Guest & Building Rules
          </h1>

          <p className="text-base sm:text-lg text-[#1A3B34]/80 font-light leading-relaxed">
            Welcome to Waikiki Banyan Tower 2! To protect our home, ensure safety, and maintain a peaceful island environment for everyone, all guests agree to follow both the Waikiki Banyan Building Rules and Plumeria In-House Rules.
          </p>

          {/* Rental Policy Companion Banner */}
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DCC6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8CA58A]/15 text-[#1A3B34] flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-5 h-5 text-[#1A3B34]" />
              </div>
              <div className="space-y-0.5">
                <span className="font-serif font-bold text-sm sm:text-base text-[#1A3B34] block">
                  Direct Booking Rental Policy (Rates, Cancellation & Late Checkout)
                </span>
                <p className="text-xs text-[#1A3B34]/70">
                  Base rate is $300/night with parking included, 2:00 PM check-in / 12:00 PM checkout, late departure fee schedule, and 14-day cancellation protection.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/rental-policy')}
              className="px-4 py-2 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-white font-semibold text-xs transition-colors shrink-0 shadow-2xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View Rental Policy</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#F6E7A7]" />
            </button>
          </div>
        </div>

        {/* Quick Reference Highlight Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59B4B]">
              Quick Reference · 6 Golden Rules
            </span>
            <span className="text-xs text-[#1A3B34]/60 hidden sm:inline">
              Essential guidelines for a seamless stay
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_RULE_HIGHLIGHTS.map((item, idx) => {
              const icons = {
                Moon: <Moon className="w-4 h-4 text-[#1A3B34]" />,
                CigaretteOff: <CigaretteOff className="w-4 h-4 text-rose-700" />,
                Waves: <Waves className="w-4 h-4 text-[#7FB6D9]" />,
                Eye: <Eye className="w-4 h-4 text-[#C59B4B]" />,
                Clock: <Clock className="w-4 h-4 text-[#8CA58A]" />,
                Car: <Car className="w-4 h-4 text-[#1A3B34]" />,
              };
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DCC6] shadow-2xs space-y-2 hover:border-[#8CA58A]/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#E8DCC6]/40 flex items-center justify-center shrink-0">
                      {icons[item.icon as keyof typeof icons] || <ShieldCheck className="w-4 h-4 text-[#1A3B34]" />}
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#1A3B34]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#1A3B34]/75 leading-relaxed font-light">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Controls Bar: Search + Tab Switcher + Actions */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E8DCC6] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#1A3B34]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-rules-input"
                placeholder="Search rules (e.g. surfboard, parking, quiet hours, lanai, pool)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F9F7F2] border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/40 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1A3B34]/50 hover:text-[#1A3B34] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Print & Copy Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                id="copy-rules-btn"
                onClick={handleCopyAllRules}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8DCC6] text-[#1A3B34] text-xs font-semibold hover:bg-[#E8DCC6]/40 transition-colors cursor-pointer shadow-2xs"
                title="Copy text of all rules to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#8CA58A]" />
                    <span className="text-[#8CA58A]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C59B4B]" />
                    <span>Copy Rules</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="print-rules-btn"
                onClick={handlePrint}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8DCC6] text-[#1A3B34] text-xs font-semibold hover:bg-[#E8DCC6]/40 transition-colors cursor-pointer shadow-2xs"
                title="Print or save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#1A3B34]" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Tab Filter buttons & Expand Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E8DCC6]/60 text-xs">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#1A3B34] text-white shadow-xs'
                    : 'bg-[#F9F7F2] text-[#1A3B34]/80 hover:bg-[#E8DCC6]/50'
                }`}
              >
                All Rules ({filteredSections.totalCount})
              </button>
              <button
                onClick={() => setActiveTab('part1')}
                className={`px-4 py-1.5 rounded-full font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                  activeTab === 'part1'
                    ? 'bg-[#1A3B34] text-white shadow-xs'
                    : 'bg-[#F9F7F2] text-[#1A3B34]/80 hover:bg-[#E8DCC6]/50'
                }`}
              >
                <Building2 className="w-3 h-3 text-[#C59B4B]" />
                <span>Part I: Building Rules ({filteredSections.part1.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('part2')}
                className={`px-4 py-1.5 rounded-full font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                  activeTab === 'part2'
                    ? 'bg-[#1A3B34] text-white shadow-xs'
                    : 'bg-[#F9F7F2] text-[#1A3B34]/80 hover:bg-[#E8DCC6]/50'
                }`}
              >
                <Home className="w-3 h-3 text-[#8CA58A]" />
                <span>Part II: In-House Rules ({filteredSections.part2.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#1A3B34]/60">
              <button
                onClick={expandAll}
                className="hover:text-[#1A3B34] underline cursor-pointer"
              >
                Expand All
              </button>
              <span>·</span>
              <button
                onClick={collapseAll}
                className="hover:text-[#1A3B34] underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Section Display */}
        <div className="space-y-12">
          {/* Part I: Building Rules */}
          {(activeTab === 'all' || activeTab === 'part1') && (
            <div id="part1-building-rules" className="space-y-6">
              <div className="bg-[#1A3B34] text-white rounded-3xl p-6 sm:p-8 border border-[#C59B4B]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#C59B4B]/20 text-[#F6E7A7] text-[10px] font-bold uppercase tracking-widest border border-[#C59B4B]/40">
                    <Building2 className="w-3 h-3" />
                    <span>Association Policies</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                    {BUILDING_RULES.partTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-light">
                    {BUILDING_RULES.partSubtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#F6E7A7]">
                    13 Building Regulations
                  </span>
                </div>
              </div>

              {filteredSections.part1.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-sm text-[#1A3B34]/60 border border-[#E8DCC6]">
                  No building rules matched your search query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSections.part1.map((rule) => {
                    const isExpanded = expandedRuleIds[rule.id] ?? false;
                    return (
                      <div
                        key={rule.id}
                        id={`rule-${rule.id}`}
                        className="bg-white rounded-2xl border border-[#E8DCC6] overflow-hidden transition-all shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleRule(rule.id)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F9F7F2]/60 transition-colors cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A3B34] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                              {rule.number}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A3B34]">
                                  {rule.title}
                                </h3>
                                {rule.tag && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#E8DCC6]/60 text-[#1A3B34]">
                                    {rule.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#1A3B34]/70 line-clamp-1 font-light mt-0.5">
                                {rule.summary}
                              </p>
                            </div>
                          </div>

                          <div className="p-1 rounded-lg text-[#1A3B34]/60 shrink-0">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3 border-t border-[#E8DCC6]/60 bg-[#F9F7F2]/40 text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed animate-fade-in">
                            <p className="font-medium text-[#1A3B34] pt-2">
                              {rule.summary}
                            </p>

                            {rule.details.length > 0 && (
                              <ul className="space-y-1.5 pl-1">
                                {rule.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-2">
                                    <span className="text-[#C59B4B] font-bold text-sm leading-none mt-0.5">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {rule.importantNote && (
                              <div className="p-3 rounded-xl bg-[#C59B4B]/15 border border-[#C59B4B]/40 text-xs text-[#1A3B34] flex items-start gap-2.5 mt-2">
                                <AlertCircle className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-semibold block mb-0.5 text-[#1A3B34]">
                                    Important Notice
                                  </strong>
                                  <span>{rule.importantNote}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Part II: In-House Rules */}
          {(activeTab === 'all' || activeTab === 'part2') && (
            <div id="part2-inhouse-rules" className="space-y-6">
              <div className="bg-[#224D44] text-white rounded-3xl p-6 sm:p-8 border border-[#8CA58A]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#8CA58A]/30 text-[#F6E7A7] text-[10px] font-bold uppercase tracking-widest border border-[#8CA58A]/50">
                    <Home className="w-3 h-3" />
                    <span>Plumeria Suite Standards</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                    {IN_HOUSE_RULES.partTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-light">
                    {IN_HOUSE_RULES.partSubtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#F6E7A7]">
                    18 In-House Standards
                  </span>
                </div>
              </div>

              {filteredSections.part2.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-sm text-[#1A3B34]/60 border border-[#E8DCC6]">
                  No in-house rules matched your search query.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSections.part2.map((rule) => {
                    const isExpanded = expandedRuleIds[rule.id] ?? false;
                    return (
                      <div
                        key={rule.id}
                        id={`rule-${rule.id}`}
                        className="bg-white rounded-2xl border border-[#E8DCC6] overflow-hidden transition-all shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleRule(rule.id)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F9F7F2]/60 transition-colors cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8CA58A] text-[#1A3B34] flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                              {rule.number}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-serif text-base sm:text-lg font-bold text-[#1A3B34]">
                                  {rule.title}
                                </h3>
                                {rule.tag && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#8CA58A]/20 text-[#1A3B34]">
                                    {rule.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#1A3B34]/70 line-clamp-1 font-light mt-0.5">
                                {rule.summary}
                              </p>
                            </div>
                          </div>

                          <div className="p-1 rounded-lg text-[#1A3B34]/60 shrink-0">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3 border-t border-[#E8DCC6]/60 bg-[#F9F7F2]/40 text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed animate-fade-in">
                            <p className="font-medium text-[#1A3B34] pt-2">
                              {rule.summary}
                            </p>

                            {rule.details.length > 0 && (
                              <ul className="space-y-1.5 pl-1">
                                {rule.details.map((detail, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-2">
                                    <span className="text-[#8CA58A] font-bold text-sm leading-none mt-0.5">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {rule.importantNote && (
                              <div className="p-3 rounded-xl bg-[#C59B4B]/15 border border-[#C59B4B]/40 text-xs text-[#1A3B34] flex items-start gap-2.5 mt-2">
                                <AlertCircle className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-semibold block mb-0.5 text-[#1A3B34]">
                                    Important Notice
                                  </strong>
                                  <span>{rule.importantNote}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Guest Acknowledgment & Aloha Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DCC6] shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#E8DCC6]">
            <PlumeriaSymbolLogo className="w-10 h-10" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59B4B] block">
                Primary Guest Agreement
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34]">
                {GUEST_ACKNOWLEDGMENT.title}
              </h2>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F9F7F2] border border-[#E8DCC6] text-xs sm:text-sm text-[#1A3B34]/85 leading-relaxed">
            <p className="font-medium text-[#1A3B34]">
              {GUEST_ACKNOWLEDGMENT.text}
            </p>
          </div>

          <div className="pt-2 text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#1A3B34]">
              {GUEST_ACKNOWLEDGMENT.alohaGreeting}
            </h3>
            <p className="text-xs sm:text-sm text-[#1A3B34]/75 font-light leading-relaxed">
              {GUEST_ACKNOWLEDGMENT.closingText}
            </p>
          </div>

          {/* Direct Host Contact CTA */}
          <div className="pt-4 border-t border-[#E8DCC6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#1A3B34]/75 text-center sm:text-left">
              <span>Questions regarding special accommodations or rules? </span>
              <a
                href={`mailto:${SITE_CONFIG.email}?subject=Question%20About%20House%20Rules`}
                className="font-bold text-[#1A3B34] hover:text-[#8CA58A] underline"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1A3B34] text-white hover:bg-[#224D44] transition-colors cursor-pointer shadow-xs border border-[#C59B4B]/30"
              >
                Inquire / Book Stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
