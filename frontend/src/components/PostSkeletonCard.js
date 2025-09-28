import React from 'react';
import { motion } from 'framer-motion';

const PostSkeletonCard = ({ index }) => {
  return (
    <motion.div
      className="glass-card p-6 mb-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Post Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-8 h-8 bg-gradient-to-r from-reddit-orange/30 to-reddit-blue/30 rounded-full"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div>
            <motion.div 
              className="h-4 w-24 bg-gradient-to-r from-reddit-orange/30 to-reddit-blue/30 rounded mb-1"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="h-3 w-32 bg-gray-600/50 rounded"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.div 
            className="h-4 w-12 bg-gray-600/50 rounded"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div 
            className="w-8 h-8 bg-white/10 rounded-lg"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          />
        </div>
      </div>

      {/* Post Title Skeleton */}
      <div className="mb-3 space-y-2">
        <motion.div 
          className="h-6 bg-gray-500/50 rounded w-full"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="h-6 bg-gray-500/50 rounded w-4/5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        />
      </div>

      {/* Post Content Skeleton */}
      <div className="bg-black/20 rounded-lg p-4 mb-4 border border-white/10">
        <motion.div 
          className="space-y-2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
        >
          <div className="h-3 bg-gray-600/50 rounded w-full" />
          <div className="h-3 bg-gray-600/50 rounded w-5/6" />
          <div className="h-3 bg-gray-600/50 rounded w-4/5" />
          <div className="h-3 bg-gray-600/50 rounded w-3/4" />
        </motion.div>
      </div>

      {/* Comment Section Skeleton */}
      <div className="border-t border-white/10 pt-4">
        <motion.div 
          className="flex items-center mb-4"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
        >
          <div className="w-6 h-6 bg-gray-600/50 rounded mr-2" />
          <div className="h-5 w-48 bg-gray-600/50 rounded" />
        </motion.div>
        
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-4"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.8 + (idx * 0.2) }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-20 bg-gray-600/50 rounded" />
                <div className="w-8 h-8 bg-white/10 rounded-lg" />
              </div>
              <div className="bg-black/20 rounded-lg p-3 mb-3 border border-white/10">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-600/50 rounded w-full" />
                  <div className="h-3 bg-gray-600/50 rounded w-4/5" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-700/50 rounded w-1/4" />
                <div className="h-2 bg-gray-700/50 rounded w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PostSkeletonCard;