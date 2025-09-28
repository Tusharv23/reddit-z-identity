#!/usr/bin/env python3
"""
Quick Bedrock API Test
Test if we can actually make API calls to Bedrock Runtime
"""

import json
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from bedrock_service import BedrockService
from models import RedditPost
from datetime import datetime

def test_bedrock_api():
    print("🧪 Testing Bedrock API with actual request...")
    
    try:
        # Create a test post
        test_post = RedditPost(
            id="test123",
            title="What's your favorite programming language and why?",
            content="I'm curious to hear what programming languages people prefer and their reasons. Personally, I'm torn between Python for its simplicity and JavaScript for its versatility.",
            author="test_user",
            subreddit="askreddit",
            score=150,
            num_comments=45,
            created_utc=datetime.now(),
            url="https://reddit.com/test",
            permalink="/r/askreddit/test123"
        )
        
        # Initialize Bedrock service
        bedrock_service = BedrockService()
        print("✅ Bedrock service initialized")
        
        # Generate comment suggestions
        print("🤖 Generating comment suggestions...")
        suggestions = bedrock_service.generate_comment_suggestions(test_post)
        
        if suggestions:
            print(f"🎉 Success! Generated {len(suggestions)} suggestions:")
            for i, suggestion in enumerate(suggestions, 1):
                print(f"\n{i}. [{suggestion.tone}]")
                print(f"   Comment: {suggestion.comment}")
                print(f"   Reasoning: {suggestion.reasoning}")
        else:
            print("❌ No suggestions generated")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_bedrock_api()
    if success:
        print("\n🎉 Bedrock API test passed!")
        sys.exit(0)
    else:
        print("\n💥 Bedrock API test failed!")
        sys.exit(1)