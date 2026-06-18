'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg">
              <span className="text-4xl">🔍</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-center text-6xl font-bold text-gray-900"
          >
            404
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-2 text-center text-xl font-semibold text-gray-800"
          >
            Page Not Found
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 text-center text-gray-600"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </motion.p>

          {/* Actions */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/"
                className="block w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-center font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Go Home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/dashboard"
                className="block w-full rounded-xl bg-gray-100 px-4 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-200"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          </div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 border-t border-gray-200 pt-6"
          >
            <p className="mb-3 text-center text-sm text-gray-500">Quick Links:</p>
            <div className="flex justify-center gap-4 text-sm">
              <Link href="/login" className="text-blue-600 transition-colors hover:text-blue-700">
                Login
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/signup" className="text-blue-600 transition-colors hover:text-blue-700">
                Sign Up
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Made with Bob
