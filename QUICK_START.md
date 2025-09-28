# 🚀 Quick Start Guide

## Reddit Auto Comments - Get Up and Running in 5 Minutes!

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Reddit API credentials
- AWS account with Bedrock access

### 🏃‍♂️ Fast Setup (Recommended)

1. **Run the setup script:**
```bash
./setup.sh
```

2. **Configure your credentials:**
```bash
nano backend/.env
```
Add your Reddit and AWS credentials to the file.

3. **Start the application:**

Terminal 1 (Backend):
```bash
./start-backend.sh
```

Terminal 2 (Frontend):
```bash
./start-frontend.sh
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

### 🐳 Docker Setup (Alternative)

1. **Copy environment file:**
```bash
cp .env.docker .env
```

2. **Add your credentials to .env**

3. **Start with Docker:**
```bash
docker-compose up --build
```

### 🔑 Getting API Credentials

**Reddit API:**
1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Choose "script" as the app type
4. Copy your client ID and secret

**AWS Bedrock:**
1. Create an AWS account
2. Request access to Claude 3 Sonnet in Bedrock
3. Create IAM user with Bedrock permissions
4. Generate access keys

### 🎯 Usage
1. Enter a subreddit name (e.g., "askreddit")
2. Choose single or multiple subreddit mode
3. Set how many posts to fetch
4. Click "Search"
5. View posts with AI-generated comment suggestions
6. Copy any comment you like!

### 🔧 Troubleshooting
- **"Module not found"**: Run `./setup.sh` again
- **"Reddit API error"**: Check your Reddit credentials
- **"AWS error"**: Verify Bedrock access and credentials
- **"CORS error"**: Make sure both servers are running

### 📱 Features
- ✅ Fetch hot posts from any subreddit
- ✅ AI-generated comments in 3 different tones
- ✅ Futuristic UI with Reddit colors
- ✅ Copy comments with one click
- ✅ Mobile responsive design
- ✅ Real-time post analysis

Need help? Check the full README.md for detailed instructions!