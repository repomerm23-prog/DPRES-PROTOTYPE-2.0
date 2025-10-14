# DPRES - Quick Run Checklist ✅

## Before You Start

### System Requirements
- [ ] Node.js 18+ installed ([node --version](https://nodejs.org/))
- [ ] npm or yarn installed
- [ ] VS Code installed (recommended)
- [ ] Minimum 4GB RAM available
- [ ] Internet connection for downloading dependencies

## Step-by-Step Setup

### 1. Open Project in VS Code
```bash
cd dpres-disaster-preparedness
code .
```
⏱️ Time: 10 seconds

### 2. Install Dependencies
```bash
npm install
```
⏱️ Time: 2-5 minutes (depending on internet speed)

**Expected output:**
```
added XXX packages in XXs
```

**If errors occur:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Try again: `npm install`

### 3. Start Development Server
```bash
npm run dev
```
⏱️ Time: 5-10 seconds

**Expected output:**
```
VITE v5.x.x ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Open in Browser
- Click the link in terminal: `http://localhost:5173`
- Or manually navigate to: `http://localhost:5173`

⏱️ Time: 2-3 seconds

## First Run Testing

### Test 1: Student Login ✅
1. Click "Student" button
2. Select "School" or "College"
3. Choose any institution (try Kolkata institutions)
4. Enter student details
5. Click "Login"

**Expected:** Dashboard loads with welcome animation

### Test 2: Institution Admin Login ✅
1. Go back to login (logout)
2. Click "Institution Admin" button
3. Select institution type
4. Choose your institution
5. Enter credentials (any email, password 4+ chars)
6. Click "Access Dashboard"

**Expected:** Institution Admin Dashboard loads

### Test 3: SDMA Admin Login (Desktop Only) ✅
1. Ensure screen width ≥ 1024px
2. Click "SDMA Admin Access" button (red button)
3. Email: Any authorized email
4. Password: `9999`
5. Click "Access Admin Dashboard"

**Expected:** Admin portal loads with command center interface

### Test 4: Language Switching ✅
1. Click language dropdown (globe icon)
2. Switch between English, Hindi, Bengali
3. Verify content changes

**Expected:** All text translates properly

### Test 5: Dark Mode ✅
1. Click dark mode toggle (moon/sun icon)
2. Verify colors change
3. Toggle back to light mode

**Expected:** Smooth transition between themes

### Test 6: Mobile View ✅
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (e.g., iPhone 12)
4. Test navigation and scrolling

**Expected:** Responsive layout works perfectly

### Test 7: Page Scrolling ✅
1. Go to login page
2. Resize browser window to be shorter
3. Verify page scrolls properly

**Expected:** No content cut off, smooth scrolling

## Common Issues & Solutions

### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill the process
npx kill-port 5173
# Or use different port
npm run dev -- --port 3000
```

### Issue: "Module not found" errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Blank white screen
**Solution:**
1. Check browser console (F12) for errors
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)

### Issue: Styles not loading
**Solution:**
1. Restart dev server (Ctrl+C, then `npm run dev`)
2. Check `styles/globals.css` exists
3. Clear browser cache

### Issue: TypeScript errors in VS Code
**Solution:**
1. Open Command Palette (Ctrl+Shift+P)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

## Performance Tips

### Speed Up Development
1. **Close unused tabs** - VS Code can be memory intensive
2. **Disable unnecessary extensions** - Check VS Code extensions
3. **Use fast mode** - Some features can be disabled during dev

### Optimize Browser
1. **Close other tabs** - Keep only what you need
2. **Disable browser extensions** - Can interfere with dev tools
3. **Use Chrome/Edge** - Best dev tools support

## Development Workflow

### Making Changes
1. Edit files in VS Code
2. Save (Ctrl+S)
3. Browser auto-refreshes (Hot Module Replacement)
4. Check changes in browser

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React Snippets
- Path Intellisense

### Keyboard Shortcuts
- `Ctrl+S` - Save file
- `Ctrl+Shift+P` - Command palette
- `F12` - Browser DevTools
- `Ctrl+Shift+F` - Search in files
- `Alt+Shift+F` - Format document

## Build for Production

### Create Production Build
```bash
npm run build
```
⏱️ Time: 30-60 seconds

**Expected output:**
```
✓ built in XXXs
dist/index.html              XX.XX kB
dist/assets/index-XXXXX.js   XXX.XX kB
```

### Test Production Build
```bash
npm run preview
```

Navigate to: `http://localhost:4173`

## Deployment Checklist

Before deploying to production:
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Verify all features work
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify login pages scroll properly
- [ ] Test all three login types
- [ ] Verify language switching
- [ ] Test dark mode
- [ ] Check responsive design

## Quick Reference

### Project Structure
```
/App.tsx              - Main app component
/main.tsx             - Entry point
/components/          - React components
/styles/globals.css   - Tailwind styles
/package.json         - Dependencies
```

### Important Files
- **Login**: `/components/LoginPage.tsx`
- **Student Dashboard**: `/components/Dashboard.tsx`
- **Admin Portal**: `/components/AdminDashboard.tsx`
- **Institution Admin**: `/components/InstitutionAdminDashboard.tsx`
- **Institutions Data**: `/components/shared/institutionsData.ts`
- **Languages**: `/components/LanguageContext.tsx`

### Default Credentials
- **Student**: Any institution + details
- **Institution Admin**: Any email + 4+ char password
- **SDMA Admin**: Email: authorized / Password: `9999`

## Support Resources

- **Setup Guide**: See `SETUP_GUIDE.md`
- **Quick Reference**: See `QUICK_REFERENCE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Features**: See `guidelines/Guidelines.md`

## Status Indicators

✅ **Everything Working** - All tests pass
⚠️ **Minor Issues** - Non-critical issues
❌ **Critical Issues** - App won't run

## Final Checks

Before considering setup complete:
- [ ] Dev server starts without errors
- [ ] Browser shows DPRES login page
- [ ] Can login as student
- [ ] Can login as institution admin
- [ ] Can switch languages
- [ ] Can toggle dark mode
- [ ] Mobile view works
- [ ] Login pages scroll properly
- [ ] No console errors (critical ones)

## Success! 🎉

If all checks pass, you're ready to:
- Start developing
- Add features
- Test thoroughly
- Build for production
- Deploy to hosting

---

**Happy Coding!** 🚀

**Made with ❤️ in India** 🇮🇳

*For detailed information, see SETUP_GUIDE.md*
