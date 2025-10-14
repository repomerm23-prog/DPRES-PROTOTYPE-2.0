# DPRES - Setup Guide

## 🚀 Quick Start Guide for VS Code

### Prerequisites
- Node.js 18+ installed ([Download](https://nodejs.org/))
- VS Code installed
- Git installed (optional)

### Installation Steps

1. **Open the project in VS Code**
   ```bash
   cd dpres-disaster-preparedness
   code .
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application should now be running!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
dpres-disaster-preparedness/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.html             # HTML template
├── components/            # React components
│   ├── LoginPage.tsx      # Login interface
│   ├── Dashboard.tsx      # Student dashboard
│   ├── AdminDashboard.tsx # SDMA admin portal
│   ├── InstitutionAdminDashboard.tsx # Institution admin portal
│   ├── LandingPage.tsx    # Home page
│   ├── ModulesPage.tsx    # Training modules
│   ├── VRTrainingPage.tsx # VR training interface
│   ├── CommunityHub.tsx   # Community features
│   ├── admin/             # Admin-specific components
│   ├── shared/            # Shared utilities & contexts
│   └── ui/                # Reusable UI components
├── styles/
│   └── globals.css        # Tailwind CSS v4 styles
└── package.json           # Project dependencies

```

### Login Credentials

#### Student Access
- Select "Student" on login page
- Choose school/college from dropdown
- Enter student details
- All Kolkata schools and colleges are available

#### Institution Admin Access
- Click "Institution Admin" button
- Select School or College
- Choose your institution
- Enter:
  - Name: Any name
  - Email: Any email
  - Password: Minimum 4 characters (demo mode)

#### SDMA Admin Access (Desktop Only)
- Click "SDMA Admin Access" button (requires desktop screen ≥1024px)
- Email: Any email
- Password: `9999`

### Key Features

1. **Student Portal**
   - Personalized dashboard with progress tracking
   - Interactive training modules (Fire, Earthquake, Flood, Cyclone, Landslide)
   - VR training simulations
   - Community Hub with GriD Corps
   - Real-time disaster alerts
   - Multi-language support (English, Hindi, Bengali)

2. **Institution Admin Portal** ✨ NEW
   - Track school/college preparedness scores
   - Monitor drill participation rates
   - View student progress analytics
   - Compliance certificate management
   - Real-time activity feed

3. **SDMA Admin Portal**
   - System-wide oversight dashboard
   - Emergency alert management
   - Institution monitoring
   - Communication tools (SMS/IVR)
   - Compliance tracking

### Multi-Language Support

The platform supports three languages:
- English (en)
- Hindi (hi)
- Bengali (bn)

Change language from the language selector in the navigation bar.

### Mobile Responsiveness

- Full mobile optimization for student portal
- Responsive design for all screen sizes
- Desktop-only restriction for SDMA admin (security)
- Institution admin accessible on all devices

### Development Tips

1. **Hot Module Replacement (HMR)**
   - Changes to code automatically refresh in browser
   - No need to restart server for most changes

2. **Component Structure**
   - All components use TypeScript
   - Shadcn/ui components in `/components/ui`
   - Shared utilities in `/components/shared`

3. **Styling**
   - Tailwind CSS v4 (no config file needed)
   - Custom variables in `globals.css`
   - Dark mode support with class-based toggle

4. **State Management**
   - React Context for alerts and communication
   - Local state with useState/useEffect
   - Language context for i18n

### Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
# Restart TypeScript server in VS Code
# Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
# Type "TypeScript: Restart TS Server"
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` folder.

### Environment Setup (Optional)

Create a `.env` file for environment variables:
```env
VITE_APP_TITLE=DPRES
VITE_API_URL=your-api-url
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

### Performance Optimization

The application includes:
- Code splitting with React.lazy (where applicable)
- Optimized images and SVGs
- Minimal bundle size with tree-shaking
- Efficient re-rendering with React.memo and useMemo

### Need Help?

- Check the `guidelines/Guidelines.md` for detailed feature documentation
- Review component files for inline documentation
- Check browser console for error messages

---

**Made with ❤️ in India** 🇮🇳

## Color Scheme
- Primary: Blue (#2563eb)
- Secondary: Orange (#f97316)
- Success: Green (#10b981)
- Accent: Purple (#8b5cf6)

## Cultural Elements
- Bengal-inspired abstract patterns
- Kerala-inspired design touches
- Indian heritage elements in animations
- Tricolor accents (Orange-White-Green)
