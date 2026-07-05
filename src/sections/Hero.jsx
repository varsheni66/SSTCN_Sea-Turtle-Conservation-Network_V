import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, MousePointer, X } from 'lucide-react';
import Button from '../components/Button';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp);

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [seaTemp, setSeaTemp] = useState(28.4);
  const [waveHeight, setWaveHeight] = useState(1.2);
  const [tide, setTide] = useState('Incoming');

  useEffect(() => {
    // Simulate real-time sea data fluctuations
    const interval = setInterval(() => {
      setSeaTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setWaveHeight((prev) => +(Math.max(0.8, Math.min(1.8, prev + (Math.random() * 0.2 - 0.1)))).toFixed(1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleScrollTo = (id) => {
    window.location.hash = id;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden pt-20"
      ref={ref}
    >
      {/* Immersive Full-Screen Ocean Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source
          src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f3747d96ccfe75d8d0cd9fb1e59267dcc3ed374&profile_id=165&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Light tropical ocean color overlay to keep it bright and blend with the light theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-sky-100/35 z-0 pointer-events-none" />

      {/* Floating Ocean Bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-teal/10 backdrop-blur-xs border border-white/20"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${15 + i * 15}%`,
              bottom: `${10 + Math.random() * 40}%`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-12">
        {/* Left Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="lg:col-span-7 flex flex-col items-start text-left gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light-blue border border-brand-blue/10 text-brand-blue"
          >
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider font-poppins">Nesting Season 2026 Active</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins text-brand-dark tracking-tight leading-[1.1]"
          >
            Guardians of the <span className="text-gradient">Olive Ridley</span> Sea Turtles
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-500 font-sans leading-relaxed max-w-xl"
          >
            Since 1988, Students Sea Turtle Conservation Network has patrolled Chennai's coastlines. Join our voluntary movement to secure a safe passage for thousands of endangered hatchlings.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center mt-2">
            <Button variant="primary" size="lg" onClick={() => handleScrollTo('#volunteer')}>
              Explore Walks
            </Button>
            <Button variant="outline" size="lg" onClick={() => handleScrollTo('#donate')}>
              Donate Now
            </Button>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2.5 font-poppins font-semibold text-sm text-brand-dark hover:text-brand-blue transition-colors group ml-2 cursor-pointer"
            >
              <span className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue/5 transition-all">
                <Play className="w-4 h-4 fill-current text-brand-dark group-hover:text-brand-blue" />
              </span>
              Watch Video
            </button>
          </motion.div>

          {/* Floating Statistics Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-gray-100 pt-8 mt-4 w-full"
          >
            {[
              { count: 35, suffix: '+', label: 'Years of Trust' },
              { count: 320000, suffix: '+', label: 'Hatchlings Released' },
              { count: 5400, suffix: '+', label: 'Nests Relocated' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-dark font-poppins flex items-center">
                  <CountUpComponent start={0} end={inView ? stat.count : 0} duration={3.5} separator="," />
                  <span className="text-brand-teal">{stat.suffix}</span>
                </span>
                <span className="text-xs sm:text-sm text-gray-500 font-sans mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Graphic/Illustration Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[480px] flex flex-col items-center justify-center gap-6"
        >
          {/* Floating animated card 1: Nesting Stats */}
          <motion.div
            className="glass-card bg-white/80 backdrop-blur-md border border-white/50 p-5 rounded-[24px] shadow-card flex flex-col items-center max-w-[200px] text-center self-start lg:ml-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-brand-teal mb-3">
              <svg width="32" height="32" viewBox="0 0 100 100" className="fill-brand-teal">
                <path d="M 50 15 C 45 15, 45 30, 50 30 C 55 30, 55 15, 50 15" />
                <motion.path
                  d="M 20 45 C 10 40, 5 25, 15 20 C 25 15, 35 30, 30 40"
                  animate={{ rotate: [0, -20, 0] }}
                  style={{ transformOrigin: '30px 40px' }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 80 45 C 90 40, 95 25, 85 20 C 75 15, 65 30, 70 40"
                  animate={{ rotate: [0, 20, 0] }}
                  style={{ transformOrigin: '70px 40px' }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <ellipse cx="50" cy="60" rx="20" ry="24" />
              </svg>
            </div>
            <span className="font-poppins font-bold text-sm text-brand-dark">Olive Ridley Nesting</span>
            <span className="text-[10px] text-gray-500 font-sans mt-1">Hatch rate up 14% this season</span>
          </motion.div>

          {/* Floating animated card 2: Night Patrol Info */}
          <motion.div
            className="glass-card bg-white/80 backdrop-blur-md border border-white/50 p-5 rounded-[24px] shadow-card flex flex-col items-center max-w-[200px] text-center self-end lg:mr-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue mb-3 font-poppins font-bold text-lg">
              🌙
            </div>
            <span className="font-poppins font-bold text-sm text-brand-dark">Midnight Patrols</span>
            <span className="text-[10px] text-gray-500 font-sans mt-1">Walks start 11:00 PM daily at Elliot's Beach</span>
          </motion.div>

          {/* Floating animated card 3: Live Sea Conditions */}
          <motion.div
            className="glass-card bg-white/80 backdrop-blur-md border border-white/50 p-4 rounded-[24px] shadow-card flex flex-col items-start w-[200px] border-white/40 self-center lg:translate-x-12"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-2 mb-2 w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-poppins font-extrabold text-[9px] text-gray-400 uppercase tracking-wider">Live Beach Feed</span>
            </div>
            <div className="text-left w-full flex flex-col gap-1.5">
              <div className="text-xs font-sans text-gray-500 flex justify-between">
                <span>Temp:</span>
                <span className="font-bold text-brand-dark">{seaTemp}°C</span>
              </div>
              <div className="text-xs font-sans text-gray-500 flex justify-between">
                <span>Waves:</span>
                <span className="font-bold text-brand-dark">{waveHeight}m</span>
              </div>
              <div className="text-xs font-sans text-gray-500 flex justify-between">
                <span>Tide:</span>
                <span className="font-bold text-brand-teal font-poppins">{tide}</span>
              </div>
              <div className="text-[8px] text-gray-400 font-sans mt-1 text-center w-full border-t border-gray-100 pt-1.5">
                Chennai Elliot's Coast
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('#about')}>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold font-poppins">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-brand-teal rounded-full" />
        </motion.div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[24px] overflow-hidden shadow-2xl border border-white/20 aspect-video flex flex-col justify-center items-center p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-brand-dark transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Simulated Video Player */}
              <div className="absolute inset-0 bg-cover bg-center flex flex-col justify-center items-center p-8 bg-[url('https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&q=80&w=1200')] bg-blend-multiply bg-black/45">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-brand-blue shadow-lg cursor-pointer"
                  onClick={() => alert("Simulated Video Play: Protecting Chennai's Coastline. Olive Ridley hatching documentary starts playing...")}
                >
                  <Play className="w-6 h-6 fill-current text-brand-blue translate-x-0.5" />
                </motion.button>
                <h3 className="text-white font-poppins font-bold text-2xl mt-6 tracking-wide">
                  SSTCN: 35 Years of Conservation Walk
                </h3>
                <p className="text-white/80 font-sans text-sm mt-2 max-w-md">
                  Watch our volunteers patrol the beaches, recover nests, and hatch eggs safely in Chennai.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
