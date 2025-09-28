#!/usr/bin/env python3
"""
Simple Bedrock Test with Debug Logging
"""

import json
import sys
import os
import logging
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import settings
import boto3

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def test_simple_bedrock():
    print("🧪 Testing simple Bedrock request...")
    
    try:
        # Create Bedrock client
        client = boto3.client(
            'bedrock-runtime',
            region_name=settings.AWS_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            aws_session_token=settings.AWS_SESSION_TOKEN if hasattr(settings, 'AWS_SESSION_TOKEN') and settings.AWS_SESSION_TOKEN else None
        )
        
        # Simple request
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 100,
            "messages": [
                {
                    "role": "user",
                    "content": "Please respond with exactly this JSON format: {\"test\": \"success\", \"message\": \"Hello from Bedrock\"}"
                }
            ]
        }
        
        print("📤 Sending request to Bedrock...")
        response = client.invoke_model(
            modelId=settings.BEDROCK_MODEL_ID,
            body=json.dumps(request_body),
            contentType='application/json'
        )
        
        print("📥 Got response, parsing...")
        response_body = json.loads(response['body'].read())
        response_text = response_body['content'][0]['text']
        
        print(f"✅ Raw response: {response_text}")
        return True
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_simple_bedrock()