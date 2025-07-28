#!/bin/bash

# Portfolio Website Deployment Script
echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies (if needed)
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to GitHub Pages
    echo "🚀 Deploying to GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
        echo "🌐 Your site should be available at: https://SubhashGuptha30.github.io/subhash-portfolio/"
        echo "⏰ It may take a few minutes for changes to appear."
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi 