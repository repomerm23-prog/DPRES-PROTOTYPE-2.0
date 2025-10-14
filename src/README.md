# DPRES - Disaster Preparedness & Response Education System 🇮🇳

[![Made in India](https://img.shields.io/badge/Made%20in-India-orange?style=for-the-badge)](https://india.gov.in)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚨 SEEING A BLANK PAGE?

**[→ Click here for immediate fix](BLANK_PAGE_FIX.md)** | **[→ Troubleshooting Guide](TROUBLESHOOTING.md)**

Quick solution:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

**Required files:** Make sure `postcss.config.js` exists and `styles/globals.css` starts with `@import "tailwindcss";`

---

## 🎯 Overview

DPRES is a comprehensive **Disaster Preparedness and Response Education System** designed for schools and colleges across India. The platform provides interactive training modules, real-time disaster alerts, VR simulations, and administrative dashboards for effective disaster management education.

## ✨ Key Features

### 🎓 Student Portal
- **Interactive Training Modules**: Fire Safety, Earthquake, Flood, Cyclone, Landslide
- **VR Training Simulations**: Immersive disaster response practice
- **Progress Tracking**: Personal achievement dashboard with friend comparisons
- **Community Hub**: GriD Corps integration and peer collaboration
- **Real-time Alerts**: Live disaster notifications with safety instructions
- **Multi-language Support**: English, Hindi, Bengali

### 🏫 Institution Admin Portal (NEW)
- **Preparedness Scoring**: Track institutional disaster readiness
- **Drill Monitoring**: Monitor safety drill participation rates
- **Student Analytics**: Comprehensive progress and performance metrics
- **Compliance Management**: Certificate tracking and audit reports
- **Activity Feed**: Real-time institutional activity monitoring

### 🛡️ SDMA Admin Portal
- **System-wide Dashboard**: Monitor all enrolled institutions
- **Emergency Management**: Create and broadcast disaster alerts
- **Communication Tools**: SMS/IVR mass notification system
- **Compliance Tracking**: Institution-wise preparedness reports
- **Analytics & Reports**: Data-driven insights and trends

## 🚀 Quick Start

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed installation instructions.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Login Access

### Student
- Choose "Student" → Select institution → Enter details
- Access full training modules and community features

### Institution Admin
- Choose "Institution Admin" → Select school/college
- Email: Any valid email | Password: Min 4 characters (demo)

### SDMA Admin (Desktop Only)
- Choose "SDMA Admin Access" (requires ≥1024px screen)
- Email: Any email | Password: `9999`

## 🎨 Design Philosophy

- **Color Scheme**: Blue (#2563eb) & Orange (#f97316)
- **Cultural Elements**: Bengal & Kerala-inspired patterns
- **Typography**: Clean sans-serif with optimal readability
- **Responsive**: Mobile-first design, optimized for all devices
- **Accessibility**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui, Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Build Tool**: Vite

## 📁 Project Structure

```
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
├── components/            
│   ├── LoginPage.tsx      
│   ├── Dashboard.tsx      
│   ├── AdminDashboard.tsx 
│   ├── InstitutionAdminDashboard.tsx
│   ├── admin/             # Admin components
│   ├── shared/            # Shared utilities
│   └── ui/                # Reusable UI
├── styles/
│   └── globals.css        # Tailwind styles
└── package.json
```

## 🌍 Multi-Language Support

Switch between languages using the language selector:
- 🇬🇧 English
- 🇮🇳 हिंदी (Hindi)
- 🇮🇳 বাংলা (Bengali)

All content dynamically translates including:
- UI labels and buttons
- Training module content
- Alert messages
- Dashboard metrics

## 🌓 Dark Mode

Toggle between light and dark themes with automatic persistence:
- Click the dark mode toggle in navigation
- Preference saved to localStorage
- Smooth transitions between themes
- Optimized contrast ratios

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly interface
- Mobile-optimized navigation
- Adaptive layouts for all screen sizes
- Performance optimized for mobile networks

## 🏗️ Development

```bash
# Start dev server with HMR
npm run dev

# Type checking
npx tsc --noEmit

# Preview production build
npm run preview
```

## 📊 Data Sources

- **Institutions**: 50+ schools and colleges across India
- **Training Modules**: 5 comprehensive disaster types
- **Compliance Data**: Real-time tracking and reporting
- **Alert System**: Integration-ready for live data

## 🔒 Security Features

- Password-protected admin access
- Desktop-only restriction for SDMA admin
- Secure route protection
- Input validation and sanitization

## 🚦 Performance

- Code splitting for optimal loading
- Lazy loading of components
- Optimized bundle size
- Efficient re-rendering with React.memo
- Image optimization

## 🤝 Contributing

This is an educational platform. Contributions welcome for:
- Additional disaster types
- More institutions
- Language translations
- UI/UX improvements
- Performance optimizations

## 📄 License

This project is part of an educational initiative for disaster preparedness in India.

## 📞 Support

For setup issues, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**Built with ❤️ for safer schools and colleges across India** 🇮🇳

**Features**: Progressive Training • VR Simulations • Real-time Alerts • Community Collaboration • Multi-language • Dark Mode • Mobile-First
