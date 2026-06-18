'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Challenge, MarketplaceItem } from '@/types';
interface TestResult {
  success: boolean;
  timestamp: string;
  connection: {
    status: string;
    url: string;
    hasKey: boolean;
  };
  database: {
    existingTables: string[];
    missingTables: string[];
    totalExpected: number;
    totalExisting: number;
  };
  data: {
    challenges: {
      accessible: boolean;
      count: number;
      sample: Challenge | null;
    };
    marketplace: {
      accessible: boolean;
      count: number;
      sample: MarketplaceItem | null;
    };
  };
  recommendations: string[];
}

export default function TestPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run test');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Database Connection Test</h1>
            <p className="text-neutral-400">
              Testing Supabase connection and database setup
            </p>
          </div>
          <button
            onClick={runTest}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Testing...' : 'Run Test'}
          </button>
        </div>

        {/* Loading State */}
        {loading && !result && (
          <div className="card text-center">
            <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            <p className="text-neutral-400">Running connection tests...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card border-danger-500 bg-danger-500/10">
            <div className="flex items-start gap-3">
              <XCircle className="h-6 w-6 flex-shrink-0 text-danger-500" />
              <div>
                <h3 className="mb-1 font-semibold text-danger-500">Test Failed</h3>
                <p className="text-sm text-neutral-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="card">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Connection Status</h2>
                {result.success ? (
                  <CheckCircle className="h-8 w-8 text-primary-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-danger-500" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Status:</span>
                  <span
                    className={
                      result.connection.status === 'connected'
                        ? 'text-primary-500'
                        : 'text-danger-500'
                    }
                  >
                    {result.connection.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">URL:</span>
                  <span className="font-mono text-sm">{result.connection.url}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">API Key:</span>
                  <span className={result.connection.hasKey ? 'text-primary-500' : 'text-danger-500'}>
                    {result.connection.hasKey ? '✅ Present' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Timestamp:</span>
                  <span className="text-sm">{new Date(result.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Database Tables */}
            <div className="card">
              <h2 className="mb-4 text-2xl font-bold">Database Tables</h2>
              <div className="mb-4 flex items-center justify-between rounded-xl bg-neutral-900 p-4">
                <span className="text-neutral-400">Tables Found:</span>
                <span className="text-2xl font-bold text-primary-500">
                  {result.database.totalExisting} / {result.database.totalExpected}
                </span>
              </div>

              {result.database.existingTables.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-2 font-semibold text-primary-500">
                    ✅ Existing Tables ({result.database.existingTables.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {result.database.existingTables.map((table) => (
                      <div
                        key={table}
                        className="rounded-lg bg-primary-500/10 px-3 py-2 text-sm"
                      >
                        {table}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.database.missingTables.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold text-danger-500">
                    ❌ Missing Tables ({result.database.missingTables.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {result.database.missingTables.map((table) => (
                      <div
                        key={table}
                        className="rounded-lg bg-danger-500/10 px-3 py-2 text-sm"
                      >
                        {table}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Data Tests */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Challenges */}
              <div className="card">
                <h3 className="mb-3 text-xl font-bold">Challenges</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Accessible:</span>
                    <span
                      className={
                        result.data.challenges.accessible ? 'text-primary-500' : 'text-danger-500'
                      }
                    >
                      {result.data.challenges.accessible ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Count:</span>
                    <span className="font-bold">{result.data.challenges.count}</span>
                  </div>
                  {result.data.challenges.sample && (
                    <div className="mt-3 rounded-lg bg-neutral-900 p-3">
                      <p className="text-sm font-semibold">
                        {result.data.challenges.sample.title}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {result.data.challenges.sample.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Marketplace */}
              <div className="card">
                <h3 className="mb-3 text-xl font-bold">Marketplace</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Accessible:</span>
                    <span
                      className={
                        result.data.marketplace.accessible ? 'text-primary-500' : 'text-danger-500'
                      }
                    >
                      {result.data.marketplace.accessible ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Count:</span>
                    <span className="font-bold">{result.data.marketplace.count}</span>
                  </div>
                  {result.data.marketplace.sample && (
                    <div className="mt-3 rounded-lg bg-neutral-900 p-3">
                      <p className="text-sm font-semibold">
                        {result.data.marketplace.sample.name}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {result.data.marketplace.sample.price} points
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card border-accent-500 bg-accent-500/10">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-accent-500" />
                <h3 className="text-xl font-bold">Recommendations</h3>
              </div>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-accent-500">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
