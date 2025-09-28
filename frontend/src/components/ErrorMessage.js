import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      className="glass-card p-6 text-center max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FiAlertCircle className="text-red-400 text-4xl mx-auto mb-4" />
      <h3 className="text-xl font-cyber text-red-300 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-300 mb-4">{message}</p>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="bg-gradient-to-r from-reddit-orange to-reddit-blue text-white px-6 py-2 rounded-lg font-semibold hover-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;