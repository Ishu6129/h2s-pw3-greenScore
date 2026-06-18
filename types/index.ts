import { ActivityType, ChallengeType, ItemType } from './database';

export * from './database';

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  carbon_score: number;
  total_xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  baseline_carbon: number;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  activity_type: ActivityType;
  amount: number;
  unit: string;
  carbon_offset: number;
  xp_earned: number;
  logged_at: string;
  location?: { lat: number; lng: number } | null;
  photo_url: string | null;
  notes: string | null;
  created_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: ChallengeType;
  activity_type: ActivityType | null;
  target_value: number;
  target_unit: string | null;
  xp_reward: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  icon: string | null;
  created_at: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  challenge?: Challenge;
  progress: number;
  completed: boolean;
  completed_at: string | null;
  started_at: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  item_type: ItemType;
  price: number;
  image_url: string;
  metadata: Record<string, unknown> | null;
  is_available: boolean;
  created_at: string;
}

export interface UserInventoryItem {
  id: string;
  user_id: string;
  item_id: string;
  item?: MarketplaceItem;
  purchased_at: string;
  is_equipped: boolean;
  expires_at: string | null;
}

export interface AIRecommendation {
  title: string;
  description: string;
  impact: number; // kg CO2
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  score: number;
  total_offset: number;
}

export interface ActivityStats {
  total_offset: number;
  total_activities: number;
  by_type: Record<ActivityType, number>;
  weekly_trend: Array<{ date: string; offset: number }>;
}

export interface DashboardData {
  user: User;
  stats: ActivityStats;
  recent_activities: Activity[];
  active_challenges: UserChallenge[];
  recommendations: AIRecommendation[];
}

// Made with Bob
