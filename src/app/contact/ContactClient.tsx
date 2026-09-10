"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { submitContactForm } from "@/lib/firestoreService";

const BOUTIQUES = [
  {
    city: "Mumbai (Flagship Atelier)",
    address: "Siya Grand Arcade, Linking Road, Bandra West, Mumbai 400050",
    phone: "+91 98765 43210",
    email: "mumbai@siyajewels.com",
    hours: "Mon - Sun: 11:00 AM - 8:30 PM",
  },
  {
    city: "New Delhi Boutique",
    address: "M-Block Market, Greater Kailash 1, New Delhi 110048",
    phone: "+91 98765 43211",
    email: "delhi@siyajewels.com",
    hours: "Tue - Sun: 11:00 AM - 8:00 PM (Monday Closed)",
  },
  {
    city: "Bengaluru Lounge",
    address: "100ft Road, 2nd Stage, Indiranagar, Bengaluru 560038",
    phone: "+91 98765 43212",
    email: "bengaluru@siyajewels.com",
    hours: "Mon - Sun: 10:30 AM - 8:00 PM",
  },
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bespoke Bridal Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all mandatory fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm({
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
      toast.success("Inquiry Submitted", "Our jewellery concierge will reach out to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Bespoke Bridal Inquiry",
        message: "",
      });
    } catch {
      toast.error("Submission error", "Please try again or connect via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Concierge At Your Service</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight">
            Connect with Siya Jewels
          </h1>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-neutral-500">
            For bespoke bridal designs, gemstone consultation, or store appointments, our master gemologists are here to assist you.
          </p>
        </div>

        {/* Grid: Left Form, Right Boutique Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCF9F4] p-6 sm:p-8 rounded-3xl border border-amber-200">
            <h2 className="font-serif text-xl font-bold text-neutral-900 mb-2">
              Send an Inquiry to Our Stylists
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              We respond to all bespoke consultation requests within 2-4 business hours.
            </p>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Thank you for writing to Siya Jewels!</strong>
                  Your message has been received. Our senior stylist will connect with you via phone/WhatsApp.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Shalini Singhal"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="shalini@example.com"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Subject / Inquiry Type</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Bespoke Bridal Inquiry">Bespoke Bridal Inquiry</option>
                    <option value="Solitaire Ring Customization">Solitaire Ring Customization</option>
                    <option value="Virtual Video Consultation">Virtual Video Consultation</option>
                    <option value="Existing Order Tracking">Existing Order Tracking</option>
                    <option value="Store Appointment">Flagship Boutique Appointment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Message / Requirements *</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the jewellery design, budget preference, or occasion date..."
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B58E22] text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Boutique Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-[#171510] text-[#E8D7B0] border border-[#D4AF37]/40 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm font-bold text-white">Instant WhatsApp Concierge</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Chat live with our certified gemologist</p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hello%20Siya%20Jewels%20Concierge"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Now</span>
              </a>
            </div>

            <div className="space-y-4">
              {BOUTIQUES.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FCF9F4] border border-amber-100 hover:border-amber-300 transition space-y-2 text-xs"
                >
                  <h4 className="font-serif text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" /> {b.city}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">{b.address}</p>
                  <div className="flex flex-col gap-1 pt-1 text-neutral-500 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#B58E22]" /> {b.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#B58E22]" /> {b.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B58E22]" /> {b.hours}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Map Visual */}
        <div className="rounded-3xl overflow-hidden border border-amber-200 shadow-md">
          <div className="bg-[#171510] px-6 py-3 text-white flex items-center justify-between text-xs">
            <span className="font-serif font-bold text-amber-200">Siya Jewels Flagship Ateliers Location</span>
            <span className="text-neutral-400">Linking Road, Bandra West, Mumbai</span>
          </div>
          <div className="relative w-full h-64 sm:h-80 bg-neutral-100">
            <iframe
              title="Siya Jewels Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.439818816551!2d72.8317765149008!3d19.06203118709425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c918c5efb057%3A0xe54d314841961601!2sLinking%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
