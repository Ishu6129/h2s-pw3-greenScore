'use client'

import { motion } from 'framer-motion'
import { Leaf, TrendingUp, Award, Target, Zap, LogOut, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DashboardClientProps {
  user: any
  activities: any[]
  challenges: any[]
  marketplaceItems: any[]
}

export default function DashboardClient({
  user,
  activities,
  challenges,
  marketplaceItems,
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
  const xpForNextLevel = level * 1000
  const xpProgress = (user.total_xp % 1000) / 10

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-500/20 p-2">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">GreenScore</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{user.full_name}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
              {user.full_name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Carbon Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">
                {scorePercentage.toFixed(0)}%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Carbon Score
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {user.carbon_score}
            </p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${scorePercentage}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              />
            </div>
          </motion.div>

          {/* Total XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                Level {level}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total XP
            </h3>
            <p className="text-3xl font-bold text-gray-900">{user.total_xp}</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              />
            </div>
          </motion.div>

          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-orange-600">🔥</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Current Streak
            </h3>
            <p className="text-3xl font-bold text-gray-900">
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
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600">New!</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Achievements
            </h3>
            <p className="text-3xl font-bold text-gray-900">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all text-center"
              >
                <div className="text-4xl mb-2">{action.icon}</div>
                <p className="font-semibold text-gray-900">{action.label}</p>
                <Plus className="h-5 w-5 mx-auto mt-2 text-gray-400" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Recent Activities
            </h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {activity.activity_type}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          +{activity.xp_earned} XP
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.co2_saved.toFixed(2)} kg CO₂
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-2">No activities yet</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Active Challenges
            </h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-100">
              {challenges.length > 0 ? (
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {challenge.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {challenge.description}
                          </p>
                        </div>
                        <span className="text-2xl">{challenge.icon}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-green-600">
                            {challenge.user_challenges[0]?.progress || 0}/
                            {challenge.target_value}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
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
                        <p className="text-xs text-gray-500">
                          Reward: {challenge.xp_reward} XP
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 mb-2">No active challenges</p>
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
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl text-white"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Recommendations</h2>
              <p className="text-purple-100">
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
                className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20"
              >
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h3 className="font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-purple-100">{tip.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

// Made with Bob
