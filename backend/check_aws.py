#!/usr/bin/env python3
"""
AWS Bedrock Credential Checker
This script helps diagnose AWS credential and Bedrock access issues.
"""

import boto3
import os
from dotenv import load_dotenv

def check_credentials():
    print("🔍 AWS Bedrock Credential Checker")
    print("=" * 40)
    
    # Load environment variables
    load_dotenv()
    
    # Check if credentials are set
    access_key = os.getenv("AWS_ACCESS_KEY_ID")
    secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    session_token = os.getenv("AWS_SESSION_TOKEN")
    region = os.getenv("AWS_REGION", "us-east-1")
    
    print(f"📍 Region: {region}")
    print(f"🔑 Access Key: {access_key[:10] + '...' if access_key else 'Not set'}")
    print(f"🔐 Secret Key: {'Set' if secret_key else 'Not set'}")
    print(f"🎫 Session Token: {'Set' if session_token else 'Not set'}")
    
    if access_key and access_key.startswith('ASIAT'):
        print("⚠️  Detected temporary credentials (ASIAT prefix)")
        if not session_token:
            print("❌ Session token required for temporary credentials")
            return False
    elif access_key and access_key.startswith('AKIA'):
        print("✅ Detected permanent IAM user credentials")
    else:
        print("❌ Invalid or missing access key")
        return False
    
    print("\n🧪 Testing AWS Connection...")
    
    try:
        # Create boto3 session
        session_kwargs = {
            'aws_access_key_id': access_key,
            'aws_secret_access_key': secret_key,
            'region_name': region
        }
        
        if session_token:
            session_kwargs['aws_session_token'] = session_token
        
        session = boto3.Session(**session_kwargs)
        
        # Test STS (basic AWS connectivity)
        print("🔌 Testing basic AWS connectivity...")
        sts = session.client('sts')
        identity = sts.get_caller_identity()
        print(f"✅ Connected as: {identity.get('Arn', 'Unknown')}")
        
        # Test Bedrock access
        print("🤖 Testing Bedrock access...")
        bedrock = session.client('bedrock', region_name=region)
        models = bedrock.list_foundation_models()
        print(f"✅ Found {len(models['modelSummaries'])} available models")
        
        # Check for Claude 3 Sonnet specifically
        claude_models = [m for m in models['modelSummaries'] if 'claude-3' in m['modelId'].lower()]
        if claude_models:
            print(f"✅ Claude 3 models available: {len(claude_models)}")
            for model in claude_models:
                print(f"   • {model['modelId']}")
        else:
            print("⚠️  No Claude 3 models found - you may need to request access")
        
        # Test Bedrock Runtime
        print("🚀 Testing Bedrock Runtime...")
        bedrock_runtime = session.client('bedrock-runtime', region_name=region)
        print("✅ Bedrock Runtime client created successfully")
        
        print("\n🎉 All checks passed! Your AWS Bedrock setup looks good.")
        return True
        
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error: {error_msg}")
        
        if "UnrecognizedClientException" in error_msg:
            print("💡 Solution: Your AWS credentials are invalid or expired")
            print("   • Check your access key and secret key")
            print("   • If using temporary credentials, add AWS_SESSION_TOKEN")
            print("   • Generate new credentials from AWS Console")
        elif "AccessDeniedException" in error_msg:
            print("💡 Solution: Insufficient permissions")
            print("   • Add 'bedrock:*' permissions to your IAM user/role")
            print("   • Request access to Bedrock models in AWS Console")
        elif "InvalidSignatureException" in error_msg:
            print("💡 Solution: Invalid credentials")
            print("   • Double-check your secret access key")
            print("   • Ensure no extra spaces in your .env file")
        
        return False

def main():
    if not check_credentials():
        print("\n📚 For help setting up AWS Bedrock:")
        print("   https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html")
        exit(1)

if __name__ == "__main__":
    main()