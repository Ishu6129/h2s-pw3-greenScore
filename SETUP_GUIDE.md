# 🚀 GreenScore Setup Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Supabase account
- Google Gemini API key (optional for AI features)

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Supabase client
- Framer Motion
- And more...

## Step 2: Set Up Supabase Database

### Option A: Using Supabase Dashboard

1. Go to your Supabase project: https://supabase.com/dashboard/project/nfjjzevzbtpdrnflhaau
2. Navigate to SQL Editor
3. Run the migrations in order:
   - Copy and paste `supabase/migrations/001_initial_schema.sql`
   - Click "Run"
   - Copy and paste `supabase/migrations/002_rls_policies.sql`
   - Click "Run"
   - (Optional) Copy and paste `supabase/seed.sql` for sample data
   - Click "Run"

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref nfjjzevzbtpdrnflhaau

# Run migrations
supabase db push

# (Optional) Seed database
supabase db seed
```

## Step 3: Configure Environment Variables

The `.env.local` file is already configured with your Supabase credentials.

**Add your Google Gemini API key:**

1. Get API key from: https://makersuite.google.com/app/apikey
2. Update `.env.local`:
   ```
   GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
   ```

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Verify Setup

### Check Database Connection

1. Go to http://localhost:3000
2. Landing page should load without errors
3. Check browser console for any errors

### Test Database Schema

Run this query in Supabase SQL Editor to verify tables:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

You should see:

- users
- activities
- challenges
- user_challenges
- marketplace_items
- user_inventory
- ai_recommendations
- leaderboard_cache
- friendships

## Common Issues & Solutions

### Issue: "type geography does not exist"

**Solution:** The migration files have been updated to use `latitude` and `longitude` columns instead of PostGIS geography type. Re-run the migrations.

### Issue: Tailwind CSS not working

**Solution:**

1. Make sure `npm install` completed successfully
2. Restart the dev server: `npm run dev`
3. Clear `.next` folder: `rm -rf .next` (or delete manually)

### Issue: TypeScript errors

**Solution:**

1. Wait for `npm install` to complete
2. Restart VS Code TypeScript server: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### Issue: Supabase connection errors

**Solution:**

1. Verify `.env.local` has correct credentials
2. Check Supabase project is active
3. Verify RLS policies are enabled

## Project Structure

```
greenscore/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   └── (dashboard)/       # Dashboard routes (to be created)
├── components/            # React components (to be created)
├── lib/
│   ├── supabase/         # Database clients
│   └── utils/            # Utility functions
├── types/                # TypeScript definitions
├── supabase/
│   └── migrations/       # Database migrations
└── public/               # Static assets (to be created)
```

## Next Steps

After setup is complete, you can:

1. **Create user authentication pages** (`app/(auth)/login` and `app/(auth)/signup`)
2. **Build the dashboard** (`app/(dashboard)/page.tsx`)
3. **Implement core components**:
   - Carbon score dial
   - Activity logger
   - Analytics charts
   - Challenges list
   - Marketplace
4. **Add AI recommendations** using Google Gemini
5. **Implement PWA features** (manifest, service worker)
6. **Write tests** for business logic
7. **Deploy to Vercel**

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when implemented)
npm test

# Run E2E tests (when implemented)
npm run test:e2e
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GOOGLE_GEMINI_API_KEY`
4. Deploy!

Vercel will automatically:

- Build the project
- Set up SSL
- Configure CDN
- Enable edge functions

## Support

For issues or questions:

- Check `TECHNICAL_ARCHITECTURE.md` for detailed specs
- Review `HACKATHON_STRATEGY.md` for feature details
- Consult Next.js docs: https://nextjs.org/docs
- Supabase docs: https://supabase.com/docs

---

**Ready to build something amazing! 🚀🌍**
