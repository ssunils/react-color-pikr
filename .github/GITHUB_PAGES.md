# GitHub Pages Deployment Guide

This document explains how to deploy the React Color Pikr demo to GitHub Pages.

## 🚀 Deployment Setup

The project is configured to automatically deploy to GitHub Pages whenever you push to the `main` branch.

### Automatic Deployment

1. **GitHub Actions Workflow**: The `.github/workflows/deploy.yml` workflow handles automatic deployment
2. **Trigger**: Runs on every push to `main` branch or manual trigger
3. **Build Process**: Builds the demo app and deploys to GitHub Pages
4. **URL**: https://ssunils.github.io/react-color-pikr

### Manual Deployment

If you need to deploy manually:

```bash
# Build the demo app
npm run build

# The built files will be in the dist/ directory
# GitHub Actions will automatically deploy these files
```

### Configuration Details

#### 1. Package.json Changes
- Updated `homepage` field to GitHub Pages URL
- Added `build:demo` script for demo app building

#### 2. Vite Configuration
- Set `base: "/react-color-pikr/"` for correct asset paths
- Configured proper build output directory

#### 3. GitHub Pages Settings
- Uses GitHub Actions for deployment (not legacy GitHub Pages build)
- Deploys from the `gh-pages` branch (handled automatically)

## 🔧 Local Development

To run the demo locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build demo for production
npm run build:demo
```

## 📁 Project Structure

```
react-color-pikr/
├── src/
│   ├── App.tsx           # Demo application
│   ├── App.css           # Demo styles
│   └── components/       # Color picker components
├── public/
│   ├── 404.html          # SPA fallback for GitHub Pages
│   └── vite.svg          # Favicon
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages deployment
└── dist/                 # Built demo app (after build)
```

## 🌐 Live Demo Features

The deployed demo includes:

- **Interactive Color Picker**: Full-featured color picker with all options
- **Installation Instructions**: Copy-paste npm/yarn/pnpm commands
- **Feature Showcase**: Comprehensive list of library features
- **Usage Examples**: Code snippets showing how to use the library
- **Direct Links**: Links to GitHub repository and npm package

## 🔄 Deployment Workflow

1. **Push to main** → Triggers GitHub Actions
2. **Install dependencies** → `npm ci`
3. **Build demo app** → `npm run build`
4. **Deploy to Pages** → Automatic deployment to `gh-pages` branch
5. **Live at** → https://ssunils.github.io/react-color-pikr

## 🐛 Troubleshooting

### Common Issues

1. **404 on refresh**: The `public/404.html` file handles SPA routing
2. **Assets not loading**: Check the `base` path in `vite.config.ts`
3. **Deployment failed**: Check GitHub Actions logs for errors

### Checking Deployment Status

1. Go to your GitHub repository
2. Click **Actions** tab
3. Look for **Deploy to GitHub Pages** workflows
4. Check logs if any deployment fails

### Manual Fixes

If automatic deployment fails, you can:

1. Check repository **Settings** → **Pages**
2. Ensure source is set to **GitHub Actions**
3. Verify the workflow has necessary permissions

## 📊 Performance

The demo is optimized for GitHub Pages:

- ✅ **Small bundle size**: Optimized Vite build
- ✅ **Fast loading**: Modern build tools and tree-shaking
- ✅ **CDN delivery**: GitHub Pages CDN for global availability
- ✅ **Mobile friendly**: Responsive design for all devices

## 🔐 Security

- All external links open in new tabs with `rel="noopener noreferrer"`
- No sensitive data exposed in the demo
- Client-side only application (no server-side processing)
