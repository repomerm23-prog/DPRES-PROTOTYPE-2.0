# DPRES - Quick Reference Card

## 🚀 Commands

```bash
npm install          # Install all dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔐 Login Credentials (Demo)

| Portal | Credentials |
|--------|-------------|
| **Student** | Select institution → Enter any student details |
| **Institution Admin** | Email: any / Password: 4+ chars |
| **SDMA Admin** | Email: any / Password: `9999` (Desktop only) |

## 🗂️ Key File Locations

```
/App.tsx                              # Main app logic & routing
/components/LoginPage.tsx             # Login interface
/components/Dashboard.tsx             # Student dashboard
/components/InstitutionAdminDashboard.tsx  # Institution portal
/components/AdminDashboard.tsx        # SDMA admin portal
/components/shared/institutionsData.ts  # Institution database
/components/LanguageContext.tsx       # Multi-language support
/styles/globals.css                   # Tailwind & custom styles
```

## 🎨 Color Palette

```css
--primary: #2563eb      /* Blue */
--secondary: #f97316    /* Orange */
--success: #10b981      /* Green */
--accent: #8b5cf6       /* Purple */
--warning: #f59e0b      /* Amber */
```

## 🌍 Supported Languages

- `en` - English
- `hi` - हिंदी (Hindi)
- `bn` - বাংলা (Bengali)

## 📱 Breakpoints

```css
sm: 640px     /* Tablet */
md: 768px     /* Small desktop */
lg: 1024px    /* Desktop */
xl: 1280px    /* Large desktop */
2xl: 1536px   /* Extra large */
```

## 🧩 Common Components

```tsx
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Dialog } from './components/ui/dialog'
import { Select } from './components/ui/select'
```

## 🔄 State Management

```tsx
// Alerts Context
import { useAlerts } from './components/shared/AlertContext'
const { alerts, addAlert } = useAlerts()

// Communication Context  
import { useCommunication } from './components/shared/CommunicationContext'
const { sendEmergencySMS, certificates } = useCommunication()

// Language Context
import { useLanguage } from './components/LanguageContext'
const { language, setLanguage, t } = useLanguage()
```

## 📊 Data Structures

### UserData
```typescript
{
  schoolName: string
  schoolCode: string
  studentName: string
  age: string
  institutionType: 'school' | 'college'
}
```

### Institution
```typescript
{
  id: string
  name: string
  code: string
  type: 'school' | 'college'
  district: string
  state: string
  students: number
  avgProgress: number
  compliance: {...}
}
```

## 🎯 Training Modules

1. **Fire Safety** (`fire-safety`)
2. **Earthquake Response** (`earthquake`)
3. **Flood Preparedness** (`flood`)
4. **Cyclone Awareness** (`cyclone`)
5. **Landslide Safety** (`landslide`)

## 🛣️ Routes

```tsx
/                    # Landing page
/dashboard           # Student dashboard
/modules             # Training modules list
/modules/:moduleId   # Individual module
/vr-training         # VR simulations
/community           # Community hub
```

## 🎨 Tailwind Utilities

```css
/* Animations */
.animate-fadeInUp
.animate-float
.animate-spin-slow
.animate-subtleGlow

/* Delays */
.delay-100 to .delay-900

/* Custom */
.admin-glass         /* Glassmorphism */
.command-center-grid /* Grid background */
```

## 🔧 VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React Snippets
- Path Intellisense

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.22.0",
  "motion": "latest",
  "lucide-react": "latest",
  "recharts": "^2.12.0",
  "sonner": "^2.0.3"
}
```

## 🐛 Debugging Tips

```tsx
// Check current route
console.log(window.location.pathname)

// View user data
console.log('User:', userData)

// Check language
console.log('Language:', language)

// View alerts
console.log('Alerts:', alerts)
```

## ⚡ Performance Tips

- Use React.memo for expensive components
- Implement useMemo for computed values
- Use lazy loading for routes
- Optimize images (use WebP)
- Code split large components

## 🎭 Dark Mode

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark')

// Check current mode
const isDark = document.documentElement.classList.contains('dark')
```

## 📱 Mobile Detection

```tsx
import { useIsMobile } from './components/hooks/useIsMobile'

const isMobile = useIsMobile(1024) // Returns true if < 1024px
```

## 🔥 Hot Tips

1. **Restart dev server** if styles don't update
2. **Clear localStorage** to reset saved preferences
3. **Check browser console** for errors
4. **Use React DevTools** for component debugging
5. **Test on actual mobile devices**, not just browser tools

## 📞 Quick Help

- Setup issues → See `SETUP_GUIDE.md`
- Deployment → See `DEPLOYMENT.md`
- Features → See `guidelines/Guidelines.md`
- Main README → See `README.md`

---

**Version**: 1.0.0 | **Updated**: January 2025
