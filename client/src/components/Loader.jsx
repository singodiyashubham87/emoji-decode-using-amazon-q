import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader2 className={`text-indigo-600 ${sizeClasses[size]} ${className}`} />
      </motion.div>
    </div>
  );
};

export default Loader;