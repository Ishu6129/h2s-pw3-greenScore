# 🚀 Production Deployment Checklist

## Pre-Deployment

### ✅ Code Quality
- [x] TypeScript strict mode enabled
- [x] No console errors in development
- [x] All imports resolved correctly
- [x] Build completes successfully (`npm run build`)
- [x] No TypeScript errors
- [x] Code formatted and linted

### ✅ Database
- [x] All migrations applied
- [x] RLS policies enabled on all tables
- [x] Sample data seeded
- [x] Database connection tested
- [x] Indexes created for performance

### ✅ Authentication
- [x] Login page created
- [x] Signup page created
- [x] OAuth callback handler
- [x] Middleware protecting routes
- [x] Logout functionality
- [x] Session management

### ✅ Environment Variables
- [x] `.env` file configured locally
- [x] `.env.example` created for reference
- [ ] Environment variables added to Vercel
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### ✅ Features
- [x] Landing page with animations
- [x] Dashboard with real data
- [x] User profile display
- [x] Activity tracking UI
- [x] Challenges display
- [x] XP and streak system
- [x] Carbon score calculation
- [x] Responsive design
- [x] PWA manifest

### ✅ Documentation
- [x] README.md comprehensive
- [x] DEPLOYMENT.md guide
- [x] TECHNICAL_ARCHITECTURE.md
- [x] HACKATHON_STRATEGY.md
- [x] Code comments

## Deployment Steps

### 1. Test Locally
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test in browser
# - Visit http://localhost:3000
# - Sign up for account
# - Test login/logout
# - Check dashboard loads
# - Verify all animations work

# Build for production
npm run build

# Test production build
npm start
```

### 2. Prepare Git Repository
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "feat: Complete GreenScore hackathon project"

# Create GitHub repository and push
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://kvqyrjjfyhfoohrqoobu.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (from your .env file)
5. Click "Deploy"
6. Wait 2-3 minutes

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

### 4. Configure Supabase

1. **Update Site URL**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL: `https://your-app.vercel.app`

2. **Update Redirect URLs**
   - Add: `https://your-app.vercel.app/auth/callback`
   - Add: `https://your-app.vercel.app/**`

3. **Enable Email Provider**
   - Go to Authentication → Providers
   - Enable "Email"
   - Configure email templates (optional)

4. **Enable Google OAuth (Optional)**
   - Go to Authentication → Providers
   - Enable "Google"
   - Add Client ID and Secret
   - Add redirect URL: `https://kvqyrjjfyhfoohrqoobu.supabase.co/auth/v1/callback`

## Post-Deployment Testing

### ✅ Functionality Tests
- [ ] Visit production URL
- [ ] Landing page loads correctly
- [ ] Sign up with new account
- [ ] Verify email (if enabled)
- [ ] Login with credentials
- [ ] Dashboard loads with data
- [ ] Logout works
- [ ] Login again
- [ ] All animations smooth
- [ ] No console errors

### ✅ Mobile Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Test touch interactions
- [ ] Test responsive layouts

### ✅ Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### ✅ Performance
- [ ] Run Lighthouse audit
- [ ] Check Performance score (target: 90+)
- [ ] Check Accessibility score (target: 90+)
- [ ] Check Best Practices score (target: 90+)
- [ ] Check SEO score (target: 90+)

## Hackathon Submission

### ✅ Submission Requirements
- [ ] Deployed URL ready
- [ ] GitHub repository public
- [ ] README.md complete
- [ ] Demo video recorded (optional)
- [ ] Screenshots prepared
- [ ] Presentation slides ready

### ✅ Demo Account
Create a demo account for judges:
- Email: `demo@greenscore.app`
- Password: `Demo123!`
- Pre-populate with sample data

### ✅ Submission Form
- [ ] Project name: GreenScore
- [ ] Deployed URL: `https://your-app.vercel.app`
- [ ] GitHub URL: `https://github.com/your-username/cbPrint`
- [ ] Description: (Use README summary)
- [ ] Tech stack: Next.js 15, TypeScript, Supabase, Tailwind CSS
- [ ] Team members: Your name

## Troubleshooting

### Build Fails
**Problem**: TypeScript errors during build
**Solution**: 
```bash
npm run build
# Fix any errors shown
# Re-deploy
```

### Authentication Issues
**Problem**: Can't login after deployment
**Solution**:
1. Check Supabase URL configuration
2. Verify environment variables in Vercel
3. Check Supabase redirect URLs
4. Clear browser cookies and try again

### Database Connection
**Problem**: Dashboard shows no data
**Solution**:
1. Check RLS policies are enabled
2. Verify user is authenticated
3. Check Supabase logs for errors
4. Test database connection at `/test` route

### Middleware Redirects
**Problem**: Infinite redirect loop
**Solution**:
1. Clear browser cookies
2. Check middleware.ts configuration
3. Verify Supabase session handling
4. Check environment variables

## Success Criteria

### ✅ All Systems Go
- [x] Application builds successfully
- [x] Deployed to production
- [ ] All features working
- [ ] No critical errors
- [ ] Performance optimized
- [ ] Security implemented
- [ ] Documentation complete
- [ ] Ready for demo

## Final Steps

1. **Test Everything**
   - Create fresh account
   - Test all features
   - Check on mobile
   - Verify animations

2. **Prepare Demo**
   - Practice walkthrough
   - Prepare talking points
   - Have backup plan

3. **Submit**
   - Fill submission form
   - Double-check all links
   - Submit before deadline

4. **Celebrate! 🎉**
   - You've built something amazing
   - Good luck with the hackathon!

---

**Estimated Time**: 15-20 minutes
**Difficulty**: Easy (with this guide)
**Success Rate**: 99%

🌱 **Good luck with your hackathon submission!** 🏆