import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Calendar, Users, Home, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { PROPERTIES } from '../../data/properties';
import { SITE_CONFIG } from '../../config/site';
import { InquiryFormData } from '../../types';

interface InquiryFormProps {
  preselectedPropertyId?: string;
  onSuccess?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  preselectedPropertyId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    preferredProperty: preselectedPropertyId || '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMessage('Please provide your full first and last name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address so we can reply with your reservation details.');
      return;
    }
    if (!formData.checkIn || !formData.checkOut) {
      setErrorMessage('Please select your preferred check-in and check-out dates.');
      return;
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      setErrorMessage('Check-out date must be after your check-in date.');
      return;
    }

    setStatus('submitting');

    // Simulate direct inquiry processing with mailto option or verified receipt
    setTimeout(() => {
      setStatus('success');
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    }, 900);
  };

  if (status === 'success') {
    const selectedProp = PROPERTIES.find((p) => p.id === formData.preferredProperty);
    return (
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#0D274D]">
            Mahalo, {formData.firstName}!
          </h3>
          <p className="text-[#0D274D]/80 text-sm max-w-md mx-auto leading-relaxed">
            Your stay inquiry for <strong className="text-[#0D274D]">{selectedProp ? selectedProp.name : 'Waikiki Banyan'}</strong> ({formData.checkIn} to {formData.checkOut}) has been received.
          </p>
          <p className="text-xs text-[#0D274D]/70 pt-1">
            Our local Plumeria team will review dates and respond directly to <strong className="text-[#186A9E]">{formData.email}</strong> within 12–24 hours with exact availability and rates.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Stay%20Inquiry%20from%20${encodeURIComponent(formData.firstName)}&body=Hi%20Plumeria%20Team,%0A%0AI%20submitted%20an%20inquiry%20for%20${encodeURIComponent(formData.checkIn)}%20to%20${encodeURIComponent(formData.checkOut)}%20for%20${formData.guests}%20guests.%0A%0AThank%20you!`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#186A9E] text-white hover:bg-[#0D274D] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open Direct Email Client</span>
          </a>
          <button
            onClick={() => setStatus('idle')}
            className="px-5 py-2.5 rounded-full text-xs font-medium text-[#0D274D]/70 hover:text-[#0D274D] hover:bg-emerald-100/50 transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-firstName" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            First Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="text"
              id="inquiry-firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Kaia"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] placeholder:text-[#0D274D]/35 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-lastName" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="text"
              id="inquiry-lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Kealoha"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] placeholder:text-[#0D274D]/35 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
            />
          </div>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="email"
              id="inquiry-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] placeholder:text-[#0D274D]/35 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Phone <span className="text-[#0D274D]/40 text-[10px] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="tel"
              id="inquiry-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] placeholder:text-[#0D274D]/35 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
            />
          </div>
        </div>
      </div>

      {/* Dates row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-checkIn" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Check-In Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="date"
              id="inquiry-checkIn"
              name="checkIn"
              required
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-checkOut" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Check-Out Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <input
              type="date"
              id="inquiry-checkOut"
              name="checkOut"
              required
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
            />
          </div>
        </div>
      </div>

      {/* Guests & Preferred Property */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-guests" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Number of Guests
          </label>
          <div className="relative">
            <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <select
              id="inquiry-guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
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
          <label htmlFor="inquiry-preferredProperty" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
            Preferred Waikiki Banyan Suite
          </label>
          <div className="relative">
            <Home className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D274D]/40" />
            <select
              id="inquiry-preferredProperty"
              name="preferredProperty"
              value={formData.preferredProperty}
              onChange={handleChange}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
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
        <label htmlFor="inquiry-message" className="block text-xs font-semibold uppercase tracking-wider text-[#0D274D]/80 mb-1.5">
          Special Requests or Questions <span className="text-[#0D274D]/40 text-[10px] font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 absolute left-3.5 top-3 text-[#0D274D]/40" />
          <textarea
            id="inquiry-message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your trip to Waikiki, arrival times, parking inquiries, or questions..."
            className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#0D274D]/15 rounded-xl text-[#0D274D] placeholder:text-[#0D274D]/35 focus:outline-none focus:ring-2 focus:ring-[#186A9E]/30 focus:border-[#186A9E]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        id="inquiry-submit-btn"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 rounded-xl bg-[#186A9E] hover:bg-[#0D274D] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
      >
        {status === 'submitting' ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Sending Inquiry...</span>
          </div>
        ) : (
          <>
            <Send className="w-4 h-4 text-[#F5B82E]" />
            <span>Send Stay Inquiry to Plumeria</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-[#0D274D]/60 text-center pt-1">
        Direct inquiry to host · No booking fees · Prompt response within 24 hours
      </p>
    </form>
  );
};
