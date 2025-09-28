import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="text-center py-12 mb-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo/Title */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-cyber font-bold mb-4">
          <span className="bg-gradient-to-r from-reddit-orange via-reddit-blue to-reddit-orange bg-clip-text text-transparent animate-gradient">
            Reddit
          </span>
          <br />
          <span className="text-white neon-text">
            Auto Comments
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        AI-powered comment suggestions for Reddit posts
        <br />
        <span className="text-reddit-blue font-semibold">
          Engage smarter, not harder
        </span>
      </motion.p>

      {/* Decorative Elements */}
      <motion.div
        className="flex justify-center space-x-4 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-reddit-orange to-reddit-blue rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Feature Pills */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {[
          '🤖 AI-Powered',
          '⚡ Real-time',
          '🎯 Context-Aware',
          '💡 Multiple Tones',
          '🚀 Futuristic UI'
        ].map((feature, index) => (
          <motion.span
            key={feature}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-white/20"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 69, 0, 0.2)',
              borderColor: 'rgba(255, 69, 0, 0.5)'
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {feature}
          </motion.span>
        ))}
      </motion.div>
    </motion.header>
  );
};

export default Header;