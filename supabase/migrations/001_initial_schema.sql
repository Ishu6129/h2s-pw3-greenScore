-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE activity_type AS ENUM (
  'cycling',
  'recycling',
  'public_transport',
  'energy_saving',
  'plant_based_meal',
  'water_conservation',
  'sustainable_shopping'
);

CREATE TYPE challenge_type AS ENUM (
  'streak',
  'activity_specific',
  'community',
  'seasonal',
  'personal_best'
);

CREATE TYPE item_type AS ENUM (
  'badge',
  'avatar_customization',
  'xp_booster',
  'theme',
  'donation'
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  carbon_score INTEGER DEFAULT 500 CHECK (carbon_score >= 300 AND carbon_score <= 850),
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_activity_date DATE,
  baseline_carbon DECIMAL DEFAULT 10000 CHECK (baseline_carbon > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  amount DECIMAL NOT NULL CHECK (amount > 0),
  unit TEXT NOT NULL,
  carbon_offset DECIMAL NOT NULL CHECK (carbon_offset >= 0),
  xp_earned INTEGER NOT NULL CHECK (xp_earned >= 0),
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  latitude DECIMAL,
  longitude DECIMAL,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges table
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type challenge_type NOT NULL,
  activity_type activity_type,
  target_value DECIMAL NOT NULL CHECK (target_value > 0),
  target_unit TEXT,
  xp_reward INTEGER NOT NULL CHECK (xp_reward > 0),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (end_date > start_date)
);

-- User challenges table
CREATE TABLE user_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  progress DECIMAL DEFAULT 0 CHECK (progress >= 0),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Marketplace items table
CREATE TABLE marketplace_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  item_type item_type NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  image_url TEXT NOT NULL,
  metadata JSONB,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User inventory table
CREATE TABLE user_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES marketplace_items(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_equipped BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, item_id)
);

-- AI recommendations table
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendations JSONB NOT NULL,
  week_start DATE NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- Leaderboard cache table
CREATE TABLE leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total_offset DECIMAL NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Friendships table
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_users_carbon_score ON users(carbon_score DESC);
CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_logged_at ON activities(logged_at DESC);
CREATE INDEX idx_activities_user_logged ON activities(user_id, logged_at DESC);
CREATE INDEX idx_activities_type ON activities(activity_type);

CREATE INDEX idx_challenges_active ON challenges(is_active, end_date);
CREATE INDEX idx_challenges_type ON challenges(challenge_type);

CREATE INDEX idx_user_challenges_user ON user_challenges(user_id);
CREATE INDEX idx_user_challenges_completed ON user_challenges(user_id, completed);

CREATE INDEX idx_marketplace_available ON marketplace_items(is_available);
CREATE INDEX idx_marketplace_type ON marketplace_items(item_type);

CREATE INDEX idx_inventory_user ON user_inventory(user_id);
CREATE INDEX idx_inventory_equipped ON user_inventory(user_id, is_equipped);

CREATE INDEX idx_recommendations_user ON ai_recommendations(user_id, week_start DESC);

CREATE INDEX idx_leaderboard_rank ON leaderboard_cache(rank);
CREATE INDEX idx_leaderboard_score ON leaderboard_cache(score DESC);

CREATE INDEX idx_friendships_user ON friendships(user_id, status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Made with Bob
