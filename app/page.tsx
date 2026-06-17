'use client';

import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Award, Users, Sparkles, ArrowRight, Zap, Target, Globe } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function LandingPage() {
  // Generate stable particle positions
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 5 + 5) % 100}%`,
      top: `${(i * 7 + 10) % 100}%`,
      delay: (i * 0.15) % 3,
      duration: 4 + (i % 4)
    }))
  , []);

  const features = [
    {
      icon: TrendingDown,
      title: 'Track Your Impact',
      description: 'Monitor your carbon footprint with real-time tracking and beautiful visualizations.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Complete challenges, earn XP, and unlock exclusive badges and customizations.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Get personalized recommendations powered by Google Gemini AI.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Compete with friends, join challenges, and make a collective impact.',
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Dark Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        {/* Animated Orbs */}
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 50, 0],
            x: [0, -30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 min-h-screen flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full text-center"
          >
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="mb-8 inline-flex items-center justify-center relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl"
              />
              <div className="relative rounded-full bg-gradient-to-br from-green-500 to-emerald-600 p-6 shadow-2xl shadow-green-500/50">
                <Leaf className="h-20 w-20 text-white" />
              </div>
            </motion.div>

            {/* Heading with Glow Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-6xl font-bold leading-tight md:text-8xl"
            >
              <span className="text-white">Track Your</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                Carbon Footprint
              </span>
              <br />
              <span className="text-white">Like Never Before</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mb-12 max-w-3xl text-xl md:text-2xl text-gray-300 leading-relaxed"
            >
              Gamified carbon tracking that makes sustainability{' '}
              <span className="text-green-400 font-semibold">fun</span>,{' '}
              <span className="text-emerald-400 font-semibold">rewarding</span>, and{' '}
              <span className="text-teal-400 font-semibold">addictive</span>.
              <br />
              Join thousands making a real impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row mb-20"
            >
              <Link 
                href="/signup" 
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 blur-xl"
                />
              </Link>
              <Link 
                href="/login" 
                className="px-8 py-4 bg-gray-800/40 backdrop-blur-xl text-white font-bold text-lg rounded-2xl border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Stats with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl mx-auto"
            >
              {[
                { value: '10K+', label: 'Active Users', icon: Users },
                { value: '500T', label: 'CO₂ Offset (kg)', icon: Globe },
                { value: '50K+', label: 'Challenges Completed', icon: Target },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-gray-900/40 backdrop-blur-2xl rounded-2xl p-6 border border-green-500/20 group-hover:border-green-500/40 transition-all">
                    <stat.icon className="h-8 w-8 text-green-400 mb-3 mx-auto" />
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-5xl md:text-6xl font-bold text-white">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                GreenScore
              </span>
              ?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              The most engaging way to track and reduce your carbon footprint
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-2xl transition-all duration-500`} />
                <div className="relative bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
                  <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-4 shadow-2xl`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 blur-3xl" />
            <div className="relative bg-gray-900/60 backdrop-blur-2xl border border-green-500/30 rounded-3xl p-12 md:p-20 text-center">
              <Zap className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h2 className="mb-6 text-5xl md:text-6xl font-bold text-white">
                Ready to Make an Impact?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300 leading-relaxed">
                Join the movement and start tracking your carbon footprint today.
                It's free, fun, and makes a real difference.
              </p>
              <Link 
                href="/signup" 
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl rounded-2xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/20 py-8 backdrop-blur-xl">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              &copy; 2026 <span className="text-green-400 font-semibold">GreenScore</span>. 
              Making the world greener, one action at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Made with Bob
