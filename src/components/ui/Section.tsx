import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  subtitle, 
  children, 
  className = '' 
}) => {
  return (
    <motion.section 
      className={`py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >      <h2 className="section-title font-heading">{title}</h2>
      {subtitle && (        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-body">
          {subtitle}
        </p>
      )}
      {children}
    </motion.section>
  );
};

export default Section;
