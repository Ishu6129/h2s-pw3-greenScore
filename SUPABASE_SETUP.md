# 🔐 Supabase Authentication Setup

## ⚠️ IMPORTANT: Enable Email Provider

You're getting the error: `"provider is not enabled"` because the email authentication provider needs to be enabled in Supabase.

## 📋 Step-by-Step Setup

### 1. Enable Email Authentication

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `kvqyrjjfyhfoohrqoobu`

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Providers" tab

3. **Enable Email Provider**
   - Find "Email" in the list
   - Toggle it to **ENABLED** (green)
   - Click "Save"

### 2. Configure Email Settings (Optional but Recommended)

1. **Email Templates**
   - Go to Authentication → Email Templates
   - Customize confirmation email (optional)
   - Customize password reset email (optional)

2. **Email Settings**
   - Go to Authentication → Settings
   - Configure:
     - **Enable email confirmations**: OFF (for faster testing)
     - **Enable email change confirmations**: OFF (for faster testing)
     - **Secure email change**: ON (recommended)

### 3. Site URL Configuration

1. **Go to Authentication → URL Configuration**

2. **Add Site URLs**:
   ```
   Site URL: http://localhost:3000
   ```

3. **Add Redirect URLs**:
   ```
   http://localhost:3000/**
   http://localhost:3000/auth/callback
   ```

4. **For Production** (after deploying):
   ```
   Site URL: https://your-app.vercel.app
   
   Redirect URLs:
   https://your-app.vercel.app/**
   https://your-app.vercel.app/auth/callback
   ```

## ✅ Verification Steps

### Test Email Authentication

1. **Go to your app**: http://localhost:3000

2. **Click "Get Started"** or go to `/signup`

3. **Fill in the form**:
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test123!

4. **Click "Create Account"**

5. **Expected Result**:
   - ✅ Success message appears
   - ✅ Redirects to dashboard
   - ✅ User profile created

### Check Supabase Dashboard

1. **Go to Authentication → Users**
2. **You should see your test user**
3. **Status should be "Confirmed"** (if email confirmation is disabled)

## 🔧 Troubleshooting

### Error: "provider is not enabled"

**Solution**: Enable Email provider in Supabase Dashboard
- Authentication → Providers → Email → Enable

### Error: "Email not confirmed"

**Solution**: Disable email confirmations for testing
- Authentication → Settings → Enable email confirmations → OFF

### Error: "Invalid redirect URL"

**Solution**: Add your URL to allowed redirects
- Authentication → URL Configuration → Add redirect URLs

### Error: "User already registered"

**Solution**: Either:
1. Use a different email
2. Delete the user from Supabase Dashboard
3. Use the login page instead

## 🎯 Quick Setup Checklist

- [ ] Go to Supabase Dashboard
- [ ] Navigate to Authentication → Providers
- [ ] Enable "Email" provider
- [ ] Save changes
- [ ] Go to Authentication → Settings
- [ ] Disable "Enable email confirmations" (for testing)
- [ ] Go to Authentication → URL Configuration
- [ ] Add `http://localhost:3000` as Site URL
- [ ] Add `http://localhost:3000/**` to Redirect URLs
- [ ] Test signup at http://localhost:3000/signup

## 📸 Visual Guide

### Step 1: Find Authentication
```
Supabase Dashboard
└── [Left Sidebar]
    └── 🔐 Authentication
        └── Providers
```

### Step 2: Enable Email
```
Providers Page
└── Email
    └── [Toggle Switch] → ON (Green)
    └── [Save Button] → Click
```

### Step 3: Configure Settings
```
Authentication
└── Settings
    └── Enable email confirmations → OFF
    └── [Save Button] → Click
```

## 🚀 After Setup

Once email provider is enabled:

1. **Refresh your app** (http://localhost:3000)
2. **Go to signup page** (/signup)
3. **Create a test account**
4. **You should be redirected to dashboard**

## 🔐 Security Notes

### For Development
- Email confirmations: **OFF** (faster testing)
- Password requirements: **Minimum 6 characters**

### For Production
- Email confirmations: **ON** (recommended)
- Password requirements: **Strong passwords**
- Enable 2FA (optional)
- Configure email templates

## 📧 Email Provider Options

### Default (Supabase Email)
- ✅ Works out of the box
- ✅ No configuration needed
- ⚠️ Limited to 3 emails/hour (free tier)
- ⚠️ May go to spam

### Custom SMTP (Recommended for Production)
1. Go to Authentication → Settings
2. Scroll to "SMTP Settings"
3. Configure your email provider:
   - Gmail
   - SendGrid
   - AWS SES
   - Mailgun
   - etc.

## 🎯 Production Checklist

Before deploying to production:

- [ ] Email provider enabled
- [ ] Email confirmations enabled
- [ ] Custom SMTP configured (optional)
- [ ] Email templates customized
- [ ] Site URL updated to production URL
- [ ] Redirect URLs updated to production URLs
- [ ] Password requirements strengthened
- [ ] Rate limiting configured

## 💡 Tips

1. **For Testing**: Disable email confirmations
2. **For Production**: Enable email confirmations
3. **Use Real Emails**: For testing, use real email addresses you can access
4. **Check Spam**: Confirmation emails might go to spam
5. **Rate Limits**: Free tier has email limits, upgrade if needed

## 🆘 Still Having Issues?

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Click "Logs" in left sidebar
3. Look for authentication errors

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Look for failed requests
4. Check response details

## 📞 Support

If you're still stuck:
1. Check Supabase documentation: https://supabase.com/docs/guides/auth
2. Join Supabase Discord: https://discord.supabase.com
3. Check GitHub issues: https://github.com/supabase/supabase/issues

---

**Estimated Setup Time**: 2-3 minutes  
**Difficulty**: Easy  
**Required**: Yes (for authentication to work)

🌱 **Once enabled, your authentication will work perfectly!**