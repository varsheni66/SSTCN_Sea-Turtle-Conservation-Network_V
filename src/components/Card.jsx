import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  glass = false,
  onClick,
  ...props
}) {
  const CardComponent = onClick ? motion.button : motion.div;

  return (
    <CardComponent
      onClick={onClick}
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={`
        relative text-left overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 lg:p-8
        ${glass ? 'glass' : 'bg-white shadow-soft hover:shadow-card'}
        ${onClick ? 'cursor-pointer focus:outline-none w-full' : ''}
        transition-shadow duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </CardComponent>
  );
}
