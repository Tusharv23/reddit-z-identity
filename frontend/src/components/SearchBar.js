import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiSettings, FiRefreshCw } from 'react-icons/fi';

const SearchBar = ({ onSearch, loading }) => {
  const [subreddit, setSubreddit] = useState('');
  const [searchMode, setSearchMode] = useState('single'); // 'single' or 'multiple'
  const [postLimit, setPostLimit] = useState(10);
  
  const popularSubreddits = [
    'askreddit', 'funny', 'todayilearned', 'worldnews', 'pics',
    'gaming', 'movies', 'music', 'books', 'technology'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subreddit.trim()) {
      onSearch({
        subreddit: subreddit.trim(),
        mode: searchMode,
        limit: postLimit
      });
    }
  };

  const handleQuickSearch = (sub) => {
    setSubreddit(sub);
    onSearch({
      subreddit: sub,
      mode: searchMode,
      limit: postLimit
    });
  };

  return (
    <motion.div
      className="glass-card p-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            placeholder={searchMode === 'single' ? "Enter subreddit name (e.g., askreddit)" : "Enter multiple subreddits (comma-separated)"}
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-reddit-orange focus:ring-2 focus:ring-reddit-orange/50 transition-all"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search Mode Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-300">Mode:</span>
            <div className="flex bg-black/20 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setSearchMode('single')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  searchMode === 'single'
                    ? 'bg-reddit-orange text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Single
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('multiple')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  searchMode === 'multiple'
                    ? 'bg-reddit-orange text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Multiple
              </button>
            </div>
          </div>

          {/* Post Limit */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-300">Posts:</span>
            <select
              value={postLimit}
              onChange={(e) => setPostLimit(parseInt(e.target.value))}
              className="bg-black/20 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-reddit-orange"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            type="submit"
            disabled={loading || !subreddit.trim()}
            className="bg-gradient-to-r from-reddit-orange to-reddit-blue text-white px-6 py-2 rounded-lg font-semibold hover-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? (
              <FiRefreshCw className="animate-spin" />
            ) : (
              <FiSearch />
            )}
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </motion.button>
        </div>
      </form>

      {/* Popular Subreddits */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Popular Subreddits:</h3>
        <div className="flex flex-wrap gap-2">
          {popularSubreddits.map((sub) => (
            <motion.button
              key={sub}
              onClick={() => handleQuickSearch(sub)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-gray-300 hover:text-white transition-all border border-white/10 hover:border-reddit-orange/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              r/{sub}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;