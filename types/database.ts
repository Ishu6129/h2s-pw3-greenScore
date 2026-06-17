export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ActivityType =
  | 'cycling'
  | 'recycling'
  | 'public_transport'
  | 'energy_saving'
  | 'plant_based_meal'
  | 'water_conservation'
  | 'sustainable_shopping';

export type ChallengeType =
  | 'streak'
  | 'activity_specific'
  | 'community'
  | 'seasonal'
  | 'personal_best';

export type ItemType =
  | 'badge'
  | 'avatar_customization'
  | 'xp_booster'
  | 'theme'
  | 'donation';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          carbon_score: number;
          total_xp: number;
          current_streak: number;
          longest_streak: number;
          last_activity_date: string | null;
          baseline_carbon: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          carbon_score?: number;
          total_xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          baseline_carbon?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          carbon_score?: number;
          total_xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_activity_date?: string | null;
          baseline_carbon?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          activity_type: ActivityType;
          amount: number;
          unit: string;
          carbon_offset: number;
          xp_earned: number;
          logged_at: string;
          location: unknown | null;
          photo_url: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: ActivityType;
          amount: number;
          unit: string;
          carbon_offset: number;
          xp_earned: number;
          logged_at?: string;
          location?: unknown | null;
          photo_url?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: ActivityType;
          amount?: number;
          unit?: string;
          carbon_offset?: number;
          xp_earned?: number;
          logged_at?: string;
          location?: unknown | null;
          photo_url?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      challenges: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          challenge_type: ChallengeType;
          activity_type?: ActivityType | null;
          target_value: number;
          target_unit?: string | null;
          xp_reward: number;
          start_date: string;
          end_date: string;
          is_active?: boolean;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          challenge_type?: ChallengeType;
          activity_type?: ActivityType | null;
          target_value?: number;
          target_unit?: string | null;
          xp_reward?: number;
          start_date?: string;
          end_date?: string;
          is_active?: boolean;
          icon?: string | null;
          created_at?: string;
        };
      };
      user_challenges: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          progress: number;
          completed: boolean;
          completed_at: string | null;
          started_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          challenge_id: string;
          progress?: number;
          completed?: boolean;
          completed_at?: string | null;
          started_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          challenge_id?: string;
          progress?: number;
          completed?: boolean;
          completed_at?: string | null;
          started_at?: string;
        };
      };
      marketplace_items: {
        Row: {
          id: string;
          name: string;
          description: string;
          item_type: ItemType;
          price: number;
          image_url: string;
          metadata: Json | null;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          item_type: ItemType;
          price: number;
          image_url: string;
          metadata?: Json | null;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          item_type?: ItemType;
          price?: number;
          image_url?: string;
          metadata?: Json | null;
          is_available?: boolean;
          created_at?: string;
        };
      };
      user_inventory: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          purchased_at: string;
          is_equipped: boolean;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          purchased_at?: string;
          is_equipped?: boolean;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_id?: string;
          purchased_at?: string;
          is_equipped?: boolean;
          expires_at?: string | null;
        };
      };
      ai_recommendations: {
        Row: {
          id: string;
          user_id: string;
          recommendations: Json;
          week_start: string;
          generated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          recommendations: Json;
          week_start: string;
          generated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          recommendations?: Json;
          week_start?: string;
          generated_at?: string;
        };
      };
      leaderboard_cache: {
        Row: {
          id: string;
          user_id: string;
          rank: number;
          score: number;
          total_offset: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          rank: number;
          score: number;
          total_offset: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          rank?: number;
          score?: number;
          total_offset?: number;
          updated_at?: string;
        };
      };
      friendships: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted' | 'blocked';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted' | 'blocked';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          friend_id?: string;
          status?: 'pending' | 'accepted' | 'blocked';
          created_at?: string;
        };
      };
    };
  };
}

// Made with Bob
