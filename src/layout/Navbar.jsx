import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Users } from 'lucide-react';
import Button from '../components/Button';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Species', href: '#species' },
  { label: 'Programs', href: '#programs' },
  { label: 'Research', href: '#research' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Volunteer', href: '#volunteer' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll event for changing background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const currentHash = window.location.hash.substring(1) || 'hero';
      setActiveSection(currentHash);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash(); // Set initially

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    // Allow the browser to naturally change the hash, which triggers App.jsx
  };

  const isHero = activeSection === 'hero' || activeSection === '';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        !isHero
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-gray-100/50 py-3'
          : isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Animated Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
          <motion.div
            className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center text-white"
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {/* Tiny swimming SVG turtle */}
            <svg width="24" height="24" viewBox="0 0 100 100" className="fill-white">
              <path d="M 50 15 C 45 15, 45 30, 50 30 C 55 30, 55 15, 50 15" />
              <path d="M 20 45 C 10 40, 5 25, 15 20 C 25 15, 35 30, 30 40" />
              <path d="M 80 45 C 90 40, 95 25, 85 20 C 75 15, 65 30, 70 40" />
              <ellipse cx="50" cy="60" rx="20" ry="24" />
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-lg leading-tight tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">
              SSTCN
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-gray-500 font-medium">
              Chennai Conservation
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-poppins text-sm font-medium transition-colors py-2 block ${
                      isActive ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-dark'
                    }`}
                  >
                    {item.label}
                  </a>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-brand rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-[1px] bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleNavClick(e, '#volunteer')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Volunteer
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => handleNavClick(e, '#donate')}
              className="flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              Donate
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-brand-dark hover:text-brand-blue transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`font-poppins text-base font-semibold py-1 block ${
                          isActive ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-dark'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="h-[1px] bg-gray-100" />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={(e) => handleNavClick(e, '#volunteer')}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Volunteer
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => handleNavClick(e, '#donate')}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  Donate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
