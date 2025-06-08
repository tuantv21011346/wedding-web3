import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animateOnHover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  animateOnHover = true,
}) => {
  const defaultClasses = 'bg-white rounded-lg shadow-md border border-gray-200 p-6';
  
  return (
    <motion.div
      className={`${defaultClasses} ${className}`}
      onClick={onClick}
      whileHover={animateOnHover ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
