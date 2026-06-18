'use client';

import { useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const supabase = createClient();

  // Generate stable particle positions
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${(i * 5 + 5) % 100}%`,
        top: `${(i * 7 + 10) % 100}%`,
        delay: (i * 0.15) % 3,
        duration: 4 + (i % 4),
      })),
    []
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: profileError } = await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          carbon_score: 500,
          total_xp: 0,
          level: 1,
          current_streak: 0,
          longest_streak: 0,
        });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 p-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute h-96 w-96 animate-pulse rounded-full bg-green-500/30 blur-3xl"
            style={{ top: '10%', left: '10%' }}
          />
          <div
            className="absolute h-96 w-96 animate-pulse rounded-full bg-emerald-500/30 blur-3xl"
            style={{ bottom: '10%', right: '10%', animationDelay: '1s' }}
          />
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-2xl shadow-green-500/50"
          >
            <CheckCircle2 className="h-16 w-16 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-4xl font-bold text-white"
          >
            Welcome to GreenScore! 🎉
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-green-200"
          >
            Preparing your eco-journey...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-96 w-96 rounded-full bg-green-500/20 blur-3xl"
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
          style={{ bottom: '10%', right: '10%' }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-green-400"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism card */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 animate-pulse rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 opacity-75 blur-xl" />

          <div className="relative rounded-3xl border border-green-500/20 bg-gray-900/40 p-8 shadow-2xl backdrop-blur-2xl">
            {/* Logo with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 opacity-50 blur-md"
                />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-center"
            >
              <h1 className="mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-3xl font-bold text-transparent">
                <Sparkles className="h-6 w-6 text-green-400" />
                Join GreenScore
                <Sparkles className="h-6 w-6 text-green-400" />
              </h1>
              <p className="text-gray-400">Start your journey to a sustainable future</p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="group relative">
                  <User
                    className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                      focusedField === 'fullName' ? 'text-green-400' : 'text-gray-500'
                    }`}
                  />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                  {focusedField === 'fullName' && (
                    <motion.div
                      layoutId="inputGlow"
                      className="absolute inset-0 -z-10 rounded-xl bg-green-500/10 blur-xl"
                    />
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="group relative">
                  <Mail
                    className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                      focusedField === 'email' ? 'text-green-400' : 'text-gray-500'
                    }`}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      layoutId="inputGlow"
                      className="absolute inset-0 -z-10 rounded-xl bg-green-500/10 blur-xl"
                    />
                  )}
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="group relative">
                  <Lock
                    className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                      focusedField === 'password' ? 'text-green-400' : 'text-gray-500'
                    }`}
                  />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                  {focusedField === 'password' && (
                    <motion.div
                      layoutId="inputGlow"
                      className="absolute inset-0 -z-10 rounded-xl bg-green-500/10 blur-xl"
                    />
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">Must be at least 6 characters</p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center text-sm text-gray-400"
            >
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-green-400 transition-colors hover:text-green-300"
              >
                Sign in
              </Link>
            </motion.p>
          </div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            ← Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Made with Bob
