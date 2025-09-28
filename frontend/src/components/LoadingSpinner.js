import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="loading-dots mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </motion.div>
      <motion.p 
        className="text-reddit-orange font-cyber text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;