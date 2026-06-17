-- Seed data for testing and demo purposes

-- Insert sample challenges
INSERT INTO challenges (title, description, challenge_type, activity_type, target_value, target_unit, xp_reward, start_date, end_date, icon, is_active) VALUES
  ('7-Day Streak', 'Log activities for 7 consecutive days', 'streak', NULL, 7, 'days', 100, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '🔥', true),
  ('Cycle 50km', 'Cycle a total of 50 kilometers', 'activity_specific', 'cycling', 50, 'km', 200, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '🚴', true),
  ('Plant-Based Week', 'Eat 7 plant-based meals this week', 'activity_specific', 'plant_based_meal', 7, 'meals', 150, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', '🌱', true),
  ('Recycle Champion', 'Recycle 20 items this month', 'activity_specific', 'recycling', 20, 'items', 100, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '♻️', true),
  ('Public Transport Hero', 'Use public transport 10 times', 'activity_specific', 'public_transport', 10, 'trips', 120, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '🚌', true),
  ('Energy Saver', 'Save 50 kWh of energy', 'activity_specific', 'energy_saving', 50, 'kWh', 180, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '💡', true),
  ('Water Warrior', 'Conserve 500 liters of water', 'activity_specific', 'water_conservation', 500, 'liters', 130, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '💧', true),
  ('Sustainable Shopper', 'Make 5 sustainable purchases', 'activity_specific', 'sustainable_shopping', 5, 'items', 160, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '🛍️', true),
  ('Community Goal', 'Help the community offset 1000kg CO2', 'community', NULL, 1000, 'kg CO2', 500, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', '🌍', true),
  ('Earth Day Special', 'Complete 3 different activities on Earth Day', 'seasonal', NULL, 3, 'activities', 300, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', '🌎', true);

-- Insert marketplace items
INSERT INTO marketplace_items (name, description, item_type, price, image_url, metadata, is_available) VALUES
  ('Green Warrior Badge', 'Show off your commitment to the environment', 'badge', 100, '/badges/green-warrior.png', '{"rarity": "common", "color": "#22c55e"}', true),
  ('Carbon Champion Badge', 'For the elite carbon reducers', 'badge', 500, '/badges/carbon-champion.png', '{"rarity": "legendary", "color": "#fbbf24"}', true),
  ('Eco Hero Badge', 'Recognize your eco-friendly actions', 'badge', 250, '/badges/eco-hero.png', '{"rarity": "rare", "color": "#3b82f6"}', true),
  ('Streak Master Badge', 'Maintain a 30-day streak', 'badge', 300, '/badges/streak-master.png', '{"rarity": "rare", "color": "#ef4444"}', true),
  ('Avatar Glow - Green', 'Add a green glow to your avatar', 'avatar_customization', 150, '/customizations/glow-green.png', '{"color": "#22c55e", "effect": "glow"}', true),
  ('Avatar Glow - Blue', 'Add a blue glow to your avatar', 'avatar_customization', 150, '/customizations/glow-blue.png', '{"color": "#3b82f6", "effect": "glow"}', true),
  ('Avatar Glow - Gold', 'Add a gold glow to your avatar', 'avatar_customization', 400, '/customizations/glow-gold.png', '{"color": "#fbbf24", "effect": "glow"}', true),
  ('2x XP Booster (24h)', 'Double your XP for 24 hours', 'xp_booster', 200, '/boosters/2x-xp.png', '{"multiplier": 2, "duration": 86400}', true),
  ('3x XP Booster (12h)', 'Triple your XP for 12 hours', 'xp_booster', 350, '/boosters/3x-xp.png', '{"multiplier": 3, "duration": 43200}', true),
  ('Dark Forest Theme', 'A calming dark forest theme', 'theme', 500, '/themes/dark-forest.png', '{"primary": "#166534", "accent": "#15803d"}', true),
  ('Ocean Blue Theme', 'A refreshing ocean theme', 'theme', 500, '/themes/ocean-blue.png', '{"primary": "#0369a1", "accent": "#0284c7"}', true),
  ('Plant 10 Trees', 'Donate to plant 10 real trees', 'donation', 1000, '/donations/trees.png', '{"organization": "One Tree Planted", "trees": 10}', true),
  ('Ocean Cleanup', 'Support ocean cleanup efforts', 'donation', 1500, '/donations/ocean.png', '{"organization": "Ocean Cleanup", "impact": "Remove 50kg of plastic"}', true),
  ('Solar Panel Fund', 'Help fund solar panels in developing countries', 'donation', 2000, '/donations/solar.png', '{"organization": "Solar Aid", "impact": "Power 5 homes"}', true);

-- Note: User data will be created when users sign up through Supabase Auth
-- The following is just for reference on how the data structure looks

-- Example user data structure (DO NOT INSERT - handled by Supabase Auth):
-- INSERT INTO users (id, email, full_name, carbon_score, total_xp, current_streak, longest_streak, baseline_carbon) VALUES
--   ('user-uuid-here', 'demo@greenscore.com', 'Demo User', 520, 1250, 5, 12, 10000);

-- Example activity data structure:
-- INSERT INTO activities (user_id, activity_type, amount, unit, carbon_offset, xp_earned, notes) VALUES
--   ('user-uuid-here', 'cycling', 10, 'km', 2.1, 50, 'Morning commute to work');

-- Made with Bob
