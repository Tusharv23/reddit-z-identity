#!/bin/bash

echo "🎨 Starting Reddit Auto Comments Frontend..."

# Navigate to frontend directory
cd "$(dirname "$0")/frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Start the development server
echo "🌟 Starting React development server..."
echo "🎯 Frontend will be available at: http://localhost:3000"
echo ""
npm start