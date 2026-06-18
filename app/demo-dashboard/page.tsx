'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import DashboardClient from '../dashboard/dashboard-client'

export default function DemoDashboardPage() {
  const router = useRouter()
  const [demoUser, setDemoUser] = useState<any>(null)

  useEffect(() => {
    // Check for demo user in session storage
    const storedUser = sessionStorage.getItem('demoUser')
    
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setDemoUser(user)
    } else {
      // No demo user, redirect to login
      router.push('/login')
    }
  }, [router])

  // Stable particles for loading screen
  const loadingParticles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 5 + 5) % 100}%`,
      top: `${(i * 7 + 10) % 100}%`,
      delay: (i * 0.15) % 3,
      duration: 4 + (i % 4)
    }))
  , [])

  if (!demoUser) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
          {/* Animated Orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Floating Particles */}
          {loadingParticles.map((particle, i) => (
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

        {/* Loading Content */}
        <div className="relative text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-4 border-green-500/30 border-t-green-400 mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-300 text-lg font-medium"
          >
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    )
  }

  // Mock data for demo user
  const mockActivities = [
    {
      id: '1',
      user_id: demoUser.id,
      activity_type: 'cycling',
      amount: 5,
      unit: 'km',
      carbon_offset: 1.2,
      xp_earned: 50,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: demoUser.id,
      activity_type: 'recycling',
      amount: 2,
      unit: 'items',
      carbon_offset: 0.8,
      xp_earned: 40,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]

  const mockChallenges = [
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Log activities for 7 consecutive days',
      target_value: 7,
      xp_reward: 500,
      icon: '🔥',
      is_active: true,
      user_challenges: [{
        progress: 7,
        completed: true,
        completed_at: new Date().toISOString(),
      }],
    },
    {
      id: '2',
      title: 'Cycle 50km',
      description: 'Cycle a total of 50 kilometers',
      target_value: 50,
      xp_reward: 300,
      icon: '🚴',
      is_active: true,
      user_challenges: [{
        progress: 35,
        completed: false,
        completed_at: null,
      }],
    },
  ]

  const mockMarketplaceItems = [
    {
      id: '1',
      name: 'Green Warrior Badge',
      description: 'Show your commitment to the environment',
      xp_cost: 1000,
      item_type: 'badge',
      is_available: true,
      image_url: null,
    },
    {
      id: '2',
      name: 'Forest Theme',
      description: 'Beautiful forest-themed dashboard',
      xp_cost: 500,
      item_type: 'theme',
      is_available: true,
      image_url: null,
    },
  ]

  return (
    <DashboardClient
      user={demoUser}
      activities={mockActivities}
      challenges={mockChallenges}
      marketplaceItems={mockMarketplaceItems}
    />
  )
}

// Made with Bob