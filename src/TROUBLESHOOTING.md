# DPRES - Troubleshooting Guide 🔧

## Blank Page Issue - CRITICAL FIX

If you're seeing a blank page in localhost or Vercel deployment, follow these steps:

### Step 1: Clean Installation

```bash
# Delete node_modules and lock files
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Fresh install
npm install
```

### Step 2: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors (especially related to imports or CSS)
4. Common errors and fixes:

#### Error: "Cannot find module 'motion/react'"
**Fix:** 
```bash
npm install motion
```

#### Error: "Failed to load PostCSS config"
**Fix:** Make sure `postcss.config.js` exists in root

#### Error: "Tailwind CSS not loading"
**Fix:**
```bash
npm install @tailwindcss/postcss tailwindcss --save-dev
```

### Step 3: Verify File Structure

Your project root should have:
```
project-root/
├── index.html          ✅ Entry HTML
├── main.tsx            ✅ React entry point
├── App.tsx             ✅ Main app component
├── package.json        ✅ Dependencies
├── vite.config.ts      ✅ Vite config
├── postcss.config.js   ✅ PostCSS config (NEW - required for Tailwind v4)
├── tsconfig.json       ✅ TypeScript config
├── styles/
│   └── globals.css     ✅ Global styles with @import "tailwindcss"
└── components/         ✅ React components
```

### Step 4: Start Development Server

```bash
# Kill any existing processes on port 5173 or 3000
npx kill-port 5173 3000

# Start fresh
npm run dev
```

Expected output:
```
VITE v5.x.x ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Test the URL

Open browser and navigate to **exactly** the URL shown in terminal (usually `http://localhost:5173`)

⚠️ **Important:** Don't navigate to a different port than what Vite shows!

### Step 6: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh page (Ctrl+F5 or Cmd+Shift+R)
4. Check if these files load:
   - `main.tsx` (should be 200 OK)
   - `globals.css` (should be 200 OK)
   - Other JS chunks (should be 200 OK)

If any files show 404, there's a path issue.

### Step 7: Verify CSS Import

Check `styles/globals.css` first line should be:
```css
@import "tailwindcss";
```

If not, add it manually at the very top.

### Step 8: Check PostCSS Config

Verify `postcss.config.js` exists with:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

## Common Issues & Solutions

### Issue 1: "Vite shows port 5173 but browser is on 3000"
**Cause:** Port mismatch or old server still running  
**Solution:**
```bash
# Kill all node processes
pkill node
# Or specifically
npx kill-port 3000 5173
# Restart
npm run dev
```

### Issue 2: "White screen but no errors in console"
**Cause:** React not mounting or silent error  
**Solution:**
1. Check `index.html` has `<div id="root"></div>`
2. Check `main.tsx` imports `App` correctly
3. Add error boundary:

```tsx
// In main.tsx, wrap App with error boundary
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: any, info: any) {
    console.error('React Error:', error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h1>Something went wrong</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

### Issue 3: "Module not found" errors
**Cause:** Dependencies not installed  
**Solution:**
```bash
# Install all dependencies
npm install

# If specific package is missing, install it:
npm install <package-name>

# For example:
npm install motion lucide-react recharts
```

### Issue 4: "Styles not loading"
**Cause:** Tailwind CSS v4 not configured properly  
**Solution:**

1. **Install PostCSS plugin:**
```bash
npm install @tailwindcss/postcss --save-dev
```

2. **Create postcss.config.js:**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

3. **Update globals.css:**
```css
@import "tailwindcss";

/* Rest of your CSS */
```

4. **Restart dev server:**
```bash
npm run dev
```

### Issue 5: "Cannot read properties of undefined"
**Cause:** Component trying to access undefined data  
**Solution:** Check browser console for specific component and add null checks

### Issue 6: Vercel Deployment Blank Page
**Cause:** Build errors or environment configuration  
**Solution:**

1. **Check build locally:**
```bash
npm run build
npm run preview
```

2. **Check Vercel build logs** for errors

3. **Verify vercel.json** (create if missing):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

4. **Check Environment Variables** in Vercel dashboard (if any)

5. **Ensure Node version** matches (add to package.json):
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Build & Deployment Checklist

Before deploying, verify:

- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts successfully
- [ ] App loads in browser at http://localhost:5173
- [ ] No errors in browser console
- [ ] `npm run build` completes successfully
- [ ] `npm run preview` shows working app
- [ ] All images load properly
- [ ] Login functionality works
- [ ] Language switching works
- [ ] Dark mode works
- [ ] Responsive design works on mobile

## Quick Diagnostic Commands

```bash
# Check if port is in use
lsof -i :5173
lsof -i :3000

# Kill processes on ports
npx kill-port 5173 3000

# Check Node and npm versions
node --version  # Should be v18+
npm --version   # Should be v9+

# Verify dependencies are installed
ls node_modules | wc -l  # Should show many packages

# Check if build files exist
ls dist/  # Should exist after npm run build

# Test production build
npm run build && npm run preview
```

## Emergency Reset

If nothing works, complete reset:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Delete everything
rm -rf node_modules
rm -rf dist
rm package-lock.json

# 3. Clean npm cache
npm cache clean --force

# 4. Reinstall
npm install

# 5. Restart
npm run dev
```

## Still Having Issues?

### Check These Files:

1. **package.json** - Verify all dependencies are listed
2. **vite.config.ts** - Verify configuration is correct
3. **postcss.config.js** - Must exist for Tailwind v4
4. **tsconfig.json** - Verify TypeScript config
5. **index.html** - Verify script tag points to `/main.tsx`
6. **main.tsx** - Verify imports are correct
7. **styles/globals.css** - Verify `@import "tailwindcss"` is first line

### Enable Verbose Logging:

```bash
# Run dev server with debug info
npm run dev -- --debug

# Check Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Browser-Specific Issues:

- **Clear browser cache** (Ctrl+Shift+Delete)
- **Try incognito/private mode**
- **Try different browser** (Chrome, Firefox, Edge)
- **Disable browser extensions**
- **Check if localhost is blocked** by firewall/antivirus

## Getting Help

If you're still stuck, collect this information:

1. **Node version:** `node --version`
2. **npm version:** `npm --version`
3. **Operating System:** Windows/Mac/Linux
4. **Browser:** Chrome/Firefox/Safari/Edge + version
5. **Error messages:** From browser console
6. **Terminal output:** From `npm run dev`
7. **Build output:** From `npm run build`

## Success Indicators

✅ Your app is working when you see:

1. Terminal shows: `VITE v5.x.x ready in XXX ms`
2. Browser shows: DPRES login page
3. Console shows: No red errors
4. Network tab shows: All files loading (200 OK)
5. Styles are applied correctly
6. Login buttons are clickable

---

**Last Updated:** January 2025  
**For DPRES version:** 1.0.0  
**Vite version:** 5.1.0  
**Tailwind version:** 4.0.0
