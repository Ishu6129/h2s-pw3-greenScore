-- Enable RLS on new tables
ALTER TABLE admin_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Admin broadcasts policies
CREATE POLICY "Admins can manage broadcasts"
  ON admin_broadcasts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can view active broadcasts"
  ON admin_broadcasts FOR SELECT
  USING (is_active = TRUE AND (expires_at IS NULL OR expires_at > NOW()));

-- User notifications policies
CREATE POLICY "Users can view own notifications"
  ON user_notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON user_notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON user_notifications FOR INSERT
  WITH CHECK (true);

-- Daily AI suggestions policies
CREATE POLICY "Users can view own suggestions"
  ON daily_ai_suggestions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own suggestions"
  ON daily_ai_suggestions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can create suggestions"
  ON daily_ai_suggestions FOR INSERT
  WITH CHECK (true);

-- User activity logs policies
CREATE POLICY "Users can view own activity logs"
  ON user_activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity logs"
  ON user_activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "System can create activity logs"
  ON user_activity_logs FOR INSERT
  WITH CHECK (true);

-- System settings policies
CREATE POLICY "Anyone can view system settings"
  ON system_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage system settings"
  ON system_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Made with Bob
