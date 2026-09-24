import React, { useState } from 'react';
import {
  Car,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Play,
  Navigation,
  ExternalLink,
  Phone,
  CheckCircle2,
  Copy,
  Check,
  Maximize2
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

// Primary parking photo assets
import routeMapImg from '../assets/images/parking/route_map.png';
import streetTurnImg from '../assets/images/parking/street_turn.png';
import drivewayViewImg from '../assets/images/parking/driveway_view.png';
import entranceRampImg from '../assets/images/parking/entrance_ramp.webp';
import insideParkingImg from '../assets/images/parking/inside_stalls.webp';

interface ParkingPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry?: () => void;
}

interface ParkingStepItem {
  step: number;
  id: string;
  tag: string;
  shortTag: string;
  title: string;
  image: string;
  filename: string;
  summary: string;
  details: string[];
  tip: string;
}

const PARKING_GUIDELINES: ParkingStepItem[] = [
  {
    step: 1,
    id: 'route-map',
    tag: 'Route Overview',
    shortTag: 'Route',
    title: 'Kūhiō Ave to Paoakalani Ave',
    image: routeMapImg,
    filename: 'Parking Route with marker.png',
    summary: 'Drive east along Kūhiō Avenue toward Diamond Head and turn onto Paoakalani Ave.',
    details: [
      'Garage entry is located on the Paoakalani Ave side.',
      'One block from Kūhiō Beach.'
    ],
    tip: 'GPS: 201 ʻOhua Ave, Honolulu, HI 96815'
  },
  {
    step: 2,
    id: 'street-graph',
    tag: 'Street Turn',
    shortTag: 'Turn',
    title: 'Turn on Paoakalani Ave',
    image: streetTurnImg,
    filename: 'Parking Entrance Street Graph.png',
    summary: 'Turn right onto Paoakalani Ave at the traffic signal.',
    details: [
      'Green PAOAKALANI AVE street sign on Kūhiō Ave.',
      'Follow the red directional marker toward the driveway.'
    ],
    tip: 'Yield to pedestrians crossing toward the beach.'
  },
  {
    step: 3,
    id: 'wide-perspective',
    tag: 'Driveway Entry',
    shortTag: 'Driveway',
    title: 'Garage Driveway',
    image: drivewayViewImg,
    filename: 'Parking Entrance wide Perspective.png',
    summary: 'Turn right into the wide concrete driveway flanked by tropical trees.',
    details: [
      'Keep to the right lane heading to the covered ramp.',
      '5 MPH speed limit begins immediately upon entry.'
    ],
    tip: '15-minute luggage drop-off at Tower 2 lobby portico.'
  },
  {
    step: 4,
    id: 'entrance-ramp',
    tag: 'Clearance & Ramp',
    shortTag: 'Ramp',
    title: 'Entrance Ramp (6\' 0" Max)',
    image: entranceRampImg,
    filename: 'Parking Entrance.webp',
    summary: 'Proceed up the ramp past the yellow clearance bar and P sign.',
    details: [
      'Maximum vehicle height: 6\' 0" (1.83 m).',
      'Sedans and standard SUVs clear easily. No tall roof cargo.'
    ],
    tip: 'Lifted trucks or high roof boxes cannot enter.'
  },
  {
    step: 5,
    id: 'interior-ramp',
    tag: 'Guest Parking',
    shortTag: 'Parking',
    title: 'Park & Tower 2 Elevators',
    image: insideParkingImg,
    filename: 'Sample Parking Inside.webp',
    summary: 'Park in any open unreserved parking space and display your parking pass on the dashboard.',
    details: [
      'Do not park in spaces designated Reserved, Staff, or Loading Only.',
      'Take Tower 2 elevators directly up to your suite.'
    ],
    tip: 'Complimentary 24/7 unlimited in & out parking access is included.'
  }
];

export const ParkingPage: React.FC<ParkingPageProps> = ({ onNavigate }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  const googleMapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Waikiki+Banyan+Parking';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('201 Ohua Ave, Honolulu, HI 96815');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleScrollToVideo = () => {
    const el = document.getElementById('video-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen text-[#1A3B34]">
      {/* Header */}
      <section className="relative bg-[#1A3B34] text-white pt-28 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F6E7A7] text-xs font-semibold">
            <Car className="w-3.5 h-3.5" />
            <span>GUEST PARKING GUIDE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Parking &amp; Garage Access
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light">
            Complimentary covered parking at Waikiki Banyan. Follow the 5 photos below for street landmarks and entry.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C59B4B] hover:bg-[#b0883d] text-[#1A3B34] font-bold shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps Directions</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              type="button"
              onClick={handleScrollToVideo}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#F6E7A7] fill-[#F6E7A7]" />
              <span>Video Guide</span>
            </button>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-white border-y border-[#E8DCC6] py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
            <AlertTriangle className="w-5 h-5 text-[#C59B4B] shrink-0" />
            <div>
              <span className="font-bold text-[#1A3B34] block">6' 0" Max Height</span>
              <span className="text-[#1A3B34]/70 text-[11px] block">No high roof racks</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
            <ShieldCheck className="w-5 h-5 text-[#8CA58A] shrink-0" />
            <div>
              <span className="font-bold text-[#1A3B34] block">Free Parking Pass</span>
              <span className="text-[#1A3B34]/70 text-[11px] block">24/7 in &amp; out access</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
            <Clock className="w-5 h-5 text-[#7FB6D9] shrink-0" />
            <div>
              <span className="font-bold text-[#1A3B34] block">5 MPH Speed</span>
              <span className="text-[#1A3B34]/70 text-[11px] block">Watch for pedestrians</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6]">
            <MapPin className="w-5 h-5 text-[#C59B4B] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-bold text-[#1A3B34] block truncate">201 ʻOhua Ave</span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A3B34] hover:text-[#C59B4B] transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Step-by-Step Visual Guidelines Section */}
        <section className="space-y-5">
          {/* Step Selector Tabs - Fully Responsive (5-Column Grid on Mobile, Pills on Desktop) */}
          <div className="grid grid-cols-5 gap-1 sm:flex sm:items-center sm:justify-center sm:gap-2">
            {PARKING_GUIDELINES.map((s) => {
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(s.step)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-4 sm:py-2 rounded-xl text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A3B34] text-[#F6E7A7] shadow-sm ring-1 ring-[#1A3B34]'
                      : 'bg-white text-[#1A3B34]/80 border border-[#E8DCC6] hover:bg-[#F9F7F2] hover:text-[#1A3B34]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] sm:text-xs flex items-center justify-center font-bold shrink-0 transition-colors ${
                      isActive ? 'bg-[#F6E7A7] text-[#1A3B34]' : 'bg-[#1A3B34]/10 text-[#1A3B34]'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold leading-tight whitespace-nowrap">
                    <span className="sm:hidden">{s.shortTag}</span>
                    <span className="hidden sm:inline">{s.tag}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          {PARKING_GUIDELINES.map((s) => {
            if (s.step !== activeStep) return null;

            return (
              <div
                key={s.step}
                className="bg-white rounded-2xl border border-[#E8DCC6] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Image View with Lightbox Zoom */}
                <div className="lg:col-span-7 relative bg-neutral-900 group min-h-[260px] sm:min-h-[340px] flex items-center justify-center">
                  <img
                    src={s.image}
                    alt={s.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = '1';
                        target.src = `/images/parking/${encodeURIComponent(s.filename)}`;
                      }
                    }}
                    className="w-full h-full max-h-[440px] object-contain sm:object-cover object-center group-hover:scale-101 transition-transform duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxImage({ src: s.image, title: s.title, caption: s.summary })}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 hover:bg-black text-white text-xs flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                    title="Expand Photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium hidden sm:inline">Zoom</span>
                  </button>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1A3B34]/90 backdrop-blur-xs text-[#F6E7A7] text-[11px] font-bold uppercase tracking-wider">
                    Step {s.step} of 5 · {s.tag}
                  </div>
                </div>

                {/* Text Guidelines */}
                <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B4B] block">
                        Step {s.step}
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A3B34] mt-0.5">
                        {s.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#1A3B34]/80 mt-1 leading-relaxed">
                        {s.summary}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#E8DCC6]">
                      {s.details.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#1A3B34]/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8CA58A] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F9F7F2] border border-[#E8DCC6] text-xs text-[#1A3B34]/90">
                      <span className="font-bold text-[#C59B4B] mr-1">Tip:</span>
                      <span>{s.tip}</span>
                    </div>
                  </div>

                  {/* Step Navigation Prev / Next */}
                  <div className="pt-3 border-t border-[#E8DCC6] flex items-center justify-between">
                    <button
                      type="button"
                      disabled={s.step === 1}
                      onClick={() => setActiveStep(s.step - 1)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        s.step === 1
                          ? 'opacity-30 cursor-not-allowed text-neutral-400'
                          : 'text-[#1A3B34] hover:bg-[#F9F7F2] cursor-pointer'
                      }`}
                    >
                      ← Previous
                    </button>

                    <div className="flex items-center gap-1.5">
                      {PARKING_GUIDELINES.map((dot) => (
                        <button
                          key={dot.step}
                          type="button"
                          onClick={() => setActiveStep(dot.step)}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            dot.step === activeStep ? 'w-5 bg-[#C59B4B]' : 'bg-[#E8DCC6]'
                          }`}
                          aria-label={`Jump to step ${dot.step}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={s.step === PARKING_GUIDELINES.length}
                      onClick={() => setActiveStep(s.step + 1)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 ${
                        s.step === PARKING_GUIDELINES.length
                          ? 'opacity-30 cursor-not-allowed text-neutral-400'
                          : 'text-[#1A3B34] hover:bg-[#F9F7F2] cursor-pointer'
                      }`}
                    >
                      <span>Next</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Quick 5-Step Photo Thumbnails Strip */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-1">
            {PARKING_GUIDELINES.map((s) => {
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => {
                    setActiveStep(s.step);
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className={`p-1.5 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 sm:gap-2 ${
                    isActive
                      ? 'bg-white border-[#C59B4B] ring-2 ring-[#C59B4B]/30 shadow-xs'
                      : 'bg-white/70 border-[#E8DCC6] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#C59B4B]">
                      <span className="sm:hidden">#{s.step}</span>
                      <span className="hidden sm:inline">Step {s.step}</span>
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#1A3B34]/60 truncate ml-1 hidden xs:inline sm:inline">
                      {s.shortTag}
                    </span>
                  </div>
                  <div className="h-10 sm:h-16 w-full rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center">
                    <img
                      src={s.image}
                      alt={s.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = '1';
                          target.src = `/images/parking/${encodeURIComponent(s.filename)}`;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Embedded YouTube Video Walk-Through */}
        <section id="video-guide" className="scroll-mt-28">
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E8DCC6] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E8DCC6] pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A3B34]">
                  Video Route Walk-Through
                </h3>
                <p className="text-xs text-[#1A3B34]/70">
                  Drive-in from Kūhiō Ave to garage ramp.
                </p>
              </div>

              <a
                href="https://www.youtube.com/watch?v=onlwM0uaKis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A3B34] hover:text-[#C59B4B]"
              >
                <span>Open in YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-[#E8DCC6] bg-black">
              <iframe
                src="https://www.youtube.com/embed/onlwM0uaKis"
                title="Waikiki Banyan Parking Location Video Guide"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Garage Rules (Minimal, Clean) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DCC6] shadow-xs space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8CA58A]" />
              <h3 className="font-serif text-base font-bold text-[#1A3B34]">
                Parking Pass
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs text-[#1A3B34]/80">
              <li>• 1 dedicated parking pass included with your suite.</li>
              <li>• Display face-up on vehicle dashboard while parked.</li>
              <li>• Unlimited 24/7 in &amp; out parking access.</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DCC6] shadow-xs space-y-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#C59B4B]" />
              <h3 className="font-serif text-base font-bold text-[#1A3B34]">
                Garage Rules
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs text-[#1A3B34]/80">
              <li>• <strong>6' 0" height clearance:</strong> strictly enforced.</li>
              <li>• Park only in open unreserved parking spaces.</li>
              <li>• Do not park in spaces designated Reserved, Staff, or Loading Only.</li>
              <li>• 5 MPH speed limit throughout the structure.</li>
            </ul>
          </div>
        </section>

        {/* Host Contact */}
        <section className="bg-[#1A3B34] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              Need Help Finding the Garage?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light mt-0.5">
              Contact our on-island host for arrival assistance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="px-4 py-2.5 rounded-full bg-[#C59B4B] hover:bg-[#b0883d] text-[#1A3B34] font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate('/rules')}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Rules
            </button>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="bg-neutral-900 text-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-3 sm:p-4 bg-neutral-900 border-t border-neutral-800 space-y-0.5">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white">
                {lightboxImage.title}
              </h4>
              <p className="text-xs text-neutral-400 font-light">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
