'use client';

import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Award, Users, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: TrendingDown,
      title: 'Track Your Impact',
      description: 'Monitor your carbon footprint with real-time tracking and beautiful visualizations.',
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Complete challenges, earn XP, and unlock exclusive badges and customizations.',
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Get personalized recommendations powered by Google Gemini AI.',
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Compete with friends, join challenges, and make a collective impact.',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
        <div className="radial-gradient-primary absolute left-1/4 top-1/4 h-96 w-96 opacity-30" />
        <div className="radial-gradient-accent absolute bottom-1/4 right-1/4 h-96 w-96 opacity-30" />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8 inline-flex items-center justify-center"
          >
            <div className="rounded-full bg-primary-500/20 p-4">
              <Leaf className="h-16 w-16 text-primary-500" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
          >
            Track Your{' '}
            <span className="gradient-text">Carbon Footprint</span>
            <br />
            Like Never Before
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-12 max-w-2xl text-xl text-neutral-400"
          >
            Gamified carbon tracking that makes sustainability fun, rewarding, and addictive.
            Join thousands making a real impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/dashboard" className="btn-primary group">
              Get Started Free
              <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#features" className="btn-secondary">
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '500T', label: 'CO₂ Offset (kg)' },
              { value: '50K+', label: 'Challenges Completed' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="card text-center"
              >
                <div className="mb-2 text-4xl font-bold text-primary-500">{stat.value}</div>
                <div className="text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Why Choose <span className="gradient-text">GreenScore</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-neutral-400">
            The most engaging way to track and reduce your carbon footprint
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-hover group"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary-500/20 p-3 transition-all group-hover:bg-primary-500/30">
                <feature.icon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
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
          className="card relative overflow-hidden text-center"
        >
          <div className="radial-gradient-primary absolute inset-0 opacity-50" />
          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Ready to Make an Impact?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-neutral-400">
              Join the movement and start tracking your carbon footprint today.
              It's free, fun, and makes a real difference.
            </p>
            <Link href="/dashboard" className="btn-primary group">
              Start Your Journey
              <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8">
        <div className="container mx-auto px-4 text-center text-neutral-400">
          <p>&copy; 2026 GreenScore. Making the world greener, one action at a time.</p>
        </div>
      </footer>
    </div>
  );
}

// Made with Bob
