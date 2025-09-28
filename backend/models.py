from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class RedditPost(BaseModel):
    id: str
    title: str
    content: str
    author: str
    subreddit: str
    score: int
    num_comments: int
    created_utc: datetime
    url: str
    permalink: str
    thumbnail: Optional[str] = None

class CommentSuggestion(BaseModel):
    comment: str
    tone: str
    reasoning: str

class PostWithComments(BaseModel):
    post: RedditPost
    comment_suggestions: List[CommentSuggestion]

class ErrorResponse(BaseModel):
    error: str
    message: str