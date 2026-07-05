import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-poppins font-medium rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none tracking-wide cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-brand text-white shadow-soft hover:shadow-card hover:brightness-105',
    secondary: 'bg-brand-gray border border-gray-100 text-brand-dark hover:bg-gray-100/80',
    outline: 'border border-brand-teal/30 text-brand-teal hover:border-brand-teal hover:bg-brand-teal/5',
    glass: 'glass text-brand-dark hover:bg-white/90 border border-white/40 shadow-soft',
    white: 'bg-white text-brand-blue shadow-soft hover:bg-brand-light-blue'
  };

  const sizes = {
    sm: 'text-xs px-5 py-2.5',
    md: 'text-sm px-7 py-3.5',
    lg: 'text-base px-9 py-4.5'
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
