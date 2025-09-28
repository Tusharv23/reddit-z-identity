import praw
from typing import List
from datetime import datetime
from config import settings
from models import RedditPost
import logging

logger = logging.getLogger(__name__)

class RedditService:
    def __init__(self):
        self.reddit = praw.Reddit(
            client_id=settings.REDDIT_CLIENT_ID,
            client_secret=settings.REDDIT_CLIENT_SECRET,
            user_agent=settings.REDDIT_USER_AGENT
        )
    
    def fetch_hot_posts(self, subreddit_name: str, limit: int = 3) -> List[RedditPost]:
        """Fetch hot posts from a specific subreddit"""
        try:
            subreddit = self.reddit.subreddit(subreddit_name)
            posts = []
            
            for submission in subreddit.hot(limit=limit):
                # Skip stickied posts
                if submission.stickied:
                    continue
                
                # Get post content - handle different post types
                content = ""
                if hasattr(submission, 'selftext') and submission.selftext:
                    content = submission.selftext
                elif hasattr(submission, 'url') and submission.url:
                    content = f"Link post: {submission.url}"
                
                post = RedditPost(
                    id=submission.id,
                    title=submission.title,
                    content=content[:1000],  # Limit content length
                    author=str(submission.author) if submission.author else "[deleted]",
                    subreddit=submission.subreddit.display_name,
                    score=submission.score,
                    num_comments=submission.num_comments,
                    created_utc=datetime.fromtimestamp(submission.created_utc),
                    url=submission.url,
                    permalink=f"https://reddit.com{submission.permalink}",
                    thumbnail=submission.thumbnail if hasattr(submission, 'thumbnail') and submission.thumbnail not in ['self', 'default', 'nsfw'] else None
                )
                posts.append(post)
                
                if len(posts) >= limit:
                    break
            
            logger.info(f"Fetched {len(posts)} posts from r/{subreddit_name}")
            return posts
            
        except Exception as e:
            logger.error(f"Error fetching posts from r/{subreddit_name}: {str(e)}")
            raise Exception(f"Failed to fetch posts from r/{subreddit_name}: {str(e)}")
    
    def fetch_multiple_subreddits(self, subreddits: List[str], posts_per_subreddit: int = 3) -> List[RedditPost]:
        """Fetch posts from multiple subreddits"""
        all_posts = []
        
        for subreddit_name in subreddits:
            try:
                posts = self.fetch_hot_posts(subreddit_name, posts_per_subreddit)
                all_posts.extend(posts)
            except Exception as e:
                logger.warning(f"Failed to fetch from r/{subreddit_name}: {str(e)}")
                continue
        
        # Sort by score (popularity) and return top 10
        all_posts.sort(key=lambda x: x.score, reverse=True)
        return all_posts[:10]