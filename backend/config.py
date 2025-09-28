import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Reddit API Configuration
    REDDIT_CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
    REDDIT_CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
    REDDIT_USER_AGENT = os.getenv("REDDIT_USER_AGENT", "RedditAutoComments/1.0")
    
    # AWS Bedrock Configuration
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_SESSION_TOKEN = os.getenv("AWS_SESSION_TOKEN")  # For temporary credentials
    AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
    
    # FastAPI Configuration
    BACKEND_PORT = int(os.getenv("BACKEND_PORT", 8000))
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    
    # Bedrock Model Configuration
    BEDROCK_MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0"
    
    def validate_config(self):
        """Validate that all required environment variables are set"""
        required_vars = [
            "REDDIT_CLIENT_ID",
            "REDDIT_CLIENT_SECRET",
            "AWS_ACCESS_KEY_ID", 
            "AWS_SECRET_ACCESS_KEY"
        ]
        
        missing_vars = []
        for var in required_vars:
            if not getattr(self, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

settings = Settings()