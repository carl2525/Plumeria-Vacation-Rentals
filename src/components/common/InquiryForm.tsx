import React, { useState, useMemo } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  Home,
  User,
  Mail,
  Phone,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Tag,
  ShieldCheck,
  Info,
  Clock,
  Car,
  Utensils,
  Eye,
} from 'lucide-react';
import { PlumeriaSymbolLogo } from '../brand/PlumeriaSymbolLogo';
import { PROPERTIES } from '../../data/properties';
import { SITE_CONFIG } from '../../config/site';
import {
  generateInquiryMailtoUrl,
  buildInquiryEmailText,
  openInquiryMailto,
} from '../../utils/mailto';
import {
  calculateStayPricing,
  formatCurrency,
  BASE_NIGHTLY_RATE,
  TAX_RATES,
} from '../../utils/pricing';
import { getTodayDateString, getNextDayDateString, isDateInPast } from '../../utils/date';

interface InquiryFormProps {
  initialPropertyId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onSuccess?: () => void;
  title?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialPropertyId = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
  onSuccess,
  title,
}) => {
  const today = getTodayDateString();
  const safeInitialCheckIn = initialCheckIn && !isDateInPast(initialCheckIn) ? initialCheckIn : '';
  const safeInitialCheckOut =
    initialCheckOut && safeInitialCheckIn && initialCheckOut > safeInitialCheckIn
      ? initialCheckOut
      : '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: safeInitialCheckIn,
    checkOut: safeInitialCheckOut,
    guests: initialGuests,
    preferredProperty: initialPropertyId,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const minCheckOutDate = formData.checkIn
    ? getNextDayDateString(formData.checkIn, 1)
    : getNextDayDateString(today, 1);

  // Compute number of nights and discount rate
  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn).getTime();
    const end = new Date(formData.checkOut).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  }, [formData.checkIn, formData.checkOut]);

  const pricing = useMemo(() => calculateStayPricing(nights), [nights]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    if (newCheckIn && isDateInPast(newCheckIn)) {
      setFormData((prev) => ({
        ...prev,
        checkIn: today,
        checkOut: prev.checkOut && prev.checkOut <= today ? getNextDayDateString(today, 1) : prev.checkOut,
      }));
      return;
    }

    setFormData((prev) => {
      const shouldAdjustCheckout = newCheckIn && prev.checkOut && prev.checkOut <= newCheckIn;
      return {
        ...prev,
        checkIn: newCheckIn,
        checkOut: shouldAdjustCheckout ? getNextDayDateString(newCheckIn, 1) : prev.checkOut,
      };
    });
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value;
    if (newCheckOut && newCheckOut < minCheckOutDate) {
      setFormData((prev) => ({ ...prev, checkOut: minCheckOutDate }));
      return;
    }
    setFormData((prev) => ({ ...prev, checkOut: newCheckOut }));
  };

  const mailtoUrl = generateInquiryMailtoUrl(formData);
  const formattedEmailBody = buildInquiryEmailText(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    if (!formData.checkIn || !formData.checkOut) {
      setErrorMessage('Please select both Check-In and Check-Out dates.');
      return;
    }

    if (formData.checkIn < today) {
      setErrorMessage('Check-In date cannot be in the past.');
      return;
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      setErrorMessage('Check-Out date must be after Check-In date.');
      return;
    }

    setStatus('submitting');

    // Automatically trigger mailto link to open the visitor's email client
    try {
      openInquiryMailto(formData);
    } catch {
      // Gracefully fall back if browser intercepts window.location
    }

    setTimeout(() => {
      setStatus('success');
      if (onSuccess) {
        onSuccess();
      }
    }, 400);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedEmailBody).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  if (status === 'success') {
    const selectedProp = PROPERTIES.find((p) => p.id === formData.preferredProperty);
    const suiteName = selectedProp ? selectedProp.name : 'Waikiki Banyan Suite';

    return (
      <div className="space-y-4 sm:space-y-5 animate-fade-in text-left">
        {/* Luxury Voucher Header Card */}
        <div className="bg-gradient-to-br from-[#1A3B34] via-[#204940] to-[#142D27] text-white p-4 sm:p-6 rounded-3xl border border-[#C59B4B]/50 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#C59B4B]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/15 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 p-1.5 flex items-center justify-center border border-white/20 shadow-xs">
                <PlumeriaSymbolLogo className="w-full h-full" variant="light" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6E7A7] block">
                  Direct Booking Inquiry
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-wide">
                  Mahalo, {formData.firstName || 'Guest'}!
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#C59B4B] text-[#1A3B34] shadow-xs">
                $199 / Nt Promo Rate
              </span>
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/15 text-[#F6E7A7] border border-white/20">
                Tower 2
              </span>
            </div>
          </div>

          <p className="text-white/85 text-xs sm:text-sm pt-3 leading-relaxed font-light relative z-10">
            Your booking inquiry has been prepared with our special <strong className="font-semibold text-[#F6E7A7]">Promotional $199/Night Rate (All Units)</strong> and <strong className="font-semibold text-white">$0 Resort Fees</strong>. An email draft has been generated for your email application.
          </p>
        </div>

        {/* Stay Summary Voucher Grid */}
        <div className="bg-[#F9F7F2] border border-[#E8DCC6] rounded-2xl p-3.5 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-[#E8DCC6]/80 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A3B34]">
              <Sparkles className="w-4 h-4 text-[#C59B4B]" />
              <span className="uppercase tracking-wider text-[11px]">Inquiry Summary Voucher</span>
            </div>
            <span className="text-[10.5px] font-medium text-[#1A3B34]/60">
              City & County of Honolulu Licensed STR
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            {/* Suite */}
            <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#E8DCC6]/70">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/50 block mb-0.5">
                Suite
              </span>
              <p className="font-semibold text-[#1A3B34] truncate text-xs sm:text-sm">
                {suiteName}
              </p>
              <span className="text-[10px] text-[#8CA58A] font-medium">Tower 2 High Floor</span>
            </div>

            {/* Dates */}
            <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#E8DCC6]/70">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/50 block mb-0.5">
                Dates
              </span>
              <p className="font-semibold text-[#1A3B34] text-xs sm:text-sm truncate">
                {formData.checkIn || 'TBD'} → {formData.checkOut || 'TBD'}
              </p>
              <span className="text-[10px] text-[#C59B4B] font-bold">
                {nights > 0 ? `${nights} Nights` : 'Flexible Dates'}
              </span>
            </div>

            {/* Guests */}
            <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#E8DCC6]/70">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A3B34]/50 block mb-0.5">
                Party
              </span>
              <p className="font-semibold text-[#1A3B34] text-xs sm:text-sm">
                {formData.guests} {Number(formData.guests) === 1 ? 'Guest' : 'Guests'}
              </p>
              <span className="text-[10px] text-[#1A3B34]/60">Up to 4–5 max</span>
            </div>

            {/* Total Estimate */}
            <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#C59B4B]/40 bg-gradient-to-br from-white to-[#F9F7F2]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B4B] block mb-0.5">
                Estimated Total
              </span>
              <p className="font-serif font-bold text-sm sm:text-base text-[#1A3B34]">
                {nights > 0 ? formatCurrency(pricing.grandTotal) : '$199 / nt'}
              </p>
              <span className="text-[9.5px] text-[#1A3B34]/60 block truncate">
                Formula: Base + Clean + Tax
              </span>
            </div>
          </div>

          {/* Included Amenities Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-[#E8DCC6]/70 text-[10.5px] text-[#1A3B34]/80">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              $0 Mandatory Resort Fees
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
              <Car className="w-3.5 h-3.5 text-[#C59B4B]" />
              Free Covered Garage Parking
            </span>
            <span className="inline-flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-[#8CA58A]" />
              Full Kitchen in Suite
            </span>
          </div>
        </div>

        {/* Verification & Final Computation Notice Card */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50/70 via-[#F9F7F2] to-amber-50/70 border border-[#C59B4B]/50 text-left space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A3B34]">
              <ShieldCheck className="w-4 h-4 text-[#C59B4B] shrink-0" />
              <span>Final Details, Computation & Email Verification</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#1A3B34] text-[#F6E7A7]">
              Notice
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#1A3B34]/85 leading-relaxed font-light">
            Your final reservation details and verified cost computation will be sent directly to{' '}
            <strong className="font-semibold text-[#1A3B34]">
              {formData.email || 'your email'}
            </strong>
            .
          </p>
          <div className="flex items-start gap-1.5 pt-1 text-[11px] sm:text-xs text-[#1A3B34]/80 leading-relaxed font-light border-t border-[#C59B4B]/20">
            <Info className="w-3.5 h-3.5 text-[#8CA58A] shrink-0 mt-0.5" />
            <span>
              <strong className="font-semibold text-[#1A3B34]">Inbox Delivery Tip:</strong> If your email app opens, tap <strong>Send</strong>. If you do not see a reply from our team within 12–24 hours, please check your <em>Spam or Junk</em> folder and mark it as &ldquo;Not Spam&rdquo;, or contact us directly at <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold underline text-[#1A3B34]">{SITE_CONFIG.email}</a>.
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1">
          <a
            href={mailtoUrl}
            id="mailto-success-open-btn"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#1A3B34] text-white hover:bg-[#224D44] transition-all shadow-md cursor-pointer border border-[#C59B4B]/40 min-h-[48px]"
          >
            <Mail className="w-4 h-4 text-[#F6E7A7] shrink-0" />
            <span>Open Email Client to Send (mailto)</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/60 shrink-0" />
          </a>

          <button
            type="button"
            id="copy-inquiry-details-btn"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-semibold bg-white border border-[#E8DCC6] text-[#1A3B34] hover:bg-[#E8DCC6]/40 transition-colors shadow-2xs cursor-pointer min-h-[48px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-bold">Copied Styled Inquiry!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>Copy Formatted Inquiry Text</span>
              </>
            )}
          </button>
        </div>

        {/* Formatted Email Preview Window */}
        <div className="text-left bg-white rounded-2xl border border-[#E8DCC6] text-xs text-[#1A3B34]/85 shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F9F7F2] border-b border-[#E8DCC6] text-[10.5px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-bold text-[#1A3B34] truncate">
                To: {SITE_CONFIG.email}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-[#8CA58A] font-semibold text-[10px]">
              <Eye className="w-3 h-3 text-[#8CA58A]" />
              <span>Inquiry Email Preview</span>
            </div>
          </div>
          <div className="p-3.5 max-h-52 overflow-y-auto custom-scrollbar font-mono text-[11px] leading-relaxed text-[#1A3B34]/90 bg-neutral-50/50">
            <pre className="whitespace-pre-wrap break-words font-mono">
              {formattedEmailBody}
            </pre>
          </div>
        </div>

        {/* Host Support & Reset */}
        <div className="pt-2 text-center text-xs text-[#1A3B34]/70 space-y-1">
          <p>
            Prefer calling or texting? Plumeria direct line:{' '}
            <a href="tel:+18086719191" className="font-semibold text-[#1A3B34] hover:underline whitespace-nowrap">
              {SITE_CONFIG.phone}
            </a>
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-[11px] font-semibold text-[#8CA58A] hover:underline cursor-pointer pt-1 inline-block"
          >
            ← Modify Dates / Edit Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
      {title && (
        <div className="border-b border-[#E8DCC6] pb-2.5 mb-1">
          <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#1A3B34]">
            {title}
          </h2>
          <p className="text-xs text-[#1A3B34]/70 font-light">
            Fill out your desired dates and suite. Submitting automatically prepares a direct reservation email via mailto.
          </p>
        </div>
      )}

      {/* Unified Mobile-Friendly Direct Host Value & Contact Card */}
      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#1A3B34] to-[#244E45] text-white border border-[#C59B4B]/35 shadow-xs space-y-2.5">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C59B4B] text-[#1A3B34] flex flex-col items-center justify-center shrink-0 shadow-2xs font-black">
            <span className="text-[11px] sm:text-xs leading-none">$199</span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-tight leading-none mt-0.5">PROMO</span>
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#F6E7A7]">
                Special Rate Promotion · All Units
              </span>
              <span className="px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-bold uppercase rounded bg-white/20 text-white whitespace-nowrap">
                $0 Resort Fees
              </span>
            </div>
            <p className="text-[11px] text-white/85 leading-tight sm:leading-relaxed font-light">
              Enjoy our limited-time <strong>$199/night promo rate</strong>, free covered parking pass, and incremental stay discounts for longer trips upon host acceptance!
            </p>
          </div>
        </div>

        {/* Host Contact Line - Safe overflow with break-all and email button */}
        <div className="pt-2 border-t border-white/15 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <Mail className="w-3.5 h-3.5 text-[#F6E7A7] shrink-0" />
            <span className="text-white/70 shrink-0">Host:</span>
            <span className="font-medium text-white break-all text-[10.5px] sm:text-[11px]">
              {SITE_CONFIG.email}
            </span>
          </div>
          <div className="flex items-center gap-2 self-start xs:self-auto shrink-0">
            <a
              href={SITE_CONFIG.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 rounded text-[8.5px] font-bold uppercase bg-[#FF385C] hover:bg-[#E00B41] text-white transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer"
              title="View on Airbnb"
            >
              <span>Airbnb Listed</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Booking%20Inquiry%20-%20Waikiki%20Banyan%20(Direct%20Booking)`}
              className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#F6E7A7] hover:underline"
            >
              <span>Email Directly</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="inquiry-firstName" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            First Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <input
              type="text"
              id="inquiry-firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Kaia"
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/35 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-lastName" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <input
              type="text"
              id="inquiry-lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Kealoha"
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/35 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
          </div>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="inquiry-email" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <input
              type="email"
              id="inquiry-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/35 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Phone <span className="text-[#1A3B34]/40 text-[10px] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <input
              type="tel"
              id="inquiry-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/35 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
          </div>
        </div>
      </div>

      {/* Dates row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="inquiry-checkIn" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Check-In Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <input
              type="date"
              id="inquiry-checkIn"
              name="checkIn"
              required
              min={today}
              value={formData.checkIn}
              onChange={handleCheckInChange}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A] cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-checkOut" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Check-Out Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <input
              type="date"
              id="inquiry-checkOut"
              name="checkOut"
              required
              min={minCheckOutDate}
              value={formData.checkOut}
              onChange={handleCheckOutChange}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Want to waive cleaning fee reminder when dates are not yet selected */}
      {nights === 0 && (
        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-950 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span><strong>Want to waive the cleaning fee?</strong> Book 3 nights or more for a $0 cleaning fee!</span>
          </div>
          <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap">Save $250</span>
        </div>
      )}

      {/* Transparent Rate, Cleaning Fee, & Tax Breakdown */}
      {nights > 0 && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F9F7F2] border border-[#C59B4B]/50 shadow-xs space-y-3 animate-fade-in text-xs">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E8DCC6]">
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-4 h-4 text-[#C59B4B] shrink-0" />
              <span className="font-serif font-bold text-sm text-[#1A3B34] truncate">
                Pricing Estimate ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#1A3B34] text-[#F6E7A7] shrink-0">
              $199 / Night Promo
            </span>
          </div>

          <div className="space-y-1.5 text-[#1A3B34]/90">
            {/* Base room */}
            <div className="flex items-center justify-between">
              <span>Base Rate (${BASE_NIGHTLY_RATE} × {nights} {nights === 1 ? 'nt' : 'nts'}):</span>
              <span className="font-semibold">{formatCurrency(pricing.grossRoomTotal)}</span>
            </div>

            {/* Incremental Stay Discount */}
            {pricing.discountPercent > 0 && (
              <div className="flex items-center justify-between text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60 font-medium">
                <span>{pricing.discountPercent}% Extended Stay Discount ({nights}+ days):</span>
                <span className="font-bold">-{formatCurrency(pricing.discountAmount)}</span>
              </div>
            )}

            {/* Cleaning Fee */}
            <div className="flex items-center justify-between pt-1 border-t border-[#E8DCC6]/60">
              <div>
                <span>Cleaning Fee:</span>
                <span className="block text-[10px] text-[#1A3B34]/60">
                  {pricing.isCleaningFeeWaived ? (
                    <span className="text-emerald-700 font-semibold">✓ Waived for 3+ nights stay ($250 savings!)</span>
                  ) : (
                    <span className="text-amber-800 font-medium">$250 short stay fee (1–2 nights)</span>
                  )}
                </span>
              </div>
              <span className="font-semibold">
                {pricing.cleaningFee > 0 ? (
                  formatCurrency(pricing.cleaningFee)
                ) : (
                  <span className="text-emerald-700 font-bold">$0 (Waived)</span>
                )}
              </span>
            </div>

            {/* Want to waive cleaning fee incentive banner */}
            {!pricing.isCleaningFeeWaived && (
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/90 text-[11px] text-amber-950 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Want to waive the cleaning fee?</span> Book 3 nights or more to get a <strong>$0 cleaning fee</strong> (saving you $250)!
                </div>
              </div>
            )}

            {/* Hawaii Taxes (18.5% Total) - no breakdown */}
            <div className="pt-1.5 border-t border-[#E8DCC6]/60 flex items-center justify-between font-semibold text-[#1A3B34]">
              <div>
                <span>Hawaii Taxes (18.5%):</span>
                <span className="block text-[9.5px] font-normal text-[#1A3B34]/60">
                  Applied to Base Rate + Cleaning Fee
                </span>
              </div>
              <span>{formatCurrency(pricing.totalTaxes)}</span>
            </div>

            {/* Total formula */}
            <div className="pt-2 border-t border-[#1A3B34]/20 flex items-center justify-between font-bold text-sm text-[#1A3B34]">
              <div>
                <span className="block font-serif text-sm sm:text-base">Estimated Total:</span>
                <span className="block text-[9.5px] font-normal text-[#1A3B34]/60">
                  Formula: Base + Cleaning Fee + Taxes (18.5%)
                </span>
              </div>
              <span className="font-serif text-base sm:text-lg text-[#1A3B34]">
                {formatCurrency(pricing.grandTotal)}
              </span>
            </div>
          </div>

          <div className="text-[10px] sm:text-[11px] text-[#1A3B34]/80 flex flex-wrap items-center justify-center sm:justify-between gap-1 sm:gap-1.5 pt-2 border-t border-[#E8DCC6] text-center">
            <span>✨ $0 Resort fees</span>
            <span className="hidden xs:inline">•</span>
            <span>🚗 Free Covered Parking</span>
            <span className="hidden xs:inline">•</span>
            <span className="text-emerald-800 font-semibold">Honolulu Licensed STR</span>
          </div>
        </div>
      )}

      {/* Guests & Preferred Property */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="inquiry-guests" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Number of Guests
          </label>
          <div className="relative">
            <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <select
              id="inquiry-guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5 Guests</option>
              <option value={6}>6 Guests (Family Suite)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-preferredProperty" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
            Preferred Waikiki Banyan Suite
          </label>
          <div className="relative">
            <Home className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B34]/40 pointer-events-none" />
            <select
              id="inquiry-preferredProperty"
              name="preferredProperty"
              value={formData.preferredProperty}
              onChange={handleChange}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            >
              <option value="">Any Available Waikiki Banyan Suite</option>
              {PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="inquiry-message" className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A3B34]/80 mb-1">
          Special Requests or Questions <span className="text-[#1A3B34]/40 text-[10px] font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-[#1A3B34]/40 pointer-events-none" />
          <textarea
            id="inquiry-message"
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your trip to Waikiki, arrival times, parking inquiries, or questions..."
            className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] placeholder:text-[#1A3B34]/35 focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
          />
        </div>
      </div>

      {/* Verification & Final Computation Notice */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50/70 via-[#F9F7F2] to-amber-50/70 border border-[#C59B4B]/40 text-[#1A3B34] flex items-start gap-3 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-[#C59B4B]/15 text-[#C59B4B] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4 text-[#C59B4B]" />
        </div>
        <div className="space-y-0.5 text-[11px] sm:text-xs leading-relaxed font-light flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap font-semibold text-[#1A3B34]">
            <span>Final Details & Computation via Email</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#1A3B34] text-[#F6E7A7] font-bold uppercase tracking-wider">
              Verification Notice
            </span>
          </div>
          <p className="text-[#1A3B34]/80">
            Final reservation details and verified cost computation will be sent to your email. Please note that further identity and stay verification may be required in the email once your inquiry is sent.
          </p>
        </div>
      </div>

      {/* Stylized Send Email Inquiry CTA Button */}
      <button
        type="submit"
        id="inquiry-submit-btn"
        disabled={status === 'submitting'}
        className="group relative overflow-hidden w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-[#1A3B34] via-[#204940] to-[#1A3B34] hover:from-[#204940] hover:to-[#28594E] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer border border-[#C59B4B]/40 min-h-[52px]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 text-left">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
              <Mail className="w-4 h-4 text-[#F6E7A7]" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-white tracking-wide text-xs sm:text-sm truncate">
                {status === 'submitting'
                  ? 'Preparing Your Stay Inquiry...'
                  : nights > 0
                  ? `Send Inquiry · ${formatCurrency(pricing.grandTotal)} Total (${nights} nts)`
                  : 'Send Booking Inquiry · Promo $199/nt'}
              </span>
              <span className="block text-[10px] text-[#F6E7A7]/90 font-normal truncate">
                $199/nt Promo Rate · All Units · $0 Resort Fees · Free Covered Parking
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-[#F6E7A7] font-bold text-xs pl-2 group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Send</span>
            <Send className="w-4 h-4" />
          </div>
        </div>
      </button>

      <div className="text-[10.5px] sm:text-[11px] text-[#1A3B34]/65 text-center pt-0.5 space-y-0.5">
        <p>Direct host inquiry via mailto · Final computation sent in email · May require email verification</p>
        <p className="text-[9.5px] sm:text-[10px] text-[#1A3B34]/60">
          Authorized Short-Term Rental · City and County of Honolulu · Waikiki Banyan Tower 2
        </p>
      </div>
    </form>
  );
};
