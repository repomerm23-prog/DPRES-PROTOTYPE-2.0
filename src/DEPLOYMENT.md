# Deployment Guide

## Building for Production

### Step 1: Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 2: Test Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

**Vercel Config** (automatic detection):
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

**Netlify Config** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/dpres"
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/dpres/',
  // ... rest of config
});
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: AWS S3 + CloudFront

1. Build the app:
```bash
npm run build
```

2. Upload `dist/` folder to S3 bucket

3. Configure bucket for static website hosting

4. Set up CloudFront distribution (optional, for HTTPS and CDN)

### Option 5: Traditional Web Server

1. Build the app:
```bash
npm run build
```

2. Upload `dist/` folder contents to your web server

3. Configure server for SPA routing:

**Apache (.htaccess)**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Environment Variables

For production, create `.env.production`:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_APP_TITLE=DPRES Production
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Checklist

Before deploying:

- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Check bundle size (should be < 500KB gzipped)
- [ ] Test all routes work with production build
- [ ] Verify dark mode works
- [ ] Test language switching
- [ ] Check mobile responsiveness
- [ ] Verify all login flows (Student, Institution Admin, SDMA Admin)
- [ ] Test on multiple browsers

## Post-Deployment

1. **Test the live site**:
   - Try all three login types
   - Navigate through all pages
   - Test dark mode and language switching
   - Check mobile view

2. **Monitor performance**:
   - Use Google Lighthouse for audits
   - Check loading times
   - Monitor error logs

3. **Set up analytics** (optional):
   - Google Analytics
   - Vercel Analytics
   - Custom tracking

## SSL/HTTPS

Most deployment platforms (Vercel, Netlify) provide automatic HTTPS.

For custom servers:
- Use Let's Encrypt for free SSL certificates
- Configure your web server for HTTPS
- Set up automatic renewal

## Custom Domain

### Vercel
```bash
vercel domains add yourdomain.com
```

### Netlify
Dashboard → Domain Settings → Add custom domain

### CloudFlare (DNS)
- Point A record to deployment IP
- Enable Cloudflare proxy for DDoS protection and CDN

## Troubleshooting

**404 on refresh**: Configure server for SPA routing (see above)

**Blank page**: Check browser console for errors, verify base URL in vite.config.ts

**Slow loading**: Enable gzip compression on server, use CDN

**Build fails**: Clear node_modules and reinstall dependencies

## Continuous Deployment

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Monitoring

Recommended monitoring tools:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Google Analytics**: User behavior
- **Vercel Analytics**: Performance metrics

---

**Production URL Examples**:
- Vercel: `https://dpres.vercel.app`
- Netlify: `https://dpres.netlify.app`
- Custom: `https://dpres.yourdomain.com`
