#!/bin/bash

echo "📊 Reddit Auto Comments - Project Structure"
echo "==========================================="

tree -I 'node_modules|venv|__pycache__|.git|*.pyc|build|dist' . || {
    echo "📁 Project Structure:"
    echo ""
    find . -type f -name "*.py" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.sh" -o -name "*.yml" -o -name "*.html" -o -name "*.css" | grep -v node_modules | grep -v venv | grep -v __pycache__ | sort
}

echo ""
echo "📈 Project Statistics:"
echo "===================="

# Count lines of code
echo "Python files:"
find . -name "*.py" -not -path "./backend/venv/*" | xargs wc -l 2>/dev/null | tail -1 | awk '{print "  " $1 " lines"}'

echo "JavaScript/React files:"
find . -name "*.js" -o -name "*.jsx" -not -path "./frontend/node_modules/*" | xargs wc -l 2>/dev/null | tail -1 | awk '{print "  " $1 " lines"}'

echo "CSS files:"
find . -name "*.css" -not -path "./frontend/node_modules/*" | xargs wc -l 2>/dev/null | tail -1 | awk '{print "  " $1 " lines"}'

echo ""
echo "🛠️  Technology Stack:"
echo "==================="
echo "Backend:"
echo "  • FastAPI (Python web framework)"
echo "  • PRAW (Reddit API wrapper)"
echo "  • AWS Bedrock (AI service)"
echo "  • Uvicorn (ASGI server)"
echo ""
echo "Frontend:"
echo "  • React 18 (UI framework)"
echo "  • Tailwind CSS (styling)"
echo "  • Framer Motion (animations)"
echo "  • Axios (HTTP client)"
echo ""
echo "DevOps:"
echo "  • Docker & Docker Compose"
echo "  • Shell scripts for automation"
echo "  • Environment-based configuration"