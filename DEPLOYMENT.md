# 🚀 GreenScore Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account with project set up
- Vercel account (free tier works)
- Git repository

## 🔧 Environment Setup

### 1. Supabase Configuration

Your Supabase credentials are already configured in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=https://kvqyrjjfyhfoohrqoobu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Database Migrations

All migrations have been applied:
- ✅ Core schema (users, activities, challenges, marketplace)
- ✅ Row Level Security policies
- ✅ Admin system and notifications
- ✅ Sample data seeded

## 📦 Local Testing

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Test the application:**
- Visit http://localhost:3000
- Sign up for a new account
- Test login/logout
- Verify dashboard loads with real data

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set environment variables:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

5. **Deploy to production:**
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - GreenScore hackathon project"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Import to Vercel:**
- Go to https://vercel.com/new
- Import your GitHub repository
- Configure project:
  - Framework Preset: Next.js
  - Root Directory: ./
  - Build Command: `npm run build`
  - Output Directory: .next

3. **Add Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`: `https://kvqyrjjfyhfoohrqoobu.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon key from `.env`

4. **Deploy:**
- Click "Deploy"
- Wait 2-3 minutes for build to complete

## 🔐 Supabase Authentication Setup

### Enable Email Authentication

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. Configure email templates (optional)

### Enable Google OAuth (Optional)

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Google" provider
3. Add your Vercel deployment URL to "Redirect URLs":
   - `https://your-app.vercel.app/auth/callback`
4. Get Google OAuth credentials:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://kvqyrjjfyhfoohrqoobu.supabase.co/auth/v1/callback`
5. Add Client ID and Secret to Supabase

## ✅ Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test logout functionality
- [ ] Verify dashboard loads with real data
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify PWA installation works
- [ ] Check all animations are smooth
- [ ] Test protected routes (middleware working)
- [ ] Verify database queries are working

## 🎯 Production URLs

After deployment, you'll get:
- **Production URL**: `https://your-app.vercel.app`
- **Preview URLs**: Automatic for each git push

## 🐛 Troubleshooting

### Build Fails

**Issue**: TypeScript errors during build
**Solution**: Run `npm run build` locally first to catch errors

### Authentication Not Working

**Issue**: Users can't sign up/login
**Solution**: 
1. Check Supabase URL and anon key are correct
2. Verify email provider is enabled in Supabase
3. Check browser console for errors

### Database Connection Issues

**Issue**: Dashboard shows no data
**Solution**:
1. Verify RLS policies are enabled
2. Check user is authenticated
3. Test database connection at `/test` route

### Middleware Errors

**Issue**: Infinite redirects
**Solution**:
1. Clear browser cookies
2. Check middleware.ts configuration
3. Verify Supabase session is valid

## 📊 Performance Optimization

The app is already optimized with:
- ✅ Server-side rendering (SSR)
- ✅ Code splitting
- ✅ Image optimization
- ✅ Font optimization (Geist)
- ✅ Tailwind CSS purging
- ✅ Framer Motion lazy loading

## 🔒 Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ Protected routes with middleware
- ✅ Secure authentication with Supabase
- ✅ Environment variables for secrets
- ✅ HTTPS enforced by Vercel
- ✅ CORS configured properly

## 📱 PWA Features

The app works as a Progressive Web App:
- ✅ Installable on mobile/desktop
- ✅ Offline support (service worker)
- ✅ App manifest configured
- ✅ Icons for all platforms

## 🎨 Design System

- **Colors**: Green/Emerald theme for eco-friendly feel
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Geist Sans & Geist Mono
- **Components**: Glassmorphism with backdrop blur
- **Responsive**: Mobile-first approach

## 📈 Monitoring

After deployment, monitor:
- Vercel Analytics (automatic)
- Supabase Dashboard → Database → Logs
- Browser DevTools → Console for errors

## 🚀 Next Steps

1. **Share the link** with hackathon judges
2. **Create demo account** for judges to test
3. **Prepare presentation** highlighting:
   - Code cleanliness (TypeScript strict mode)
   - Security (RLS, authentication)
   - Performance (SSR, optimizations)
   - Usability (responsive, animations)
   - Unique features (gamification, AI recommendations)

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console errors
4. Test locally first

---

**Deployment Time**: ~5 minutes
**Build Time**: ~2 minutes
**Total Time to Production**: ~10 minutes

Good luck with your hackathon! 🌱🏆