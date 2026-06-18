import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Demo user credentials
const DEMO_USER = {
  email: 'demo@greenscore.com',
  password: 'demo123456',
  id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Demo User',
  carbon_score: 750,
  total_xp: 2500,
  level: 5,
  current_streak: 7,
  longest_streak: 15,
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if it's the demo user
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const supabase = await createClient();

      // Check if demo user exists in database
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', DEMO_USER.email)
        .single();

      // Create demo user if doesn't exist
      if (!existingUser) {
        await supabase.from('users').insert({
          id: DEMO_USER.id,
          email: DEMO_USER.email,
          full_name: DEMO_USER.full_name,
          carbon_score: DEMO_USER.carbon_score,
          total_xp: DEMO_USER.total_xp,
          level: DEMO_USER.level,
          current_streak: DEMO_USER.current_streak,
          longest_streak: DEMO_USER.longest_streak,
        });
      }

      // Return success with user data
      return NextResponse.json({
        success: true,
        user: DEMO_USER,
        message: 'Demo login successful',
      });
    }

    // Not a demo user
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Demo login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}

// Made with Bob
