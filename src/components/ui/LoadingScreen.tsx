import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        onLoadingComplete();
      }
    }, 20); // Adjust speed if needed
    
    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);
  
  return (
    <div className="fixed inset-0 bg-primary-900 z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >        <div className="text-4xl md:text-6xl font-heading text-white mb-6">
          <span className="text-primary-200">Đám</span> Cưới
        </div>
        
        <div className="text-xl md:text-2xl font-light text-primary-100 mb-12 font-body">
          Lưu Trữ Vĩnh Viễn Trên Blockchain
        </div>
        
        <div className="relative w-64 h-2 bg-primary-800 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary-200"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <div className="mt-2 text-primary-200">
          {progress}%
        </div>
      </motion.div>
      
      <div className="absolute bottom-4 text-xs text-primary-400">
        Powered by Polygon &amp; IPFS
      </div>
    </div>
  );
};

export default LoadingScreen;
