import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const redditApi = {
  // Fetch posts from a single subreddit with comment suggestions
  getPostsWithComments: async (subreddit, limit = 10) => {
    try {
      const response = await api.get(`/posts/${subreddit}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 
        `Failed to fetch posts from r/${subreddit}`
      );
    }
  },

  // Fetch posts from multiple subreddits
  getPostsFromMultipleSubreddits: async (subreddits, postsPerSubreddit = 3) => {
    try {
      const subredditString = Array.isArray(subreddits) 
        ? subreddits.join(',') 
        : subreddits;
      
      const response = await api.get('/posts/multi', {
        params: { 
          subreddits: subredditString,
          posts_per_subreddit: postsPerSubreddit
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 
        'Failed to fetch posts from multiple subreddits'
      );
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  }
};

export default api;