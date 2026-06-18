import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();

  // Fetch recent activities
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch active challenges
  const { data: challenges } = await supabase
    .from('challenges')
    .select(
      `
      *,
      user_challenges!inner(
        progress,
        completed,
        completed_at
      )
    `
    )
    .eq('user_challenges.user_id', user.id)
    .eq('is_active', true)
    .limit(3);

  // Fetch marketplace items
  const { data: marketplaceItems } = await supabase
    .from('marketplace_items')
    .select('*')
    .eq('is_available', true)
    .limit(4);

  return (
    <DashboardClient
      user={
        profile || {
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata.full_name || user.email!.split('@')[0],
          carbon_score: 500,
          total_xp: 0,
          level: 1,
          current_streak: 0,
          longest_streak: 0,
          created_at: new Date().toISOString(),
        }
      }
      activities={activities || []}
      challenges={challenges || []}
      marketplaceItems={marketplaceItems || []}
    />
  );
}

// Made with Bob
