import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Compass, CheckCircle2, User, Mail, Phone, Calendar, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import confetti from 'canvas-confetti';

const benefits = [
  {
    title: 'Hands-on Ecology',
    icon: Compass,
    color: 'text-brand-blue bg-blue-50 border-blue-100',
    desc: 'Get direct experience handling marine conservation work, nest protection, and releasing newborn hatchlings.'
  },
  {
    title: 'Community Network',
    icon: ShieldCheck,
    color: 'text-brand-teal bg-teal-50 border-teal-100',
    desc: 'Join a welcoming student-run collective. Interact with marine biologists, forestry officials, and fellow activists.'
  }
];

const checklistItems = [
  'Absolutely free of charge — only your dedication and time is needed.',
  'Comprehensive field training provided by expert coordinators.',
  'Patrol walk covers approximately 7 km (Neelangarai to Besant Nagar).',
  'Hatchery volunteer slots run in morning/evening shifts (2-3 hours).',
  'Perfect for students, researchers, and working professionals.'
];

export default function Volunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'walks' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate submission success
    setFormSubmitted(true);
    
    // Trigger celebratory confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', type: 'walks' });
    }, 3000);
  };

  return (
    <section id="volunteer" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-brand-light-blue blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="Join Our Movement"
          title="Become a Sea Turtle Guardian"
          subtitle="SSTCN is run entirely by citizen volunteers. Whether you are a student or a professional, you can help save Chennai's Olive Ridley sea turtles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Benefits & Intro */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left">
            <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
              Why Volunteer With Us?
            </h3>
            
            <p className="text-gray-500 font-sans leading-relaxed text-sm">
              Since 1988, thousands of students have walked the shores, relocated clutches, and released hatchlings. By joining us, you help keep a 35-year conservation legacy alive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <Card key={i} className="border border-gray-100 hover:shadow-md" hoverEffect={true}>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${benefit.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-poppins font-bold text-base text-brand-dark mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed">
                      {benefit.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Column: Requirements checklist & Call to Action */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left bg-brand-gray p-8 lg:p-10 rounded-[32px] border border-gray-100/50 shadow-soft">
            <h3 className="font-poppins font-bold text-xl text-brand-dark tracking-tight">
              Volunteering Requirements
            </h3>

            <div className="flex flex-col gap-4">
              {checklistItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 font-sans leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="h-[1px] bg-gray-200/50 my-2" />

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
              >
                Sign Up for Walks
              </Button>
              <span className="text-xs text-gray-400 font-sans">
                Next batch starts January 2026.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal Form Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[28px] p-8 shadow-2xl border border-gray-100 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-brand-dark transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-poppins font-bold text-2xl text-brand-dark tracking-tight">
                Join the Patrol
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-1">
                Fill out the application below to register for a night patrol session.
              </p>

              <div className="h-[1px] bg-gray-100 my-5" />

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.2, 1] }}
                    className="w-16 h-16 rounded-full bg-teal-50 border-2 border-brand-teal flex items-center justify-center text-brand-teal"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h4 className="font-poppins font-bold text-lg text-brand-dark">Registration Successful!</h4>
                  <p className="text-xs text-gray-500 font-sans max-w-xs">
                    Thank you, {formData.name}. Our coordination team will email you walk slots and instructions shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 absolute left-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="w-4 h-4 absolute left-3.5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Mobile Number</label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 absolute left-3.5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                      />
                    </div>
                  </div>

                  {/* Program Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 font-poppins uppercase tracking-wider">Preferred Program</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-brand-gray border border-gray-200/50 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark"
                    >
                      <option value="walks">Night Patrol Walks (Jan - Apr)</option>
                      <option value="hatcheries">Hatchery Caretaking (Daily)</option>
                      <option value="cleanups">Beach Cleanups (Weekends)</option>
                    </select>
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-4 rounded-xl mt-2">
                    Submit Registration
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
