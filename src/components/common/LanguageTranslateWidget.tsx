import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, X, Languages, ArrowRight, RotateCcw } from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  getStoredLanguage,
  setLanguage,
  translatePageDOM,
} from '../../utils/translator';

interface LanguageTranslateWidgetProps {
  className?: string;
}

export const LanguageTranslateWidget: React.FC<LanguageTranslateWidgetProps> = ({
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize language on mount & restore previous selection
  useEffect(() => {
    const storedLang = getStoredLanguage();
    setCurrentLang(storedLang);

    if (storedLang !== 'en') {
      // Delay slightly for initial React render to settle before translating text nodes
      const timer = setTimeout(() => {
        translatePageDOM(storedLang);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for global language changes
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ language: string }>;
      if (customEvent.detail && customEvent.detail.language) {
        setCurrentLang(customEvent.detail.language);
      }
    };

    window.addEventListener('plumeria-language-change', handleLangChange);
    return () => window.removeEventListener('plumeria-language-change', handleLangChange);
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    setLanguage(langCode);
  };

  const activeLangOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const isJapaneseActive = currentLang === 'ja';
  const isTranslated = currentLang !== 'en';

  return (
    <>
      {/* Floating Modern Language Widget (Bottom Left) */}
      <div
        id="plumeria-language-floating-widget"
        className={`fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 ${className}`}
        ref={dropdownRef}
      >
        <div className="relative">
          {/* Main Floating Trigger Pill */}
          <button
            id="floating-translate-toggle-btn"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`group flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full shadow-lg border transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-md ${
              isJapaneseActive
                ? 'bg-[#1A3B34] text-[#F6E7A7] border-[#C59B4B] shadow-[#1A3B34]/30'
                : isTranslated
                ? 'bg-[#C59B4B] text-[#1A3B34] border-[#1A3B34]/20 shadow-[#C59B4B]/30'
                : 'bg-white/95 text-[#1A3B34] border-[#E8DCC6] hover:border-[#C59B4B] shadow-neutral-900/10'
            }`}
            title="Translate Website into Japanese & other languages / 日本語に翻訳"
            aria-label="Website Language Selector"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base leading-none">
                {isJapaneseActive ? '🇯🇵' : activeLangOption.flag}
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
                {isJapaneseActive
                  ? '日本語で表示中'
                  : isTranslated
                  ? activeLangOption.nativeName
                  : '日本語 (翻訳)'}
              </span>
            </div>

            <div className="flex items-center gap-1 pl-1 border-l border-current/25">
              <Globe className="w-3.5 h-3.5 opacity-80" />
              <span className="text-[10px] font-semibold opacity-80 hidden xs:inline uppercase tracking-wider">
                {isJapaneseActive ? 'JA' : isTranslated ? activeLangOption.code.toUpperCase() : 'Lang'}
              </span>
            </div>
          </button>

          {/* Expanded Language Modal Popover */}
          {isOpen && (
            <div className="absolute left-0 bottom-full mb-2.5 w-76 sm:w-84 bg-white text-[#1A3B34] rounded-2xl shadow-2xl border border-[#E8DCC6] p-4 z-50 animate-modal-pop">
              {/* Header */}
              <div className="flex items-start justify-between pb-3 border-b border-[#E8DCC6]">
                <div>
                  <div className="flex items-center gap-1.5 text-[#C59B4B] text-[11px] font-bold uppercase tracking-wider">
                    <Languages className="w-3.5 h-3.5" />
                    <span>Language / 言語選択</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1A3B34] mt-0.5">
                    ウェブサイトの言語を変更
                  </h4>
                  <p className="text-[11px] text-[#1A3B34]/70 font-light">
                    ワイキキ・バニアンの詳細を日本語で快適にご覧いただけます
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Feature: Japanese (日本語) 1-Click Translation */}
              <div className="py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B4B] block mb-1.5">
                  おすすめ言語 (Featured)
                </span>
                <button
                  id="translate-btn-japanese"
                  type="button"
                  onClick={() => handleSelectLanguage('ja')}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                    isJapaneseActive
                      ? 'bg-[#1A3B34] text-white border-[#C59B4B] ring-2 ring-[#C59B4B]/30 shadow-xs'
                      : 'bg-gradient-to-r from-[#F9F7F2] to-white hover:border-[#C59B4B] border-[#E8DCC6] text-[#1A3B34]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">🇯🇵</span>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm">日本語</span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                            isJapaneseActive
                              ? 'bg-[#C59B4B] text-[#1A3B34]'
                              : 'bg-[#1A3B34]/10 text-[#1A3B34]'
                          }`}
                        >
                          Japanese
                        </span>
                      </div>
                      <span
                        className={`text-[11px] block mt-0.5 font-light ${
                          isJapaneseActive ? 'text-white/80' : 'text-[#1A3B34]/70'
                        }`}
                      >
                        お部屋詳細・予約案内・駐車場案内を日本語で閲覧
                      </span>
                    </div>
                  </div>
                  {isJapaneseActive ? (
                    <span className="w-6 h-6 rounded-full bg-[#C59B4B] text-[#1A3B34] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#C59B4B] shrink-0" />
                  )}
                </button>
              </div>

              {/* Other Available Languages Grid */}
              <div className="pt-2 border-t border-[#E8DCC6]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                  すべての言語 (All Languages)
                </span>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-0.5">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#1A3B34] text-[#F6E7A7] font-semibold'
                            : 'bg-[#F9F7F2] hover:bg-[#E8DCC6]/40 text-[#1A3B34]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="text-sm shrink-0">{lang.flag}</span>
                          <span className="truncate">{lang.nativeName}</span>
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-[#F6E7A7] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset to English or Status Bar */}
              <div className="mt-3 pt-2.5 border-t border-[#E8DCC6] flex items-center justify-between gap-2">
                <span className="text-[10px] text-neutral-400 font-light">
                  {isJapaneseActive ? '日本語翻訳適用済み' : 'Plumeria Multilingual'}
                </span>
                {isTranslated && (
                  <button
                    id="translate-btn-reset-english"
                    type="button"
                    onClick={() => handleSelectLanguage('en')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>English (元の英語に戻す)</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
