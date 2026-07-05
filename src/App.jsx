import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layouts
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Species from './sections/Species';
import Programs from './sections/Programs';
import Research from './sections/Research';
import Gallery from './sections/Gallery';
import Volunteer from './sections/Volunteer';
import Donate from './sections/Donate';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';

// Components
import Loader from './components/Loader';
import Cursor from './components/Cursor';

const sectionOrder = [
  'hero',
  'about',
  'species',
  'programs',
  'research',
  'gallery',
  'volunteer',
  'donate',
  'testimonials',
  'faq',
  'contact'
];

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [direction, setDirection] = useState(1); // 1 = forward (slide left), -1 = backward (slide right)

  // Disable body scroll when main content renders
  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  // Sync hash changes with activeSection state
  useEffect(() => {
    if (isLoading) return;

    const handleHashChange = () => {
      const hash = window.location.hash ? window.location.hash.substring(1) : 'hero';
      const cleanHash = hash || 'hero';
      
      if (cleanHash !== activeSection) {
        const oldIndex = sectionOrder.indexOf(activeSection);
        const newIndex = sectionOrder.indexOf(cleanHash);
        const newDirection = newIndex >= oldIndex ? 1 : -1;
        
        setDirection(newDirection);
        setActiveSection(cleanHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial hash
    const initialHash = window.location.hash.substring(1) || 'hero';
    setActiveSection(initialHash);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoading, activeSection]);

  const renderSection = (section) => {
    switch (section) {
      case 'hero': return <Hero />;
      case 'about': return <About />;
      case 'species': return <Species />;
      case 'programs': return <Programs />;
      case 'research': return <Research />;
      case 'gallery': return <Gallery />;
      case 'volunteer': return <Volunteer />;
      case 'donate': return <Donate />;
      case 'testimonials': return <Testimonials />;
      case 'faq': return <FAQ />;
      case 'contact': return <Contact />;
      default: return <Hero />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-screen overflow-hidden flex flex-col bg-brand-gray"
          >
            {/* Custom Utilities */}
            <Cursor />

            {/* Header Layout */}
            <Navbar />

            {/* Core Content Slider Container */}
            <div 
              id="page-container" 
              className="h-[calc(100vh-76px)] mt-[76px] relative overflow-hidden"
            >
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={activeSection}
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="w-full h-full overflow-y-auto flex flex-col justify-between absolute top-0 left-0 bg-brand-gray"
                >
                  <div className="flex-grow">
                    {renderSection(activeSection)}
                  </div>
                  <Footer />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

