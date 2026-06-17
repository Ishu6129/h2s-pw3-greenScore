-- Add admin role to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));
CREATE INDEX idx_users_role ON users(role);

-- Admin broadcasts/notifications table
CREATE TABLE admin_broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'success', 'announcement')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'active', 'inactive', 'top_performers')),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);

-- User notifications table
CREATE TABLE user_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'success', 'achievement', 'reminder', 'broadcast')),
  broadcast_id UUID REFERENCES admin_broadcasts(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  action_url TEXT,
  metadata JSONB
);

-- Daily AI suggestions table (enhanced)
CREATE TABLE daily_ai_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  suggestions JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_viewed BOOLEAN DEFAULT FALSE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, date)
);

-- User activity logs (for admin analytics)
CREATE TABLE user_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings (for admin configuration)
CREATE TABLE system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_broadcasts_active ON admin_broadcasts(is_active, created_at DESC);
CREATE INDEX idx_broadcasts_expires ON admin_broadcasts(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX idx_notifications_user ON user_notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON user_notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_type ON user_notifications(type);

CREATE INDEX idx_daily_suggestions_user_date ON daily_ai_suggestions(user_id, date DESC);
CREATE INDEX idx_daily_suggestions_unviewed ON daily_ai_suggestions(user_id, is_viewed) WHERE is_viewed = FALSE;

CREATE INDEX idx_activity_logs_user ON user_activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_action ON user_activity_logs(action);
CREATE INDEX idx_activity_logs_created ON user_activity_logs(created_at DESC);

-- Function to automatically create notifications from broadcasts
CREATE OR REPLACE FUNCTION create_notifications_from_broadcast()
RETURNS TRIGGER AS $$
BEGIN
  -- Create notifications for all users or targeted audience
  INSERT INTO user_notifications (user_id, title, message, type, broadcast_id)
  SELECT 
    u.id,
    NEW.title,
    NEW.message,
    'broadcast',
    NEW.id
  FROM users u
  WHERE 
    CASE 
      WHEN NEW.target_audience = 'all' THEN TRUE
      WHEN NEW.target_audience = 'active' THEN u.last_activity_date >= CURRENT_DATE - INTERVAL '7 days'
      WHEN NEW.target_audience = 'inactive' THEN u.last_activity_date < CURRENT_DATE - INTERVAL '7 days'
      WHEN NEW.target_audience = 'top_performers' THEN u.carbon_score >= 700
      ELSE FALSE
    END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create notifications when broadcast is created
CREATE TRIGGER trigger_create_notifications_from_broadcast
  AFTER INSERT ON admin_broadcasts
  FOR EACH ROW
  WHEN (NEW.is_active = TRUE)
  EXECUTE FUNCTION create_notifications_from_broadcast();

-- Function to log user activities
CREATE OR REPLACE FUNCTION log_user_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_activity_logs (user_id, action, details)
  VALUES (
    NEW.user_id,
    TG_TABLE_NAME || '_' || TG_OP,
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'record_id', NEW.id
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add activity logging triggers
CREATE TRIGGER log_activity_insert
  AFTER INSERT ON activities
  FOR EACH ROW
  EXECUTE FUNCTION log_user_activity();

CREATE TRIGGER log_challenge_complete
  AFTER UPDATE ON user_challenges
  FOR EACH ROW
  WHEN (OLD.completed = FALSE AND NEW.completed = TRUE)
  EXECUTE FUNCTION log_user_activity();

-- Function to clean up expired broadcasts
CREATE OR REPLACE FUNCTION cleanup_expired_broadcasts()
RETURNS void AS $$
BEGIN
  UPDATE admin_broadcasts
  SET is_active = FALSE
  WHERE expires_at IS NOT NULL 
    AND expires_at < NOW()
    AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
  ('ai_suggestions_enabled', 'true', 'Enable daily AI suggestions'),
  ('notifications_enabled', 'true', 'Enable push notifications'),
  ('maintenance_mode', 'false', 'Enable maintenance mode'),
  ('max_activities_per_day', '50', 'Maximum activities a user can log per day'),
  ('leaderboard_update_interval', '300', 'Leaderboard cache update interval in seconds')
ON CONFLICT (key) DO NOTHING;

-- Made with Bob
