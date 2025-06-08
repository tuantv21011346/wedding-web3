import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
  isLoading = false,
}) => {  const baseClasses = 'inline-flex justify-center items-center px-6 py-2 rounded-md text-center transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-pink-400';
    const variantClasses = {
    primary: 'bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 hover:from-pastel-pink-500 hover:to-pastel-purple-500 text-white shadow-lg shadow-pastel-pink-300/30 hover:shadow-xl hover:shadow-pastel-purple-300/30',
    outline: 'border-2 border-pastel-pink-400 hover:bg-pastel-pink-50 text-pastel-pink-700 hover:text-pastel-purple-800 hover:border-pastel-purple-400',
    text: 'text-pastel-pink-600 hover:text-pastel-purple-800 hover:underline decoration-pastel-pink-400',
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
