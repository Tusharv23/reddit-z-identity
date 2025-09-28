import React from 'react';
import { motion } from 'framer-motion';

const CommentSkeletonCard = ({ index }) => {
  return (
    <motion.div
      className="glass-card p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Skeleton Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-6 h-6 rounded-full bg-gradient-to-r from-reddit-orange/30 to-reddit-blue/30"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="h-4 w-20 bg-gradient-to-r from-gray-600/50 to-gray-500/50 rounded"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
        <motion.div 
          className="w-8 h-8 rounded-lg bg-white/10"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      
      {/* Skeleton Comment Body */}
      <div className="bg-black/20 rounded-lg p-3 mb-3 border border-white/10">
        <motion.div 
          className="space-y-2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        >
          <div className="h-3 bg-gray-600/50 rounded w-full" />
          <div className="h-3 bg-gray-600/50 rounded w-4/5" />
          <div className="h-3 bg-gray-600/50 rounded w-3/5" />
        </motion.div>
      </div>
      
      {/* Skeleton Reasoning */}
      <motion.div 
        className="space-y-1"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
      >
        <div className="h-2 bg-gray-700/50 rounded w-1/4" />
        <div className="h-2 bg-gray-700/50 rounded w-full" />
        <div className="h-2 bg-gray-700/50 rounded w-2/3" />
      </motion.div>
      
      {/* Loading indicator */}
      <div className="flex items-center justify-center mt-4">
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-reddit-orange rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CommentSkeletonCard;