import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
import Button from '../components/Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const handleScrollToTop = () => {
    const container = document.getElementById('page-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-brand-gray border-t border-gray-100/50 pt-20 pb-10 overflow-hidden">
      {/* Wave Section Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden line-height-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] text-white fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Info */}
        <div className="flex flex-col gap-5 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 100 100" className="fill-white animate-pulse-slow">
                <path d="M 50 15 C 45 15, 45 30, 50 30 C 55 30, 55 15, 50 15" />
                <path d="M 20 45 C 10 40, 5 25, 15 20 C 25 15, 35 30, 30 40" />
                <path d="M 80 45 C 90 40, 95 25, 85 20 C 75 15, 65 30, 70 40" />
                <ellipse cx="50" cy="60" rx="20" ry="24" />
              </svg>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-lg text-brand-dark">SSTCN</h3>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                Students Sea Turtle Conservation
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            Conserving marine ecosystems and protecting Chennai's nesting Olive Ridley sea turtles since 1988. Run entirely by passionate volunteers.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {[
              { icon: FaFacebookF, href: '#' },
              { icon: FaInstagram, href: '#' },
              { icon: FaTwitter, href: '#' },
              { icon: FaYoutube, href: '#' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 rounded-full bg-white border border-gray-200/50 flex items-center justify-center text-gray-600 hover:text-brand-blue hover:shadow-soft transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5 text-left">
          <h4 className="font-poppins font-bold text-sm text-brand-dark uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Marine Species', href: '#species' },
              { label: 'Programs', href: '#programs' },
              { label: 'Research & Publications', href: '#research' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Volunteer', href: '#volunteer' },
            ].map((link, i) => (
              <li key={i} className="group">
                <a
                  href={link.href}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-brand-teal transition-colors font-sans"
                >
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: 'auto', opacity: 1 }}
                    className="overflow-hidden inline-block shrink-0 text-brand-teal text-[10px] group-hover:mr-1.5 transition-all duration-300"
                  >
                    →
                  </motion.span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex flex-col gap-5 text-left">
          <h4 className="font-poppins font-bold text-sm text-brand-dark uppercase tracking-wider">
            Get Involved
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Join Turtle Walks', href: '#volunteer' },
              { label: 'Hatchery Volunteering', href: '#programs' },
              { label: 'Make a Donation', href: '#donate' },
              { label: 'Frequently Asked Questions', href: '#faq' },
              { label: 'Contact Us', href: '#contact' },
            ].map((link, i) => (
              <li key={i} className="group">
                <a
                  href={link.href}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-brand-teal transition-colors font-sans"
                >
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: 'auto', opacity: 1 }}
                    className="overflow-hidden inline-block shrink-0 text-brand-teal text-[10px] group-hover:mr-1.5 transition-all duration-300"
                  >
                    →
                  </motion.span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-5 text-left">
          <h4 className="font-poppins font-bold text-sm text-brand-dark uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            Subscribe to receive updates on nesting season schedules and conservation reports.
          </p>
          <div className="min-h-[52px] relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubscribe}
                  className="relative flex items-center w-full"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full font-sans text-sm focus:outline-none focus:border-brand-teal text-brand-dark shadow-soft transition-colors"
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="absolute right-1 !p-2 rounded-full !size-10 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-center gap-3 w-full"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-white shrink-0">
                    <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h5 className="font-poppins font-bold text-xs text-brand-dark">Subscribed!</h5>
                    <p className="text-[10px] text-gray-500 font-sans mt-0.5">You have joined our email updates list.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-gray-400 font-sans">
          &copy; {new Date().getFullYear()} Students Sea Turtle Conservation Network (SSTCN). All rights reserved.
        </p>
        <p className="text-xs text-gray-400 font-sans flex items-center gap-1.5">
          Made by Chennai environmental advocates.
          <button
            onClick={handleScrollToTop}
            className="text-brand-teal hover:text-brand-blue font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Back to Top <ArrowUp className="w-3 h-3" />
          </button>
        </p>
      </div>
    </footer>
  );
}
