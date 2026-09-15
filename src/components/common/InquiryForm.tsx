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
} from 'lucide-react';
import { PROPERTIES } from '../../data/properties';
import { SITE_CONFIG } from '../../config/site';
import {
  generateInquiryMailtoUrl,
  buildInquiryEmailText,
  openInquiryMailto,
} from '../../utils/mailto';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: initialGuests,
    preferredProperty: initialPropertyId,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute number of nights and discount rate
  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn).getTime();
    const end = new Date(formData.checkOut).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  }, [formData.checkIn, formData.checkOut]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const suiteName = selectedProp ? `${selectedProp.name} (${selectedProp.viewType})` : 'Waikiki Banyan Suite';

    return (
      <div className="bg-[#F9F7F2] border border-[#E8DCC6] rounded-3xl p-4 sm:p-8 text-center space-y-4 sm:space-y-6 animate-fade-in shadow-xs">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#8CA58A]/20 text-[#1A3B34] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#8CA58A]/30">
          <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-[#1A3B34]" />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#C59B4B] block">
            Inquiry Prepared · 15% Discount Attached
          </span>
          <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#1A3B34]">
            Mahalo, {formData.firstName}!
          </h3>
          <p className="text-[#1A3B34]/85 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
            We’ve opened your email app with a pre-filled booking request for <strong className="text-[#1A3B34] font-semibold">{suiteName}</strong> ({formData.checkIn} to {formData.checkOut}). Your inquiry includes the <strong className="text-[#1A3B34] font-semibold">15% Direct Website Discount</strong> ($255/night direct rate applied upon host acceptance).
          </p>
        </div>

        {/* Primary Mailto Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1">
          <a
            href={mailtoUrl}
            id="mailto-success-open-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1A3B34] text-white hover:bg-[#224D44] transition-all shadow-md cursor-pointer border border-[#C59B4B]/30 min-h-[44px]"
          >
            <Mail className="w-4 h-4 text-[#F6E7A7] shrink-0" />
            <span>Open in Email App (mailto)</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/60 shrink-0" />
          </a>

          <button
            type="button"
            id="copy-inquiry-details-btn"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full text-xs font-semibold bg-white border border-[#E8DCC6] text-[#1A3B34] hover:bg-[#E8DCC6]/40 transition-colors shadow-2xs cursor-pointer min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#8CA58A] shrink-0" />
                <span className="text-[#1A3B34] font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#C59B4B] shrink-0" />
                <span>Copy Inquiry Details</span>
              </>
            )}
          </button>
        </div>

        {/* Inquiry Preview Box */}
        <div className="text-left bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E8DCC6] text-xs text-[#1A3B34]/80 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DCC6]/60 text-[10px]">
            <span className="font-bold uppercase tracking-wider text-[#1A3B34]/60 truncate mr-2">
              Recipient: {SITE_CONFIG.email}
            </span>
            <span className="text-[#8CA58A] font-semibold shrink-0">Subject: Stay Inquiry</span>
          </div>
          <pre className="whitespace-pre-wrap break-words font-sans text-[11px] sm:text-xs text-[#1A3B34]/85 leading-relaxed pt-1 max-h-40 overflow-y-auto custom-scrollbar">
            {formattedEmailBody}
          </pre>
        </div>

        <div className="pt-1 text-[11px] sm:text-xs text-[#1A3B34]/70 space-y-1">
          <p>
            Prefer calling or texting? Plumeria host team:{' '}
            <a href="tel:+18086719191" className="font-semibold text-[#1A3B34] hover:underline whitespace-nowrap">
              {SITE_CONFIG.phone}
            </a>
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-[11px] font-semibold text-[#8CA58A] hover:underline cursor-pointer pt-1 block mx-auto"
          >
            ← Modify Details or Submit Another Inquiry
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

      {/* Unified Mobile-Friendly 15% Booking Special & Direct Contact Card */}
      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#1A3B34] to-[#244E45] text-white border border-[#C59B4B]/35 shadow-xs space-y-2.5">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C59B4B] text-[#1A3B34] flex flex-col items-center justify-center shrink-0 shadow-2xs font-black">
            <span className="text-[11px] sm:text-xs leading-none">15%</span>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-tight leading-none mt-0.5">OFF</span>
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#F6E7A7]">
                Direct Website Booking Discount
              </span>
              <span className="px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-bold uppercase rounded bg-white/20 text-white whitespace-nowrap">
                Save $45/night
              </span>
            </div>
            <p className="text-[11px] text-white/85 leading-tight sm:leading-relaxed font-light">
              Receive <strong>15% off standard nightly rates ($255/nt)</strong> + $0 resort fees and free covered garage parking when accepted by host!
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
            <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase bg-[#FF385C] text-white">
              Airbnb Listed
            </span>
            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Booking%20Inquiry%20-%20Waikiki%20Banyan%20(15%25%20Direct%20Discount)`}
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
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
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
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] text-sm bg-white border border-[#E8DCC6] rounded-xl text-[#1A3B34] focus:outline-none focus:ring-2 focus:ring-[#8CA58A]/40 focus:border-[#8CA58A]"
            />
          </div>
        </div>
      </div>

      {/* Dynamic 15% Discount Calculation Box when dates are selected */}
      {nights > 0 && (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#C59B4B]/50 shadow-2xs space-y-2 animate-fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4B] shrink-0" />
              <span className="font-serif font-bold text-xs sm:text-sm text-[#1A3B34] truncate">
                15% Discount ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-extrabold uppercase bg-[#C59B4B] text-[#1A3B34] shrink-0 whitespace-nowrap">
              Save ${nights * 45}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
            <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-[#E8DCC6]">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#1A3B34]/50 block leading-tight">Standard</span>
              <span className="font-medium text-[#1A3B34]/50 line-through text-xs sm:text-sm">${nights * 300}</span>
              <span className="text-[8px] sm:text-[9px] text-[#1A3B34]/50 block">($300/nt)</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#1A3B34] text-white border border-[#C59B4B]/40">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#F6E7A7] block leading-tight">Your Rate</span>
              <span className="font-bold text-xs sm:text-base text-white">${nights * 255}</span>
              <span className="text-[8px] sm:text-[9px] text-[#F6E7A7] block font-medium">($255/nt)</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#8CA58A]/20 border border-[#8CA58A]/30">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#1A3B34] block leading-tight">You Save</span>
              <span className="font-bold text-xs sm:text-base text-[#1A3B34]">${nights * 45}</span>
              <span className="text-[8px] sm:text-[9px] text-[#1A3B34]/70 block font-medium">15% Off</span>
            </div>
          </div>

          <div className="text-[10px] sm:text-[11px] text-[#1A3B34]/80 flex flex-wrap items-center justify-center sm:justify-between gap-1 sm:gap-1.5 pt-1.5 border-t border-[#E8DCC6] text-center">
            <span>✨ $0 Mandatory Resort Fees</span>
            <span className="hidden xs:inline">•</span>
            <span>🚗 Free Covered Parking</span>
            <span className="hidden xs:inline">•</span>
            <span className="text-[#8CA58A] font-semibold">Applied upon host acceptance</span>
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
                  {p.name} ({p.viewType})
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

      {/* Submit Button */}
      <button
        type="submit"
        id="inquiry-submit-btn"
        disabled={status === 'submitting'}
        className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-[#1A3B34] hover:bg-[#224D44] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer border border-[#C59B4B]/30 min-h-[46px]"
      >
        {status === 'submitting' ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
            <span>Preparing Your 15% Discount Inquiry...</span>
          </div>
        ) : (
          <>
            <Mail className="w-4 h-4 text-[#F6E7A7] shrink-0" />
            <span className="truncate">
              {nights > 0
                ? `Send Inquiry · Save 15% ($${nights * 255})`
                : 'Send Inquiry · Request 15% Website Discount'}
            </span>
          </>
        )}
      </button>

      <div className="text-[10.5px] sm:text-[11px] text-[#1A3B34]/65 text-center pt-0.5 space-y-0.5">
        <p>Direct inquiry to host · 15% discount applied upon booking acceptance · $0 resort fees</p>
        <p className="text-[9.5px] sm:text-[10px] text-[#1A3B34]/60">
          By inquiring or booking, guests agree to follow the Waikiki Banyan Building Rules.
        </p>
      </div>
    </form>
  );
};
