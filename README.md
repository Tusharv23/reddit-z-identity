# Reddit Auto Comments

A full-stack application that fetches hot posts from Reddit and generates AI-powered comment suggestions using AWS Bedrock. Features a futuristic React frontend with Reddit-themed gradient design.

## 🚀 Features

- **Reddit Integration**: Fetches hot posts from any subreddit
- **AI-Powered Comments**: Generates 3 different comment suggestions per post using AWS Bedrock
- **Multiple Tones**: Supportive, Analytical, and Humorous comment styles
- **Futuristic UI**: Modern React frontend with Reddit color gradients
- **Real-time**: Fast API responses with concurrent processing
- **Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **PRAW**: Python Reddit API Wrapper
- **AWS Bedrock**: AI service for comment generation
- **Boto3**: AWS SDK for Python
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: Latest React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Axios**: HTTP client for API calls
- **React Icons**: Beautiful icons

## 📋 Prerequisites

1. **Reddit API Credentials**:
   - Go to [Reddit App Preferences](https://www.reddit.com/prefs/apps)
   - Create a new application (script type)
   - Note down your client ID and client secret

2. **AWS Account**:
   - AWS account with Bedrock access
   - Access keys with Bedrock permissions
   - Claude 3 Sonnet model access

## 🚀 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Edit `.env` with your credentials:
```env
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=RedditAutoComments/1.0

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

6. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🎯 Usage

1. **Open the app**: Navigate to `http://localhost:3000`
2. **Search subreddits**: Enter a subreddit name (e.g., "askreddit")
3. **Choose mode**: Single subreddit or multiple subreddits
4. **Set post limit**: Choose how many posts to fetch (5-20)
5. **View results**: See posts with AI-generated comment suggestions
6. **Copy comments**: Click the copy button to copy any suggestion

## 🔧 API Endpoints

### Get Posts with Comments
```http
GET /posts/{subreddit}?limit=10
```

### Get Posts from Multiple Subreddits
```http
GET /posts/multi?subreddits=askreddit,funny&posts_per_subreddit=3
```

### Health Check
```http
GET /health
```

## 🎨 Design Features

- **Reddit Color Scheme**: Orange (#FF4500) and Blue (#0079D3) gradients
- **Glassmorphism**: Translucent cards with backdrop blur
- **Neon Effects**: Glowing text and hover animations
- **Cyber Aesthetics**: Orbitron font and futuristic elements
- **Responsive**: Mobile-first design approach

## 🔒 Security Notes

- Never commit your `.env` file
- Use environment variables for all sensitive data
- Consider using AWS IAM roles in production
- Implement rate limiting for production use

## 🚀 Deployment

### Backend (AWS/Heroku/DigitalOcean)
1. Set environment variables on your hosting platform
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the `build` folder
3. Set `REACT_APP_API_URL` environment variable

## 🐛 Troubleshooting

### Common Issues

1. **Reddit API errors**: Check your Reddit credentials
2. **AWS Bedrock errors**: Verify AWS credentials and model access
3. **CORS issues**: Ensure frontend URL is in CORS_ORIGINS
4. **Module not found**: Run `pip install -r requirements.txt`

### Error Handling

The app includes comprehensive error handling:
- Invalid subreddit names
- Network timeouts
- AI service failures
- Rate limiting

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please follow Reddit's API terms of service and community guidelines.

## 🙏 Acknowledgments

- Reddit for their excellent API
- AWS for Bedrock AI services
- The React and FastAPI communities
- Tailwind CSS for amazing styling utilities