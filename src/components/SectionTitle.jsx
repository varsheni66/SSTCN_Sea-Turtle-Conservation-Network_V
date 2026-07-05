import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  const isLeft = align === 'left';

  return (
    <div className={`mb-12 lg:mb-16 ${isLeft ? 'text-left' : 'text-center mx-auto max-w-3xl'} ${className}`}>
      {tag && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] text-brand-teal uppercase mb-3 font-poppins"
        >
          {tag}
        </motion.span>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-brand-dark tracking-tight leading-tight"
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-gray-500 font-sans leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Subtle Divider Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-[3px] w-12 bg-gradient-brand mt-6 rounded-full ${isLeft ? 'origin-left' : 'origin-center mx-auto'}`}
      />
    </div>
  );
}
