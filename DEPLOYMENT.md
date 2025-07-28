# Deployment Guide

## GitHub Pages Deployment

This portfolio website is configured for deployment on GitHub Pages with proper client-side routing support.

### 🚀 Quick Deploy

**Windows:**
```bash
deploy.bat
```

**Linux/Mac:**
```bash
./deploy.sh
```

**Manual:**
```bash
npm run deploy
```

### 🔧 Configuration Details

#### 1. Base Path Configuration
- **Vite Config**: `base: "/subhash-portfolio/"` in `vite.config.ts`
- **Router**: `basename="/subhash-portfolio"` in `App.tsx`
- **Homepage**: `"https://SubhashGuptha30.github.io/subhash-portfolio/"` in `package.json`

#### 2. GitHub Pages SPA Routing
The application includes special files to handle client-side routing on GitHub Pages:

- **`public/404.html`**: Redirects all routes to index.html
- **`index.html`**: Contains SPA redirect script

#### 3. File Structure
```
├── public/
│   ├── 404.html          # GitHub Pages routing handler
│   ├── favicon.ico       # Site favicon
│   └── uploads/          # Static assets
├── src/
│   ├── App.tsx          # Router configuration
│   └── main.tsx         # Application entry
├── vite.config.ts       # Build configuration
├── package.json         # Project configuration
└── deploy.bat          # Windows deployment script
```

### 🐛 Common Issues & Solutions

#### 1. 404 Errors on Direct Route Access
**Problem**: Visiting `/project/1` directly shows 404
**Solution**: The `404.html` file handles this by redirecting to index.html

#### 2. Assets Not Loading
**Problem**: Images, CSS, or JS files not loading
**Solution**: Ensure all asset paths use relative paths or include the base path

#### 3. Router Not Working
**Problem**: Navigation doesn't work after deployment
**Solution**: Check that `basename="/subhash-portfolio"` is set in BrowserRouter

### 📝 Deployment Checklist

Before deploying:

- [ ] All asset paths are correct
- [ ] Router basename is set to `/subhash-portfolio`
- [ ] Vite base path is set to `/subhash-portfolio/`
- [ ] 404.html file exists in public folder
- [ ] Package.json homepage is correct

### 🔄 Update Process

1. **Make Changes**: Edit your code
2. **Test Locally**: `npm run dev`
3. **Build**: `npm run build`
4. **Deploy**: `npm run deploy`
5. **Wait**: Changes appear in 2-5 minutes

### 🌐 Live Site

Your portfolio is available at: **https://SubhashGuptha30.github.io/subhash-portfolio/**

### 📊 Build Information

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Router**: React Router DOM
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

### 🛠️ Troubleshooting

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Deployment Issues
```bash
# Check gh-pages installation
npm install -g gh-pages

# Force deploy
npm run deploy --force
```

#### Routing Issues
1. Check browser console for errors
2. Verify 404.html is in the public folder
3. Ensure basename is correct in App.tsx
4. Clear browser cache and try again

### 📈 Performance Tips

- Images are optimized automatically by Vite
- CSS is minified and compressed
- JavaScript is code-split for better loading
- Static assets are cached for performance

### 🔒 Security

- Content Security Policy is configured
- HTTPS is enforced on GitHub Pages
- External resources are whitelisted appropriately 