'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #fee2e2, #fed7aa, #fef3c7)',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '28rem',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '2rem',
            border: '1px solid rgba(239, 68, 68, 0.1)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                background: 'linear-gradient(to bottom right, #f87171, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '2.25rem'
              }}>
                ⚠️
              </div>
            </div>

            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#111827',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              Critical Error
            </h1>

            <p style={{
              color: '#4b5563',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              A critical error occurred. Please refresh the page.
            </p>

            <button
              onClick={reset}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(to right, #ef4444, #ea580c)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

// Made with Bob
