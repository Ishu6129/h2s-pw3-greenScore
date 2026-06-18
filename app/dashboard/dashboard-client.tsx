'use client'

import { motion } from 'framer-motion'
import { Leaf, TrendingUp, Award, Target, Zap, LogOut, Plus, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { User, Activity, Challenge, MarketplaceItem } from '@/types'

interface DashboardChallenge extends Challenge {
  user_challenges: {
    progress: number
    completed: boolean
    completed_at: string | null
  }[]
}

interface DashboardClientProps {
  user: User
  activities: Activity[]
  challenges: DashboardChallenge[]
  marketplaceItems: MarketplaceItem[]
}

export default function DashboardClient({
  user,
  activities,
  challenges,
}: DashboardClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const scorePercentage = ((user.carbon_score - 300) / 550) * 100
  const level = user.level || 1
  const xpProgress = (user.total_xp % 1000) / 10

  // Stable particles for consistent rendering
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      left: `${(i * 3.33) % 100}%`,
      top: `${(i * 7 + 10) % 100}%`,
      delay: (i * 0.1) % 3,
      duration: 3 + (i % 5)
    }))
  , [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
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
      <header className="relative border-b border-green-500/20 bg-gray-900/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-full bg-green-500/20 p-2 backdrop-blur-xl border border-green-500/30">
              <Leaf className="h-6 w-6 text-green-400" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              GreenScore
            </h1>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="font-semibold text-white">{user.full_name}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/50">
              {user.full_name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50 backdrop-blur-xl border border-red-500/20"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Carbon Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-green-500/30 hover:border-green-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl backdrop-blur-xl border border-green-500/30 group-hover:bg-green-500/30 transition-colors">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-sm font-medium text-green-400 bg-green-500/20 px-3 py-1 rounded-full">
                {scorePercentage.toFixed(0)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Carbon Score
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {user.carbon_score}
            </p>
            <div className="mt-4 h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-xl">
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
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-xl border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                Level {level}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Total XP
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{user.total_xp}</p>
            <div className="mt-4 h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-xl">
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
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-orange-500/30 hover:border-orange-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl backdrop-blur-xl border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <span className="text-2xl">🔥</span>
            </div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Current Streak
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {user.current_streak} days
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Best: {user.longest_streak} days
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-xl border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                New!
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Achievements
            </h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-green-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚴', label: 'Cycling', color: 'green' },
              { icon: '♻️', label: 'Recycling', color: 'blue' },
              { icon: '🚌', label: 'Public Transport', color: 'orange' },
              { icon: '💡', label: 'Energy Saving', color: 'yellow' },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-green-500/20 hover:border-green-500/50 transition-all text-center group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
                <p className="font-semibold text-white">{action.label}</p>
                <Plus className="h-5 w-5 mx-auto mt-2 text-green-400 group-hover:text-green-300 transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Recent Activities
            </h2>
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-green-500/20">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-white capitalize">
                          {activity.activity_type}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">
                          +{activity.xp_earned} XP
                        </p>
                        <p className="text-sm text-gray-400">
                          {activity.carbon_offset.toFixed(2)} kg CO₂
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-300 mb-2">No activities yet</p>
                  <p className="text-sm text-gray-500">
                    Start logging your eco-friendly actions!
                  </p>
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
            <h2 className="text-2xl font-bold text-white mb-4">
              Active Challenges
            </h2>
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-green-500/20">
              {challenges.length > 0 ? (
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-colors backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white">
                            {challenge.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {challenge.description}
                          </p>
                        </div>
                        <span className="text-2xl">{challenge.icon}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="font-semibold text-green-400">
                            {challenge.user_challenges[0]?.progress || 0}/
                            {challenge.target_value}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-xl">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 shadow-lg shadow-green-500/50"
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
                        <p className="text-xs text-gray-400">
                          Reward: {challenge.xp_reward} XP
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-300 mb-2">No active challenges</p>
                  <p className="text-sm text-gray-500">
                    Check back soon for new challenges!
                  </p>
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
          className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-2xl p-8 shadow-2xl text-white backdrop-blur-xl border border-purple-500/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xl border border-white/20">
              <Sparkles className="h-8 w-8 text-purple-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                AI Recommendations
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </h2>
              <p className="text-purple-200">
                Personalized tips to reduce your carbon footprint
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                title: 'Switch to LED Bulbs',
                impact: 'Save 50kg CO₂/year',
                icon: '💡',
              },
              {
                title: 'Use Public Transport',
                impact: 'Save 1.2 tons CO₂/year',
                icon: '🚌',
              },
              {
                title: 'Reduce Meat Consumption',
                impact: 'Save 500kg CO₂/year',
                icon: '🥗',
              },
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{tip.icon}</div>
                <h3 className="font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-purple-200">{tip.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Made with Bob
