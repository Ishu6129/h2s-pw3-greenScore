'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardClient from '../dashboard/dashboard-client';
import { User } from '@/types';

export default function DemoDashboardPage() {
  const router = useRouter();
  const [demoUser, setDemoUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for demo user in session storage
    const storedUser = sessionStorage.getItem('demoUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDemoUser(user);
    } else {
      // No demo user, redirect to login
      router.push('/login');
    }
  }, [router]);

  // Stable particles for loading screen
  const loadingParticles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${(i * 5 + 5) % 100}%`,
        top: `${(i * 7 + 10) % 100}%`,
        delay: (i * 0.15) % 3,
        duration: 4 + (i % 4),
      })),
    []
  );

  if (!demoUser) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
          {/* Animated Orbs */}
          <div className="absolute left-0 top-0 h-96 w-96 animate-pulse rounded-full bg-green-500/30 blur-3xl" />
          <div
            className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-emerald-500/30 blur-3xl"
            style={{ animationDelay: '1s' }}
          />

          {/* Floating Particles */}
          {loadingParticles.map((particle, i) => (
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

        {/* Loading Content */}
        <div className="relative text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-green-500/30 border-t-green-400"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg font-medium text-gray-300"
          >
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  // Mock data for demo user
  const mockActivities = [
    {
      id: '1',
      user_id: demoUser.id,
      activity_type: 'cycling' as const,
      amount: 5,
      unit: 'km',
      carbon_offset: 1.2,
      xp_earned: 50,
      logged_at: new Date().toISOString(),
      photo_url: null,
      notes: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: demoUser.id,
      activity_type: 'recycling' as const,
      amount: 2,
      unit: 'items',
      carbon_offset: 0.8,
      xp_earned: 40,
      logged_at: new Date(Date.now() - 86400000).toISOString(),
      photo_url: null,
      notes: null,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const mockChallenges = [
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Log activities for 7 consecutive days',
      challenge_type: 'streak' as const,
      activity_type: null,
      target_value: 7,
      target_unit: 'days',
      xp_reward: 500,
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      icon: '🔥',
      is_active: true,
      created_at: new Date().toISOString(),
      user_challenges: [
        {
          progress: 7,
          completed: true,
          completed_at: new Date().toISOString(),
        },
      ],
    },
    {
      id: '2',
      title: 'Cycle 50km',
      description: 'Cycle a total of 50 kilometers',
      challenge_type: 'activity_specific' as const,
      activity_type: 'cycling' as const,
      target_value: 50,
      target_unit: 'km',
      xp_reward: 300,
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      icon: '🚴',
      is_active: true,
      created_at: new Date().toISOString(),
      user_challenges: [
        {
          progress: 35,
          completed: false,
          completed_at: null,
        },
      ],
    },
  ];

  const mockMarketplaceItems = [
    {
      id: '1',
      name: 'Green Warrior Badge',
      description: 'Show your commitment to the environment',
      price: 1000,
      item_type: 'badge' as const,
      is_available: true,
      image_url: '',
      metadata: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Forest Theme',
      description: 'Beautiful forest-themed dashboard',
      price: 500,
      item_type: 'theme' as const,
      is_available: true,
      image_url: '',
      metadata: null,
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <DashboardClient
      user={demoUser}
      activities={mockActivities}
      challenges={mockChallenges}
      marketplaceItems={mockMarketplaceItems}
    />
  );
}

// Made with Bob
