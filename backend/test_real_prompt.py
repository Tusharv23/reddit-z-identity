#!/usr/bin/env python3
"""
Test Real Bedrock Prompt
"""

import json
import sys
import os
import logging
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import settings
import boto3

# Enable debug logging for our logger only
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_real_prompt():
    print("🧪 Testing real prompt format...")
    
    try:
        # Create Bedrock client
        client = boto3.client(
            'bedrock-runtime',
            region_name=settings.AWS_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_session_token=settings.AWS_SESSION_TOKEN if hasattr(settings, 'AWS_SESSION_TOKEN') and settings.AWS_SESSION_TOKEN else None
        )
        
        # Real prompt from our service
        prompt = """
You are a helpful Reddit user who wants to engage meaningfully with posts. 
Analyze the following Reddit post and generate exactly 3 different comment suggestions.

POST DETAILS:
Title: What's your favorite programming language and why?
Subreddit: r/askreddit
Content: I'm curious to hear what programming languages people prefer and their reasons. Personally, I'm torn between Python for its simplicity and JavaScript for its versatility.
Author: test_user
Score: 150
Comments: 45

Please generate 3 diverse comment suggestions with different tones:
1. Supportive/Encouraging
2. Analytical/Thoughtful  
3. Humorous/Light-hearted

For each suggestion, provide:
- The actual comment text (keep it concise, 1-3 sentences)
- The tone category
- Brief reasoning for why this comment would be engaging

Format your response as JSON:
{
    "suggestions": [
        {
            "comment": "Your supportive comment here",
            "tone": "Supportive",
            "reasoning": "Why this comment works"
        },
        {
            "comment": "Your analytical comment here", 
            "tone": "Analytical",
            "reasoning": "Why this comment works"
        },
        {
            "comment": "Your humorous comment here",
            "tone": "Humorous", 
            "reasoning": "Why this comment works"
        }
    ]
}

Make sure comments are:
- Relevant to the post content
- Appropriate for the subreddit
- Engaging and likely to get upvotes
- Not offensive or controversial
- Natural and human-like
"""
        
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
        
        print("📤 Sending real prompt to Bedrock...")
        response = client.invoke_model(
            modelId=settings.BEDROCK_MODEL_ID,
            body=json.dumps(request_body),
            contentType='application/json'
        )
        
        print("📥 Got response, parsing...")
        response_body = json.loads(response['body'].read())
        response_text = response_body['content'][0]['text']
        
        print("✅ Raw response:")
        print("=" * 50)
        print(response_text)
        print("=" * 50)
        
        # Try to parse JSON
        start_idx = response_text.find('{')
        end_idx = response_text.rfind('}') + 1
        
        if start_idx != -1 and end_idx > 0:
            json_text = response_text[start_idx:end_idx]
            print("\n📄 Extracted JSON:")
            print(json_text)
            
            try:
                parsed = json.loads(json_text)
                print("\n🎉 JSON parsing successful!")
                print(f"Found {len(parsed.get('suggestions', []))} suggestions")
                for i, suggestion in enumerate(parsed.get('suggestions', []), 1):
                    print(f"  {i}. [{suggestion.get('tone')}] {suggestion.get('comment')}")
            except json.JSONDecodeError as e:
                print(f"\n❌ JSON parsing failed: {e}")
        else:
            print("\n❌ No JSON found in response")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_real_prompt()