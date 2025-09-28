import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PostCard from './components/PostCard';
import LoadingSpinner from './components/LoadingSpinner';
import CommentCardsLoader from './components/CommentCardsLoader';
import ErrorMessage from './components/ErrorMessage';
import { redditApi } from './services/api';
import './index.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [postsWithComments, setPostsWithComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsLoadingIndex, setCommentsLoadingIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('reddit-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (searchTerm) => {
    const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('reddit-search-history', JSON.stringify(newHistory));
  };

  const loadCommentsSequentially = async (postsData) => {
    setLoadingComments(true);
    
    // Generate comments for all posts at once
    try {
      const postsWithComments = await redditApi.generateCommentsForPosts(postsData);
      
      // Now animate them loading one by one
      for (let i = 0; i < postsWithComments.length; i++) {
        setCommentsLoadingIndex(i);
        
        // Animation delay for smooth sequential loading
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Update the specific post with its comments
        setPosts(prevPosts => 
          prevPosts.map((post, index) => 
            index === i 
              ? { ...post, comment_suggestions: postsWithComments[i].comment_suggestions }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      setError('Failed to generate comment suggestions. Please try again.');
    }
    
    setLoadingComments(false);
    setCommentsLoadingIndex(-1);
  };

  const handleSearch = async ({ subreddit, mode, limit }) => {
    setLoading(true);
    setError(null);
    setPosts([]);
    setPostsWithComments([]);
    setLoadingComments(false);
    setCommentsLoadingIndex(-1);

    try {
      let postsOnly;
      
      if (mode === 'single') {
        // First, fetch posts only (fast)
        postsOnly = await redditApi.getPostsOnly(subreddit, limit);
        saveToHistory(subreddit);
      } else {
        // Multiple subreddits mode - for now use the old method
        const subreddits = subreddit.split(',').map(s => s.trim()).filter(s => s.length > 0);
        const result = await redditApi.getPostsFromMultipleSubreddits(subreddits, Math.ceil(limit / subreddits.length));
        postsOnly = result.map(item => item.post);
        saveToHistory(subreddits.join(', '));
      }

      // Show posts without comments first
      const postsWithEmptyComments = postsOnly.map(post => ({
        post: post,
        comment_suggestions: [] // Empty comments initially
      }));
      
      setPosts(postsWithEmptyComments);
      setLoading(false);
      
      // Start loading comments after posts are displayed
      setTimeout(() => {
        loadCommentsSequentially(postsOnly);
      }, 800);
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to fetch posts. Please try again.');
      setLoading(false);
      setLoadingComments(false);
      setCommentsLoadingIndex(-1);
    }
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,69,0,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header />
          
          <SearchBar onSearch={handleSearch} loading={loading} />

          {/* Results Section */}
          <div id="results-section">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoadingSpinner message="Fetching hot posts from Reddit..." />
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ErrorMessage message={error} onRetry={handleRetry} />
                </motion.div>
              )}

              {!loading && !error && posts.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Results Header */}
                  <motion.div
                    className="text-center mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-cyber font-bold text-white mb-2">
                      <span className="text-reddit-orange">{posts.length}</span> Posts Found
                    </h2>
                    <p className="text-gray-400">
                      {loadingComments 
                        ? "AI is generating personalized comment suggestions..." 
                        : "Each post comes with AI-generated comment suggestions in different tones"
                      }
                    </p>
                  </motion.div>

                  {/* Posts Grid */}
                  <div className="space-y-6">
                    {posts.map((postData, index) => (
                      <PostCard 
                        key={`${postData.post.id}-${index}`} 
                        postData={postData} 
                        index={index}
                        isLoadingComments={loadingComments}
                        isCurrentlyLoading={commentsLoadingIndex === index}
                      />
                    ))}
                  </div>

                  {/* Loading Comments Progress */}
                  {loadingComments && (
                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <CommentCardsLoader 
                        message={`Generating AI comments for post ${commentsLoadingIndex + 1} of ${posts.length}`}
                      />
                      
                      {/* Progress dots */}
                      <div className="flex justify-center space-x-2 mt-4">
                        {posts.map((_, index) => (
                          <motion.div
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              index < commentsLoadingIndex 
                                ? 'bg-green-500' 
                                : index === commentsLoadingIndex 
                                ? 'bg-reddit-orange' 
                                : 'bg-gray-600'
                            }`}
                            animate={index === commentsLoadingIndex ? {
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            } : {}}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Load More Button (Future Feature) */}
                  <motion.div
                    className="text-center mt-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-cyber text-reddit-blue mb-2">
                        🎉 That's all for now!
                      </h3>
                      <p className="text-gray-400">
                        Try searching for different subreddits to discover more posts and AI-generated comments.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {!loading && !error && posts.length === 0 && searchHistory.length > 0 && (
                <motion.div
                  key="welcome"
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="glass-card p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-cyber text-reddit-blue mb-4">
                      Welcome back! 👋
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Search for subreddits above to get started, or try one of your recent searches:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {searchHistory.map((term, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSearch({ subreddit: term, mode: 'single', limit: 10 })}
                          className="px-4 py-2 bg-white/10 hover:bg-reddit-orange/20 rounded-full text-sm text-gray-300 hover:text-white transition-all border border-white/10 hover:border-reddit-orange/50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              Made with ❤️ using React, FastAPI, and AWS Bedrock
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This tool is for educational purposes. Please follow Reddit's guidelines when commenting.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;