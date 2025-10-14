# 🚀 DPRES Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm 9+ installed
- Code editor (VS Code recommended)

## Installation (First Time)

```bash
# 1. Navigate to project folder
cd dpres-disaster-preparedness

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Go to http://localhost:5173
```

**Installation time:** ~2-5 minutes

---

## Daily Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Stop server
# Press Ctrl+C in terminal
```

---

## 🆘 Having Issues?

### Blank Page?
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

### Port Already in Use?
```bash
npx kill-port 5173
npm run dev
```

### Styles Not Loading?
1. Make sure `postcss.config.js` exists
2. Check `styles/globals.css` starts with `@import "tailwindcss";`
3. Restart dev server

---

## 🧪 Test Credentials

### Student Login
- Type: Student
- Institution: Any school/college
- Name: Any name
- Age: Any age

### Institution Admin
- Type: Institution Admin
- Institution: Any school/college
- Email: Any email
- Password: Minimum 4 characters

### SDMA Admin (Desktop Only)
- Email: One of the authorized emails
- Password: `9999`

**Authorized admin emails:**
- repomerm23@gmail.com
- pratyasaha23@gmail.com
- sayanpal066@gmail.com
- muskankhatun0905@gmail.com
- soumyarajnandi241@gmail.com
- sih@gmail.com

---

## 📂 Project Structure

```
project/
├── index.html          # HTML entry
├── main.tsx            # React entry
├── App.tsx             # Main component
├── package.json        # Dependencies
├── vite.config.ts      # Vite config
├── postcss.config.js   # PostCSS config (Required!)
├── components/         # All React components
├── styles/
│   └── globals.css     # Global styles
└── .vscode/            # VS Code settings
```

---

## 🎨 Key Features

- **Multi-language**: English, Hindi, Bengali
- **Dark Mode**: Toggle with moon icon
- **Responsive**: Works on desktop & mobile
- **Training Modules**: Fire, Earthquake, Flood, Cyclone, Landslide
- **VR Training**: Immersive training interface
- **Community Hub**: GriD Corps integration
- **Admin Portal**: SDMA command center (desktop only)
- **Institution Admin**: School/college dashboard

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page | See BLANK_PAGE_FIX.md |
| Port in use | `npx kill-port 5173` |
| Styles missing | Restart dev server |
| Module not found | `npm install` |
| Build fails | `rm -rf node_modules && npm install` |

---

## 📚 Documentation

- **Setup Guide**: SETUP_GUIDE.md
- **Troubleshooting**: TROUBLESHOOTING.md
- **Blank Page Fix**: BLANK_PAGE_FIX.md
- **Deployment**: DEPLOYMENT.md
- **Quick Reference**: QUICK_REFERENCE.md

---

## ✅ Success Indicators

Your app is running correctly when:
- Terminal shows: `ready in XXX ms`
- Browser shows: DPRES login page with colors
- Console shows: No red errors
- Buttons are clickable and styled

---

## 🌐 Browser Access

**Default URL:** http://localhost:5173

**Alternative URLs if port changes:**
- http://localhost:5174
- http://localhost:5175

**Check terminal for exact URL!**

---

## 💡 Pro Tips

1. **Always use the exact URL from terminal**
2. **Hard refresh after changes:** Ctrl+Shift+R
3. **Check console for errors:** F12
4. **Mobile testing:** F12 → Device toolbar
5. **Clear cache if styles broken:** Ctrl+Shift+Delete

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel
```

### Manual Build
```bash
# Build project
npm run build

# Upload 'dist' folder to hosting
# dist/ folder contains all production files
```

---

## 🎯 What's Next?

After successful installation:

1. ✅ Test student login
2. ✅ Test institution admin login
3. ✅ Test SDMA admin login (desktop)
4. ✅ Switch languages
5. ✅ Toggle dark mode
6. ✅ Try training modules
7. ✅ Check mobile responsiveness
8. ✅ Test on different browsers

---

## 📞 Need Help?

1. Check TROUBLESHOOTING.md
2. Check BLANK_PAGE_FIX.md
3. Verify all files exist
4. Check Node/npm versions
5. Clear everything and reinstall

---

**Made with ❤️ in India** 🇮🇳

**DPRES v1.0.0** | **Vite 5** | **React 18** | **Tailwind v4**
