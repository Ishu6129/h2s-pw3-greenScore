'use client';

import { useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const supabase = createClient();

  // Generate stable particle positions
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        left: `${(i * 7 + 10) % 100}%`,
        top: `${(i * 13 + 5) % 100}%`,
        delay: (i * 0.2) % 2,
        duration: 3 + (i % 3),
      })),
    []
  );

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
        {/* Animated Dark Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-20 top-20 h-96 w-96 rounded-full bg-green-500/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-75 blur"
            />

            <div className="relative rounded-3xl border border-green-500/20 bg-gray-900/40 p-8 text-center shadow-2xl backdrop-blur-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mb-6 flex justify-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
              </motion.div>

              <h1 className="mb-4 text-3xl font-bold text-white">Check Your Email</h1>
              <p className="mb-8 text-gray-400">
                We&apos;ve sent a password reset link to{' '}
                <span className="font-semibold text-green-400">{email}</span>
              </p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-green-400 transition-colors hover:text-green-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Animated Dark Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        {/* Floating Orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-20 top-20 h-96 w-96 rounded-full bg-green-500/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute h-1 w-1 rounded-full bg-green-400"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="relative">
          {/* Glowing Border */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 opacity-75 blur"
          />

          <div className="relative rounded-3xl border border-green-500/20 bg-gray-900/40 p-8 shadow-2xl backdrop-blur-2xl">
            {/* Logo with Rotating Halo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative mb-8 flex justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute h-24 w-24 rounded-full border-2 border-green-500/30"
              />
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/50">
                <span className="text-4xl">🔑</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-center"
            >
              <h1 className="mb-2 text-3xl font-bold text-white">Reset Password</h1>
              <p className="text-gray-400">Enter your email to receive a reset link</p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Reset Form */}
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  {focusedField === 'email' && (
                    <motion.div
                      layoutId="inputGlow"
                      className="absolute inset-0 rounded-xl bg-green-500/10 blur-xl"
                    />
                  )}
                  <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    autoComplete="email"
                    className="relative w-full rounded-xl border border-green-500/20 bg-gray-800/50 py-3 pl-12 pr-4 text-white placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-semibold text-white shadow-lg shadow-green-500/50 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </span>
              </motion.button>
            </form>

            {/* Back to Login */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-sm text-gray-400"
            >
              Remember your password?{' '}
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
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Made with Bob
