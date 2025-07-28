@echo off
echo 🚀 Starting deployment process...

REM Clean previous build
echo 🧹 Cleaning previous build...
if exist dist rmdir /s /q dist

REM Install dependencies (if needed)
echo 📦 Installing dependencies...
call npm install

REM Build the project
echo 🔨 Building project...
call npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    
    REM Deploy to GitHub Pages
    echo 🚀 Deploying to GitHub Pages...
    call npm run deploy
    
    if %errorlevel% equ 0 (
        echo ✅ Deployment successful!
        echo 🌐 Your site should be available at: https://SubhashGuptha30.github.io/subhash-portfolio/
        echo ⏰ It may take a few minutes for changes to appear.
    ) else (
        echo ❌ Deployment failed!
        exit /b 1
    )
) else (
    echo ❌ Build failed!
    exit /b 1
)

pause 