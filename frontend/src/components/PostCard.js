import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiMessageCircle, FiUser, FiCalendar, FiExternalLink } from 'react-icons/fi';

const CommentSuggestionCard = ({ suggestion, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(suggestion.comment);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getToneColor = (tone) => {
    switch (tone.toLowerCase()) {
      case 'supportive':
        return 'from-green-400 to-emerald-500';
      case 'analytical':
        return 'from-blue-400 to-cyan-500';
      case 'humorous':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  const getToneIcon = (tone) => {
    switch (tone.toLowerCase()) {
      case 'supportive':
        return '💚';
      case 'analytical':
        return '🧠';
      case 'humorous':
        return '😄';
      default:
        return '💬';
    }
  };

  return (
    <motion.div
      className="glass-card p-4 hover-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getToneIcon(suggestion.tone)}</span>
          <span className={`text-sm font-semibold bg-gradient-to-r ${getToneColor(suggestion.tone)} bg-clip-text text-transparent`}>
            {suggestion.tone}
          </span>
        </div>
        <motion.button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Copy comment"
        >
          {copied ? (
            <FiCheck className="text-green-400 text-sm" />
          ) : (
            <FiCopy className="text-gray-300 text-sm" />
          )}
        </motion.button>
      </div>
      
      <div className="bg-black/20 rounded-lg p-3 mb-3 border border-white/10">
        <p className="text-white text-sm leading-relaxed">{suggestion.comment}</p>
      </div>
      
      <div className="text-xs text-gray-400">
        <strong>Why this works:</strong> {suggestion.reasoning}
      </div>
    </motion.div>
  );
};

const PostCard = ({ postData, index }) => {
  const { post, comment_suggestions } = postData;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatScore = (score) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score.toString();
  };

  return (
    <motion.div
      className="glass-card p-6 mb-6 hover-glow"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-reddit-orange to-reddit-blue rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">r/</span>
          </div>
          <div>
            <h3 className="text-reddit-orange font-semibold text-sm">r/{post.subreddit}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <FiUser className="text-xs" />
              <span>u/{post.author}</span>
              <FiCalendar className="text-xs" />
              <span>{formatDate(post.created_utc)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-reddit-orange font-bold">↑</span>
            <span className="text-white font-semibold">{formatScore(post.score)}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <FiMessageCircle className="text-xs" />
            <span>{post.num_comments}</span>
          </div>
          <motion.a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="View on Reddit"
          >
            <FiExternalLink className="text-gray-300 text-sm" />
          </motion.a>
        </div>
      </div>

      {/* Post Title */}
      <h2 className="text-xl font-bold text-white mb-3 leading-tight">
        {post.title}
      </h2>

      {/* Post Content */}
      {post.content && post.content.trim() && (
        <div className="bg-black/20 rounded-lg p-4 mb-4 border border-white/10">
          <p className="text-gray-300 text-sm leading-relaxed">
            {post.content.length > 300 
              ? `${post.content.substring(0, 300)}...` 
              : post.content
            }
          </p>
        </div>
      )}

      {/* Comment Suggestions */}
      <div className="border-t border-white/10 pt-4">
        <h3 className="text-lg font-cyber text-reddit-blue mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          AI Comment Suggestions
        </h3>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {comment_suggestions.map((suggestion, idx) => (
            <CommentSuggestionCard 
              key={idx} 
              suggestion={suggestion} 
              index={idx}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;