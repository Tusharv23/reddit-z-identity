#!/bin/bash

echo "🚀 Reddit Auto Comments - Complete Setup Script"
echo "================================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "System requirements check passed!"

# Setup Backend
echo ""
echo "🐍 Setting up Backend..."
echo "========================"

cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    print_info "Creating Python virtual environment..."
    python3 -m venv venv
    print_status "Virtual environment created"
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment and install dependencies
print_info "Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt
print_status "Python dependencies installed"

# Setup environment file
if [ ! -f ".env" ]; then
    print_info "Creating .env file from template..."
    cp .env.example .env
    print_warning "Please edit backend/.env with your credentials:"
    print_info "  - Reddit API credentials"
    print_info "  - AWS Bedrock credentials"
    print_info "Run: nano backend/.env"
else
    print_status ".env file already exists"
fi

cd ..

# Setup Frontend
echo ""
echo "⚛️  Setting up Frontend..."
echo "=========================="

cd frontend

# Install npm dependencies
if [ ! -d "node_modules" ]; then
    print_info "Installing npm dependencies..."
    npm install
    print_status "npm dependencies installed"
else
    print_status "npm dependencies already installed"
fi

# Create frontend .env if needed
if [ ! -f ".env" ]; then
    print_info "Creating frontend environment file..."
    echo "REACT_APP_API_URL=http://localhost:8000" > .env
    print_status "Frontend .env created"
fi

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
print_status "Backend setup completed in ./backend/"
print_status "Frontend setup completed in ./frontend/"

echo ""
echo "📋 Next Steps:"
echo "=============="
print_info "1. Edit backend/.env with your API credentials"
print_info "2. Start the backend: ./start-backend.sh"
print_info "3. Start the frontend: ./start-frontend.sh"
print_info "4. Open http://localhost:3000 in your browser"

echo ""
echo "🔑 Required Credentials:"
echo "======================="
print_info "Reddit API: https://www.reddit.com/prefs/apps"
print_info "AWS Bedrock: AWS Console with Claude 3 access"

echo ""
print_status "Happy coding! 🚀"