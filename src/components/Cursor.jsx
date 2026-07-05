import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'view', 'play', 'text'
  const [trail, setTrail] = useState([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out mouse follow with spring configurations
  const springConfig = { damping: 45, stiffness: 450, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 15, stiffness: 900 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Only activate cursor on desktop screens (devices with hover capability)
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Emit bubble trail particles (only 25% of moves to keep it subtle)
      if (Math.random() < 0.25) {
        setTrail((prev) => [
          ...prev.slice(-10), // Limit to 10 bubbles
          {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 3,
          }
        ]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track if hover target is interactive or a special element
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const buttonEl = target.closest('button');
      const linkEl = target.closest('a');
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-hover') ||
        buttonEl ||
        linkEl;

      const isPlay = buttonEl && buttonEl.textContent.toLowerCase().includes('watch');
      const isView = target.closest('#gallery img') || target.closest('.cursor-zoom-in') || target.classList.contains('break-inside-avoid');
      const isText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea');

      if (isPlay) {
        setCursorType('play');
      } else if (isView) {
        setCursorType('view');
      } else if (isText) {
        setCursorType('text');
      } else if (isInteractive) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Apply custom class to body to hide standard cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isExpanded = cursorType === 'hover' || cursorType === 'view' || cursorType === 'play';

  return (
    <>
      {/* Floating Ocean Bubble Trail */}
      {trail.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="fixed rounded-full pointer-events-none z-40 border border-brand-teal/20 bg-brand-teal/5 hidden lg:block"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0, y: -45 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-teal pointer-events-none z-50 mix-blend-difference hidden lg:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: cursorType === 'view' || cursorType === 'play' ? 64 : 32,
          height: cursorType === 'view' || cursorType === 'play' ? 64 : 32,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'text' ? 0 : (isExpanded ? 1.4 : 1),
          backgroundColor: cursorType === 'view' ? 'rgba(20, 184, 166, 0.25)' : cursorType === 'play' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(20, 184, 166, 0)',
          borderColor: cursorType === 'play' ? '#3B82F6' : '#14B8A6',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {(cursorType === 'view' || cursorType === 'play') && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white uppercase font-poppins font-extrabold text-[8px] tracking-widest text-center"
          >
            {cursorType === 'view' ? 'View' : 'Play'}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'text' ? 2 : (cursorType === 'view' || cursorType === 'play' ? 0 : 8),
          height: cursorType === 'text' ? 16 : (cursorType === 'view' || cursorType === 'play' ? 0 : 8),
          borderRadius: cursorType === 'text' ? 1 : 9999,
          backgroundColor: cursorType === 'hover' ? '#3B82F6' : '#14B8A6',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
