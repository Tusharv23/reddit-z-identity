from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import logging
import asyncio
from concurrent.futures import ThreadPoolExecutor

from config import settings
from models import PostWithComments, RedditPost, ErrorResponse
from reddit_service import RedditService
from bedrock_service import BedrockService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Reddit Auto Comments API",
    description="Fetches Reddit posts and generates AI-powered comment suggestions",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Initialize services
reddit_service = RedditService()
bedrock_service = BedrockService()
executor = ThreadPoolExecutor(max_workers=4)

@app.on_event("startup")
async def startup_event():
    """Validate configuration on startup"""
    try:
        settings.validate_config()
        logger.info("Reddit Auto Comments API started successfully")
    except ValueError as e:
        logger.error(f"Configuration error: {str(e)}")
        raise

@app.get("/")
async def root():
    return {"message": "Reddit Auto Comments API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "reddit-auto-comments"}

@app.get("/posts/{subreddit}", response_model=List[PostWithComments])
async def get_posts_with_comments(
    subreddit: str,
    limit: int = Query(default=10, ge=1, le=25, description="Number of posts to fetch")
):
    """Fetch hot posts from a subreddit and generate comment suggestions"""
    try:
        logger.info(f"Fetching {limit} posts from r/{subreddit}")
        
        # Fetch posts from Reddit
        posts = await asyncio.get_event_loop().run_in_executor(
            executor, reddit_service.fetch_hot_posts, subreddit, limit
        )
        
        if not posts:
            raise HTTPException(status_code=404, detail=f"No posts found in r/{subreddit}")
        
        # Generate comments for each post concurrently
        tasks = []
        for post in posts:
            task = asyncio.get_event_loop().run_in_executor(
                executor, bedrock_service.generate_comment_suggestions, post
            )
            tasks.append(task)
        
        # Wait for all comment generation tasks to complete
        all_suggestions = await asyncio.gather(*tasks)
        
        # Combine posts with their comment suggestions
        posts_with_comments = []
        for post, suggestions in zip(posts, all_suggestions):
            posts_with_comments.append(PostWithComments(
                post=post,
                comment_suggestions=suggestions
            ))
        
        logger.info(f"Successfully processed {len(posts_with_comments)} posts")
        return posts_with_comments
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/posts/multi", response_model=List[PostWithComments])
async def get_posts_from_multiple_subreddits(
    subreddits: str = Query(..., description="Comma-separated list of subreddits"),
    posts_per_subreddit: int = Query(default=3, ge=1, le=5, description="Posts per subreddit")
):
    """Fetch posts from multiple subreddits and generate comment suggestions"""
    try:
        subreddit_list = [s.strip() for s in subreddits.split(",") if s.strip()]
        
        if not subreddit_list:
            raise HTTPException(status_code=400, detail="No valid subreddits provided")
        
        if len(subreddit_list) > 10:
            raise HTTPException(status_code=400, detail="Maximum 10 subreddits allowed")
        
        logger.info(f"Fetching posts from subreddits: {subreddit_list}")
        
        # Fetch posts from multiple subreddits
        posts = await asyncio.get_event_loop().run_in_executor(
            executor, reddit_service.fetch_multiple_subreddits, subreddit_list, posts_per_subreddit
        )
        
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found in specified subreddits")
        
        # Generate comments for each post concurrently
        tasks = []
        for post in posts:
            task = asyncio.get_event_loop().run_in_executor(
                executor, bedrock_service.generate_comment_suggestions, post
            )
            tasks.append(task)
        
        # Wait for all comment generation tasks to complete
        all_suggestions = await asyncio.gather(*tasks)
        
        # Combine posts with their comment suggestions
        posts_with_comments = []
        for post, suggestions in zip(posts, all_suggestions):
            posts_with_comments.append(PostWithComments(
                post=post,
                comment_suggestions=suggestions
            ))
        
        logger.info(f"Successfully processed {len(posts_with_comments)} posts from multiple subreddits")
        return posts_with_comments
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing multi-subreddit request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/posts/{subreddit}/{post_id}/comments", response_model=List[dict])
async def generate_comments_for_post(subreddit: str, post_id: str):
    """Generate comment suggestions for a specific post"""
    try:
        # This would require implementing a method to fetch a single post
        # For now, return a simple response
        return {"message": "Feature coming soon - generate comments for specific post"}
        
    except Exception as e:
        logger.error(f"Error generating comments for post {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.BACKEND_PORT)