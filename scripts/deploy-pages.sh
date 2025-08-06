#!/bin/bash

# Deploy React Color Pikr demo to GitHub Pages
# This script validates, builds, and provides deployment instructions

set -e

echo "🚀 React Color Pikr - GitHub Pages Deployment"
echo "=============================================="

# Validate workspace
echo "🔍 Validating workspace..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the right directory?"
    exit 1
fi

if [ ! -f "src/App.tsx" ]; then
    echo "❌ src/App.tsx not found. Demo app missing?"
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Not on main branch (current: $CURRENT_BRANCH)"
    echo "   GitHub Pages deploys from main branch"
    read -p "   Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the demo
echo "🔨 Building demo app..."
npm run build

# Check build output
if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - no index.html found in dist/"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📊 Build info:"
ls -lh dist/
echo ""

# Provide deployment options
echo "🌐 Deployment Options:"
echo ""
echo "1. 🤖 Automatic (Recommended):"
echo "   - Push to main branch"
echo "   - GitHub Actions will deploy automatically"
echo "   - URL: https://ssunils.github.io/react-color-pikr"
echo ""
echo "   Commands:"
echo "   git add -A"
echo "   git commit -m \"Update demo app\""
echo "   git push origin main"
echo ""
echo "2. 🔧 Manual trigger:"
echo "   - Go to GitHub → Actions → Deploy to GitHub Pages"
echo "   - Click 'Run workflow'"
echo ""
echo "3. 📋 Manual Pages setup:"
echo "   - Go to GitHub → Settings → Pages"
echo "   - Source: GitHub Actions"
echo "   - Save"
echo ""

# Check current git status
echo "📝 Current git status:"
git status --porcelain || echo "   (No git repository found)"
echo ""

echo "🎉 Ready for deployment!"
echo "💡 See .github/GITHUB_PAGES.md for detailed instructions"
