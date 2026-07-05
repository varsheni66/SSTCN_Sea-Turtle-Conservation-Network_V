import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function WaveWipe({ isTriggered, onCovered, onComplete }) {
  const controls = useAnimation();

  useEffect(() => {
    if (isTriggered) {
      // Run the slide up -> cover -> slide up out sequence
      controls.start({
        y: '0%',
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
      }).then(() => {
        // We are fully covered
        if (onCovered) onCovered();
        
        // Wait a tiny bit, then slide out to the top
        setTimeout(() => {
          controls.start({
            y: '-100%',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }).then(() => {
            // Animation finished
            if (onComplete) onComplete();
          });
        }, 100);
      });
    } else {
      // Reset instantly to the bottom
      controls.set({ y: '100%' });
    }
  }, [isTriggered, controls]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Wave Layer 1 (Staggered backing wave in Blue) */}
      <motion.div
        animate={controls}
        initial={{ y: '100%' }}
        className="absolute inset-0 bg-brand-blue pointer-events-auto"
        style={{ zIndex: 49 }}
      >
        {/* Top Wave crest SVG for Layer 1 */}
        <svg
          viewBox="0 0 1440 120"
          className="absolute left-0 w-full h-24 -top-[95px] fill-brand-blue"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </motion.div>

      {/* Wave Layer 2 (Primary wave in Teal) */}
      <motion.div
        animate={controls}
        initial={{ y: '100%' }}
        className="absolute inset-0 bg-brand-teal pointer-events-auto flex items-center justify-center"
        style={{ zIndex: 50 }}
      >
        {/* Top Wave crest SVG for Layer 2 */}
        <svg
          viewBox="0 0 1440 120"
          className="absolute left-0 w-full h-24 -top-[95px] fill-brand-teal"
          preserveAspectRatio="none"
        >
          <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>

        {/* Optional: Small swimming turtle logo in the center of the wave transition */}
        <motion.div
          animate={{ rotate: isTriggered ? [0, 360] : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-xs border border-white/20"
        >
          <svg width="36" height="36" viewBox="0 0 100 100" className="fill-white">
            <path d="M 50 15 C 45 15, 45 30, 50 30 C 55 30, 55 15, 50 15" />
            <path d="M 20 45 C 10 40, 5 25, 15 20 C 25 15, 35 30, 30 40" />
            <path d="M 80 45 C 90 40, 95 25, 85 20 C 75 15, 65 30, 70 40" />
            <ellipse cx="50" cy="60" rx="20" ry="24" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
