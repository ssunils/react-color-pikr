#!/bin/bash

# Release validation script for react-color-pikr
# This script checks if the workspace is ready for a release

set -e

echo "🔍 Validating workspace for release..."

# Check if we're on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Not on main branch (current: $CURRENT_BRANCH)"
    echo "   Switch to main branch before releasing"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Working directory is not clean"
    echo "   Commit or stash changes before releasing"
    git status --short
    exit 1
fi

# Check if we're up to date with remote
git fetch origin main
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "❌ Local branch is not up to date with origin/main"
    echo "   Pull latest changes before releasing"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci
fi

# Run tests
echo "🧪 Running tests..."
npm test

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run type checking
echo "🔧 Running type checker..."
npm run typecheck

# Build the library
echo "🔨 Building library..."
npm run build:lib

# Check current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📋 Current version: $CURRENT_VERSION"

# Check if version exists on npm
if npm view react-color-pikr@$CURRENT_VERSION version 2>/dev/null; then
    echo "⚠️  Version $CURRENT_VERSION already exists on npm"
    echo "   Consider bumping the version before releasing"
else
    echo "✅ Version $CURRENT_VERSION is not published yet"
fi

echo ""
echo "✅ Workspace validation completed successfully!"
echo ""
echo "🚀 Ready to release! Choose your method:"
echo "   1. GitHub Actions: Go to Actions → Release → Run workflow"
echo "   2. npm scripts: npm run release:patch|minor|major|beta"
echo "   3. Manual: npm version <type> && git push origin main --tags"
