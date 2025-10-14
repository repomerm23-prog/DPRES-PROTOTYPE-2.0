# 🚨 BLANK PAGE FIX - Step by Step

## If you're seeing a blank page, follow these exact steps:

### STEP 1: Stop Everything
```bash
# Press Ctrl+C in terminal to stop dev server
# Or close the terminal window
```

### STEP 2: Clean Everything
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# For Windows PowerShell:
Remove-Item -Recurse -Force node_modules, package-lock.json

# For Windows CMD:
rmdir /s /q node_modules
del package-lock.json
```

### STEP 3: Clean npm Cache
```bash
npm cache clean --force
```

### STEP 4: Fresh Install
```bash
npm install
```

**Wait for installation to complete.** This may take 2-5 minutes.

Expected output at the end:
```
added XXX packages in XXs
```

### STEP 5: Verify PostCSS Config Exists

Check if file `postcss.config.js` exists in your project root.

If it doesn't exist, create it:

**File: `postcss.config.js`**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### STEP 6: Verify CSS Import

Open `styles/globals.css` and make sure the VERY FIRST LINE is:

```css
@import "tailwindcss";
```

If it's not there, add it at the very top of the file.

### STEP 7: Kill Any Port Conflicts
```bash
# Kill processes on common ports
npx kill-port 3000 5173

# Or manually find and kill
lsof -i :5173
kill -9 <PID>
```

### STEP 8: Start Development Server
```bash
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### STEP 9: Open in Browser

**IMPORTANT:** Use the EXACT URL shown in your terminal!

Usually it's: `http://localhost:5173`

⚠️ **Do NOT navigate to:**
- `http://localhost:3000` (wrong port)
- `http://127.0.0.1:5173` (use localhost instead)

### STEP 10: Check Browser Console

1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for any RED errors

**If you see errors:**

#### Error: "Cannot find module 'motion/react'"
```bash
npm install motion
npm run dev
```

#### Error: "Failed to resolve entry for package"
```bash
npm install @types/node --save-dev
npm run dev
```

#### Error: "Tailwind is not defined"
```bash
npm install @tailwindcss/postcss --save-dev
npm run dev
```

### STEP 11: Hard Refresh

If page loads but styles are missing:

1. Press **Ctrl+Shift+R** (Windows/Linux)
2. Or **Cmd+Shift+R** (Mac)
3. Or **Ctrl+F5** (Windows)

This clears browser cache and reloads.

---

## ✅ SUCCESS CHECKLIST

Your app is working when you see:

- [ ] Terminal shows "ready in XXX ms"
- [ ] Browser shows DPRES login page (not blank)
- [ ] Orange/blue/green colors are visible
- [ ] Text is readable
- [ ] Buttons are styled correctly
- [ ] No red errors in console
- [ ] Login buttons are clickable

---

## 🔥 NUCLEAR OPTION (If nothing else works)

```bash
# 1. Stop all Node processes
pkill node
# Or on Windows Task Manager: End all Node.js processes

# 2. Delete EVERYTHING
rm -rf node_modules
rm -rf dist
rm -rf .vite
rm package-lock.json

# 3. Clean cache aggressively
npm cache clean --force
npm cache verify

# 4. Reinstall from scratch
npm install

# 5. Build and preview
npm run build
npm run preview

# If preview works, then do:
npm run dev
```

---

## 🐛 STILL BLANK? Debug Mode

Add console logs to see what's loading:

**Edit `main.tsx`:**
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

console.log('🚀 main.tsx loaded');
console.log('📦 React version:', React.version);
console.log('🔍 Root element:', document.getElementById('root'));

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ ROOT ELEMENT NOT FOUND!');
  document.body.innerHTML = '<h1>Error: Root element not found</h1>';
} else {
  console.log('✅ Root element found, mounting React...');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ React mounted successfully');
}
```

Refresh browser and check console. The console logs will tell you where it's failing.

---

## 📱 Vercel Deployment Blank Page

If localhost works but Vercel shows blank page:

### Fix 1: Check Build Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Click on latest deployment
4. Click "View Build Logs"
5. Look for errors in red

### Fix 2: Verify vercel.json

Make sure `vercel.json` exists in root:

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

### Fix 3: Environment Variables

Vercel needs to know about Node version:

1. Go to Vercel Dashboard
2. Project Settings
3. Environment Variables
4. Add: `NODE_VERSION` = `18`

### Fix 4: Redeploy

After making changes:

```bash
git add .
git commit -m "fix: add vercel config"
git push
```

Vercel will auto-redeploy.

---

## 🎯 Quick Diagnosis

Run this command to get system info:

```bash
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "OS: $OSTYPE"
ls -la | grep -E "(package.json|vite.config|postcss|index.html|main.tsx)"
```

Share this output if you need help.

---

## ✨ After It's Working

Once you see the DPRES login page:

1. **Test login:**
   - Click "Student"
   - Select "School"
   - Choose any institution
   - Enter any name
   - Click "Login"

2. **Test language:**
   - Look for globe icon (🌐)
   - Click and select language
   - Verify text changes

3. **Test dark mode:**
   - Look for moon icon (🌙)
   - Click to toggle
   - Verify colors change

4. **Test mobile:**
   - Press F12
   - Click device toggle
   - Select "iPhone 12"
   - Verify responsive design

---

## 📞 Need More Help?

If you're still seeing a blank page:

1. Take a screenshot of:
   - Browser window (blank page)
   - Browser console (F12)
   - Terminal output

2. Note your versions:
   - Node version: `node --version`
   - npm version: `npm --version`
   - Operating system: Windows/Mac/Linux

3. Check if these files exist:
   - [ ] `index.html`
   - [ ] `main.tsx`
   - [ ] `App.tsx`
   - [ ] `package.json`
   - [ ] `vite.config.ts`
   - [ ] `postcss.config.js`
   - [ ] `styles/globals.css`

All of these MUST exist for the app to work.

---

**Remember:** After ANY change to config files, you MUST:
1. Stop dev server (Ctrl+C)
2. Restart dev server (`npm run dev`)

**Good luck! 🚀**
