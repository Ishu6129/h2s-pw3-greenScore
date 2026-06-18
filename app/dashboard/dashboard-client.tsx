'use client';

import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Award, Target, Zap, LogOut, Plus, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { User, Activity, Challenge, MarketplaceItem } from '@/types';

interface DashboardChallenge extends Challenge {
  user_challenges: {
    progress: number;
    completed: boolean;
    completed_at: string | null;
  }[];
}

interface DashboardClientProps {
  user: User;
  activities: Activity[];
  challenges: DashboardChallenge[];
  marketplaceItems: MarketplaceItem[];
}

export default function DashboardClient({ user, activities, challenges }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const scorePercentage = ((user.carbon_score - 300) / 550) * 100;
  const level = user.level || 1;
  const xpProgress = (user.total_xp % 1000) / 10;

  // Stable particles for consistent rendering
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: `${(i * 3.33) % 100}%`,
        top: `${(i * 7 + 10) % 100}%`,
        delay: (i * 0.1) % 3,
        duration: 3 + (i % 5),
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        {/* Animated Orbs */}
        <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-green-500/30 blur-3xl" />
        <div
          className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-emerald-500/30 blur-3xl"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 animate-pulse rounded-full bg-teal-500/20 blur-3xl"
          style={{ animationDelay: '2s' }}
        />

        {/* Floating Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-green-400/40"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Header */}
      <header className="relative sticky top-0 z-50 border-b border-green-500/20 bg-gray-900/40 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-full border border-green-500/30 bg-green-500/20 p-2 backdrop-blur-xl">
              <Leaf className="h-6 w-6 text-green-400" />
            </div>
            <h1 className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-xl font-bold text-transparent">
              GreenScore
            </h1>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="hidden text-right sm:block">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="font-semibold text-white">{user.full_name}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 font-bold text-white shadow-lg shadow-green-500/50">
              {user.full_name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg border border-red-500/20 p-2 text-red-400 backdrop-blur-xl transition-colors hover:bg-red-500/20 disabled:opacity-50"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container relative mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Carbon Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group rounded-2xl border border-green-500/30 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-green-500/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl border border-green-500/30 bg-green-500/20 p-3 backdrop-blur-xl transition-colors group-hover:bg-green-500/30">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                {scorePercentage.toFixed(0)}%
              </span>
            </div>
            <h3 className="mb-1 text-sm font-medium text-gray-400">Carbon Score</h3>
            <p className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent">
              {user.carbon_score}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-700/50 backdrop-blur-xl">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${scorePercentage}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50"
              />
            </div>
          </motion.div>

          {/* Total XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group rounded-2xl border border-blue-500/30 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-blue-500/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/20 p-3 backdrop-blur-xl transition-colors group-hover:bg-blue-500/30">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
                Level {level}
              </span>
            </div>
            <h3 className="mb-1 text-sm font-medium text-gray-400">Total XP</h3>
            <p className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-3xl font-bold text-transparent">
              {user.total_xp}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-700/50 backdrop-blur-xl">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50"
              />
            </div>
          </motion.div>

          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group rounded-2xl border border-orange-500/30 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-orange-500/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl border border-orange-500/30 bg-orange-500/20 p-3 backdrop-blur-xl transition-colors group-hover:bg-orange-500/30">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <span className="text-2xl" role="img" aria-label="streak fire">
                🔥
              </span>
            </div>
            <h3 className="mb-1 text-sm font-medium text-gray-400">Current Streak</h3>
            <p className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-3xl font-bold text-transparent">
              {user.current_streak} days
            </p>
            <p className="mt-2 text-sm text-gray-500">Best: {user.longest_streak} days</p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group rounded-2xl border border-purple-500/30 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-purple-500/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/20 p-3 backdrop-blur-xl transition-colors group-hover:bg-purple-500/30">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <span className="flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-400">
                <Sparkles className="h-3 w-3" />
                New!
              </span>
            </div>
            <h3 className="mb-1 text-sm font-medium text-gray-400">Achievements</h3>
            <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
              {activities.length}
            </p>
            <p className="mt-2 text-sm text-gray-500">Activities logged</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
            <Sparkles className="h-6 w-6 text-green-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: '🚴', label: 'Cycling', color: 'green', ariaLabel: 'cycling' },
              { icon: '♻️', label: 'Recycling', color: 'blue', ariaLabel: 'recycling' },
              {
                icon: '🚌',
                label: 'Public Transport',
                color: 'orange',
                ariaLabel: 'public transport',
              },
              { icon: '💡', label: 'Energy Saving', color: 'yellow', ariaLabel: 'energy saving' },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group rounded-2xl border border-green-500/20 bg-gray-800/40 p-6 text-center shadow-2xl backdrop-blur-xl transition-all hover:border-green-500/50"
              >
                <div className="mb-2 text-4xl transition-transform group-hover:scale-110">
                  <span role="img" aria-label={action.ariaLabel}>
                    {action.icon}
                  </span>
                </div>
                <p className="font-semibold text-white">{action.label}</p>
                <Plus className="mx-auto mt-2 h-5 w-5 text-green-400 transition-colors group-hover:text-green-300" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities & Challenges */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white">Recent Activities</h2>
            <div className="rounded-2xl border border-green-500/20 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between rounded-xl border border-green-500/20 bg-gray-700/30 p-4 transition-colors hover:border-green-500/40"
                    >
                      <div>
                        <p className="font-semibold capitalize text-white">
                          {activity.activity_type}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">+{activity.xp_earned} XP</p>
                        <p className="text-sm text-gray-400">
                          {activity.carbon_offset.toFixed(2)} kg CO₂
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Target className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                  <p className="mb-2 text-gray-300">No activities yet</p>
                  <p className="text-sm text-gray-500">Start logging your eco-friendly actions!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white">Active Challenges</h2>
            <div className="rounded-2xl border border-green-500/20 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl">
              {challenges.length > 0 ? (
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="rounded-xl border border-green-500/30 bg-gradient-to-r from-gray-700/40 to-gray-800/40 p-4 backdrop-blur-xl transition-colors hover:border-green-500/50"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-white">{challenge.title}</p>
                          <p className="mt-1 text-sm text-gray-400">{challenge.description}</p>
                        </div>
                        <span className="text-2xl">{challenge.icon}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="font-semibold text-green-400">
                            {challenge.user_challenges[0]?.progress || 0}/{challenge.target_value}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-700/50 backdrop-blur-xl">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50 transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                ((challenge.user_challenges[0]?.progress || 0) /
                                  challenge.target_value) *
                                  100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">Reward: {challenge.xp_reward} XP</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Award className="mx-auto mb-4 h-16 w-16 text-gray-600" />
                  <p className="mb-2 text-gray-300">No active challenges</p>
                  <p className="text-sm text-gray-500">Check back soon for new challenges!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-600/40 to-pink-600/40 p-8 text-white shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
              <Sparkles className="h-8 w-8 text-purple-300" />
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                AI Recommendations
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  role="img"
                  aria-label="sparkles"
                >
                  ✨
                </motion.span>
              </h2>
              <p className="text-purple-200">Personalized tips to reduce your carbon footprint</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: 'Switch to LED Bulbs',
                impact: 'Save 50kg CO₂/year',
                icon: '💡',
                ariaLabel: 'light bulb',
              },
              {
                title: 'Use Public Transport',
                impact: 'Save 1.2 tons CO₂/year',
                icon: '🚌',
                ariaLabel: 'bus',
              },
              {
                title: 'Reduce Meat Consumption',
                impact: 'Save 500kg CO₂/year',
                icon: '🥗',
                ariaLabel: 'salad bowl',
              },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="group rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition-colors hover:bg-white/20"
              >
                <div className="mb-2 text-3xl transition-transform group-hover:scale-110">
                  <span role="img" aria-label={tip.ariaLabel}>
                    {tip.icon}
                  </span>
                </div>
                <h3 className="mb-1 font-semibold">{tip.title}</h3>
                <p className="text-sm text-purple-200">{tip.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Made with Bob
