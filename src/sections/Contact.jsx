import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Compass, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    // Confetti!
    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.7 }
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Wave element */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-brand-gray opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Get in Touch"
          title="Contact Our Coordinators"
          subtitle="Have questions about walk schedules, group registrations, or school seminars? Send us a message and our team will get back to you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Contact Cards & Map Placeholder */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
              Contact Information
            </h3>

            <div className="flex flex-col gap-4">
              {/* Location Card */}
              <div className="flex items-start gap-4 p-5 bg-brand-gray border border-gray-100/50 rounded-2xl">
                <div className="p-3 bg-blue-50 text-brand-blue rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins font-bold text-sm text-brand-dark">Nesting Beaches</span>
                  <span className="text-xs text-gray-500 font-sans mt-0.5">
                    Neelangarai to Besant Nagar Beaches, Chennai, Tamil Nadu, India
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 bg-brand-gray border border-gray-100/50 rounded-2xl">
                <div className="p-3 bg-teal-50 text-brand-teal rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins font-bold text-sm text-brand-dark">Email Enquiries</span>
                  <a href="mailto:sstcnchennai@gmail.com" className="text-xs text-brand-teal hover:underline font-sans mt-0.5">
                    sstcnchennai@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Vector Map Placeholder */}
            <div className="relative h-64 bg-slate-100 rounded-[24px] border border-gray-200 overflow-hidden flex items-center justify-center p-6 shadow-soft group hover:border-brand-teal/40 transition-colors">
              {/* Abstract Map Background grid */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-x-0 h-[2px] bg-brand-teal/10 top-1/3" />
              <div className="absolute inset-x-0 h-[2px] bg-brand-blue/10 top-2/3" />
              <div className="absolute inset-y-0 w-[2px] bg-brand-teal/10 left-1/2" />

              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-card text-brand-teal animate-bounce">
                  <Compass className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="font-poppins font-bold text-sm text-brand-dark">Chennai Shore Patrol Route</span>
                <span className="text-[10px] text-gray-400 font-sans font-medium uppercase tracking-wider">
                  Coordinates: 12.9818° N, 80.2762° E
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs bg-white hover:bg-gray-50"
                  onClick={() => window.open('https://maps.google.com/?q=Besant+Nagar+Beach+Chennai', '_blank')}
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Floating Labels */}
          <div className="lg:col-span-7 bg-brand-gray p-8 lg:p-10 rounded-[32px] border border-gray-100/50 shadow-soft text-left">
            <h3 className="font-poppins font-bold text-xl text-brand-dark tracking-tight mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-gray-400 font-sans mb-8">
              We respond to all verified emails within 48 hours.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4 bg-white rounded-[24px] border border-brand-teal/10 shadow-glow"
                >
                  <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-brand-teal flex items-center justify-center text-brand-teal">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-poppins font-bold text-lg text-brand-dark">Message Dispatched!</h4>
                  <p className="text-xs text-gray-500 font-sans max-w-xs">
                    Thank you, {formState.name}. Your mock enquiry has been sent. We will review it shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errorMsg}
                    </div>
                  )}

                  {/* Name Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark shadow-soft transition-colors placeholder-transparent"
                    />
                    <label
                      htmlFor="form-name"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm font-sans transition-all pointer-events-none
                        peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5
                        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-teal peer-focus:bg-white peer-focus:px-1.5 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-teal peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                    >
                      Full Name *
                    </label>
                  </div>

                  {/* Email Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark shadow-soft transition-colors placeholder-transparent"
                    />
                    <label
                      htmlFor="form-email"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm font-sans transition-all pointer-events-none
                        peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5
                        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-teal peer-focus:bg-white peer-focus:px-1.5 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-teal peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                    >
                      Email Address *
                    </label>
                  </div>

                  {/* Subject Input with Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="form-subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark shadow-soft transition-colors placeholder-transparent"
                    />
                    <label
                      htmlFor="form-subject"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm font-sans transition-all pointer-events-none
                        peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5
                        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-teal peer-focus:bg-white peer-focus:px-1.5 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-teal peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Input with Floating Label */}
                  <div className="relative">
                    <textarea
                      id="form-message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder=" "
                      required
                      className="peer w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark shadow-soft transition-colors placeholder-transparent resize-none"
                    />
                    <label
                      htmlFor="form-message"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm font-sans transition-all pointer-events-none
                        peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5
                        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-teal peer-focus:bg-white peer-focus:px-1.5 peer-focus:rounded-sm
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-brand-teal peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
                    >
                      Your Message *
                    </label>
                  </div>

                  <Button type="submit" variant="primary" className="py-4 rounded-xl flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
