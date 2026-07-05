import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3 seconds duration for a smooth crawl and swim animation
    const duration = 2800; 
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Delay to let exit wave animation finish
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Determine stage of the turtle's crawl
  const isSwimming = progress >= 70; // Hits the shoreline at 70% progress
  const isDiving = progress >= 90;   // Dives deeper at 90% progress

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#FAF6F0] overflow-hidden select-none"
    >
      {/* Top 30%: The Blue Sea */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#BAE6FD] to-[#38BDF8]" />

      {/* Shoreline Animated Waves (at the boundary of Sand & Water) */}
      <div className="absolute top-[26%] left-0 right-0 h-16 z-10 pointer-events-none">
        {/* Layer 1 (Back Wave - Deep Blue) */}
        <motion.svg
          viewBox="0 0 1440 100"
          className="w-full h-full fill-[#0284C7] absolute top-1 left-0 opacity-40"
          preserveAspectRatio="none"
          animate={{ y: [4, -4, 4], x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <path d="M0,50 C240,20 480,75 720,50 C960,25 1200,75 1440,50 L1440,100 L0,100 Z" />
        </motion.svg>
        
        {/* Layer 2 (Front Wave - Sky Blue) */}
        <motion.svg
          viewBox="0 0 1440 100"
          className="w-full h-full fill-[#38BDF8] absolute top-0 left-0"
          preserveAspectRatio="none"
          animate={{ y: [-4, 4, -4], x: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
        >
          <path d="M0,45 C240,15 480,70 720,45 C960,20 1200,70 1440,45 L1440,100 L0,100 Z" />
        </motion.svg>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-full flex flex-col items-center justify-end pb-12 z-20">
        
        {/* Crawl Tracks left in the sand behind the turtle */}
        {progress > 5 && progress < 75 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-5 border-l-[3px] border-r-[3px] border-dashed border-[#E9DFD3] pointer-events-none"
            style={{
              bottom: '10%',
              height: `${Math.min(progress, 70) * 0.9}%`,
            }}
          />
        )}

        {/* Water Ripples when the turtle enters the shoreline */}
        {isSwimming && !isDiving && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none flex items-center justify-center"
            style={{ bottom: '73%' }}
          >
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-white/40"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-white/20 absolute"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        )}

        {/* Animated Baby Sea Turtle */}
        <motion.svg
          width="75"
          height="75"
          viewBox="0 0 100 100"
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            bottom: `${10 + progress * 0.9}%`, // Moves from bottom 10% to off-screen 100%
            scale: isDiving ? (1 - (progress - 90) * 0.04) : 1, // Dives deep (shrinks)
            opacity: isDiving ? (1 - (progress - 90) * 0.08) : 1, // Fades out under water
          }}
        >
          {/* Front Left Flipper */}
          <motion.path
            d="M 25 40 C 15 35, 5 20, 15 15 C 25 10, 35 25, 30 35"
            fill="#14B8A6"
            animate={isSwimming 
              ? { rotate: [0, -35, 0] } // Synchronized swimming glide
              : { rotate: [0, -25, 0, 0, 0] } // Alternated crawl step
            }
            style={{ transformOrigin: '30px 35px' }}
            transition={{ repeat: Infinity, duration: isSwimming ? 1.0 : 0.6, ease: "easeInOut" }}
          />
          {/* Front Right Flipper */}
          <motion.path
            d="M 75 40 C 85 35, 95 20, 85 15 C 75 10, 65 25, 70 35"
            fill="#14B8A6"
            animate={isSwimming 
              ? { rotate: [0, 35, 0] } // Synchronized swimming glide
              : { rotate: [0, 0, 0, 25, 0] } // Alternated crawl step (delayed)
            }
            style={{ transformOrigin: '70px 35px' }}
            transition={{ repeat: Infinity, duration: isSwimming ? 1.0 : 0.6, ease: "easeInOut" }}
          />
          
          {/* Rear Left Flipper */}
          <motion.path
            d="M 32 75 C 24 80, 20 85, 25 90 C 30 95, 37 85, 39 80"
            fill="#0D9488"
            animate={{ rotate: isSwimming ? [0, -15, 0] : [0, 0, -10, 0, 0] }}
            style={{ transformOrigin: '39px 80px' }}
            transition={{ repeat: Infinity, duration: isSwimming ? 1.0 : 0.6, ease: "easeInOut" }}
          />
          {/* Rear Right Flipper */}
          <motion.path
            d="M 68 75 C 76 80, 80 85, 75 90 C 70 95, 63 85, 61 80"
            fill="#0D9488"
            animate={{ rotate: isSwimming ? [0, 15, 0] : [0, 10, 0, 0, 0] }}
            style={{ transformOrigin: '61px 80px' }}
            transition={{ repeat: Infinity, duration: isSwimming ? 1.0 : 0.6, ease: "easeInOut" }}
          />

          {/* Head */}
          <path d="M 50 10 C 45 10, 45 25, 50 25 C 55 25, 55 10, 50 10" fill="#0D9488" />
          {/* Tail */}
          <path d="M 50 85 L 48 93 L 52 93 Z" fill="#0D9488" />
          {/* Shell */}
          <ellipse cx="50" cy="55" rx="22" ry="26" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="2" />
          {/* Shell Pattern */}
          <ellipse cx="50" cy="55" rx="13" ry="16" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
        </motion.svg>

        {/* Loading Texts */}
        <div className="flex flex-col items-center mt-auto">
          <h2 className="font-poppins text-lg font-extrabold text-brand-dark tracking-widest uppercase mb-1">
            SSTCN
          </h2>
          <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase mb-5">
            Students Sea Turtle Conservation Network
          </p>

          {/* Loading Progress Bar */}
          <div className="w-56 h-1 bg-[#FAF6F0] rounded-full overflow-hidden border border-[#E9DFD3] mb-2 flex">
            <motion.div
              className="h-full bg-gradient-brand"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <span className="text-brand-teal font-poppins text-xs font-bold tracking-wider">
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>

      </div>
    </motion.div>
  );
}
