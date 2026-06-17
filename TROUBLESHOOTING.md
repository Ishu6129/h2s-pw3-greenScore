# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Build Cache Corruption

**Symptoms:**
- `Cannot find module './331.js'` errors
- `ENOENT: no such file or directory` errors
- Pages returning 404 or 500 errors

**Solution:**
```bash
# PowerShell (Windows)
Remove-Item -Recurse -Force .next
npm run dev

# Bash (Mac/Linux)
rm -rf .next
npm run dev
```

### 2. Next.js Config Warning

**Symptoms:**
- `Invalid next.config.js options detected: Unrecognized key(s) in object: 'swcMinify'`

**Solution:**
The `swcMinify` option is deprecated in Next.js 15. It's been removed from the config.

### 3. Port Already in Use

**Symptoms:**
- `Port 3000 is in use by process XXXX`

**Solutions:**
```bash
# Option 1: Kill the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
npm run dev -- -p 3001

# Option 3: Let Next.js auto-assign a port (it will use 3001, 3002, etc.)
```

### 4. TypeScript Errors

**Symptoms:**
- Type errors during build
- `Cannot find module` errors

**Solution:**
```bash
# Regenerate TypeScript types
npm run build

# If still issues, clean and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 5. Supabase Connection Issues

**Symptoms:**
- `Failed to fetch` errors
- Authentication not working
- Database queries failing

**Solutions:**

1. **Check Environment Variables:**
```bash
# Verify .env file exists and has correct values
cat .env  # Mac/Linux
type .env  # Windows
```

2. **Verify Supabase URL:**
```
NEXT_PUBLIC_SUPABASE_URL=https://kvqyrjjfyhfoohrqoobu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Test Connection:**
Visit `http://localhost:3000/test` to verify database connection

4. **Check RLS Policies:**
- Go to Supabase Dashboard → Authentication → Policies
- Ensure RLS is enabled on all tables
- Verify policies allow authenticated users

### 6. Authentication Redirect Loop

**Symptoms:**
- Infinite redirects between login and dashboard
- Can't access any pages

**Solution:**
```bash
# Clear browser cookies
# In Chrome: DevTools → Application → Cookies → Clear All

# Or use incognito/private mode

# Check middleware.ts is correct
# Verify Supabase session handling
```

### 7. Module Not Found Errors

**Symptoms:**
- `Cannot find module '@/lib/...'`
- Import errors

**Solution:**
```bash
# Check tsconfig.json paths are correct
# Verify file exists at the path
# Restart TypeScript server in VS Code:
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### 8. Framer Motion Errors

**Symptoms:**
- `motion is not defined`
- Animation errors

**Solution:**
```typescript
// Correct import
import { motion } from 'framer-motion'

// NOT from 'motion/react'
```

### 9. Deployment Fails on Vercel

**Symptoms:**
- Build fails on Vercel
- Works locally but not in production

**Solutions:**

1. **Check Build Locally:**
```bash
npm run build
```

2. **Environment Variables:**
- Add all env vars in Vercel dashboard
- Don't include quotes around values

3. **Node Version:**
- Ensure Vercel uses Node 18+
- Set in `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

### 10. Database Migration Issues

**Symptoms:**
- Tables don't exist
- RLS policy errors
- Permission denied

**Solution:**
```sql
-- Re-run migrations in Supabase SQL Editor
-- In order:
-- 1. supabase/migrations/001_initial_schema.sql
-- 2. supabase/migrations/002_rls_policies.sql
-- 3. supabase/migrations/003_admin_and_notifications.sql
-- 4. supabase/migrations/004_admin_rls_policies.sql
-- 5. supabase/seed.sql
```

## Quick Fixes

### Reset Everything
```bash
# Nuclear option - start fresh
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

### Check All Services
```bash
# 1. Node version
node --version  # Should be 18+

# 2. npm version
npm --version

# 3. Next.js version
npm list next  # Should be 15.x

# 4. Environment variables
type .env  # Windows
cat .env   # Mac/Linux
```

### Verify Installation
```bash
# Check all dependencies installed
npm list --depth=0

# Check for vulnerabilities
npm audit

# Update dependencies (careful!)
npm update
```

## Development Tips

### 1. Use Correct Terminal
- **Windows**: Use PowerShell or Git Bash
- **Mac/Linux**: Use Terminal or Bash

### 2. Clear Cache Regularly
```bash
# Before important tests
Remove-Item -Recurse -Force .next
npm run dev
```

### 3. Check Logs
- **Browser Console**: F12 → Console
- **Terminal**: Watch for errors
- **Supabase**: Dashboard → Logs

### 4. Test in Incognito
- Avoids cookie/cache issues
- Fresh authentication state

### 5. Use VS Code Extensions
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense

## Getting Help

### 1. Check Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### 2. Search Issues
- GitHub Issues for each library
- Stack Overflow
- Next.js Discussions

### 3. Debug Steps
1. Read the error message carefully
2. Check the file and line number
3. Verify imports are correct
4. Check environment variables
5. Clear cache and restart
6. Test in incognito mode
7. Check Supabase dashboard

## Prevention

### 1. Regular Maintenance
```bash
# Weekly
npm audit fix
npm update

# Before deployment
npm run build
npm run lint
```

### 2. Git Workflow
```bash
# Commit often
git add .
git commit -m "feat: description"

# Create branches for features
git checkout -b feature/new-feature
```

### 3. Environment Management
- Keep `.env.example` updated
- Never commit `.env` to git
- Document all env vars

### 4. Testing
- Test locally before deploying
- Test in production after deploying
- Test on multiple devices/browsers

## Emergency Contacts

- **Next.js Discord**: https://nextjs.org/discord
- **Supabase Discord**: https://discord.supabase.com
- **GitHub Issues**: Create an issue in your repo

---

**Last Updated**: June 2026  
**Maintained by**: Bob