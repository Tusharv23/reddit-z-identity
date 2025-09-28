import boto3
import json
import logging
from typing import List
from config import settings
from models import CommentSuggestion, RedditPost

logger = logging.getLogger(__name__)

class BedrockService:
    def __init__(self):
        # Prepare credentials for Bedrock client
        client_kwargs = {
            'service_name': 'bedrock-runtime',
            'region_name': settings.AWS_REGION,
        }
        
        # Add credentials if provided
        if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY:
            client_kwargs['aws_access_key_id'] = settings.AWS_ACCESS_KEY_ID
            client_kwargs['aws_secret_access_key'] = settings.AWS_SECRET_ACCESS_KEY
            
            # Add session token if available (for temporary credentials)
            if hasattr(settings, 'AWS_SESSION_TOKEN') and settings.AWS_SESSION_TOKEN:
                client_kwargs['aws_session_token'] = settings.AWS_SESSION_TOKEN
        
        try:
            self.bedrock_client = boto3.client(**client_kwargs)
            logger.info("Bedrock client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Bedrock client: {str(e)}")
            raise
    
    def generate_comment_suggestions(self, post: RedditPost) -> List[CommentSuggestion]:
        """Generate 3 comment suggestions for a Reddit post using Bedrock"""
        try:
            # Create a comprehensive prompt for comment generation
            prompt = self._create_comment_prompt(post)
            
            # Prepare the request body for Claude
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
            
            # Make the API call to Bedrock
            response = self.bedrock_client.invoke_model(
                modelId=settings.BEDROCK_MODEL_ID,
                body=json.dumps(request_body),
                contentType='application/json'
            )
            
            # Parse the response
            response_body = json.loads(response['body'].read())
            response_text = response_body['content'][0]['text']
            
            # Parse the structured response into CommentSuggestion objects
            suggestions = self._parse_comment_response(response_text)
            
            logger.info(f"Generated {len(suggestions)} comment suggestions for post {post.id}")
            return suggestions
            
        except Exception as e:
            error_msg = str(e)
            logger.error(f"Error generating comments for post {post.id}: {error_msg}")
            
            # Provide specific error messages for common issues
            if "UnrecognizedClientException" in error_msg:
                logger.error("AWS credentials are invalid or expired. Please check your AWS configuration.")
            elif "AccessDeniedException" in error_msg:
                logger.error("Access denied to Bedrock. Please check your IAM permissions.")
            elif "ModelNotFoundError" in error_msg:
                logger.error(f"Model {settings.BEDROCK_MODEL_ID} not found or not accessible.")
            
            # Return fallback suggestions
            return self._get_fallback_suggestions()
    
    def _create_comment_prompt(self, post: RedditPost) -> str:
        """Create a detailed prompt for comment generation"""
        return f"""
You are a helpful Reddit user who wants to engage meaningfully with posts. 
Analyze the following Reddit post and generate exactly 3 different comment suggestions.

POST DETAILS:
Title: {post.title}
Subreddit: r/{post.subreddit}
Content: {post.content[:500]}
Author: {post.author}
Score: {post.score}
Comments: {post.num_comments}

Please generate 3 diverse comment suggestions with different tones:
1. Supportive/Encouraging
2. Analytical/Thoughtful  
3. Humorous/Light-hearted

For each suggestion, provide:
- The actual comment text (keep it concise, 1-3 sentences)
- The tone category
- Brief reasoning for why this comment would be engaging

Format your response as JSON:
{{
    "suggestions": [
        {{
            "comment": "Your supportive comment here",
            "tone": "Supportive",
            "reasoning": "Why this comment works"
        }},
        {{
            "comment": "Your analytical comment here", 
            "tone": "Analytical",
            "reasoning": "Why this comment works"
        }},
        {{
            "comment": "Your humorous comment here",
            "tone": "Humorous", 
            "reasoning": "Why this comment works"
        }}
    ]
}}

Make sure comments are:
- Relevant to the post content
- Appropriate for the subreddit
- Engaging and likely to get upvotes
- Not offensive or controversial
- Natural and human-like
"""
    
    def _parse_comment_response(self, response_text: str) -> List[CommentSuggestion]:
        """Parse the AI response into CommentSuggestion objects"""
        try:
            # Extract JSON from the response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            
            if start_idx == -1 or end_idx == 0:
                raise ValueError("No JSON found in response")
            
            json_text = response_text[start_idx:end_idx]
            parsed_response = json.loads(json_text)
            
            suggestions = []
            for suggestion_data in parsed_response.get('suggestions', []):
                suggestion = CommentSuggestion(
                    comment=suggestion_data.get('comment', ''),
                    tone=suggestion_data.get('tone', 'Neutral'),
                    reasoning=suggestion_data.get('reasoning', '')
                )
                suggestions.append(suggestion)
            
            return suggestions[:3]  # Ensure we only return 3 suggestions
            
        except Exception as e:
            logger.error(f"Error parsing comment response: {str(e)}")
            return self._get_fallback_suggestions()
    
    def _get_fallback_suggestions(self) -> List[CommentSuggestion]:
        """Return fallback suggestions when AI generation fails"""
        return [
            CommentSuggestion(
                comment="Thanks for sharing this! Really interesting perspective.",
                tone="Supportive",
                reasoning="Generic supportive comment that works for most posts"
            ),
            CommentSuggestion(
                comment="This raises some good points. I'd be curious to hear more about your thoughts on this.",
                tone="Analytical", 
                reasoning="Encourages discussion and shows genuine interest"
            ),
            CommentSuggestion(
                comment="Well, that's definitely one way to look at it! 😄",
                tone="Humorous",
                reasoning="Light-hearted response that acknowledges the post"
            )
        ]