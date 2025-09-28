#!/bin/bash

echo "🚀 Starting Reddit Auto Comments Backend..."

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "📋 Please copy .env.example to .env and fill in your credentials:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    exit 1
fi

# Start the server
echo "🌟 Starting FastAPI server..."
echo "📍 Backend will be available at: http://localhost:8000"
echo "📖 API docs will be available at: http://localhost:8000/docs"
echo ""
python main.py