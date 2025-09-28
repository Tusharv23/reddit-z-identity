import React from 'react';
import { motion } from 'framer-motion';

const CommentCardLoader = ({ index }) => {
  return (
    <motion.div
      className="glass-card p-4 mb-3 comment-card-pulse"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1,
        scale: 1,
        y: 0
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      }}
    >
      {/* Header with tone indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-6 h-6 bg-gradient-to-r from-reddit-orange to-reddit-blue rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-16 h-4 comment-card-shimmer rounded-full" />
        </div>
        <motion.div 
          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-4 h-4 border-2 border-reddit-orange border-t-transparent rounded-full animate-spin" />
        </motion.div>
      </div>
      
      {/* Comment text placeholder */}
      <div className="bg-black/20 rounded-lg p-3 mb-3 border border-white/10">
        <div className="space-y-2">
          <div className="h-4 comment-card-shimmer rounded" />
          <div className="h-4 comment-card-shimmer rounded w-3/4" />
          <div className="h-4 comment-card-shimmer rounded w-1/2" />
        </div>
      </div>
      
      {/* Reasoning placeholder */}
      <div className="space-y-1">
        <div className="h-3 comment-card-shimmer rounded w-1/4" />
        <div className="h-3 comment-card-shimmer rounded w-full" />
        <div className="h-3 comment-card-shimmer rounded w-2/3" />
      </div>
    </motion.div>
  );
};

const CommentCardsLoader = ({ message = "Generating AI comments..." }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Comment cards as loading animation */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 w-full max-w-4xl mb-6">
        {[0, 1, 2].map((index) => (
          <CommentCardLoader key={index} index={index} />
        ))}
      </div>
      
      {/* Loading message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-reddit-orange font-cyber text-lg mb-2">{message}</p>
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            className="w-2 h-2 bg-reddit-orange rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-reddit-blue rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-reddit-orange rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommentCardsLoader;
export { CommentCardLoader };