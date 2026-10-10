import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShieldCheck, ExternalLink, Calendar, Car, CheckCircle2, Lock } from 'lucide-react';
import { HOSPITABLE_CONFIG, SITE_CONFIG } from '../../config/site';

interface HospitableBookingWidgetProps {
  className?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export const HospitableBookingWidget: React.FC<HospitableBookingWidgetProps> = ({
  className = '',
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(compact ? 620 : 780);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    // Listen for resize messages from Hospitable booking widget
    const handleMessage = (event: MessageEvent) => {
      try {
        if (
          event.origin === 'https://booking.hospitable.com' ||
          event.origin.includes('hospitable.com')
        ) {
          if (event.data && typeof event.data.iframeHeight === 'number') {
            const h = Math.max(event.data.iframeHeight, compact ? 520 : 640);
            setIframeHeight(h);
            setIsLoading(false);
          }
        }
      } catch {
        // ignore cross-origin error
      }
    };

    window.addEventListener('message', handleMessage);

    // Mount or adopt the Hospitable iframe into this container
    const container = containerRef.current;
    if (!container) return;

    let targetIframe = document.getElementById('booking-iframe') as HTMLIFrameElement | null;

    if (!targetIframe) {
      // If not yet created by widget-loader, create it
      targetIframe = document.createElement('iframe');
      targetIframe.id = 'booking-iframe';
      targetIframe.src = HOSPITABLE_CONFIG.widgetUrl;
      targetIframe.setAttribute('sandbox', 'allow-top-navigation allow-scripts allow-same-origin allow-forms allow-popups');
      targetIframe.setAttribute('frameBorder', '0');
      targetIframe.setAttribute('title', 'Waikiki Banyan Hospitable Direct Booking Widget');
      targetIframe.style.cssText = 'width: 100%; max-width: 100%; height: 750px; border: none; border-radius: 16px; background-color: #ffffff;';
    }

    // Move iframe into container
    container.appendChild(targetIframe);
    targetIframe.style.display = 'block';

    const handleLoad = () => {
      setIsLoading(false);
    };

    targetIframe.addEventListener('load', handleLoad);

    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(safetyTimer);
      if (targetIframe) {
        targetIframe.removeEventListener('load', handleLoad);
        // Move back to staging so it remains cached
        const staging = document.getElementById('hospitable-staging-mount');
        if (staging && targetIframe.parentElement !== staging) {
          staging.appendChild(targetIframe);
        }
      }
    };
  }, [compact]);

  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCC6] overflow-hidden shadow-sm transition-all ${className}`}
    >
      {/* Header Bar */}
      <div className="bg-[#1A3B34] text-white p-4 sm:p-5 border-b border-[#C59B4B]/30">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#C59B4B]/20 text-[#F6E7A7] border border-[#C59B4B]/40">
              <Sparkles className="w-4 h-4 text-[#F6E7A7]" />
            </span>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E7A7]">
                  Official Direct Booking
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase border border-emerald-500/30">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>Hospitable Verified</span>
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                {HOSPITABLE_CONFIG.propertyName}
              </h3>
            </div>
          </div>

          <a
            href={HOSPITABLE_CONFIG.widgetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6E7A7] text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
            title="Open Hospitable Direct Booking in full window"
          >
            <span>Full Window</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Value Inclusions Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/15 text-[11px] text-white/90">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
            <span>$0 Resort Fees</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
            <span>Free Garage Parking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
            <span>$179* Promo Nightly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
            <span>Instant Confirmation</span>
          </div>
        </div>
      </div>

      {/* Widget Container Area */}
      <div className="relative p-2 sm:p-4 bg-neutral-50/60 min-h-[500px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center z-10 p-6 space-y-3">
            <div className="w-8 h-8 rounded-full border-3 border-[#C59B4B] border-t-transparent animate-spin" />
            <p className="text-xs font-semibold text-[#1A3B34]">
              Loading Live Direct Booking Calendar &amp; Rates...
            </p>
            <span className="text-[10px] text-neutral-400">
              Synchronizing with Hospitable Host Portal
            </span>
          </div>
        )}

        {loadError && (
          <div className="p-6 text-center space-y-3 bg-amber-50/80 rounded-2xl border border-amber-200">
            <p className="text-xs text-amber-900 font-medium">
              If the booking calendar does not load in your browser frame, reserve directly through our secure host link:
            </p>
            <a
              href={HOSPITABLE_CONFIG.widgetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A3B34] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#224D44] transition-colors"
            >
              <span>Launch Hospitable Secure Booking</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* DOM mount where the Hospitable iframe is placed */}
        <div
          ref={containerRef}
          id="hospitable-react-booking-container"
          className="w-full flex justify-center overflow-hidden transition-all duration-300"
          style={{ minHeight: `${iframeHeight}px` }}
        />
      </div>

      {/* Footer Support Notice */}
      <div className="px-4 py-3 bg-[#F9F7F2] border-t border-[#E8DCC6] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#1A3B34]/80">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8CA58A]" />
          <span>Direct Host Reservation · Verified Plumeria Vacation Rentals</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="hover:text-[#C59B4B] font-semibold transition-colors"
          >
            Questions? Call {SITE_CONFIG.phone}
          </a>
          <span className="text-neutral-300">|</span>
          <a
            href={SITE_CONFIG.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF385C] hover:underline font-semibold"
          >
            Airbnb Listing
          </a>
        </div>
      </div>
    </div>
  );
};
